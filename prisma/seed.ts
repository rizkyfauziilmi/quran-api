import { PrismaClient } from '@prisma/client';
import xlsx from 'xlsx';
import path from 'path';
import cliProgress from 'cli-progress';
import { transliterate as tr } from 'transliteration';

const prisma = new PrismaClient();

// Define the type for your data rows
type QuranRow = {
  SrNo: number;
  Juz: number;
  JuzNameArabic: string;
  JuzNameEnglish: string;
  SurahNo: number;
  SurahNameArabic: string;
  SurahNameEnglish: string;
  SurahMeaning: string;
  WebLink: string;
  Classification: string;
  AyahNo: number;
  EnglishTranslation: string;
  OrignalArabicText: string;
  ArabicText: string;
  ArabicWordCount: number;
  ArabicLetterCount: number;
};

type SurahInfo = { latinName: string; ayahCount: number };

async function deleteExistingData() {
  console.log('Deleting existing data...');
  await prisma.juz.deleteMany();
  console.log('Existing data deleted.');
}

function loadExcelRows(): QuranRow[] {
  const filePath = path.join(
    __dirname,
    '../cli/dataset/Dataset-Verse-by-Verse.xlsx',
  );
  console.log(`Reading Excel file from: ${filePath}`);
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json<QuranRow>(worksheet);
  console.log(`Loaded ${rows.length} rows from worksheet "${sheetName}".`);
  return rows;
}

async function seedQuranData(rows: QuranRow[]) {
  const juzMap = new Map<number, boolean>();
  const surahMap = new Map<number, SurahInfo>();

  const bar = new cliProgress.SingleBar({
    format:
      'Seeding Data |{bar}| {percentage}% | {value}/{total} verses | {current}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
  });
  bar.start(rows.length, 0, { current: 'Starting...' });

  let processed = 0;
  for (const row of rows) {
    let currentStep = '';
    // 1. Upsert Juz
    if (!juzMap.has(row.Juz)) {
      currentStep = `Creating Juz ${row.Juz}: ${row.JuzNameEnglish}`;
      await prisma.juz.upsert({
        where: { number: row.Juz },
        update: {},
        create: {
          number: row.Juz,
          arabicName: row.JuzNameArabic,
          latinName: row.JuzNameEnglish,
        },
      });
      juzMap.set(row.Juz, true);
    }

    // 2. Upsert Surah
    if (!surahMap.has(row.SurahNo)) {
      currentStep = `Creating Surah ${row.SurahNo}: ${row.SurahNameEnglish}`;
      await prisma.surah.upsert({
        where: { number: row.SurahNo },
        update: {},
        create: {
          number: row.SurahNo,
          latinName: row.SurahNameEnglish,
          arabicName: row.SurahNameArabic,
          surahMeaning: row.SurahMeaning,
          ayahsCount: 0, // Will update later
          classification: row.Classification,
          juzId: row.Juz,
        },
      });
      surahMap.set(row.SurahNo, {
        latinName: row.SurahNameEnglish,
        ayahCount: 0,
      });
    }

    // 3. Create Ayah
    const surahLatinName =
      surahMap.get(row.SurahNo)?.latinName || row.SurahNameEnglish;
    currentStep = `Processing ${surahLatinName} - Verse ${row.AyahNo}`;
    await prisma.ayah.create({
      data: {
        number: row.AyahNo,
        arabicText: row.ArabicText,
        originalArabicText: row.OrignalArabicText,
        // TODO: scrape translation
        transliteration: tr(row.OrignalArabicText),
        surahId: row.SurahNo,
        translations: {
          create: [
            {
              languageCode: 'en',
              translatedText: row.EnglishTranslation,
            },
          ],
        },
      },
    });

    // Track ayah count for each surah
    if (surahMap.has(row.SurahNo)) {
      surahMap.get(row.SurahNo)!.ayahCount += 1;
    }

    processed++;
    bar.update(processed, { current: currentStep });
  }

  bar.stop();
  return surahMap;
}

async function updateSurahAyahsCount(surahMap: Map<number, SurahInfo>) {
  console.log('Updating ayahsCount for each Surah...');
  const surahBar = new cliProgress.SingleBar({
    format:
      'Updating Surah Counts |{bar}| {percentage}% | {value}/{total} chapters | {current}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
  });
  const surahKeys = Array.from(surahMap.keys());
  surahBar.start(surahKeys.length, 0, { current: 'Starting...' });

  let surahProcessed = 0;
  for (const surahNo of surahKeys) {
    const surahInfo = surahMap.get(surahNo)!;
    await prisma.surah.update({
      where: { number: surahNo },
      data: { ayahsCount: surahInfo.ayahCount },
    });
    surahProcessed++;
    surahBar.update(surahProcessed, {
      current: `${surahInfo.latinName}: ${surahInfo.ayahCount} verses`,
    });
  }
  surahBar.stop();

  console.log('All Surah ayahsCount updated.');
}

async function main() {
  await deleteExistingData();
  const rows = loadExcelRows();
  const surahMap = await seedQuranData(rows);
  // Print total surah and ayah count before updating counts
  const totalSurah = surahMap.size;
  const totalAyah = Array.from(surahMap.values()).reduce(
    (acc, s) => acc + s.ayahCount,
    0,
  );
  // Create a table log with detailed information
  console.table([
    {
      'Data Type': 'Surah (Chapters)',
      Count: totalSurah,
      Description: 'Total number of Surahs in the Quran',
    },
    {
      'Data Type': 'Ayah (Verses)',
      Count: totalAyah,
      Description: 'Total number of Ayahs across all Surahs',
    },
  ]);
  await updateSurahAyahsCount(surahMap);
  console.log('Seeding completed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import * as cheerio from 'cheerio';
import type { Browser, Page } from 'puppeteer';
import { write } from 'bun';
import { join } from 'path';
import { mkdirSync, existsSync } from 'fs';
import ora, { type Ora } from 'ora';
import type { AyahData } from '../types/ayah.type';
import type { SurahInfo } from '../types/surah.type';

const BASE_URL = 'https://quran.kemenag.go.id/';
const SURAH_URL = (id: number, from: number, to: number) =>
  `https://quran.kemenag.go.id/quran/per-ayat/surah/${id}?from=${from}&to=${to}`;

export async function scrapeKemenagQuran(browser: Browser) {
  const page = await browser.newPage();
  await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
  await page.waitForSelector('div.content-body');

  const surahList = await getKemenagSurahList(page);

  const transliterationList: AyahData[] = [];
  const indonesiaList: AyahData[] = [];
  const spinner = ora(
    `Downloading transliteration & Indonesia: 0/${surahList.length}`,
  ).start();

  for (const [idx, surah] of surahList.entries()) {
    spinner.text = `Downloading transliteration & Indonesia: ${idx + 1}/${surahList.length} (Surah ${surah.id})`;
    await page.goto(SURAH_URL(surah.id, surah.start, surah.end), {
      waitUntil: 'networkidle0',
    });
    await page.waitForSelector('body');
    await scrollUntilAllAyahsLoaded(
      page,
      surah.end,
      spinner,
      idx,
      surahList.length,
      surah.id,
    );

    const { transliterations, indonesians } = await getKemenagAyahData(
      page,
      surah.id,
    );
    transliterationList.push(...transliterations);
    indonesiaList.push(...indonesians);
  }

  spinner.succeed(
    `Finished downloading transliteration & Indonesia: ${surahList.length}/${surahList.length}`,
  );
  await page.close();
  await saveKemenagDataset(transliterationList, indonesiaList);
}

async function getKemenagSurahList(page: Page): Promise<SurahInfo[]> {
  const html = await page.content();
  const $ = cheerio.load(html);
  const surahList: SurahInfo[] = [];
  $('div.item-surah').each((i, el) => {
    const surahId = i + 1;
    const start = 1;
    const end = parseInt(
      $(el).find('span.dot').text().match(/\d+/)?.[0] || '0',
      10,
    );
    surahList.push({ id: surahId, start, end });
  });
  return surahList;
}

async function scrollUntilAllAyahsLoaded(
  page: Page,
  lastAyah: number,
  spinner: Ora,
  idx: number,
  total: number,
  surahId: number,
) {
  let previousHeight: number;
  while (true) {
    const ayahRendered = await page.$$eval(
      'div.card-surah',
      (els) => els.length,
    );
    spinner.text = `Downloading transliteration & Indonesia: ${idx + 1}/${total} (Surah ${surahId}) - Ayah rendered: ${ayahRendered}/${lastAyah}`;
    const isRendered = await page
      .$eval(`#ayat-${lastAyah}`, (el) => {
        const element = el as HTMLElement;
        const style = window.getComputedStyle(element);
        return (
          style.display !== 'none' &&
          style.visibility !== 'hidden' &&
          element.offsetParent !== null
        );
      })
      .catch(() => false);
    if (isRendered) break;
    previousHeight = (await page.evaluate(
      'document.body.scrollHeight',
    )) as number;
    await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
    await page.waitForFunction(
      `document.body.scrollHeight > ${previousHeight}`,
    );
    await Bun.sleep(800);
  }
}

async function getKemenagAyahData(page: Page, surahId: number) {
  const html = await page.content();
  const $ = cheerio.load(html);
  const transliterations: AyahData[] = [];
  const indonesians: AyahData[] = [];
  $('.card-surah').each((_, el) => {
    const transliterationText = $(el)
      .find('.surah-translate.gold')
      .text()
      .trim();
    const surahTranslate = $(el).find('.surah-translate:not(.gold)');
    surahTranslate.find('.superscript').remove();
    const indonesiaText = surahTranslate.text().trim();
    const ayahNumber = parseInt(
      $(el).find('div.surah-number h4').text().trim(),
      10,
    );
    transliterations.push({ surahId, ayahNumber, text: transliterationText });
    indonesians.push({ surahId, ayahNumber, text: indonesiaText });
  });
  return { transliterations, indonesians };
}

async function saveKemenagDataset(
  transliterationList: AyahData[],
  indonesiaList: AyahData[],
) {
  const datasetDir = join(__dirname, '../dataset');
  if (!existsSync(datasetDir)) mkdirSync(datasetDir, { recursive: true });
  await write(
    join(datasetDir, 'transliteration.json'),
    JSON.stringify(transliterationList, null, 2),
  );
  await write(
    join(datasetDir, 'indonesia.json'),
    JSON.stringify(indonesiaList, null, 2),
  );
}

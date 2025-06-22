-- DropForeignKey
ALTER TABLE "ayahs" DROP CONSTRAINT "ayahs_surahId_fkey";

-- DropForeignKey
ALTER TABLE "surahs" DROP CONSTRAINT "surahs_juzId_fkey";

-- DropForeignKey
ALTER TABLE "translations" DROP CONSTRAINT "translations_ayahId_fkey";

-- AddForeignKey
ALTER TABLE "surahs" ADD CONSTRAINT "surahs_juzId_fkey" FOREIGN KEY ("juzId") REFERENCES "juzs"("number") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ayahs" ADD CONSTRAINT "ayahs_surahId_fkey" FOREIGN KEY ("surahId") REFERENCES "surahs"("number") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "translations" ADD CONSTRAINT "translations_ayahId_fkey" FOREIGN KEY ("ayahId") REFERENCES "ayahs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

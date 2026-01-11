/*
  Warnings:

  - You are about to drop the column `arabic` on the `ayahs` table. All the data in the column will be lost.
  - The primary key for the `surahs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `surahs` table. All the data in the column will be lost.
  - You are about to drop the column `relevation_place` on the `surahs` table. All the data in the column will be lost.
  - You are about to drop the column `total_ayahs` on the `surahs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[number,surahId]` on the table `ayahs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[number]` on the table `surahs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[arabicName]` on the table `surahs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[englishName]` on the table `surahs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `arabicText` to the `ayahs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `ayahs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `arabicName` to the `surahs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ayahsCount` to the `surahs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classification` to the `surahs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `englishName` to the `surahs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `juzId` to the `surahs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `surahs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surahMeaning` to the `surahs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ayahs" DROP CONSTRAINT "ayahs_surahId_fkey";

-- AlterTable
ALTER TABLE "ayahs" DROP COLUMN "arabic",
ADD COLUMN     "arabicText" TEXT NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "surahs" DROP CONSTRAINT "surahs_pkey",
DROP COLUMN "id",
DROP COLUMN "relevation_place",
DROP COLUMN "total_ayahs",
ADD COLUMN     "arabicName" TEXT NOT NULL,
ADD COLUMN     "ayahsCount" INTEGER NOT NULL,
ADD COLUMN     "classification" TEXT NOT NULL,
ADD COLUMN     "englishName" TEXT NOT NULL,
ADD COLUMN     "juzId" INTEGER NOT NULL,
ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "surahMeaning" TEXT NOT NULL,
ADD CONSTRAINT "surahs_pkey" PRIMARY KEY ("number");

-- CreateTable
CREATE TABLE "juzs" (
    "number" INTEGER NOT NULL,
    "arabicName" TEXT NOT NULL,
    "englishName" TEXT NOT NULL,

    CONSTRAINT "juzs_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "translations" (
    "id" SERIAL NOT NULL,
    "languageCode" TEXT NOT NULL,
    "translatedText" TEXT NOT NULL,
    "ayahId" INTEGER NOT NULL,

    CONSTRAINT "translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "juzs_number_key" ON "juzs"("number");

-- CreateIndex
CREATE UNIQUE INDEX "translations_ayahId_languageCode_key" ON "translations"("ayahId", "languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "ayahs_number_surahId_key" ON "ayahs"("number", "surahId");

-- CreateIndex
CREATE UNIQUE INDEX "surahs_number_key" ON "surahs"("number");

-- CreateIndex
CREATE UNIQUE INDEX "surahs_arabicName_key" ON "surahs"("arabicName");

-- CreateIndex
CREATE UNIQUE INDEX "surahs_englishName_key" ON "surahs"("englishName");

-- AddForeignKey
ALTER TABLE "surahs" ADD CONSTRAINT "surahs_juzId_fkey" FOREIGN KEY ("juzId") REFERENCES "juzs"("number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ayahs" ADD CONSTRAINT "ayahs_surahId_fkey" FOREIGN KEY ("surahId") REFERENCES "surahs"("number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "translations" ADD CONSTRAINT "translations_ayahId_fkey" FOREIGN KEY ("ayahId") REFERENCES "ayahs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

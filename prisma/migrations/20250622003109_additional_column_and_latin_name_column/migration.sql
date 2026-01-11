/*
  Warnings:

  - You are about to drop the column `englishName` on the `juzs` table. All the data in the column will be lost.
  - You are about to drop the column `englishName` on the `surahs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[latinName]` on the table `surahs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `originalArabicText` to the `ayahs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latinName` to the `juzs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latinName` to the `surahs` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "surahs_englishName_key";

-- AlterTable
ALTER TABLE "ayahs" ADD COLUMN     "originalArabicText" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "juzs" DROP COLUMN "englishName",
ADD COLUMN     "latinName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "surahs" DROP COLUMN "englishName",
ADD COLUMN     "latinName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "surahs_latinName_key" ON "surahs"("latinName");

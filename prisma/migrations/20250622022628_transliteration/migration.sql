/*
  Warnings:

  - Added the required column `transliteration` to the `ayahs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ayahs" ADD COLUMN     "transliteration" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `text` on the `ayahs` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `surahs` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "surahs_name_key";

-- AlterTable
ALTER TABLE "ayahs" DROP COLUMN "text";

-- AlterTable
ALTER TABLE "surahs" DROP COLUMN "name";

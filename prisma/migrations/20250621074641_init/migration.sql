-- CreateTable
CREATE TABLE "surahs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "relevation_place" TEXT NOT NULL,
    "total_ayahs" INTEGER NOT NULL,

    CONSTRAINT "surahs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ayahs" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "arabic" TEXT NOT NULL,
    "surahId" INTEGER NOT NULL,

    CONSTRAINT "ayahs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "surahs_name_key" ON "surahs"("name");

-- AddForeignKey
ALTER TABLE "ayahs" ADD CONSTRAINT "ayahs_surahId_fkey" FOREIGN KEY ("surahId") REFERENCES "surahs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

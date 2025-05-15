/*
  Warnings:

  - You are about to drop the column `especie` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `esterilizado` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `peso` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `sexo` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `breed` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `species` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sterilized` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urlImage` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "especie",
DROP COLUMN "esterilizado",
DROP COLUMN "peso",
DROP COLUMN "sexo",
ADD COLUMN     "breed" TEXT NOT NULL,
ADD COLUMN     "sex" TEXT NOT NULL,
ADD COLUMN     "species" TEXT NOT NULL,
ADD COLUMN     "sterilized" BOOLEAN NOT NULL,
ADD COLUMN     "urlImage" TEXT NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;

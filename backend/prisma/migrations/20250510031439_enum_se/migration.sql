/*
  Warnings:

  - You are about to alter the column `weight` on the `Pet` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Changed the type of `sex` on the `Pet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('hembra', 'macho');

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "sex",
ADD COLUMN     "sex" "Sex" NOT NULL,
ALTER COLUMN "weight" SET DATA TYPE INTEGER;

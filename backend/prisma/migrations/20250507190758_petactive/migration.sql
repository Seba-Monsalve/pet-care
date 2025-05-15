/*
  Warnings:

  - You are about to drop the column `type` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `especie` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `esterilizado` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peso` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexo` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "type",
ADD COLUMN     "especie" TEXT NOT NULL,
ADD COLUMN     "esterilizado" BOOLEAN NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "peso" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sexo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

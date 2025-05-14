/*
  Warnings:

  - Changed the type of `type` on the `MedicalRecord` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `VaccinationHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Vaccines" AS ENUM ('Rabia', 'Parvovirus', 'Moquillo', 'Leptospirosis', 'Otro');

-- CreateEnum
CREATE TYPE "RecordType" AS ENUM ('Consulta', 'Cirugia', 'Desparacitacion', 'Otro');

-- AlterTable
ALTER TABLE "MedicalRecord" DROP COLUMN "type",
ADD COLUMN     "type" "RecordType" NOT NULL;

-- AlterTable
ALTER TABLE "VaccinationHistory" DROP COLUMN "type",
ADD COLUMN     "type" "Vaccines" NOT NULL;

/*
  Warnings:

  - You are about to drop the column `status` on the `MedicalRecord` table. All the data in the column will be lost.
  - Changed the type of `type` on the `MedicalRecord` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `status` to the `VaccinationHistory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MedicalRecordType" AS ENUM ('Consulta', 'Cirugia', 'Desparacitacion', 'Otro');

-- AlterTable
ALTER TABLE "MedicalRecord" DROP COLUMN "status",
DROP COLUMN "type",
ADD COLUMN     "type" "MedicalRecordType" NOT NULL;

-- AlterTable
ALTER TABLE "VaccinationHistory" ADD COLUMN     "status" BOOLEAN NOT NULL;

-- DropEnum
DROP TYPE "RecordType";

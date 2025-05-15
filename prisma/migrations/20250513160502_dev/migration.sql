/*
  Warnings:

  - Changed the type of `type` on the `VaccinationHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "VaccinesRecordType" AS ENUM ('Rabia', 'Parvovirus', 'Moquillo', 'Leptospirosis', 'Otro');

-- AlterTable
ALTER TABLE "VaccinationHistory" DROP COLUMN "type",
ADD COLUMN     "type" "VaccinesRecordType" NOT NULL,
ALTER COLUMN "status" SET DEFAULT false;

-- DropEnum
DROP TYPE "Vaccines";

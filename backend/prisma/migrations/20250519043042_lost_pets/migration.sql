-- CreateEnum
CREATE TYPE "LostStatus" AS ENUM ('Perdido', 'Encontrado');

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "isLost" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "LostPetHistory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "petId" TEXT NOT NULL,
    "lastSeen" TIMESTAMP(6) NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reward" INTEGER,
    "status" "LostStatus" NOT NULL,
    "foundAt" TIMESTAMP(6),

    CONSTRAINT "LostPetHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LostPetHistory" ADD CONSTRAINT "LostPetHistory_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

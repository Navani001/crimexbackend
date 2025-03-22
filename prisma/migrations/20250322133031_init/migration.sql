/*
  Warnings:

  - Made the column `password` on table `Login` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Login" ADD COLUMN     "policeStationId" INTEGER,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "password" SET DEFAULT '123',
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "role" SET DEFAULT 'public';

-- CreateTable
CREATE TABLE "PoliceStation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lat" DECIMAL(10,7) NOT NULL,
    "long" DECIMAL(10,7) NOT NULL,
    "address" TEXT,
    "jurisdiction" TEXT,

    CONSTRAINT "PoliceStation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CrimeType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "severity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "CrimeType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crime" (
    "id" SERIAL NOT NULL,
    "crimeTypeId" INTEGER NOT NULL,
    "lat" DECIMAL(10,7) NOT NULL,
    "long" DECIMAL(10,7) NOT NULL,
    "description" TEXT NOT NULL,
    "timeOfOccurrence" TIMESTAMP(3) NOT NULL,
    "isFake" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT,
    "createdBy" INTEGER NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT NOT NULL DEFAULT 'reported',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Crime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CrimeAssign" (
    "id" SERIAL NOT NULL,
    "crimeId" INTEGER NOT NULL,
    "loginId" INTEGER NOT NULL,
    "assignedBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'assigned',

    CONSTRAINT "CrimeAssign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CCTV" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lat" DECIMAL(10,7) NOT NULL,
    "long" DECIMAL(10,7) NOT NULL,
    "location" TEXT NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "policeStationId" INTEGER,
    "installedDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CCTV_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HighCrimeArea" (
    "id" SERIAL NOT NULL,
    "lat" DECIMAL(10,7) NOT NULL,
    "long" DECIMAL(10,7) NOT NULL,
    "radius" DECIMAL(10,2),
    "description" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "crimeTypeId" INTEGER NOT NULL,
    "crimeCount" INTEGER NOT NULL DEFAULT 0,
    "dateIdentified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HighCrimeArea_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Login" ADD CONSTRAINT "Login_policeStationId_fkey" FOREIGN KEY ("policeStationId") REFERENCES "PoliceStation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crime" ADD CONSTRAINT "Crime_crimeTypeId_fkey" FOREIGN KEY ("crimeTypeId") REFERENCES "CrimeType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crime" ADD CONSTRAINT "Crime_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Login"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrimeAssign" ADD CONSTRAINT "CrimeAssign_crimeId_fkey" FOREIGN KEY ("crimeId") REFERENCES "Crime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrimeAssign" ADD CONSTRAINT "CrimeAssign_loginId_fkey" FOREIGN KEY ("loginId") REFERENCES "Login"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrimeAssign" ADD CONSTRAINT "CrimeAssign_assignedBy_fkey" FOREIGN KEY ("assignedBy") REFERENCES "Login"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CCTV" ADD CONSTRAINT "CCTV_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Login"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CCTV" ADD CONSTRAINT "CCTV_policeStationId_fkey" FOREIGN KEY ("policeStationId") REFERENCES "PoliceStation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HighCrimeArea" ADD CONSTRAINT "HighCrimeArea_crimeTypeId_fkey" FOREIGN KEY ("crimeTypeId") REFERENCES "CrimeType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

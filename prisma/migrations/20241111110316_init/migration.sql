-- CreateEnum
CREATE TYPE "AdminRoles" AS ENUM ('ADMIN', 'SUPERADMIN');

-- CreateEnum
CREATE TYPE "BloodType" AS ENUM ('O_POSITIVE', 'O_NEGATIVE', 'A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('UNAVAILABLE', 'AVAILABLE', 'ALLOCATED', 'TRANSPLANTED');

-- CreateEnum
CREATE TYPE "UrgencyLevel" AS ENUM ('EMERGENCY', 'HIGH', 'MODERATE', 'LOW');

-- CreateEnum
CREATE TYPE "OrganType" AS ENUM ('HEART', 'LUNGS', 'LIVER', 'KIDNEY', 'PANCREAS', 'INTESTINES', 'CORNEA', 'SKIN', 'BONE', 'TENDON', 'HEART_VALVE', 'VEINS', 'ARTERIES');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "dob" DATE NOT NULL,
    "gender" "Gender" NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "bloodGroup" "BloodType" NOT NULL,
    "userType" VARCHAR(10) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganDonations" (
    "id" SERIAL NOT NULL,
    "organ" "OrganType" NOT NULL,
    "donorId" INTEGER NOT NULL,
    "availabilityStatus" "Status" NOT NULL DEFAULT 'UNAVAILABLE',
    "dateOfDonation" TIMESTAMP(3),
    "dateOfTransplant" TIMESTAMP(3),
    "recipientId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganDonations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganRequests" (
    "id" SERIAL NOT NULL,
    "organ" "OrganType" NOT NULL,
    "recipientId" INTEGER NOT NULL,
    "urgencyLevel" "UrgencyLevel" NOT NULL DEFAULT 'MODERATE',
    "organId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganRequests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admins" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "role" "AdminRoles" NOT NULL DEFAULT 'ADMIN',
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "OrganRequests_organId_key" ON "OrganRequests"("organId");

-- CreateIndex
CREATE UNIQUE INDEX "Admins_email_key" ON "Admins"("email");

-- AddForeignKey
ALTER TABLE "OrganDonations" ADD CONSTRAINT "OrganDonations_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganDonations" ADD CONSTRAINT "OrganDonations_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganRequests" ADD CONSTRAINT "OrganRequests_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganRequests" ADD CONSTRAINT "OrganRequests_organId_fkey" FOREIGN KEY ("organId") REFERENCES "OrganDonations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

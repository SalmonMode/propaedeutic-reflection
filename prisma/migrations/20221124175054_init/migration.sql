/*
  Warnings:

  - Made the column `createdAt` on table `SelfAssessment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SelfAssessment" ALTER COLUMN "createdAt" SET NOT NULL;

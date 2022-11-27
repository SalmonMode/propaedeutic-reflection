-- CreateEnum
CREATE TYPE "Score" AS ENUM ('ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillArea" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "SkillArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelfAssessment" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "score" "Score" NOT NULL,
    "userId" INTEGER NOT NULL,
    "skillAreaId" INTEGER NOT NULL,

    CONSTRAINT "SelfAssessment_pkey" PRIMARY KEY ("userId","skillAreaId")
);

-- CreateIndex
CREATE UNIQUE INDEX "SelfAssessment_userId_skillAreaId_key" ON "SelfAssessment"("userId", "skillAreaId");

-- AddForeignKey
ALTER TABLE "SelfAssessment" ADD CONSTRAINT "SelfAssessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelfAssessment" ADD CONSTRAINT "SelfAssessment_skillAreaId_fkey" FOREIGN KEY ("skillAreaId") REFERENCES "SkillArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

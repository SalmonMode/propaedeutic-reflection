-- DropForeignKey
ALTER TABLE "SelfAssessment" DROP CONSTRAINT "SelfAssessment_skillAreaId_fkey";

-- DropForeignKey
ALTER TABLE "SelfAssessment" DROP CONSTRAINT "SelfAssessment_userId_fkey";

-- AddForeignKey
ALTER TABLE "SelfAssessment" ADD CONSTRAINT "SelfAssessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SelfAssessment" ADD CONSTRAINT "SelfAssessment_skillAreaId_fkey" FOREIGN KEY ("skillAreaId") REFERENCES "SkillArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

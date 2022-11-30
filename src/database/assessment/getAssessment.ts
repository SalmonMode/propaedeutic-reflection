import { PrismaClient } from "@prisma/client";
import { ScoreNumMap, SelfAssessmentSummary } from "../../types";

/**
 * Interface used to facilite strong typing in automated checks when stubbing.
 */
export interface FindUniqueArgs {
  where: {
    userId_skillAreaId: {
      skillAreaId: number;
      userId: number;
    };
  };
  select: {
    score: true;
  };
}
/**
 * Interface used to facilite strong typing in automated checks when stubbing.
 */
export interface FindManyArgs {
  where: {
    skillAreaId: number;
  };
  select: {
    score: true;
  };
}

/**
 * Fetch a SelfAssessment for a user for a skill area along with the average for that area.
 *
 * @throws {@link PrismaClientKnownRequestError} Thrown with code P2025 when no assessment was found with the given IDs.
 *
 * @param prisma The client to access the DB with
 * @param userId The ID of the User to submit the score for
 * @param skillAreaId The ID of the SkillArea to submit the score for
 *
 * @returns A summary of the SelfAssessment along with the average score for that SkillArea
 */
export async function getAssessment(
  prisma: PrismaClient,
  userId: number,
  skillAreaId: number
): Promise<SelfAssessmentSummary> {
  const findUniqueArgs: FindUniqueArgs = {
    where: {
      userId_skillAreaId: {
        skillAreaId,
        userId,
      },
    },
    select: {
      score: true,
    },
  };
  const assessment =
    await prisma.selfAssessment.findUniqueOrThrow<FindUniqueArgs>(
      findUniqueArgs
    );
  const findManyArgs: FindManyArgs = {
    where: {
      skillAreaId,
    },
    select: {
      score: true,
    },
  };
  const allAssessments = await prisma.selfAssessment.findMany<FindManyArgs>(
    findManyArgs
  );
  const averageScore =
    allAssessments.reduce((acc, curr) => acc + ScoreNumMap[curr.score], 0) /
    allAssessments.length;
  return {
    userId: userId,
    skillAreaId: skillAreaId,
    score: ScoreNumMap[assessment.score],
    averageScore,
  };
}

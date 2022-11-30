import { PrismaClient, Score, SkillArea, User } from "@prisma/client";
import {
  ScoreNumArray,
  ScoreNumMap,
  ScoreNums,
  SubmitSelfAssessmentSummary,
} from "../../types";

/**
 * Interface used to facilite strong typing in automated checks when stubbing.
 */
export interface SubmitArgs {
  data: {
    score: Score;
    user: {
      connect: {
        id: User["id"];
      };
    };
    skillArea: {
      connect: {
        id: SkillArea["id"];
      };
    };
  };
  select: {
    score: true;
    userId: true;
    skillAreaId: true;
  };
}

/**
 * Create a SelfAssessment using the score provided.
 *
 * @param prisma The client to access the DB with
 * @param userId The ID of the User to submit the score for
 * @param skillAreaId The ID of the SkillArea to submit the score for
 * @param score The score the User is giving themselves
 */
export async function submitAssessment(
  prisma: PrismaClient,
  userId: number,
  skillAreaId: number,
  score: ScoreNums
): Promise<SubmitSelfAssessmentSummary> {
  const args: SubmitArgs = {
    data: {
      score: ScoreNumArray[score],
      user: {
        connect: {
          id: userId,
        },
      },
      skillArea: {
        connect: {
          id: skillAreaId,
        },
      },
    },
    select: {
      score: true,
      userId: true,
      skillAreaId: true,
    },
  };
  const result = await prisma.selfAssessment.create<SubmitArgs>(args);
  return {
    userId: result.userId,
    skillAreaId: result.skillAreaId,
    score: ScoreNumMap[result.score],
  };
}

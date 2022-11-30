import { NextApiRequest, NextApiResponse } from "next";
import { getAssessment } from "../../../../database";
import { getPrismaClient } from "../../../../getPrismaClient";
import { SelfAssessmentSummary } from "../../../../types";
import { getSkillAreaIdFromRequest } from "../getSkillAreaIdFromRequest";

/**
 * Handle a request to create a new SkillArea.
 *
 * @throws {@link TypeError} Thrown when the provided description is incompatible with a SkillArea description.
 *
 * @param request The incoming request
 * @param response The outgoing response
 *
 * @returns A summary of the SkillArea ID that was found
 */
export async function handleGetAssessment(
  request: NextApiRequest,
  response: NextApiResponse<SelfAssessmentSummary>
): Promise<void> {
  const userId = Number(request.query.userId);
  if (
    typeof request.query.userId !== "string" ||
    request.query.userId.length === 0 ||
    !Number.isInteger(userId)
  ) {
    throw new TypeError(`Unrecognized User ID format: ${request.query.userId}`);
  }
  const skillAreaId = getSkillAreaIdFromRequest(request);
  const prisma = getPrismaClient();
  const summary = await getAssessment(prisma, userId, skillAreaId);
  response.json(summary);
}

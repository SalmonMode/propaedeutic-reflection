import { NextApiRequest, NextApiResponse } from "next";
import { submitAssessment } from "../../../../database";
import { getPrismaClient } from "../../../../getPrismaClient";
import { assertIsSubmitSelfAssessment } from "../../../../typePredicates";
import { SuccessfulJsonResponse } from "../../../../types";
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
export async function handleSubmitAssessment(
  request: NextApiRequest,
  response: NextApiResponse<typeof SuccessfulJsonResponse>
): Promise<void> {
  assertIsSubmitSelfAssessment(request.body);
  const {
    body: { userId, score },
  } = request;
  const skillAreaId = getSkillAreaIdFromRequest(request);
  const prisma = getPrismaClient();
  await submitAssessment(prisma, userId, skillAreaId, score);
  response.json(SuccessfulJsonResponse);
}

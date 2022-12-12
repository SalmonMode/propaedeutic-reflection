import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { submitAssessment } from "../../../../database";
import { getPrismaClient } from "../../../../getPrismaClient";
import {
  assertIsSession,
  assertIsSubmitSelfAssessment,
} from "../../../../typePredicates";
import { SuccessfulJsonResponse } from "../../../../types";
import { authOptions } from "../../auth/[...nextauth]";
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
  const session = await unstable_getServerSession(
    request,
    response,
    authOptions
  );
  assertIsSession(session);
  assertIsSubmitSelfAssessment(request.body);
  const userId = session.user.id;
  const {
    body: { score },
  } = request;
  const skillAreaId = getSkillAreaIdFromRequest(request);
  const prisma = getPrismaClient();
  await submitAssessment(prisma, userId, skillAreaId, score);
  response.json(SuccessfulJsonResponse);
}

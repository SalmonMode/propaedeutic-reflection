import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { getAssessment } from "../../../../database";
import { getPrismaClient } from "../../../../getPrismaClient";
import {
  assertIsSession,
  assertIsUserSession,
} from "../../../../typePredicates";
import { SelfAssessmentSummary } from "../../../../types";
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
export async function handleGetAssessment(
  request: NextApiRequest,
  response: NextApiResponse<SelfAssessmentSummary>
): Promise<void> {
  const session = await unstable_getServerSession(
    request,
    response,
    authOptions
  );
  assertIsSession(session);
  assertIsUserSession(session);
  const userId = session.user.id;
  const skillAreaId = getSkillAreaIdFromRequest(request);
  const prisma = getPrismaClient();
  const summary = await getAssessment(prisma, userId, skillAreaId);
  response.json(summary);
}

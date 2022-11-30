import { NextApiRequest, NextApiResponse } from "next";
import { createSkillArea } from "../../../database";
import { getPrismaClient } from "../../../getPrismaClient";
import { assertIsCreateNewSkillArea } from "../../../typePredicates";
import { SkillAreaSummary } from "../../../types";

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
export async function handleCreateSkillArea(
  request: NextApiRequest,
  response: NextApiResponse<SkillAreaSummary>
): Promise<void> {
  assertIsCreateNewSkillArea(request.body);
  const {
    body: { title, description },
  } = request;
  if (title.length === 0) {
    throw new TypeError(`Unrecognized skill area title format: ${title}`);
  }
  if (description.length === 0) {
    throw new TypeError(
      `Unrecognized skill area description format: ${description}`
    );
  }
  const prisma = getPrismaClient();
  const summary = await createSkillArea(prisma, title, description);
  response.json(summary);
}

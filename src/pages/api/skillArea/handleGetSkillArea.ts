import { NextApiResponse } from "next";
import { getPrismaClient } from "../../../getPrismaClient";
import { SkillAreaSummary } from "../../../types";
import { getSkillArea } from "../../../database/skillArea/getSkillArea";

/**
 * Handle a request for getting a specific SkillArea.
 *
 * @param response The outgoing response
 * @param skillAreaId The ID of the specific SkillArea to get
 */
export async function handleGetSkillArea(
  response: NextApiResponse<SkillAreaSummary>,
  skillAreaId: number
) {
  const prisma = getPrismaClient();
  const summary = await getSkillArea(prisma, skillAreaId);
  response.json(summary);
}

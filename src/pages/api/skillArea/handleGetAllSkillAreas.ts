import { NextApiResponse } from "next";
import { getAllSkillAreas } from "../../../database";
import { getPrismaClient } from "../../../getPrismaClient";
import { SkillAreaSummary } from "../../../types";

/**
 * Handle a request for getting all available SkillAreas.
 *
 * @param response The outgoing response
 */
export async function handleGetAllSkillAreas(
  response: NextApiResponse<SkillAreaSummary[]>
) {
  const prisma = getPrismaClient();
  const summary = await getAllSkillAreas(prisma);
  response.json(summary);
}

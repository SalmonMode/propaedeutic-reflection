import { NextApiResponse } from "next";
import { getPrismaClient } from "../../../getPrismaClient";
import { SkillAreaSummary } from "../../../types";
import { getSkillArea } from "./getSkillArea";

export async function handleGetSkillArea(
  response: NextApiResponse<SkillAreaSummary>,
  skillAreaId: number
) {
  const prisma = getPrismaClient();
  const summary = await getSkillArea(prisma, skillAreaId);
  response.json(summary);
}

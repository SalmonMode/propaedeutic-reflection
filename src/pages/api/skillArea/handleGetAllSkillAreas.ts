import { NextApiResponse } from "next";
import { getPrismaClient } from "../../../getPrismaClient";
import { SkillAreaSummary } from "../../../types";
import { getAllSkillAreas } from "./getAllSkillAreas";

export async function handleGetAllSkillAreas(
  response: NextApiResponse<SkillAreaSummary[]>
) {
  const prisma = getPrismaClient();
  const summary = await getAllSkillAreas(prisma);
  response.json(summary);
}

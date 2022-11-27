import { PrismaClient } from "@prisma/client";
import { SkillAreaSummary } from "../../../types";

export async function getAllSkillAreas(
  prisma: PrismaClient
): Promise<SkillAreaSummary[]> {
  const found = await prisma.skillArea.findMany();
  return found.map((sa) => ({
    id: sa.id,
    description: sa.description,
  }));
}

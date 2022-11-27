import { PrismaClient } from "@prisma/client";
import { SkillAreaSummary } from "../../../types";

export async function createSkillArea(
  prisma: PrismaClient,
  description: string
): Promise<SkillAreaSummary> {
  const created = await prisma.skillArea.create({
    data: {
      description,
    },
  });
  return {
    id: created.id,
    description: created.description,
  };
}

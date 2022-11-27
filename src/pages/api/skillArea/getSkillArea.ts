import { PrismaClient } from "@prisma/client";
import { SkillAreaNotFoundError } from "../../../Errors";
import { SkillAreaSummary } from "../../../types";

export async function getSkillArea(
  prisma: PrismaClient,
  skillAreaId: number
): Promise<SkillAreaSummary> {
  const found = await prisma.skillArea.findUnique({
    where: {
      id: skillAreaId,
    },
  });
  if (found === null) {
    throw new SkillAreaNotFoundError(
      `Unable to find skill area with id: ${skillAreaId}`
    );
  }
  return {
    id: found.id,
    description: found.description,
  };
}

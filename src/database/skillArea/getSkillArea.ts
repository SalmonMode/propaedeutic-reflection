import { PrismaClient } from "@prisma/client";
import { SkillAreaNotFoundError } from "../../Errors";
import { SkillAreaSummary } from "../../types";

/**
 * Get a specific SkillArea.
 *
 * @throws {@link SkillAreaNotFoundError} Thrown when no SkillArea could be found with the given ID.
 *
 * @param prisma The client to access the DB with
 * @param skillAreaId The ID of the specific SkillArea to get
 *
 * @returns A summary of the SkillArea ID that was found
 */
export async function getSkillArea(
  prisma: PrismaClient,
  skillAreaId: number
): Promise<SkillAreaSummary> {
  const found = await prisma.skillArea.findUniqueOrThrow({
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

import { PrismaClient } from "@prisma/client";
import { SkillAreaSummary } from "../../types";

/**
 * Get a specific SkillArea.
 *
 * @throws {@link PrismaClientKnownRequestError} Thrown with code P2025 when no SkillArea was found with the given ID.
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
  return {
    id: found.id,
    title: found.title,
    description: found.description,
  };
}

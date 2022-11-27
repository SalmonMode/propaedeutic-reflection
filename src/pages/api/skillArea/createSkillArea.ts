import { PrismaClient } from "@prisma/client";
import { SkillAreaSummary } from "../../../types";

/**
 * Create a SkillArea using the description provided.
 *
 * @param prisma The client to access the DB with
 * @param description A description of the SkillArea
 *
 * @returns A summary of the created SkillArea
 */
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

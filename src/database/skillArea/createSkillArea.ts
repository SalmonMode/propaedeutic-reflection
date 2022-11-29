import { PrismaClient } from "@prisma/client";
import { SkillAreaSummary } from "../../types";

/**
 * Create a SkillArea using the title and description provided.
 *
 * @param prisma The client to access the DB with
 * @param title A title of the SkillArea
 * @param description A description of the SkillArea
 *
 * @returns A summary of the created SkillArea
 */
export async function createSkillArea(
  prisma: PrismaClient,
  title: string,
  description: string
): Promise<SkillAreaSummary> {
  const created = await prisma.skillArea.create({
    data: {
      title,
      description,
    },
  });
  return {
    id: created.id,
    title: created.title,
    description: created.description,
  };
}

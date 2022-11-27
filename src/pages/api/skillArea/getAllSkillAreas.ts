import { PrismaClient } from "@prisma/client";
import { SkillAreaSummary } from "../../../types";

/**
 * Get a list of summaries for all SkillAreas in the DB.
 *
 * @param prisma The client to access the DB with
 *
 * @returns A list of summaries of the SkillAreas found
 */
export async function getAllSkillAreas(
  prisma: PrismaClient
): Promise<SkillAreaSummary[]> {
  const found = await prisma.skillArea.findMany();
  return found.map((sa) => ({
    id: sa.id,
    description: sa.description,
  }));
}

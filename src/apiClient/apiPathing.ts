import { SkillArea } from "@prisma/client";

export function getSkillAreaPath(baseUrl: URL): URL {
  return new URL("/api/skillArea", baseUrl.href);
}
export function getSelfAssessmentPath(
  baseUrl: URL,
  skillAreaId: SkillArea["id"]
): URL {
  return new URL(`/api/skillArea/${skillAreaId}/assessment`, baseUrl.href);
}

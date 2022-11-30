import { NextApiRequest } from "next";

/**
 * Extract the SkillArea ID from the incoming request.
 *
 * The ID is part of the URL, and Next.js provides a reference to it through `request.query`. It does not guarantee the
 * ID is present (even though it's part of the routing necessary to get here), or that it's a number, so it is assumed
 * to be `unknown` and must be verified.
 *
 * @throws {@link TypeError} Thrown when the ID is not an integer (or is not present).
 *
 * @param request The incoming request
 *
 * @returns The ID of the requested SkillArea
 */
export function getSkillAreaIdFromRequest(request: NextApiRequest): number {
  const {
    query: { id },
  }: { query: Record<string, unknown> } = request;
  const skillAreaId: number = Number(id);
  if (
    typeof id !== "string" ||
    id.length === 0 ||
    !Number.isInteger(skillAreaId)
  ) {
    throw new TypeError(`Unrecognized Skill Area ID format: ${id}`);
  }
  return skillAreaId;
}

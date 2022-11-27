import type { NextApiRequest, NextApiResponse } from "next";
import { InvalidHttpMethodError } from "../../../Errors";
import { HttpMethod } from "../../../types";
import { handleError } from "./handleError";
import { handleGetSkillArea } from "./handleGetSkillArea";

/**
 * Handler for all requests for a specific SkillArea.
 *
 * URL: `/api/skillArea/[id]`
 *
 * This handles all requests meant for a specific SkillArea. That SkillArea is referenced through the `[id]` portion of
 * the URL.
 *
 * As a request comes in to the associated URL, it is immediately sent here where the nature of the request is discerned
 * and routed to the relevant function for processing.
 *
 * @param request The incoming request
 * @param response The outgoing response
 */
export async function specificSkillAreaHandler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const { method } = request;
    const skillAreaId = getSkillAreaIdFromRequest(request);

    switch (method) {
      case HttpMethod.GET:
        // Get data from your database
        await handleGetSkillArea(response, skillAreaId);
        break;
      default:
        throw new InvalidHttpMethodError([HttpMethod.GET], method);
    }
  } catch (error) {
    handleError(response, error);
  }
}

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
    throw new TypeError(`Unrecognized skill area id format: ${id}`);
  }
  return skillAreaId;
}

import type { NextApiRequest, NextApiResponse } from "next";
import { InvalidHttpMethodError } from "../../../Errors";
import { HttpMethod } from "../../../types";
import { getSkillAreaIdFromRequest } from "./getSkillAreaIdFromRequest";
import { handleError } from "../handleError";
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

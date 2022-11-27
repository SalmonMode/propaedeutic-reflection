import type { NextApiRequest, NextApiResponse } from "next";
import { InvalidHttpMethodError } from "../../../Errors";
import { HttpMethod } from "../../../types";
import { handleCreateSkillArea } from "./handleCreateSkillArea";
import { handleError } from "./handleError";
import { handleGetAllSkillAreas } from "./handleGetAllSkillAreas";

/**
 * Handler for all requests for SkillAreas.
 *
 * URL: `/api/skillArea`
 *
 * This handles all requests meant for SkillAreas where a specific SkillArea ID could not be provided.
 *
 * As a request comes in to the associated URL, it is immediately sent here where the nature of the request is discerned
 * and routed to the relevant function for processing.
 *
 * @param request The incoming request
 * @param response The outgoing response
 */
export async function skillAreaHandler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    switch (request.method) {
      case HttpMethod.GET:
        await handleGetAllSkillAreas(response);
        break;
      case HttpMethod.POST:
        await handleCreateSkillArea(request, response);
        break;
      default:
        throw new InvalidHttpMethodError(
          [HttpMethod.GET, HttpMethod.POST],
          request.method
        );
    }
  } catch (error) {
    handleError(response, error);
  }
}

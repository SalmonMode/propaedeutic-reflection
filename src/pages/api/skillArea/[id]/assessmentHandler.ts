import type { NextApiRequest, NextApiResponse } from "next";
import { InvalidHttpMethodError } from "../../../../Errors";
import { HttpMethod } from "../../../../types";
import { handleError } from "../handleError";
import { handleGetAssessment } from "./handleGetAssessment";
import { handleSubmitAssessment } from "./handleSubmitAssessment";

/**
 * Handler for all requests for SkillArea Assessments.
 *
 * URL: `/api/skillArea/[id]/assessment`
 *
 * This handles all requests meant for SkillArea Assessments where a specific SkillArea ID is provided.
 *
 * As a request comes in to the associated URL, it is immediately sent here where the nature of the request is discerned
 * and routed to the relevant function for processing.
 *
 * @param request The incoming request
 * @param response The outgoing response
 */
export async function assessmentHandler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    switch (request.method) {
      case HttpMethod.GET:
        await handleGetAssessment(request, response);
        break;
      case HttpMethod.POST:
        await handleSubmitAssessment(request, response);
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

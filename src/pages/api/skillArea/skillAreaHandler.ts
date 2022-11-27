import type { NextApiRequest, NextApiResponse } from "next";
import { InvalidHttpMethodError } from "../../../Errors";
import { HttpMethod } from "../../../types";
import { handleCreateSkillArea } from "./handleCreateSkillArea";
import { handleError } from "./handleError";
import { handleGetAllSkillAreas } from "./handleGetAllSkillAreas";

export async function skillAreaHandler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    switch (request.method) {
      case undefined:
        throw new Error(
          `No method provided. This should be impossible, but the typing provided by Next.js allows for it.`
        );
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

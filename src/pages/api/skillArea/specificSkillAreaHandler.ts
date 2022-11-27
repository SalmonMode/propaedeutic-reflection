import type { NextApiRequest, NextApiResponse } from "next";
import { InvalidHttpMethodError } from "../../../Errors";
import { HttpMethod } from "../../../types";
import { handleError } from "./handleError";
import { handleGetSkillArea } from "./handleGetSkillArea";

export async function specificSkillAreaHandler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const {
      query: { id },
      method,
    } = request;
    const skillAreaId: number = Number(id);
    if (
      typeof id !== "string" ||
      id.length === 0 ||
      !Number.isInteger(skillAreaId)
    ) {
      throw new TypeError(`Unrecognized skill area id format: ${id}`);
    }

    switch (method) {
      case undefined:
        throw new Error(
          `No method provided. This should be impossible, but the typing provided by Next.js allows for it.`
        );
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

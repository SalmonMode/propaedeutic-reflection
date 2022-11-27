import { NextApiResponse } from "next";
import {
  InvalidHttpMethodError,
  SkillAreaNotFoundError,
} from "../../../Errors";
import { ErrorResponse } from "../../../types";

export function handleError(
  response: NextApiResponse<ErrorResponse>,
  error: unknown
) {
  if (error instanceof SkillAreaNotFoundError) {
    response.status(404);
    response.json({ error: error.message });
  } else if (error instanceof InvalidHttpMethodError) {
    response.setHeader("Allow", error.supportedMethods);
    response.status(405);
    response.json({ error: `Method ${error.methodUsed} Not Allowed` });
  } else if (error instanceof TypeError) {
    response.status(400);
    response.json({ error: error.message });
  } else {
    throw error;
  }
}

import { NextApiResponse } from "next";
import {
  InvalidHttpMethodError,
  SkillAreaNotFoundError,
} from "../../../Errors";
import { ErrorResponse } from "../../../types";

/**
 * Respond to the request with an {@link ErrorResponse}.
 *
 * This handler exists so that the type of the response can be narrowed to use {@link ErrorResponse}. This allows for
 * the main handlers to specify their response types using the generic field on the {@link NextApiResponse} type without
 * cluttering it up to account for error responses, while also providing a strongly typed way of enforcing the shape of
 * the response to the client.
 *
 * Whenever something goes wrong in one of the main handlers, they can forward the response object to this function for
 * uniform handling of the errors.
 *
 * @throws {@link unknown} Thrown something went wrong that isn't accounted for.
 *
 * @param response The outgoing response
 * @param error The error that occurred in one of the main handlers
 */
export function handleError(
  response: NextApiResponse<ErrorResponse>,
  error: unknown
): void {
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

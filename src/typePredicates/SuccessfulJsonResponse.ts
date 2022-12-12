import { hasProperty, isString } from "typed-http-client";
import { SuccessfulJsonResponse } from "../types";

/**
 * Check if a given object matches the {@link SuccessfulJsonResponse} interface.
 *
 * @throws {@link TypeError} Thrown when the object does not match the {@link SuccessfulJsonResponse} interface
 *
 * @param value The object to check
 */
export function assertIsSuccessfulJsonResponse(
  value: object
): asserts value is typeof SuccessfulJsonResponse {
  if (
    !hasProperty(value, "status") ||
    !isString(value.status) ||
    value.status !== SuccessfulJsonResponse.status
  ) {
    throw new TypeError("Value is not SuccessfulJsonResponse");
  }
}

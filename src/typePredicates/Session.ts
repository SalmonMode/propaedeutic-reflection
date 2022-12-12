import { Session } from "next-auth";
import { UnauthorizedError } from "../Errors";
import { SubmitSelfAssessment } from "../types";

/**
 * Check if a given object matches the {@link SubmitSelfAssessment} interface.
 *
 * @throws {@link TypeError} Thrown when the object does not match the {@link SubmitSelfAssessment} interface
 *
 * @param value The object to check
 */
export function assertIsSession(
  value: Session | null
): asserts value is Session {
  if (value === null) {
    throw new UnauthorizedError("Unauthorized");
  }
}

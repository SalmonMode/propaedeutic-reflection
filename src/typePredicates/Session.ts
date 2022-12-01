import { Session } from "next-auth";
import { UnauthorizedError } from "../Errors";
import { SubmitSelfAssessment, UserSession } from "../types";

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

/**
 * Check if a given object matches the {@link SubmitSelfAssessment} interface.
 *
 * @throws {@link TypeError} Thrown when the object does not match the {@link SubmitSelfAssessment} interface
 *
 * @param value The object to check
 */
export function assertIsUserSession(
  value: Session
): asserts value is UserSession {
  if (value.user === undefined) {
    throw new UnauthorizedError("Unauthorized");
  }
}

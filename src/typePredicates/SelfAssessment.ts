import { hasProperty } from "typed-http-client";
import {
  SelfAssessmentSummary,
  SubmitSelfAssessment,
  SubmitSelfAssessmentSummary,
} from "../types";

/**
 * Check if a given object matches the {@link SubmitSelfAssessment} interface.
 *
 * @throws {@link TypeError} Thrown when the object does not match the {@link SubmitSelfAssessment} interface
 *
 * @param value The object to check
 */
export function assertIsSubmitSelfAssessment(
  value: object
): asserts value is SubmitSelfAssessment {
  if (
    !hasProperty(value, "score") ||
    typeof value.score !== "number" ||
    !Number.isInteger(value.score) ||
    value.score < 0 ||
    value.score > 10
  ) {
    throw new TypeError("Value is not SubmitSelfAssessment");
  }
}

/**
 * Check if a given object matches the {@link SelfAssessmentSummary} interface.
 *
 * @throws {@link TypeError} Thrown when the object does not match the {@link SelfAssessmentSummary} interface
 *
 * @param value The object to check
 */
export function assertIsSubmitSelfAssessmentSummary(
  value: object
): asserts value is SubmitSelfAssessmentSummary {
  if (!hasProperty(value, "userId") || !Number.isInteger(value.userId)) {
    throw new TypeError("Value is not SubmitSelfAssessmentSummary");
  }
  if (
    !hasProperty(value, "skillAreaId") ||
    !Number.isInteger(value.skillAreaId)
  ) {
    throw new TypeError("Value is not SubmitSelfAssessmentSummary");
  }
  if (
    !hasProperty(value, "score") ||
    typeof value.score !== "number" ||
    !Number.isInteger(value.score) ||
    value.score < 0 ||
    value.score > 10
  ) {
    throw new TypeError("Value is not SubmitSelfAssessmentSummary");
  }
}

/**
 * Check if a given object matches the {@link SelfAssessmentSummary} interface.
 *
 * @throws {@link TypeError} Thrown when the object does not match the {@link SelfAssessmentSummary} interface
 *
 * @param value The object to check
 */
export function assertIsSelfAssessmentSummary(
  value: object
): asserts value is SelfAssessmentSummary {
  if (
    !hasProperty(value, "skillAreaId") ||
    !Number.isInteger(value.skillAreaId)
  ) {
    throw new TypeError("Value is not SelfAssessmentSummary");
  }
  if (
    !hasProperty(value, "score") ||
    typeof value.score !== "number" ||
    !Number.isInteger(value.score) ||
    value.score < 0 ||
    value.score > 10
  ) {
    throw new TypeError("Value is not SelfAssessmentSummary");
  }
  if (
    !hasProperty(value, "averageScore") ||
    typeof value.averageScore !== "number" ||
    value.averageScore < 0 ||
    value.averageScore > 10
  ) {
    throw new TypeError("Value is not SelfAssessmentSummary");
  }
}

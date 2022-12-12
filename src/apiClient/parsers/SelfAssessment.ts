import { assertIsObject, ResponseProcessorParams } from "typed-http-client";
import { ResourceNotFoundError } from "../../Errors";
import { assertIsSelfAssessmentSummary } from "../../typePredicates";
import { assertIsSuccessfulJsonResponse } from "../../typePredicates";
import { SelfAssessmentSummary } from "../../types";

export function parseSelfAssessmentSummary({
  response,
  responseBodyAsObject,
}: ResponseProcessorParams): SelfAssessmentSummary {
  if (response.status === 404) {
    throw new ResourceNotFoundError("No Self Assessment found");
  }
  assertIsObject(responseBodyAsObject);
  assertIsSelfAssessmentSummary(responseBodyAsObject);
  return responseBodyAsObject;
}
export function parseSubmitAssessmentResponse({
  response,
  responseBodyAsString,
  responseBodyAsObject,
}: ResponseProcessorParams): void {
  if (response.status !== 200) {
    throw new Error(responseBodyAsString);
  }
  assertIsObject(responseBodyAsObject);
  assertIsSuccessfulJsonResponse(responseBodyAsObject);
}

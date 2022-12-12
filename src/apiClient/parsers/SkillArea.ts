import { assertIsObject, ResponseProcessorParams } from "typed-http-client";
import { assertIsArray, assertIsSkillAreaSummary } from "../../typePredicates";
import { SkillAreaSummary } from "../../types";

export function parseSkillAreaSummary({
  responseBodyAsObject,
}: ResponseProcessorParams): SkillAreaSummary {
  assertIsObject(responseBodyAsObject);
  assertIsSkillAreaSummary(responseBodyAsObject);
  return responseBodyAsObject;
}
export function parseSkillAreaSummaryArray({
  responseBodyAsObject,
}: ResponseProcessorParams): SkillAreaSummary[] {
  try {
    assertIsObject(responseBodyAsObject);
    assertIsArray(responseBodyAsObject);
    const summaries: SkillAreaSummary[] = [];
    for (let summary of responseBodyAsObject) {
      assertIsObject(summary);
      assertIsSkillAreaSummary(summary);
      summaries.push(summary);
    }
    return summaries;
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Response not recognized as skill summary array";
    }
    throw error;
  }
}

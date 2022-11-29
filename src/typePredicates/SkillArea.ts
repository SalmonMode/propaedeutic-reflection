import { CreateNewSkillArea, SkillAreaSummary } from "../types";
import { hasProperty } from "./Property";
import { isString } from "./String";

/**
 * Check if a given object matches the {@link CreateNewSkillArea} interface.
 *
 * @throws {@link TypeError} Thrown when the object does not match the {@link CreateNewSkillArea} interface
 *
 * @param value The object to check
 */
export function assertIsCreateNewSkillArea(
  value: object
): asserts value is CreateNewSkillArea {
  if (!hasProperty(value, "title") || !isString(value.title)) {
    throw new TypeError("Value is not CreateNewSkillArea");
  }
  if (!hasProperty(value, "description") || !isString(value.description)) {
    throw new TypeError("Value is not CreateNewSkillArea");
  }
}

/**
 * Check if a given object matches the {@link SkillAreaSummary} interface.
 *
 * @throws {@link TypeError} Thrown when the object does not match the {@link SkillAreaSummary} interface
 *
 * @param value The object to check
 */
export function assertIsSkillAreaSummary(
  value: object
): asserts value is SkillAreaSummary {
  if (!hasProperty(value, "title") || !isString(value.title)) {
    throw new TypeError("Value is not SkillAreaSummary");
  }
  if (!hasProperty(value, "description") || !isString(value.description)) {
    throw new TypeError("Value is not SkillAreaSummary");
  }
  if (!hasProperty(value, "id") || !Number.isInteger(value.id)) {
    throw new TypeError("Value is not SkillAreaSummary");
  }
}

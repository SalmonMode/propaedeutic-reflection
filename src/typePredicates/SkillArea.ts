import { CreateNewSkillArea } from "../types";
import { hasProperty } from "./Property";
import { isString } from "./String";

export function assertIsCreateNewSkillArea(
  value: object
): asserts value is CreateNewSkillArea {
  if (!hasProperty(value, "description") || !isString(value.description)) {
    throw new TypeError("Value is not CreateNewSkillArea");
  }
}

/**
 * An area of skill a person can rate themselves on.
 */
export default class SkillArea<SkillAreaDescription extends string> {
  constructor(public description: SkillAreaDescription) {}
}

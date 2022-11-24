import SkillArea from "./SkillArea";
import { Score } from "./types";

/**
 * How someone has rated themselves on a scale of 0-10.
 */
export default class SelfAssessment<S extends string> {
  constructor(public skillArea: SkillArea<S>, public score: Score) {}
}

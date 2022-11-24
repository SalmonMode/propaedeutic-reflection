import SelfAssessment from "./SelfAssessment";
import { AverageScore } from "./types";

/**
 * How someone has rated themselves on a scale of 0-10, juxtaposed with the average score for everyone.
 */
export default class RelativeSelfAssessment<
  SkillAreaDescription extends string
> extends SelfAssessment<SkillAreaDescription> {
  constructor(
    selfAssessment: SelfAssessment<SkillAreaDescription>,
    public averageScore: AverageScore
  ) {
    super(selfAssessment.skillArea, selfAssessment.score);
  }
}

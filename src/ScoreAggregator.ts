import { NoSelfAssessmentsError } from "./Errors";
import RelativeSelfAssessment from "./RelativeSelfAssessment";
import SelfAssessment from "./SelfAssessment";
import SkillArea from "./SkillArea";
import { AverageScore } from "./types";

export default class ScoreAggregator<SkillAreaDescription extends string> {
  public selfAssessments: SelfAssessment<SkillAreaDescription>[];
  /**
   * A new instance of the {@link ScoreAggregator} class.
   *
   * Tracks individual {@link SelfAssessment} as well as provides {@link RelativeSelfAssessment} and an average score
   * for a given {@link SkillArea}.
   *
   * @param selfAssessments The {@link SelfAssessment} objects the include in the aggregate
   */
  constructor(
    public skillArea: SkillArea<SkillAreaDescription>,
    ...selfAssessments: SelfAssessment<SkillAreaDescription>[]
  ) {
    this.selfAssessments = selfAssessments;
  }

  /**
   * The average score of all the {@link SelfAssessment} objects provided.
   *
   * @throws {@link NoSelfAssessmentsError} when no {@link SelfAssessment} objects are available
   */
  get averageScore(): AverageScore {
    if (this.selfAssessments.length === 0) {
      throw new NoSelfAssessmentsError(
        "No SelfAssessment objects available to get the average of"
      );
    }
    const sum: number = this.selfAssessments.reduce(
      (sum, currentAssessment) => sum + currentAssessment.score,
      0
    );
    const averageScore: AverageScore = sum / this.selfAssessments.length;
    return averageScore;
  }
  /**
   * Returns a {@link RelativeSelfAssessment} object showing how the given {@link SelfAssessment} compares against the average.
   *
   * @param selfAssessment the {@link SelfAssessment} to compare against the average
   * @returns a {@link RelativeSelfAssessment} object containing the original {@link SelfAssessment} details along with the average score.
   */
  getRelativeSelfAssessment(
    selfAssessment: SelfAssessment<SkillAreaDescription>
  ): RelativeSelfAssessment<SkillAreaDescription> {
    return new RelativeSelfAssessment(selfAssessment, this.averageScore);
  }
}

/**
 * This is thrown when the desired operation cannot be performed due to there being no {@link SelfAssessment} objects.
 */
export class NoSelfAssessmentsError extends TypeError {
  constructor(message?: string) {
    super(message);

    Object.setPrototypeOf(this, NoSelfAssessmentsError.prototype);
    this.name = new.target.name;
  }
}

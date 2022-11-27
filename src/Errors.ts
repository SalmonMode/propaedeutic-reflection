import { HttpMethod } from "./types";

/**
 * This is thrown when the desired operation cannot be performed due to there being no {@link SelfAssessment} objects.
 */
export class SkillAreaNotFoundError extends RangeError {
  constructor(message?: string) {
    super(message);

    Object.setPrototypeOf(this, SkillAreaNotFoundError.prototype);
    this.name = new.target.name;
  }
}
/**
 * This is thrown when an unsupported HTTP Method is used.
 */
export class InvalidHttpMethodError extends Error {
  constructor(
    public supportedMethods: HttpMethod[],
    public methodUsed: string,
    message?: string
  ) {
    super(message);

    Object.setPrototypeOf(this, InvalidHttpMethodError.prototype);
    this.name = new.target.name;
  }
}

export type Score = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/**
 * How someone has rated themselves on a scale of 0-10.
 */
export interface SelfAssessment {
  score: Score;
}

/**
 * An area of skill a person can rate themselves on.
 */
export interface SkillArea {
  description: string;
}

export type AverageScore = number;

/**
 * How someone has rated themselves on a scale of 0-10, juxtaposed with the average score for everyone.
 */
export interface RelativeSelfAssessment extends SelfAssessment {
  averageScore: AverageScore;
}

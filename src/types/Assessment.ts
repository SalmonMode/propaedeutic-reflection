import { Score, SkillArea, User } from "@prisma/client";

export type ScoreNums = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type AverageScore = number;

type ScoreMap = {
  [K in keyof typeof Score]: ScoreNums;
};

export const ScoreNumArray = [
  Score.ZERO,
  Score.ONE,
  Score.TWO,
  Score.THREE,
  Score.FOUR,
  Score.FIVE,
  Score.SIX,
  Score.SEVEN,
  Score.EIGHT,
  Score.NINE,
  Score.TEN,
];

export const ScoreNumMap: ScoreMap = {
  [Score.ZERO]: 0,
  [Score.ONE]: 1,
  [Score.TWO]: 2,
  [Score.THREE]: 3,
  [Score.FOUR]: 4,
  [Score.FIVE]: 5,
  [Score.SIX]: 6,
  [Score.SEVEN]: 7,
  [Score.EIGHT]: 8,
  [Score.NINE]: 9,
  [Score.TEN]: 10,
};

export interface SubmitSelfAssessment {
  score: ScoreNums;
}
export interface SubmitSelfAssessmentSummary {
  userId: User["id"];
  skillAreaId: SkillArea["id"];
  score: ScoreNums;
}
export interface SelfAssessmentSummary {
  skillAreaId: SkillArea["id"];
  score: ScoreNums;
  averageScore: number;
}
export interface SelfAssessmentSummaryMap {
  [key: SelfAssessmentSummary["skillAreaId"]]: SelfAssessmentSummary;
}
export interface SelfAssessmentLoadingMap {
  [key: SelfAssessmentSummary["skillAreaId"]]: boolean;
}
export interface SelfAssessmentErrorMap {
  [key: SelfAssessmentSummary["skillAreaId"]]: string;
}

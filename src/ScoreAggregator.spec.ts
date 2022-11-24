import * as chai from "chai";
import { NoSelfAssessmentsError } from "./Errors";
import ScoreAggregator from "./ScoreAggregator";
import { RelativeSelfAssessment, SelfAssessment, SkillArea } from "./types";

var expect = chai.expect;

describe("ScoreAggregator", function () {
  describe("averageScore", function () {
    const skillArea: SkillArea = { description: "Underwater Basket Weaving" };
    const selfAssessments: SelfAssessment[] = [
      {
        skillArea,
        score: 10,
      },
      {
        skillArea,
        score: 0,
      },
      {
        skillArea,
        score: 3,
      },
      {
        skillArea,
        score: 5,
      },
      {
        skillArea,
        score: 7,
      },
    ];
    it("should average to 5", function () {
      const aggregator = new ScoreAggregator(skillArea, ...selfAssessments);
      expect(aggregator.averageScore).to.equal(5);
    });
  });
  describe("averageScore (no assessments provided)", function () {
    const skillArea: SkillArea = { description: "Underwater Basket Weaving" };
    it("should throw NoSelfAssessmentsError", function () {
      const aggregator = new ScoreAggregator(skillArea);
      expect(() => aggregator.averageScore).to.throw(NoSelfAssessmentsError);
    });
  });
  describe("getRelativeSelfAssessment", function () {
    const skillArea: SkillArea = { description: "Underwater Basket Weaving" };
    const selfAssessments: SelfAssessment[] = [
      {
        skillArea,
        score: 10,
      },
      {
        skillArea,
        score: 0,
      },
      {
        skillArea,
        score: 3,
      },
      {
        skillArea,
        score: 5,
      },
      {
        skillArea,
        score: 7,
      },
    ];
    const testAssessment: SelfAssessment = {
      skillArea,
      score: 4,
    };
    const expectedRelSelfAssessment: RelativeSelfAssessment = {
      ...testAssessment,
      averageScore: 5,
    };
    it("should show relative score", function () {
      const aggregator = new ScoreAggregator(skillArea, ...selfAssessments);
      expect(
        aggregator.getRelativeSelfAssessment(testAssessment)
      ).to.deep.equal(expectedRelSelfAssessment);
    });
  });
  describe("getRelativeSelfAssessment (no assessments provided)", function () {
    const skillArea: SkillArea = { description: "Underwater Basket Weaving" };
    const testAssessment: SelfAssessment = {
      skillArea,
      score: 4,
    };
    it("should throw NoSelfAssessmentsError", function () {
      const aggregator = new ScoreAggregator(skillArea);
      expect(() =>
        aggregator.getRelativeSelfAssessment(testAssessment)
      ).to.throw(NoSelfAssessmentsError);
    });
  });
});

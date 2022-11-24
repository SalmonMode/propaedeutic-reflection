import * as chai from "chai";
import { NoSelfAssessmentsError } from "./Errors";
import ScoreAggregator from "./ScoreAggregator";
import { RelativeSelfAssessment, SelfAssessment } from "./types";

var expect = chai.expect;

describe("ScoreAggregator", function () {
  describe("averageScore", function () {
    const selfAssessments: SelfAssessment[] = [
      {
        score: 10,
      },
      {
        score: 0,
      },
      {
        score: 3,
      },
      {
        score: 5,
      },
      {
        score: 7,
      },
    ];
    it("should average to 5", function () {
      const aggregator = new ScoreAggregator(...selfAssessments);
      expect(aggregator.averageScore).to.equal(5);
    });
  });
  describe("averageScore (no assessments provided)", function () {
    it("should throw NoSelfAssessmentsError", function () {
      const aggregator = new ScoreAggregator();
      expect(() => aggregator.averageScore).to.throw(NoSelfAssessmentsError);
    });
  });
  describe("getRelativeSelfAssessment", function () {
    const selfAssessments: SelfAssessment[] = [
      {
        score: 10,
      },
      {
        score: 0,
      },
      {
        score: 3,
      },
      {
        score: 5,
      },
      {
        score: 7,
      },
    ];
    const testAssessment: SelfAssessment = {
      score: 4,
    };
    const expectedRelSelfAssessment: RelativeSelfAssessment = {
      ...testAssessment,
      averageScore: 5,
    };
    it("should show relative score", function () {
      const aggregator = new ScoreAggregator(...selfAssessments);
      expect(
        aggregator.getRelativeSelfAssessment(testAssessment)
      ).to.deep.equal(expectedRelSelfAssessment);
    });
  });
  describe("getRelativeSelfAssessment (no assessments provided)", function () {
    const testAssessment: SelfAssessment = {
      score: 4,
    };
    it("should throw NoSelfAssessmentsError", function () {
      const aggregator = new ScoreAggregator();
      expect(() =>
        aggregator.getRelativeSelfAssessment(testAssessment)
      ).to.throw(NoSelfAssessmentsError);
    });
  });
});

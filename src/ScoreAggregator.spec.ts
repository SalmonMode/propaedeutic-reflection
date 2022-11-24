import * as chai from "chai";
import { NoSelfAssessmentsError } from "./Errors";
import RelativeSelfAssessment from "./RelativeSelfAssessment";
import ScoreAggregator from "./ScoreAggregator";
import SelfAssessment from "./SelfAssessment";
import SkillArea from "./SkillArea";

var expect = chai.expect;

describe("ScoreAggregator", function () {
  describe("averageScore", function () {
    const skillArea = new SkillArea("Underwater Basket Weaving");
    const selfAssessments = [
      new SelfAssessment(skillArea, 10),
      new SelfAssessment(skillArea, 0),
      new SelfAssessment(skillArea, 3),
      new SelfAssessment(skillArea, 5),
      new SelfAssessment(skillArea, 7),
    ];
    it("should average to 5", function () {
      const aggregator = new ScoreAggregator(skillArea, ...selfAssessments);
      expect(aggregator.averageScore).to.equal(5);
    });
  });
  describe("averageScore (no assessments provided)", function () {
    const skillArea = new SkillArea("Underwater Basket Weaving");
    it("should throw NoSelfAssessmentsError", function () {
      const aggregator = new ScoreAggregator(skillArea);
      expect(() => aggregator.averageScore).to.throw(NoSelfAssessmentsError);
    });
  });
  describe("getRelativeSelfAssessment", function () {
    const skillArea = new SkillArea("Underwater Basket Weaving");
    const selfAssessments = [
      new SelfAssessment(skillArea, 10),
      new SelfAssessment(skillArea, 0),
      new SelfAssessment(skillArea, 3),
      new SelfAssessment(skillArea, 5),
      new SelfAssessment(skillArea, 7),
    ];
    const testAssessment = new SelfAssessment(skillArea, 4);
    const expectedRelSelfAssessment = new RelativeSelfAssessment(
      testAssessment,
      5
    );
    it("should show relative score", function () {
      const aggregator = new ScoreAggregator(skillArea, ...selfAssessments);
      expect(
        aggregator.getRelativeSelfAssessment(testAssessment)
      ).to.deep.equal(expectedRelSelfAssessment);
    });
  });
  describe("getRelativeSelfAssessment (no assessments provided)", function () {
    const skillArea = new SkillArea("Underwater Basket Weaving");
    const testAssessment = new SelfAssessment(skillArea, 4);
    it("should throw NoSelfAssessmentsError", function () {
      const aggregator = new ScoreAggregator(skillArea);
      expect(() =>
        aggregator.getRelativeSelfAssessment(testAssessment)
      ).to.throw(NoSelfAssessmentsError);
    });
  });
});

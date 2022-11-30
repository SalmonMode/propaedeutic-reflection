import * as chai from "chai";
import {
  assertIsSelfAssessmentSummary,
  assertIsSubmitSelfAssessment,
  assertIsSubmitSelfAssessmentSummary,
} from "./SelfAssessment";

var expect = chai.expect;

describe("SkillArea Type Checking", function () {
  describe("SubmitSelfAssessment", function () {
    describe("Type Assertion Function", function () {
      describe("Valid", function () {
        it("should not throw an error", function () {
          const value = {
            userId: 123,
            score: 10,
          };
          expect(assertIsSubmitSelfAssessment(value)).to.be.undefined;
        });
      });
      describe("Invalid", function () {
        describe("Invalid userId Type", function () {
          it("should throw a TypeError", function () {
            const value = {
              userId: "123",
              score: 10,
            };
            expect(() => assertIsSubmitSelfAssessment(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Invalid Score Type", function () {
          it("should throw a TypeError", function () {
            const value = {
              userId: 123,
              score: "10",
            };
            expect(() => assertIsSubmitSelfAssessment(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Invalid Score Value (float)", function () {
          it("should throw a TypeError", function () {
            const value = {
              userId: 123,
              score: 5.5,
            };
            expect(() => assertIsSubmitSelfAssessment(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Invalid Score Value (less than 0)", function () {
          it("should throw a TypeError", function () {
            const value = {
              userId: 123,
              score: -1,
            };
            expect(() => assertIsSubmitSelfAssessment(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Invalid Score Value (greater than 10)", function () {
          it("should throw a TypeError", function () {
            const value = {
              userId: 123,
              score: 11,
            };
            expect(() => assertIsSubmitSelfAssessment(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Missing userId", function () {
          it("should throw a TypeError", function () {
            const value = { score: 10 };
            expect(() => assertIsSubmitSelfAssessment(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Missing score", function () {
          it("should throw a TypeError", function () {
            const value = { userId: 12344 };
            expect(() => assertIsSubmitSelfAssessment(value)).to.throw(
              TypeError
            );
          });
        });
      });
    });
  });
  describe("SubmitSelfAssessmentSummary", function () {
    describe("Type Assertion Function", function () {
      describe("Valid", function () {
        it("should not throw an error", function () {
          const value = {
            userId: 123,
            skillAreaId: 456,
            score: 10,
          };
          expect(assertIsSubmitSelfAssessmentSummary(value)).to.be.undefined;
        });
      });
      describe("Invalid", function () {
        describe("Invalid userId Type", function () {
          it("should throw a TypeError", function () {
            const value = {
              userId: "123",
              skillAreaId: 456,
              score: 10,
            };
            expect(() => assertIsSubmitSelfAssessmentSummary(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Invalid skillAreaId Type", function () {
          it("should throw a TypeError", function () {
            const value = {
              userId: 123,
              skillAreaId: "456",
              score: 10,
            };
            expect(() => assertIsSubmitSelfAssessmentSummary(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Invalid Score Type", function () {
          it("should throw a TypeError", function () {
            const value = {
              userId: 123,
              skillAreaId: 456,
              score: "10",
            };
            expect(() => assertIsSubmitSelfAssessmentSummary(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Invalid Score Value (float)", function () {
          it("should throw a TypeError", function () {
            const value = {
              userId: 123,
              skillAreaId: 456,
              score: 5.5,
            };
            expect(() => assertIsSubmitSelfAssessmentSummary(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Invalid Score Value (less than 0)", function () {
          it("should throw a TypeError", function () {
            const value = {
              userId: 123,
              skillAreaId: 456,
              score: -1,
            };
            expect(() => assertIsSubmitSelfAssessmentSummary(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Invalid Score Value (greater than 10)", function () {
          it("should throw a TypeError", function () {
            const value = {
              userId: 123,
              skillAreaId: 456,
              score: 11,
            };
            expect(() => assertIsSubmitSelfAssessmentSummary(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Missing userId", function () {
          it("should throw a TypeError", function () {
            const value = {
              skillAreaId: 456,
              score: 10,
            };
            expect(() => assertIsSubmitSelfAssessmentSummary(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Missing skillAreaId", function () {
          it("should throw a TypeError", function () {
            const value = {
              userId: 123,
              score: 10,
            };
            expect(() => assertIsSubmitSelfAssessmentSummary(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Missing score", function () {
          it("should throw a TypeError", function () {
            const value = {
              userId: 123,
              skillAreaId: 456,
            };
            expect(() => assertIsSubmitSelfAssessmentSummary(value)).to.throw(
              TypeError
            );
          });
        });
      });
    });
  });
  describe("SelfAssessmentSummary", function () {
    describe("Type Assertion Function", function () {
      describe("Valid", function () {
        it("should not throw an error", function () {
          const value = {
            userId: 123,
            skillAreaId: 456,
            score: 10,
            averageScore: 5.5,
          };
          expect(assertIsSelfAssessmentSummary(value)).to.be.undefined;
        });
      });
      describe("Invalid", function () {
        describe("Invalid userId Type", function () {
          it("should throw a TypeError", function () {
            const value = {
              userId: "123",
              skillAreaId: 456,
              score: 10,
              averageScore: 5.5,
            };
            expect(() => assertIsSelfAssessmentSummary(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Invalid skillAreaId Type", function () {
          it("should throw a TypeError", function () {
            const value = {
              userId: 123,
              skillAreaId: "456",
              score: 10,
              averageScore: 5.5,
            };
            expect(() => assertIsSelfAssessmentSummary(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Invalid Score Type", function () {
          it("should throw a TypeError", function () {
            const value = {
              userId: 123,
              skillAreaId: 456,
              score: "10",
              averageScore: 5.5,
            };
            expect(() => assertIsSelfAssessmentSummary(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Invalid Score Value (float)", function () {
          it("should throw a TypeError", function () {
            const value = {
              userId: 123,
              skillAreaId: 456,
              score: 5.5,
              averageScore: 5.5,
            };
            expect(() => assertIsSelfAssessmentSummary(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Invalid Score Value (less than 0)", function () {
          it("should throw a TypeError", function () {
            const value = {
              userId: 123,
              skillAreaId: 456,
              score: -1,
              averageScore: 5.5,
            };
            expect(() => assertIsSelfAssessmentSummary(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Invalid Score Value (greater than 10)", function () {
          it("should throw a TypeError", function () {
            const value = {
              userId: 123,
              skillAreaId: 456,
              score: 11,
              averageScore: 5.5,
            };
            expect(() => assertIsSelfAssessmentSummary(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Invalid Average Score Type", function () {
          it("should throw a TypeError", function () {
            const value = {
              userId: 123,
              skillAreaId: 456,
              score: 10,
              averageScore: "5.5",
            };
            expect(() => assertIsSelfAssessmentSummary(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Invalid Average Score Value (less than 0)", function () {
          it("should throw a TypeError", function () {
            const value = {
              userId: 123,
              skillAreaId: 456,
              score: 10,
              averageScore: -1,
            };
            expect(() => assertIsSelfAssessmentSummary(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Invalid Average Score Value (greater than 10)", function () {
          it("should throw a TypeError", function () {
            const value = {
              userId: 123,
              skillAreaId: 456,
              score: 10,
              averageScore: 11,
            };
            expect(() => assertIsSelfAssessmentSummary(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Missing userId", function () {
          it("should throw a TypeError", function () {
            const value = {
              skillAreaId: 456,
              score: 10,
              averageScore: 5.5,
            };
            expect(() => assertIsSelfAssessmentSummary(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Missing skillAreaId", function () {
          it("should throw a TypeError", function () {
            const value = {
              userId: 123,
              score: 10,
              averageScore: 5.5,
            };
            expect(() => assertIsSelfAssessmentSummary(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Missing score", function () {
          it("should throw a TypeError", function () {
            const value = {
              userId: 123,
              skillAreaId: 456,
              averageScore: 5.5,
            };
            expect(() => assertIsSelfAssessmentSummary(value)).to.throw(
              TypeError
            );
          });
        });
        describe("Missing averageScore", function () {
          it("should throw a TypeError", function () {
            const value = {
              userId: 123,
              skillAreaId: 456,
              score: 10,
            };
            expect(() => assertIsSelfAssessmentSummary(value)).to.throw(
              TypeError
            );
          });
        });
      });
    });
  });
});

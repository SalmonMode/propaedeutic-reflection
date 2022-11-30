import { PrismaClient, User } from "@prisma/client";
import * as chai from "chai";
import ChaiAsPromised from "chai-as-promised";
import { createSkillArea, getAssessment, submitAssessment } from "..";
import { getPrismaClient } from "../../getPrismaClient";
import {
  assertIsSelfAssessmentSummary,
  assertIsSubmitSelfAssessmentSummary,
} from "../../typePredicates";
import {
  ScoreNums,
  SelfAssessmentSummary,
  SkillAreaSummary,
  SubmitSelfAssessmentSummary,
} from "../../types";

var expect = chai.expect;

chai.use(ChaiAsPromised);

const expectedCreationTitle = "Some Title";
const expectedCreationTitle2 = "Some Title2";
const expectedCreationDescription = "Some Description";
const expectedCreationDescription2 = "Some Description2";

describe("Integration", function () {
  describe("DB", function () {
    describe("Assessment", function () {
      describe("Submit", function () {
        let prisma: PrismaClient;
        let user1: User;
        let primeArea: SkillAreaSummary;
        let result: SubmitSelfAssessmentSummary;
        const expectedScore: ScoreNums = 10;
        before(async function () {
          prisma = getPrismaClient();
          primeArea = await createSkillArea(
            prisma,
            expectedCreationTitle,
            expectedCreationDescription
          );
          user1 = await prisma.user.create({
            data: {
              name: "Tom",
            },
          });
          result = await submitAssessment(
            prisma,
            user1.id,
            primeArea.id,
            expectedScore
          );
        });
        after(async function () {
          if (prisma && primeArea && primeArea.id) {
            await prisma.skillArea.delete({
              where: {
                id: primeArea.id,
              },
            });
          }
          if (prisma && user1 && user1.id) {
            await prisma.user.delete({
              where: {
                id: user1.id,
              },
            });
          }
        });
        it("should have produced SubmitSelfAssessmentSummary", async function () {
          expect(assertIsSubmitSelfAssessmentSummary(result)).to.be.undefined;
        });
      });
      describe("Get", function () {
        let prisma: PrismaClient;
        let user1: User;
        let user2: User;
        let primeArea: SkillAreaSummary;
        let secondaryArea: SkillAreaSummary;
        let result: SelfAssessmentSummary;
        const expectedScore: ScoreNums = 10;
        before(async function () {
          prisma = getPrismaClient();
          primeArea = await createSkillArea(
            prisma,
            expectedCreationTitle,
            expectedCreationDescription
          );
          secondaryArea = await createSkillArea(
            prisma,
            expectedCreationTitle2,
            expectedCreationDescription2
          );
          user1 = await prisma.user.create({
            data: {
              name: "Tom",
            },
          });
          user2 = await prisma.user.create({
            data: {
              name: "Jill",
            },
          });
          await submitAssessment(prisma, user1.id, primeArea.id, expectedScore);
          await submitAssessment(prisma, user2.id, primeArea.id, 8);
          await submitAssessment(prisma, user1.id, secondaryArea.id, 3);
          await submitAssessment(prisma, user2.id, secondaryArea.id, 2);
          result = await getAssessment(prisma, user1.id, primeArea.id);
        });
        after(async function () {
          if (prisma && primeArea && primeArea.id) {
            await prisma.skillArea.delete({
              where: {
                id: primeArea.id,
              },
            });
          }
          if (prisma && secondaryArea && secondaryArea.id) {
            await prisma.skillArea.delete({
              where: {
                id: secondaryArea.id,
              },
            });
          }
          if (prisma && user1 && user1.id) {
            await prisma.user.delete({
              where: {
                id: user1.id,
              },
            });
          }
          if (prisma && user2 && user2.id) {
            await prisma.user.delete({
              where: {
                id: user2.id,
              },
            });
          }
        });
        it("should have produced SubmitSelfAssessmentSummary", async function () {
          expect(assertIsSelfAssessmentSummary(result)).to.be.undefined;
          expect(result.averageScore).to.equal(9);
          expect(result.score).to.equal(expectedScore);
          expect(result.userId).to.equal(user1.id);
          expect(result.skillAreaId).to.equal(primeArea.id);
        });
      });
    });
  });
});

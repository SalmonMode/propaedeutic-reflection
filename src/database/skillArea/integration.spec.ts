import { PrismaClient, SkillArea } from "@prisma/client";
import * as chai from "chai";
import ChaiAsPromised from "chai-as-promised";
import { getPrismaClient } from "../../getPrismaClient";
import { assertIsSkillAreaSummary } from "../../typePredicates";
import { SkillAreaSummary } from "../../types";
import { createSkillArea } from "./createSkillArea";
import { getAllSkillAreas } from "./getAllSkillAreas";
import { getSkillArea } from "./getSkillArea";

var expect = chai.expect;

chai.use(ChaiAsPromised);

const expectedCreationTitle = "Some Title";
const expectedCreationTitle2 = "Some Title2";
const expectedCreationDescription = "Some Description";
const expectedCreationDescription2 = "Some Description2";

describe("Integration", function () {
  describe("DB", function () {
    describe("SkillArea", function () {
      describe("Create", function () {
        let prisma: PrismaClient;
        let summary: SkillAreaSummary;
        before(async function () {
          prisma = getPrismaClient();
          summary = await createSkillArea(
            prisma,
            expectedCreationTitle,
            expectedCreationDescription
          );
        });
        after(async function () {
          if (prisma && summary && summary.id) {
            await prisma.skillArea.delete({
              where: {
                id: summary.id,
              },
            });
          }
        });
        it("should have produced SkillAreaSummary", async function () {
          expect(assertIsSkillAreaSummary(summary)).to.be.undefined;
        });
      });
      describe("Get", function () {
        let prisma: PrismaClient;
        let createdSkillArea: SkillArea;
        let summary: SkillAreaSummary;
        before(async function () {
          prisma = getPrismaClient();
          createdSkillArea = await prisma.skillArea.create({
            data: {
              title: expectedCreationTitle,
              description: expectedCreationDescription,
            },
          });
          summary = await getSkillArea(prisma, createdSkillArea.id);
        });
        after(async function () {
          if (prisma && createdSkillArea && createdSkillArea.id) {
            await prisma.skillArea.delete({
              where: {
                id: createdSkillArea.id,
              },
            });
          }
        });
        it("should have produced SkillAreaSummary", async function () {
          expect(assertIsSkillAreaSummary(summary)).to.be.undefined;
          expect(summary.title).to.equal(expectedCreationTitle);
          expect(summary.description).to.equal(expectedCreationDescription);
        });
      });
      describe("Get All", function () {
        let prisma: PrismaClient;
        let createdSkillArea1: SkillArea;
        let createdSkillArea2: SkillArea;
        let summaries: SkillAreaSummary[];
        before(async function () {
          prisma = getPrismaClient();
          createdSkillArea1 = await prisma.skillArea.create({
            data: {
              title: expectedCreationTitle,
              description: expectedCreationDescription,
            },
          });
          createdSkillArea2 = await prisma.skillArea.create({
            data: {
              title: expectedCreationTitle2,
              description: expectedCreationDescription2,
            },
          });
          summaries = await getAllSkillAreas(prisma);
        });
        after(async function () {
          if (prisma && createdSkillArea1 && createdSkillArea1.id) {
            await prisma.skillArea.delete({
              where: {
                id: createdSkillArea1.id,
              },
            });
          }
          if (prisma && createdSkillArea2 && createdSkillArea2.id) {
            await prisma.skillArea.delete({
              where: {
                id: createdSkillArea2.id,
              },
            });
          }
        });
        it("should have produced SkillAreaSummary array with skillArea1", async function () {
          const sa1 = summaries.find(
            (sa) =>
              sa.title === expectedCreationTitle &&
              sa.description === expectedCreationDescription
          );
          expect(sa1).to.not.be.undefined;
        });
        it("should have produced SkillAreaSummary array with skillArea2", async function () {
          const sa2 = summaries.find(
            (sa) =>
              sa.title === expectedCreationTitle2 &&
              sa.description === expectedCreationDescription2
          );
          expect(sa2).to.not.be.undefined;
        });
      });
    });
  });
});

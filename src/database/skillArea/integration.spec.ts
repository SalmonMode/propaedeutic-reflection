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

const expectedCreationDescription = "Some Description";

describe("Integration: SkillArea", function () {
  describe("DB:", function () {
    describe("SkillArea", function () {
      describe("Create", function () {
        let prisma: PrismaClient;
        let summary: SkillAreaSummary;
        before(async function () {
          prisma = getPrismaClient();
          summary = await createSkillArea(prisma, expectedCreationDescription);
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
        });
      });
      describe("Get All", function () {
        let prisma: PrismaClient;
        let createdSkillArea: SkillArea;
        let summaries: SkillAreaSummary[];
        before(async function () {
          prisma = getPrismaClient();
          createdSkillArea = await prisma.skillArea.create({
            data: {
              description: expectedCreationDescription,
            },
          });
          summaries = await getAllSkillAreas(prisma);
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
          for (let summary of summaries) {
            expect(assertIsSkillAreaSummary(summary)).to.be.undefined;
          }
        });
      });
    });
  });
});

import * as chai from "chai";
import { hasProperty } from "./Property";
import {
  assertIsCreateNewSkillArea,
  assertIsSkillAreaSummary,
} from "./SkillArea";

var expect = chai.expect;

describe("SkillArea Type Checking", function () {
  describe("CreateNewSkillArea", function () {
    describe("Type Assertion Function", function () {
      describe("Valid", function () {
        it("should not throw an error", function () {
          const value = { description: "Some description" };
          expect(assertIsCreateNewSkillArea(value)).to.be.undefined;
        });
      });
      describe("Invalid", function () {
        it("should throw a TypeError", function () {
          const value = { description: 234 };
          expect(() => assertIsCreateNewSkillArea(value)).to.throw(TypeError);
        });
      });
    });
  });
  describe("SkillAreaSummary", function () {
    describe("Type Assertion Function", function () {
      describe("Valid", function () {
        it("should not throw an error", function () {
          const value = { id: 123, description: "Some description" };
          expect(assertIsSkillAreaSummary(value)).to.be.undefined;
        });
      });
      describe("Invalid", function () {
        describe("Missing ID", function () {
          it("should throw a TypeError", function () {
            const value = { description: "Some description" };
            expect(() => assertIsSkillAreaSummary(value)).to.throw(TypeError);
          });
        });
        describe("Missing Description", function () {
          it("should throw a TypeError", function () {
            const value = { id: 123 };
            expect(() => assertIsSkillAreaSummary(value)).to.throw(TypeError);
          });
        });
        describe("Invalid ID Type", function () {
          it("should throw a TypeError", function () {
            const value = { id: "123", description: "Some description" };
            expect(() => assertIsSkillAreaSummary(value)).to.throw(TypeError);
          });
        });
        describe("Invalid Description Type", function () {
          it("should throw a TypeError", function () {
            const value = { id: 123, description: 123 };
            expect(() => assertIsSkillAreaSummary(value)).to.throw(TypeError);
          });
        });
      });
    });
  });
});

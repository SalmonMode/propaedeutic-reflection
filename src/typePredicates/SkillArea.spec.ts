import * as chai from "chai";
import { hasProperty } from "./Property";
import { assertIsCreateNewSkillArea } from "./SkillArea";

var expect = chai.expect;

describe("CreateNewSkillArea type predicate", function () {
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

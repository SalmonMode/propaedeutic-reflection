import * as chai from "chai";
import { assertIsArray } from "./Array";

var expect = chai.expect;

describe("Array type assertion function", function () {
  describe("Valid Object", function () {
    describe("Array", function () {
      it("should not throw error", function () {
        expect(assertIsArray([])).to.be.undefined;
      });
    });
    describe("Dict", function () {
      it("should throw TypeError", function () {
        expect(() => assertIsArray({})).to.throw(TypeError);
      });
    });
  });
});

import * as chai from "chai";
import { SuccessfulJsonResponse } from "../types";
import { assertIsSuccessfulJsonResponse } from "./SuccessfulJsonResponse";

var expect = chai.expect;

describe("SuccessfulJsonResponse type assertion function", function () {
  describe("Valid", function () {
    it("should not throw an error", function () {
      const value = {
        status: SuccessfulJsonResponse.status,
      };
      expect(assertIsSuccessfulJsonResponse(value)).to.be.undefined;
    });
  });
  describe("Invalid (No Status Property)", function () {
    it("should not throw an error", function () {
      const value = {
        a: "apple",
      };
      expect(() => assertIsSuccessfulJsonResponse(value)).to.throw(TypeError);
    });
  });
  describe("Invalid (Wrong Status Type)", function () {
    it("should not throw an error", function () {
      const value = {
        status: 200,
      };
      expect(() => assertIsSuccessfulJsonResponse(value)).to.throw(TypeError);
    });
  });
  describe("Invalid (Wrong Status)", function () {
    it("should not throw an error", function () {
      const value = {
        status: "apple",
      };
      expect(() => assertIsSuccessfulJsonResponse(value)).to.throw(TypeError);
    });
  });
});

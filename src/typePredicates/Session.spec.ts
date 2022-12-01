import * as chai from "chai";
import { UnauthorizedError } from "../Errors";
import { assertIsSession, assertIsUserSession } from "./Session";

var expect = chai.expect;

describe("Session type assertion function", function () {
  describe("Valid Object", function () {
    it("should not throw an error", function () {
      expect(
        assertIsSession({
          expires: "123",
        })
      ).to.be.undefined;
    });
  });
  describe("Invalid", function () {
    it("should throw UnauthorizedError", function () {
      expect(() => assertIsSession(null)).to.throw(UnauthorizedError);
    });
  });
});
describe("UserSession type assertion function", function () {
  describe("Valid Object", function () {
    it("should not throw an error", function () {
      expect(
        assertIsUserSession({
          expires: "123",
          user: {
            id: 123,
          },
        })
      ).to.be.undefined;
    });
  });
  describe("Object Without User", function () {
    it("should throw UnauthorizedError", function () {
      expect(() =>
        assertIsUserSession({
          expires: "123",
        })
      ).to.throw(UnauthorizedError);
    });
  });
});

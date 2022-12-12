import * as chai from "chai";
import { getSecret } from "./getSecret";

var expect = chai.expect;

describe("Get Secret", function () {
  describe("Environment Variable is Set", function () {
    const expectedSecret = "Something";
    before(function () {
      process.env.SECRET = expectedSecret;
    });
    it("should return the secret", function () {
      expect(getSecret()).to.equal(expectedSecret);
    });
  });
  describe("Environment Variable is Empty", function () {
    before(function () {
      process.env.SECRET = "";
    });
    it("should throw an error", function () {
      expect(getSecret).to.throw(Error);
    });
  });
  describe("Environment Variable is Not Set", function () {
    before(function () {
      delete process.env.SECRET;
    });
    it("should throw an error", function () {
      expect(getSecret).to.throw(Error);
    });
  });
});

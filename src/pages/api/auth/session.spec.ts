import * as chai from "chai";
import { Session } from "next-auth";
import { session } from "./session";

var expect = chai.expect;

describe("Next-Auth Session Callback", function () {
  describe("Session Without User", function () {
    it("should return session unchanged", function () {
      const sessionObj: Session = {
        expires: "123",
      };
      expect(
        session({
          session: sessionObj,
          user: { id: "123", emailVerified: null },
          token: {},
        })
      ).to.deep.equal(sessionObj);
    });
  });
  describe("Session With User", function () {
    it("should return with User ID attached", function () {
      const sessionObj: Session = {
        expires: "123",
        user: {
          id: 865,
        },
      };
      const expectedSessionObj: Session = {
        expires: "123",
        user: {
          id: 123,
        },
      };
      expect(
        session({
          session: sessionObj,
          user: { id: "123", emailVerified: null },
          token: {},
        })
      ).to.deep.equal(expectedSessionObj);
    });
  });
});

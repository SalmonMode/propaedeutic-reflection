import * as chai from "chai";
import { Session } from "next-auth";
import { session } from "./sessionCallback";

var expect = chai.expect;

describe("Next-Auth Session Callback", function () {
  describe("Session", function () {
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

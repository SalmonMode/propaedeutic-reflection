import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as chai from "chai";
import { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import { HttpMethod } from "../../../types";
import { handleError } from "./handleError";

var expect = chai.expect;

function mockRequestResponse(method: HttpMethod = HttpMethod.GET) {
  const mockedReq: { req: any; res: any } = createMocks({ method });
  const { req, res }: { req: NextApiRequest; res: NextApiResponse } = mockedReq;
  return { req, res };
}

describe("handleError", function () {
  describe("Unrecognized PrismaClientKnownRequestError", function () {
    let req: NextApiRequest;
    let res: NextApiResponse;
    before(function () {
      const mockedReq = mockRequestResponse();
      req = mockedReq.req;
      res = mockedReq.res;
    });
    it("should throw the error", async function () {
      expect(() =>
        handleError(
          res,
          new PrismaClientKnownRequestError("unrecognized", {
            code: "UNKNOWN",
            clientVersion: "123",
          })
        )
      ).to.throw(PrismaClientKnownRequestError);
    });
  });
});

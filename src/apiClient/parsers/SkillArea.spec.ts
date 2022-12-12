import * as chai from "chai";
import * as Sinon from "sinon";
import { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import { ResponseProcessorParams } from "typed-http-client";
import { ResourceNotFoundError } from "../../Errors";
import { HttpMethod } from "../../types";
import { parseSkillAreaSummary, parseSkillAreaSummaryArray } from "./SkillArea";
import * as assertObjMod from "typed-http-client/dist/typePredicates/Object";

var expect = chai.expect;

function mockResponse(status: number): Response {
  return { status } as Response;
}

describe("SkillArea Response Parsers", function () {
  describe("Summary", function () {
    describe("Valid response body", function () {
      const rawResponseData = {
        title: "My Title",
        description: "My description",
        id: 123,
      };
      let response: Response;
      let processorParams: ResponseProcessorParams;
      before(function () {
        response = mockResponse(200);
        processorParams = {
          response,
          responseBodyAsString: JSON.stringify(rawResponseData),
          responseBodyAsObject: rawResponseData,
        };
      });
      it("should return the summary without issue", function () {
        expect(parseSkillAreaSummary(processorParams)).to.deep.equal(
          rawResponseData
        );
      });
    });
    describe("Null Response", function () {
      const rawResponseData = null;
      let response: Response;
      let processorParams: ResponseProcessorParams;
      before(function () {
        response = mockResponse(200);
        processorParams = {
          response,
          responseBodyAsString: JSON.stringify(rawResponseData),
          responseBodyAsObject: rawResponseData,
        };
      });
      it("should throw a TypeError", function () {
        expect(() => parseSkillAreaSummary(processorParams)).to.throw(
          TypeError
        );
      });
    });
    describe("Response Object Is Not Summary", function () {
      const rawResponseData = {
        a: "apple",
      };
      let response: Response;
      let processorParams: ResponseProcessorParams;
      before(function () {
        response = mockResponse(200);
        processorParams = {
          response,
          responseBodyAsString: JSON.stringify(rawResponseData),
          responseBodyAsObject: rawResponseData,
        };
      });
      it("should throw a TypeError", function () {
        expect(() => parseSkillAreaSummary(processorParams)).to.throw(
          TypeError
        );
      });
    });
  });
  describe("Summary Array", function () {
    describe("Valid response body", function () {
      const rawResponseData = [
        {
          title: "My Title",
          description: "My description",
          id: 123,
        },
      ];
      let response: Response;
      let processorParams: ResponseProcessorParams;
      before(function () {
        response = mockResponse(200);
        processorParams = {
          response,
          responseBodyAsString: JSON.stringify(rawResponseData),
          responseBodyAsObject: rawResponseData,
        };
      });
      it("should return the summary without issue", function () {
        expect(parseSkillAreaSummaryArray(processorParams)).to.deep.equal(
          rawResponseData
        );
      });
    });
    describe("Invalid (One Good, One Bad)", function () {
      const rawResponseData = [
        {
          title: "My Title",
          description: "My description",
          id: 123,
        },
        {
          title: "My Title",
          description: "My description",
        },
      ];
      let response: Response;
      let processorParams: ResponseProcessorParams;
      before(function () {
        response = mockResponse(200);
        processorParams = {
          response,
          responseBodyAsString: JSON.stringify(rawResponseData),
          responseBodyAsObject: rawResponseData,
        };
      });
      it("should throw TypeError", function () {
        expect(() => parseSkillAreaSummaryArray(processorParams)).to.throw(
          TypeError
        );
      });
    });
    describe("Null Response", function () {
      const rawResponseData = null;
      let response: Response;
      let processorParams: ResponseProcessorParams;
      before(function () {
        response = mockResponse(200);
        processorParams = {
          response,
          responseBodyAsString: JSON.stringify(rawResponseData),
          responseBodyAsObject: rawResponseData,
        };
      });
      it("should throw a TypeError", function () {
        expect(() => parseSkillAreaSummaryArray(processorParams)).to.throw(
          TypeError
        );
      });
    });
    describe("Response Object Is Not Array", function () {
      const rawResponseData = {
        title: "My Title",
        description: "My description",
        id: 123,
      };
      let response: Response;
      let processorParams: ResponseProcessorParams;
      before(function () {
        response = mockResponse(200);
        processorParams = {
          response,
          responseBodyAsString: JSON.stringify(rawResponseData),
          responseBodyAsObject: rawResponseData,
        };
      });
      it("should throw a TypeError", function () {
        expect(() => parseSkillAreaSummaryArray(processorParams)).to.throw(
          TypeError
        );
      });
    });
    describe("Impossible Error", function () {
      // Exists to cover the type narrowing used to make sure the compiler doesn't complain about the error object not
      // having a message property.
      const rawResponseData = {
        title: "My Title",
        description: "My description",
        id: 123,
      };
      let response: Response;
      let processorParams: ResponseProcessorParams;
      let sandbox: Sinon.SinonSandbox;
      let assertObjStub: Sinon.SinonStub;
      before(function () {
        sandbox = Sinon.createSandbox();
        assertObjStub = sandbox.stub(assertObjMod, "assertIsObject");
        assertObjStub.throws(3);
        response = mockResponse(200);
        processorParams = {
          response,
          responseBodyAsString: JSON.stringify(rawResponseData),
          responseBodyAsObject: rawResponseData,
        };
      });
      after(function () {
        sandbox.restore();
      });
      it("should throw a 3", function () {
        expect(() => parseSkillAreaSummaryArray(processorParams)).to.throw();
      });
    });
  });
});

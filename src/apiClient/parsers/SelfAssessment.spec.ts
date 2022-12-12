import * as chai from "chai";
import { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import { ResponseProcessorParams } from "typed-http-client";
import { ResourceNotFoundError } from "../../Errors";
import { HttpMethod, SuccessfulJsonResponse } from "../../types";
import {
  parseSelfAssessmentSummary,
  parseSubmitAssessmentResponse,
} from "./SelfAssessment";

var expect = chai.expect;

function mockResponse(status: number): Response {
  return { status } as Response;
}

describe("SelfAssessment Response Parsers", function () {
  describe("Summary", function () {
    describe("Valid response body", function () {
      const rawResponseData = {
        skillAreaId: 123,
        score: 5,
        averageScore: 6.5,
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
        expect(parseSelfAssessmentSummary(processorParams)).to.deep.equal(
          rawResponseData
        );
      });
    });
    describe("404", function () {
      let response: Response;
      let processorParams: ResponseProcessorParams;
      before(function () {
        response = mockResponse(404);
        processorParams = {
          response,
          responseBodyAsString: "",
          responseBodyAsObject: undefined,
        };
      });
      it("should throw a ResourceNotFoundError", function () {
        expect(() => parseSelfAssessmentSummary(processorParams)).to.throw(
          ResourceNotFoundError
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
        expect(() => parseSelfAssessmentSummary(processorParams)).to.throw(
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
        expect(() => parseSelfAssessmentSummary(processorParams)).to.throw(
          TypeError
        );
      });
    });
  });
  describe("Submit", function () {
    describe("Valid response body", function () {
      const rawResponseData = SuccessfulJsonResponse;
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
        expect(parseSubmitAssessmentResponse(processorParams)).to.be.undefined;
      });
    });
    describe("404", function () {
      let response: Response;
      let processorParams: ResponseProcessorParams;
      before(function () {
        response = mockResponse(400);
        processorParams = {
          response,
          responseBodyAsString: "unable to understand client",
          responseBodyAsObject: undefined,
        };
      });
      it("should throw an Error", function () {
        expect(() => parseSubmitAssessmentResponse(processorParams)).to.throw(
          Error
        );
      });
    });
    describe("Null Response", function () {
      const rawResponseData: null = null;
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
        expect(() => parseSubmitAssessmentResponse(processorParams)).to.throw(
          TypeError
        );
      });
    });
    describe("Response Object Is Not SuccessfulJsonResponse", function () {
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
        expect(() => parseSubmitAssessmentResponse(processorParams)).to.throw(
          TypeError
        );
      });
    });
  });
});

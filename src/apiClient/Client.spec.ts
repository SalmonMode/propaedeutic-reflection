import * as chai from "chai";
import { default as chaiAsPromised } from "chai-as-promised";
import { default as nock } from "nock";
import * as Sinon from "sinon";
import {
  SelfAssessmentSummary,
  SkillAreaSummary,
  SuccessfulJsonResponse,
} from "../types";
import * as ApiPathing from "./apiPathing";
import Client from "./Client";
import * as skillAreaParseMod from "./parsers/SkillArea";
import * as selfAssessmentParseMod from "./parsers/SelfAssessment";

chai.use(chaiAsPromised);

var expect = chai.expect;

const baseUrl = new URL("http://localhost:3000");

describe("HTTP Client", function () {
  describe("getAllSkillAreas", function () {
    describe("Success", function () {
      let expectedRawResponse: SkillAreaSummary[] = [
        {
          title: "My Title",
          description: "My Description",
          id: 123,
        },
        {
          title: "My Other Title",
          description: "My Other Description",
          id: 456,
        },
      ];
      let actualResponse: SkillAreaSummary[];
      let client: Client;
      var sandbox: Sinon.SinonSandbox;
      let parseSpy: Sinon.SinonSpy;

      before(async function () {
        sandbox = Sinon.createSandbox();
        parseSpy = sandbox.spy(skillAreaParseMod, "parseSkillAreaSummaryArray");
        client = new Client(baseUrl);
        nock(baseUrl.toString())
          .get(ApiPathing.getSkillAreaPath(baseUrl).pathname)
          .reply(200, expectedRawResponse);
        actualResponse = await client.getAllSkillAreas();
      });

      after(function () {
        nock.cleanAll();
        sandbox.restore();
      });

      it("should result in summaries", function () {
        expect(actualResponse).to.deep.equal(expectedRawResponse);
      });
      it("should have used parser", function () {
        expect(parseSpy.getCalls().length).to.equal(1);
      });
      it("should have returned expected result from parser", function () {
        const firstCall = parseSpy.getCalls()[0];
        expect(firstCall && firstCall.returnValue).to.deep.equal(
          expectedRawResponse
        );
      });
    });
  });
  describe("submitNewSkillArea", function () {
    const expectedSkillAreaId = 123;
    describe("Success", function () {
      let expectedRawResponse: SkillAreaSummary = {
        title: "My Title",
        description: "My Description",
        id: expectedSkillAreaId,
      };
      let actualResponse: SkillAreaSummary;
      let client: Client;
      var sandbox: Sinon.SinonSandbox;
      let parseSpy: Sinon.SinonSpy;

      before(async function () {
        sandbox = Sinon.createSandbox();
        parseSpy = sandbox.spy(skillAreaParseMod, "parseSkillAreaSummary");
        client = new Client(baseUrl);
        nock(baseUrl.toString())
          .post(ApiPathing.getSkillAreaPath(baseUrl).pathname)
          .reply(200, expectedRawResponse);
        actualResponse = await client.submitNewSkillArea({
          title: expectedRawResponse.title,
          description: expectedRawResponse.description,
        });
      });

      after(function () {
        nock.cleanAll();
        sandbox.restore();
      });

      it("should result in summary", function () {
        expect(actualResponse).to.deep.equal(expectedRawResponse);
      });
      it("should have used parser", function () {
        expect(parseSpy.getCalls().length).to.equal(1);
      });
      it("should have returned expected result from parser", function () {
        const firstCall = parseSpy.getCalls()[0];
        expect(firstCall && firstCall.returnValue).to.deep.equal(
          expectedRawResponse
        );
      });
    });
  });
  describe("getSelfAssessment", function () {
    const expectedSkillAreaId = 123;
    describe("Success", function () {
      let expectedRawResponse: SelfAssessmentSummary = {
        averageScore: 5.4,
        score: 5,
        skillAreaId: expectedSkillAreaId,
      };
      let actualResponse: SelfAssessmentSummary;
      let client: Client;
      var sandbox: Sinon.SinonSandbox;
      let parseSpy: Sinon.SinonSpy;

      before(async function () {
        sandbox = Sinon.createSandbox();
        parseSpy = sandbox.spy(
          selfAssessmentParseMod,
          "parseSelfAssessmentSummary"
        );
        client = new Client(baseUrl);
        nock(baseUrl.toString())
          .get(
            ApiPathing.getSelfAssessmentPath(baseUrl, expectedSkillAreaId)
              .pathname
          )
          .reply(200, expectedRawResponse);
        actualResponse = await client.getSelfAssessment(expectedSkillAreaId);
      });

      after(function () {
        nock.cleanAll();
        sandbox.restore();
      });

      it("should result in summary", function () {
        expect(actualResponse).to.deep.equal(expectedRawResponse);
      });
      it("should have used parser", function () {
        expect(parseSpy.getCalls().length).to.equal(1);
      });
      it("should have returned expected result from parser", function () {
        const firstCall = parseSpy.getCalls()[0];
        expect(firstCall && firstCall.returnValue).to.deep.equal(
          expectedRawResponse
        );
      });
    });
  });
  describe("submitAssessment", function () {
    const expectedSkillAreaId = 123;
    describe("Success", function () {
      let expectedRawResponse = SuccessfulJsonResponse;
      let actualResponse: unknown;
      let client: Client;
      var sandbox: Sinon.SinonSandbox;
      let parseSpy: Sinon.SinonSpy;

      before(async function () {
        sandbox = Sinon.createSandbox();
        parseSpy = sandbox.spy(
          selfAssessmentParseMod,
          "parseSubmitAssessmentResponse"
        );
        client = new Client(baseUrl);
        nock(baseUrl.toString())
          .post(
            ApiPathing.getSelfAssessmentPath(baseUrl, expectedSkillAreaId)
              .pathname
          )
          .reply(200, expectedRawResponse);
        actualResponse = await client.submitAssessment(expectedSkillAreaId, 5);
      });

      after(function () {
        nock.cleanAll();
        sandbox.restore();
      });

      it("should result in summary", function () {
        expect(actualResponse).to.be.undefined;
      });
      it("should have used parser", function () {
        expect(parseSpy.getCalls().length).to.equal(1);
      });
      it("should have returned expected result from parser", function () {
        const firstCall = parseSpy.getCalls()[0];
        expect(firstCall && firstCall.returnValue).to.be.undefined;
      });
    });
  });
});

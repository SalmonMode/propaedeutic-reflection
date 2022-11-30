import { Prisma, Score } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as chai from "chai";
import ChaiAsPromised from "chai-as-promised";
import { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import * as Sinon from "sinon";
import * as getMod from "../../../../database/assessment/getAssessment";
import {
  FindManyArgs,
  FindUniqueArgs,
} from "../../../../database/assessment/getAssessment";
import * as submitMod from "../../../../database/assessment/submitAssessment";
import { SubmitArgs } from "../../../../database/assessment/submitAssessment";
import * as contextMod from "../../../../getPrismaClient";
import { assertIsSubmitSelfAssessmentSummary } from "../../../../typePredicates";
import {
  HttpMethod,
  SelfAssessmentSummary,
  SuccessfulJsonResponse,
} from "../../../../types";
import { assessmentHandler } from "./assessmentHandler";
import * as handleGetMod from "./handleGetAssessment";
import * as handleSubmitMod from "./handleSubmitAssessment";

var expect = chai.expect;

chai.use(ChaiAsPromised);

const expectedSkillAreaId = 123;

function mockRequestResponse(method: HttpMethod = HttpMethod.GET) {
  const mockedReq: { req: any; res: any } = createMocks({ method });
  const { req, res }: { req: NextApiRequest; res: NextApiResponse } = mockedReq;
  req.headers = {
    "Content-Type": "application/json",
  };
  req.query = { id: `${expectedSkillAreaId}` };
  return { req, res };
}

type SelfAssessmentFind = Sinon.SinonStubbedInstance<
  Pick<Prisma.SelfAssessmentDelegate<any>, "findUniqueOrThrow" | "findMany">
>;
type SelfAssessmentCreate = Sinon.SinonStubbedInstance<
  Pick<Prisma.SelfAssessmentDelegate<any>, "create">
>;

type ReturnOfCreate<T extends Prisma.SelfAssessmentCreateArgs> = ReturnType<
  (f: Prisma.SelfAssessmentDelegate<any>["create"]) => ReturnType<typeof f<T>>
>;
type ParamsOfCreate<T extends Prisma.SelfAssessmentCreateArgs> = Parameters<
  (f: Prisma.SelfAssessmentDelegate<any>["create"]) => ReturnType<typeof f<T>>
>;
type ReturnOfFindUnique<T extends Prisma.SelfAssessmentFindUniqueOrThrowArgs> =
  ReturnType<
    (
      f: Prisma.SelfAssessmentDelegate<any>["findUniqueOrThrow"]
    ) => ReturnType<typeof f<T>>
  >;
type ParamsOfFindUnique<T extends Prisma.SelfAssessmentFindUniqueOrThrowArgs> =
  Parameters<
    (
      f: Prisma.SelfAssessmentDelegate<any>["findUniqueOrThrow"]
    ) => ReturnType<typeof f<T>>
  >;
type ReturnOfFindMany<T extends Prisma.SelfAssessmentFindManyArgs> = ReturnType<
  (f: Prisma.SelfAssessmentDelegate<any>["findMany"]) => ReturnType<typeof f<T>>
>;
type ParamsOfFindMany<T extends Prisma.SelfAssessmentFindManyArgs> = Parameters<
  (f: Prisma.SelfAssessmentDelegate<any>["findMany"]) => ReturnType<typeof f<T>>
>;

interface PrismaClientSelfAssessmentFindUnique {
  selfAssessment: SelfAssessmentFind;
}

interface PrismaClientSelfAssessmentCreate {
  selfAssessment: SelfAssessmentCreate;
}

const expectedUserId = 456;

describe("/api/skillArea/[id]/assessment", function () {
  describe("GET", function () {
    describe("Valid", function () {
      let sandbox: Sinon.SinonSandbox;
      let client: PrismaClientSelfAssessmentFindUnique;
      let findUniqueStub: Sinon.SinonStubbedMember<any>;
      let findManyStub: Sinon.SinonStubbedMember<any>;
      let getPrismaStub: Sinon.SinonStub;
      let handlerSpy: Sinon.SinonSpy;
      let getSpy: Sinon.SinonSpy;
      let req: NextApiRequest;
      let res: NextApiResponse;
      let resJsonStub: Sinon.SinonStub;
      const expectedAssessmentSummary: SelfAssessmentSummary = {
        averageScore: 9,
        score: 10,
        skillAreaId: expectedSkillAreaId,
        userId: expectedUserId,
      };
      before(async function () {
        sandbox = Sinon.createSandbox();
        findManyStub = sandbox
          .stub<
            ParamsOfFindMany<FindManyArgs>,
            ReturnOfFindMany<FindManyArgs>
          >()
          .resolves([{ score: Score.TEN }, { score: Score.EIGHT }]);
        findUniqueStub = sandbox
          .stub<
            ParamsOfFindUnique<FindUniqueArgs>,
            ReturnOfFindUnique<FindUniqueArgs>
          >()
          .resolves({
            score: Score.TEN,
          });
        client = {
          selfAssessment: {
            findUniqueOrThrow: findUniqueStub,
            findMany: findManyStub,
          },
        };

        getPrismaStub = sandbox.stub(contextMod, "getPrismaClient");
        getPrismaStub.returns(client);
        handlerSpy = sandbox.spy(handleGetMod, "handleGetAssessment");
        getSpy = sandbox.spy(getMod, "getAssessment");
        const mockedReq = mockRequestResponse();
        req = mockedReq.req;
        req.query.userId = `${expectedUserId}`;
        res = mockedReq.res;
        resJsonStub = sandbox.stub(res, "json");
        await assessmentHandler(req, res);
      });
      after(async function () {
        sandbox.restore();
      });
      it("should have gotten the stubbed prisma client", async function () {
        expect(getPrismaStub.getCalls().length).to.equal(1);
      });
      it("should have called handleGetAssessment once", async function () {
        expect(handlerSpy.getCalls().length).to.equal(1);
      });
      it("should have passed request to handleGetAssessment", async function () {
        expect(handlerSpy.getCalls()[0].args[0]).to.deep.equal(req);
      });
      it("should have passed response to handleGetAssessment", async function () {
        expect(handlerSpy.getCalls()[0].args[1]).to.deep.equal(res);
      });
      it("should have called getAssessment once", async function () {
        expect(getSpy.getCalls().length).to.equal(1);
      });
      it("should have passed prisma to getAssessment", async function () {
        expect(getSpy.getCalls()[0].args[0]).to.equal(client);
      });
      it("should have passed userId to getAssessment", async function () {
        expect(getSpy.getCalls()[0].args[1]).to.equal(expectedUserId);
      });
      it("should have passed skillAreaId to getAssessment", async function () {
        expect(getSpy.getCalls()[0].args[2]).to.equal(expectedSkillAreaId);
      });
      it("have set response JSON to summary", async function () {
        expect(resJsonStub.getCalls()[0].args[0]).to.deep.equal(
          expectedAssessmentSummary
        );
      });
    });
    describe("No Assessment Found", function () {
      let sandbox: Sinon.SinonSandbox;
      let client: PrismaClientSelfAssessmentFindUnique;
      let findUniqueStub: Sinon.SinonStubbedMember<any>;
      let findManyStub: Sinon.SinonStubbedMember<any>;
      let getPrismaStub: Sinon.SinonStub;
      let handlerSpy: Sinon.SinonSpy;
      let getSpy: Sinon.SinonSpy;
      let req: NextApiRequest;
      let res: NextApiResponse;
      let resJsonStub: Sinon.SinonStub;
      let resStatusStub: Sinon.SinonStub;
      before(async function () {
        sandbox = Sinon.createSandbox();
        findManyStub = sandbox
          .stub<
            ParamsOfFindMany<FindManyArgs>,
            ReturnOfFindMany<FindManyArgs>
          >()
          .resolves([{ score: Score.TEN }, { score: Score.EIGHT }]);
        findUniqueStub = sandbox.stub().throws(
          new PrismaClientKnownRequestError("Cannot find assessment", {
            code: "P2025",
            clientVersion: "123",
          })
        );
        client = {
          selfAssessment: {
            findUniqueOrThrow: findUniqueStub,
            findMany: findManyStub,
          },
        };

        getPrismaStub = sandbox.stub(contextMod, "getPrismaClient");
        getPrismaStub.returns(client);
        handlerSpy = sandbox.spy(handleGetMod, "handleGetAssessment");
        getSpy = sandbox.spy(getMod, "getAssessment");
        const mockedReq = mockRequestResponse();
        req = mockedReq.req;
        req.query.userId = `${expectedUserId}`;
        res = mockedReq.res;
        resJsonStub = sandbox.stub(res, "json");
        resStatusStub = sandbox.stub(res, "status");
        await assessmentHandler(req, res);
      });
      after(async function () {
        sandbox.restore();
      });
      it("should have gotten the stubbed prisma client", async function () {
        expect(getPrismaStub.getCalls().length).to.equal(1);
      });
      it("should have called handleGetAssessment once", async function () {
        expect(handlerSpy.getCalls().length).to.equal(1);
      });
      it("should have passed request to handleGetAssessment", async function () {
        expect(handlerSpy.getCalls()[0].args[0]).to.deep.equal(req);
      });
      it("should have passed response to handleGetAssessment", async function () {
        expect(handlerSpy.getCalls()[0].args[1]).to.deep.equal(res);
      });
      it("should have called getAssessment once", async function () {
        expect(getSpy.getCalls().length).to.equal(1);
      });
      it("should have passed prisma to getAssessment", async function () {
        expect(getSpy.getCalls()[0].args[0]).to.equal(client);
      });
      it("should have passed userId to getAssessment", async function () {
        expect(getSpy.getCalls()[0].args[1]).to.equal(expectedUserId);
      });
      it("should have passed skillAreaId to getAssessment", async function () {
        expect(getSpy.getCalls()[0].args[2]).to.equal(expectedSkillAreaId);
      });
      it("have set response JSON to error", async function () {
        expect(resJsonStub.getCalls()[0].args[0]).to.deep.equal({
          error: `Cannot find assessment`,
        });
      });
      it("have set response Status Code to 404", async function () {
        expect(resStatusStub.getCalls()[0].args[0]).to.equal(404);
      });
    });
    describe("Undefined Method (invalid HTTP Method)", function () {
      let sandbox: Sinon.SinonSandbox;
      let client: PrismaClientSelfAssessmentFindUnique;
      let getPrismaStub: Sinon.SinonStub;
      let req: NextApiRequest;
      let res: NextApiResponse;
      let resJsonStub: Sinon.SinonStub;
      let resStatusStub: Sinon.SinonStub;
      before(async function () {
        sandbox = Sinon.createSandbox();
        getPrismaStub = sandbox.stub(contextMod, "getPrismaClient");
        getPrismaStub.returns(client);
        const mockedReq = mockRequestResponse();
        req = mockedReq.req;
        req.method = undefined;
        res = mockedReq.res;
        resJsonStub = sandbox.stub(res, "json");
        resStatusStub = sandbox.stub(res, "status");
        await assessmentHandler(req, res);
      });
      after(async function () {
        sandbox.restore();
      });
      it("have set response JSON to error", async function () {
        expect(resJsonStub.getCalls()[0].args[0]).to.deep.equal({
          error: "Method undefined Not Allowed",
        });
      });
      it("have set response Status Code to 405", async function () {
        expect(resStatusStub.getCalls()[0].args[0]).to.equal(405);
      });
    });
    describe("WEIRD (invalid HTTP Method)", function () {
      let sandbox: Sinon.SinonSandbox;
      let client: PrismaClientSelfAssessmentFindUnique;
      let getPrismaStub: Sinon.SinonStub;
      let req: NextApiRequest;
      let res: NextApiResponse;
      let resJsonStub: Sinon.SinonStub;
      let resStatusStub: Sinon.SinonStub;
      before(async function () {
        sandbox = Sinon.createSandbox();
        getPrismaStub = sandbox.stub(contextMod, "getPrismaClient");
        getPrismaStub.returns(client);
        const mockedReq = mockRequestResponse();
        req = mockedReq.req;
        req.method = "WEIRD";
        res = mockedReq.res;
        resJsonStub = sandbox.stub(res, "json");
        resStatusStub = sandbox.stub(res, "status");
        await assessmentHandler(req, res);
      });
      after(async function () {
        sandbox.restore();
      });
      it("have set response JSON to error", async function () {
        expect(resJsonStub.getCalls()[0].args[0]).to.deep.equal({
          error: "Method WEIRD Not Allowed",
        });
      });
      it("have set response Status Code to 405", async function () {
        expect(resStatusStub.getCalls()[0].args[0]).to.equal(405);
      });
    });
    describe("Empty User ID (invalid ID length)", function () {
      let sandbox: Sinon.SinonSandbox;
      let client: PrismaClientSelfAssessmentFindUnique;
      let getPrismaStub: Sinon.SinonStub;
      let req: NextApiRequest;
      let res: NextApiResponse;
      let resJsonStub: Sinon.SinonStub;
      let resStatusStub: Sinon.SinonStub;
      before(async function () {
        sandbox = Sinon.createSandbox();
        getPrismaStub = sandbox.stub(contextMod, "getPrismaClient");
        getPrismaStub.returns(client);
        const mockedReq = mockRequestResponse();
        req = mockedReq.req;
        req.query.userId = "";
        res = mockedReq.res;
        resJsonStub = sandbox.stub(res, "json");
        resStatusStub = sandbox.stub(res, "status");
        await assessmentHandler(req, res);
      });
      after(async function () {
        sandbox.restore();
      });
      it("have set response JSON to error", async function () {
        expect(resJsonStub.getCalls()[0].args[0]).to.deep.equal({
          error: "Unrecognized User ID format: ",
        });
      });
      it("have set response Status Code to 400", async function () {
        expect(resStatusStub.getCalls()[0].args[0]).to.equal(400);
      });
    });
    describe("Invalid User ID Number (Infinity))", function () {
      let sandbox: Sinon.SinonSandbox;
      let client: PrismaClientSelfAssessmentFindUnique;
      let getPrismaStub: Sinon.SinonStub;
      let req: NextApiRequest;
      let res: NextApiResponse;
      let resJsonStub: Sinon.SinonStub;
      let resStatusStub: Sinon.SinonStub;
      before(async function () {
        sandbox = Sinon.createSandbox();
        getPrismaStub = sandbox.stub(contextMod, "getPrismaClient");
        getPrismaStub.returns(client);
        const mockedReq = mockRequestResponse();
        req = mockedReq.req;
        req.query.userId = "Infinity";
        res = mockedReq.res;
        resJsonStub = sandbox.stub(res, "json");
        resStatusStub = sandbox.stub(res, "status");
        await assessmentHandler(req, res);
      });
      after(async function () {
        sandbox.restore();
      });
      it("have set response JSON to error", async function () {
        expect(resJsonStub.getCalls()[0].args[0]).to.deep.equal({
          error: "Unrecognized User ID format: Infinity",
        });
      });
      it("have set response Status Code to 400", async function () {
        expect(resStatusStub.getCalls()[0].args[0]).to.equal(400);
      });
    });
  });
  describe("POST", function () {
    describe("Valid", function () {
      let sandbox: Sinon.SinonSandbox;
      let client: PrismaClientSelfAssessmentCreate;
      let createStub: Sinon.SinonStub<any>;
      let getPrismaStub: Sinon.SinonStub;
      let handlerSpy: Sinon.SinonSpy;
      let submitSpy: Sinon.SinonSpy;
      let req: NextApiRequest;
      let res: NextApiResponse;
      let resJsonStub: Sinon.SinonStub;
      before(async function () {
        sandbox = Sinon.createSandbox();
        createStub = sandbox
          .stub<ParamsOfCreate<SubmitArgs>, ReturnOfCreate<SubmitArgs>>()
          .resolves({
            userId: expectedUserId,
            skillAreaId: expectedSkillAreaId,
            score: Score.TEN,
          });
        client = {
          selfAssessment: {
            create: createStub,
          },
        };

        getPrismaStub = sandbox.stub(contextMod, "getPrismaClient");
        getPrismaStub.returns(client);
        handlerSpy = sandbox.spy(handleSubmitMod, "handleSubmitAssessment");
        submitSpy = sandbox.spy(submitMod, "submitAssessment");
        const mockedReq = mockRequestResponse(HttpMethod.POST);
        req = mockedReq.req;
        req.headers = {
          "Content-Type": "application/json",
        };
        req.body = {
          userId: expectedUserId,
          score: 10,
        };
        res = mockedReq.res;
        resJsonStub = sandbox.stub(res, "json");
        await assessmentHandler(req, res);
      });
      after(async function () {
        sandbox.restore();
      });
      it("should have gotten the stubbed prisma client", async function () {
        expect(getPrismaStub.getCalls().length).to.equal(1);
      });
      it("should have called handleSubmitAssessment once", async function () {
        expect(handlerSpy.getCalls().length).to.equal(1);
      });
      it("should have passed request to handleSubmitAssessment", async function () {
        expect(handlerSpy.getCalls()[0].args[0]).to.deep.equal(req);
      });
      it("should have passed response to handleSubmitAssessment", async function () {
        expect(handlerSpy.getCalls()[0].args[1]).to.deep.equal(res);
      });
      it("should have called submitAssessment once", async function () {
        expect(submitSpy.getCalls().length).to.equal(1);
      });
      it("should have passed prisma to submitAssessment", async function () {
        expect(submitSpy.getCalls()[0].args[0]).to.equal(client);
      });
      it("should have passed userId to submitAssessment", async function () {
        expect(submitSpy.getCalls()[0].args[1]).to.equal(expectedUserId);
      });
      it("should have passed skillAreaId to submitAssessment", async function () {
        expect(submitSpy.getCalls()[0].args[2]).to.equal(expectedSkillAreaId);
      });
      it("should have passed score to submitAssessment", async function () {
        expect(submitSpy.getCalls()[0].args[3]).to.equal(10);
      });
      it("have set returned summary from submitAssessment", async function () {
        expect(
          assertIsSubmitSelfAssessmentSummary(
            await submitSpy.getCalls()[0].returnValue
          )
        ).to.be.undefined;
      });
      it("have set response JSON to success", async function () {
        expect(resJsonStub.getCalls()[0].args[0]).to.deep.equal(
          SuccessfulJsonResponse
        );
      });
    });
    describe("Invalid (Missing User ID)", function () {
      let sandbox: Sinon.SinonSandbox;
      let client: PrismaClientSelfAssessmentCreate;
      let createStub: Sinon.SinonStubbedMember<any>;
      let getPrismaStub: Sinon.SinonStub;
      let handlerSpy: Sinon.SinonSpy;
      let submitSpy: Sinon.SinonSpy;
      let req: NextApiRequest;
      let res: NextApiResponse;
      let resJsonStub: Sinon.SinonStub;
      let resStatusStub: Sinon.SinonStub;
      before(async function () {
        sandbox = Sinon.createSandbox();

        createStub = sandbox
          .stub<ParamsOfCreate<SubmitArgs>, ReturnOfCreate<SubmitArgs>>()
          .resolves({
            userId: expectedUserId,
            skillAreaId: expectedSkillAreaId,
            score: Score.TEN,
          });
        client = {
          selfAssessment: {
            create: createStub,
          },
        };

        getPrismaStub = sandbox.stub(contextMod, "getPrismaClient");
        getPrismaStub.returns(client);
        handlerSpy = sandbox.spy(handleSubmitMod, "handleSubmitAssessment");
        submitSpy = sandbox.spy(submitMod, "submitAssessment");
        const mockedReq = mockRequestResponse(HttpMethod.POST);
        req = mockedReq.req;
        req.headers = {
          "Content-Type": "application/json",
        };
        req.body = {
          score: 10,
        };
        res = mockedReq.res;
        resJsonStub = sandbox.stub(res, "json");
        resStatusStub = sandbox.stub(res, "status");
        await assessmentHandler(req, res);
      });
      after(async function () {
        sandbox.restore();
      });
      it("have set response JSON to error", async function () {
        expect(resJsonStub.getCalls()[0].args[0]).to.deep.equal({
          error: `Value is not SubmitSelfAssessment`,
        });
      });
      it("have set response Status Code to 400", async function () {
        expect(resStatusStub.getCalls()[0].args[0]).to.equal(400);
      });
    });
    describe("Invalid (User ID Wrong Type)", function () {
      let sandbox: Sinon.SinonSandbox;
      let client: PrismaClientSelfAssessmentCreate;
      let createStub: Sinon.SinonStubbedMember<any>;
      let getPrismaStub: Sinon.SinonStub;
      let handlerSpy: Sinon.SinonSpy;
      let submitSpy: Sinon.SinonSpy;
      let req: NextApiRequest;
      let res: NextApiResponse;
      let resJsonStub: Sinon.SinonStub;
      let resStatusStub: Sinon.SinonStub;
      before(async function () {
        sandbox = Sinon.createSandbox();
        createStub = sandbox
          .stub<ParamsOfCreate<SubmitArgs>, ReturnOfCreate<SubmitArgs>>()
          .resolves({
            userId: expectedUserId,
            skillAreaId: expectedSkillAreaId,
            score: Score.TEN,
          });
        client = {
          selfAssessment: {
            create: createStub,
          },
        };

        getPrismaStub = sandbox.stub(contextMod, "getPrismaClient");
        getPrismaStub.returns(client);
        handlerSpy = sandbox.spy(handleSubmitMod, "handleSubmitAssessment");
        submitSpy = sandbox.spy(submitMod, "submitAssessment");
        const mockedReq = mockRequestResponse(HttpMethod.POST);
        req = mockedReq.req;
        req.headers = {
          "Content-Type": "application/json",
        };
        req.body = {
          userId: true,
          score: 10,
        };
        res = mockedReq.res;
        resJsonStub = sandbox.stub(res, "json");
        resStatusStub = sandbox.stub(res, "status");
        await assessmentHandler(req, res);
      });
      after(async function () {
        sandbox.restore();
      });
      it("have set response JSON to error", async function () {
        expect(resJsonStub.getCalls()[0].args[0]).to.deep.equal({
          error: `Value is not SubmitSelfAssessment`,
        });
      });
      it("have set response Status Code to 400", async function () {
        expect(resStatusStub.getCalls()[0].args[0]).to.equal(400);
      });
    });
    describe("Invalid (Missing Score)", function () {
      let sandbox: Sinon.SinonSandbox;
      let client: PrismaClientSelfAssessmentCreate;
      let createStub: Sinon.SinonStubbedMember<any>;
      let getPrismaStub: Sinon.SinonStub;
      let handlerSpy: Sinon.SinonSpy;
      let submitSpy: Sinon.SinonSpy;
      let req: NextApiRequest;
      let res: NextApiResponse;
      let resJsonStub: Sinon.SinonStub;
      let resStatusStub: Sinon.SinonStub;
      before(async function () {
        sandbox = Sinon.createSandbox();
        createStub = sandbox
          .stub<ParamsOfCreate<SubmitArgs>, ReturnOfCreate<SubmitArgs>>()
          .resolves({
            userId: expectedUserId,
            skillAreaId: expectedSkillAreaId,
            score: Score.TEN,
          });
        client = {
          selfAssessment: {
            create: createStub,
          },
        };

        getPrismaStub = sandbox.stub(contextMod, "getPrismaClient");
        getPrismaStub.returns(client);
        handlerSpy = sandbox.spy(handleSubmitMod, "handleSubmitAssessment");
        submitSpy = sandbox.spy(submitMod, "submitAssessment");
        const mockedReq = mockRequestResponse(HttpMethod.POST);
        req = mockedReq.req;
        req.headers = {
          "Content-Type": "application/json",
        };
        req.body = {
          userId: expectedUserId,
        };
        res = mockedReq.res;
        resJsonStub = sandbox.stub(res, "json");
        resStatusStub = sandbox.stub(res, "status");
        await assessmentHandler(req, res);
      });
      after(async function () {
        sandbox.restore();
      });
      it("have set response JSON to error", async function () {
        expect(resJsonStub.getCalls()[0].args[0]).to.deep.equal({
          error: `Value is not SubmitSelfAssessment`,
        });
      });
      it("have set response Status Code to 400", async function () {
        expect(resStatusStub.getCalls()[0].args[0]).to.equal(400);
      });
    });
    describe("Invalid (Score Wrong Type)", function () {
      let sandbox: Sinon.SinonSandbox;
      let client: PrismaClientSelfAssessmentCreate;
      let createStub: Sinon.SinonStubbedMember<any>;
      let getPrismaStub: Sinon.SinonStub;
      let handlerSpy: Sinon.SinonSpy;
      let submitSpy: Sinon.SinonSpy;
      let req: NextApiRequest;
      let res: NextApiResponse;
      let resJsonStub: Sinon.SinonStub;
      let resStatusStub: Sinon.SinonStub;
      before(async function () {
        sandbox = Sinon.createSandbox();
        createStub = sandbox
          .stub<ParamsOfCreate<SubmitArgs>, ReturnOfCreate<SubmitArgs>>()
          .resolves({
            userId: expectedUserId,
            skillAreaId: expectedSkillAreaId,
            score: Score.TEN,
          });
        client = {
          selfAssessment: {
            create: createStub,
          },
        };

        getPrismaStub = sandbox.stub(contextMod, "getPrismaClient");
        getPrismaStub.returns(client);
        handlerSpy = sandbox.spy(handleSubmitMod, "handleSubmitAssessment");
        submitSpy = sandbox.spy(submitMod, "submitAssessment");
        const mockedReq = mockRequestResponse(HttpMethod.POST);
        req = mockedReq.req;
        req.headers = {
          "Content-Type": "application/json",
        };
        req.body = {
          userId: expectedUserId,
          score: "10",
        };
        res = mockedReq.res;
        resJsonStub = sandbox.stub(res, "json");
        resStatusStub = sandbox.stub(res, "status");
        await assessmentHandler(req, res);
      });
      after(async function () {
        sandbox.restore();
      });
      it("have set response JSON to error", async function () {
        expect(resJsonStub.getCalls()[0].args[0]).to.deep.equal({
          error: `Value is not SubmitSelfAssessment`,
        });
      });
      it("have set response Status Code to 400", async function () {
        expect(resStatusStub.getCalls()[0].args[0]).to.equal(400);
      });
    });
  });
});

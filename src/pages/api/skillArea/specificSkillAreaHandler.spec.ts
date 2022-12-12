import { Prisma, SkillArea } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as chai from "chai";
import ChaiAsPromised from "chai-as-promised";
import { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import * as Sinon from "sinon";
import * as getSkillMod from "../../../database/skillArea/getSkillArea";
import * as contextMod from "../../../getPrismaClient";
import { HttpMethod, SkillAreaSummary } from "../../../types";
import * as handleGetMod from "./handleGetSkillArea";
import { specificSkillAreaHandler } from "./specificSkillAreaHandler";

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

type SkillAreaFindUnique = Pick<
  Prisma.SkillAreaDelegate<undefined>,
  "findUniqueOrThrow"
>;
interface PrismaClientSkillAreaFindUnique {
  skillArea: SkillAreaFindUnique;
}

describe("/api/skillArea/[id]", function () {
  describe("GET", function () {
    describe("Valid", function () {
      let sandbox: Sinon.SinonSandbox;
      let client: PrismaClientSkillAreaFindUnique;
      let findUniqueStub: Sinon.SinonStub;
      let getPrismaStub: Sinon.SinonStub;
      let handlerSpy: Sinon.SinonSpy;
      let getSpy: Sinon.SinonSpy;
      let req: NextApiRequest;
      let res: NextApiResponse;
      let resJsonStub: Sinon.SinonStub;
      const skillArea: SkillArea = {
        createdAt: new Date(),
        title: "Title",
        description: "Some",
        id: expectedSkillAreaId,
        updatedAt: new Date(),
      };
      const expectedCreatedSkillAreaSummary: SkillAreaSummary = {
        title: skillArea.title,
        description: skillArea.description,
        id: skillArea.id,
      };
      before(async function () {
        sandbox = Sinon.createSandbox();
        findUniqueStub = sandbox.stub().returns(skillArea);
        client = {
          skillArea: {
            findUniqueOrThrow: findUniqueStub,
          },
        };

        getPrismaStub = sandbox.stub(contextMod, "getPrismaClient");
        getPrismaStub.returns(client);
        handlerSpy = sandbox.spy(handleGetMod, "handleGetSkillArea");
        getSpy = sandbox.spy(getSkillMod, "getSkillArea");
        const mockedReq = mockRequestResponse();
        req = mockedReq.req;
        res = mockedReq.res;
        resJsonStub = sandbox.stub(res, "json");
        await specificSkillAreaHandler(req, res);
      });
      after(async function () {
        sandbox.restore();
      });
      it("should have gotten the stubbed prisma client", async function () {
        expect(getPrismaStub.getCalls().length).to.equal(1);
      });
      it("should have called handleGetSkillArea once", async function () {
        expect(handlerSpy.getCalls().length).to.equal(1);
      });
      it("should have passed response to handleGetSkillArea", async function () {
        const firstCall = handlerSpy.getCalls()[0];
        expect(firstCall && firstCall.args[0]).to.deep.equal(res);
      });
      it("should have passed skillAreaId to handleGetSkillArea", async function () {
        const firstCall = handlerSpy.getCalls()[0];
        expect(firstCall && firstCall.args[1]).to.equal(expectedSkillAreaId);
      });
      it("should have called getSkillArea once", async function () {
        expect(getSpy.getCalls().length).to.equal(1);
      });
      it("should have passed skillAreaId to getSkillArea", async function () {
        const firstCall = getSpy.getCalls()[0];
        expect(firstCall && firstCall.args[1]).to.equal(expectedSkillAreaId);
      });
      it("should have passed prisma to getSkillArea", async function () {
        const firstCall = getSpy.getCalls()[0];
        expect(firstCall && firstCall.args[0]).to.equal(client);
      });
      it("have set response JSON to summary", async function () {
        const firstCall = resJsonStub.getCalls()[0];
        expect(firstCall && firstCall.args[0]).to.deep.equal(
          expectedCreatedSkillAreaSummary
        );
      });
    });
    describe("No Skill Area Found", function () {
      let sandbox: Sinon.SinonSandbox;
      let client: PrismaClientSkillAreaFindUnique;
      let findUniqueStub: Sinon.SinonStub;
      let getPrismaStub: Sinon.SinonStub;
      let handlerSpy: Sinon.SinonSpy;
      let getSpy: Sinon.SinonSpy;
      let req: NextApiRequest;
      let res: NextApiResponse;
      let resJsonStub: Sinon.SinonStub;
      let resStatusStub: Sinon.SinonStub;
      before(async function () {
        sandbox = Sinon.createSandbox();
        findUniqueStub = sandbox.stub().throws(
          new PrismaClientKnownRequestError("Cannot find skill Area", {
            code: "P2025",
            clientVersion: "123",
          })
        );
        client = {
          skillArea: {
            findUniqueOrThrow: findUniqueStub,
          },
        };

        getPrismaStub = sandbox.stub(contextMod, "getPrismaClient");
        getPrismaStub.returns(client);
        handlerSpy = sandbox.spy(handleGetMod, "handleGetSkillArea");
        getSpy = sandbox.spy(getSkillMod, "getSkillArea");
        const mockedReq = mockRequestResponse();
        req = mockedReq.req;
        res = mockedReq.res;
        resJsonStub = sandbox.stub(res, "json");
        resStatusStub = sandbox.stub(res, "status");
        await specificSkillAreaHandler(req, res);
      });
      after(async function () {
        sandbox.restore();
      });
      it("should have gotten the stubbed prisma client", async function () {
        expect(getPrismaStub.getCalls().length).to.equal(1);
      });
      it("should have called handleGetSkillArea once", async function () {
        expect(handlerSpy.getCalls().length).to.equal(1);
      });
      it("should have passed response to handleGetSkillArea", async function () {
        const firstCall = handlerSpy.getCalls()[0];
        expect(firstCall && firstCall.args[0]).to.deep.equal(res);
      });
      it("should have passed skillAreaId to handleGetSkillArea", async function () {
        const firstCall = handlerSpy.getCalls()[0];
        expect(firstCall && firstCall.args[1]).to.equal(expectedSkillAreaId);
      });
      it("should have called getSkillArea once", async function () {
        expect(getSpy.getCalls().length).to.equal(1);
      });
      it("should have passed skillAreaId to getSkillArea", async function () {
        const firstCall = getSpy.getCalls()[0];
        expect(firstCall && firstCall.args[1]).to.equal(expectedSkillAreaId);
      });
      it("should have passed prisma to getSkillArea", async function () {
        const firstCall = getSpy.getCalls()[0];
        expect(firstCall && firstCall.args[0]).to.equal(client);
      });
      it("have set response JSON to error", async function () {
        const firstCall = resJsonStub.getCalls()[0];
        expect(firstCall && firstCall.args[0]).to.deep.equal({
          error: `Cannot find skill Area`,
        });
      });
      it("have set response Status Code to 404", async function () {
        const firstCall = resStatusStub.getCalls()[0];
        expect(firstCall && firstCall.args[0]).to.equal(404);
      });
    });
    describe("Unhandled Error", function () {
      let sandbox: Sinon.SinonSandbox;
      let getPrismaStub: Sinon.SinonStub;
      let req: NextApiRequest;
      let res: NextApiResponse;
      before(async function () {
        sandbox = Sinon.createSandbox();
        getPrismaStub = sandbox.stub(contextMod, "getPrismaClient");
        getPrismaStub.throws(new Error());
        const mockedReq = mockRequestResponse();
        req = mockedReq.req;
        res = mockedReq.res;
      });
      after(async function () {
        sandbox.restore();
      });
      it("throw an Error", async function () {
        await expect(
          specificSkillAreaHandler(req, res)
        ).to.eventually.be.rejectedWith(Error);
      });
    });
    describe("Undefined Method (invalid HTTP Method)", function () {
      let sandbox: Sinon.SinonSandbox;
      let client: PrismaClientSkillAreaFindUnique;
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
        await specificSkillAreaHandler(req, res);
      });
      after(async function () {
        sandbox.restore();
      });
      it("have set response JSON to error", async function () {
        const firstCall = resJsonStub.getCalls()[0];
        expect(firstCall && firstCall.args[0]).to.deep.equal({
          error: "Method undefined Not Allowed",
        });
      });
      it("have set response Status Code to 405", async function () {
        const firstCall = resStatusStub.getCalls()[0];
        expect(firstCall && firstCall.args[0]).to.equal(405);
      });
    });
    describe("WEIRD (invalid HTTP Method)", function () {
      let sandbox: Sinon.SinonSandbox;
      let client: PrismaClientSkillAreaFindUnique;
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
        await specificSkillAreaHandler(req, res);
      });
      after(async function () {
        sandbox.restore();
      });
      it("have set response JSON to error", async function () {
        const firstCall = resJsonStub.getCalls()[0];
        expect(firstCall && firstCall.args[0]).to.deep.equal({
          error: "Method WEIRD Not Allowed",
        });
      });
      it("have set response Status Code to 405", async function () {
        const firstCall = resStatusStub.getCalls()[0];
        expect(firstCall && firstCall.args[0]).to.equal(405);
      });
    });
    describe("Empty ID (invalid ID length)", function () {
      let sandbox: Sinon.SinonSandbox;
      let client: PrismaClientSkillAreaFindUnique;
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
        req.query.id = "";
        res = mockedReq.res;
        resJsonStub = sandbox.stub(res, "json");
        resStatusStub = sandbox.stub(res, "status");
        await specificSkillAreaHandler(req, res);
      });
      after(async function () {
        sandbox.restore();
      });
      it("have set response JSON to error", async function () {
        const firstCall = resJsonStub.getCalls()[0];
        expect(firstCall && firstCall.args[0]).to.deep.equal({
          error: "Unrecognized Skill Area ID format: ",
        });
      });
      it("have set response Status Code to 400", async function () {
        const firstCall = resStatusStub.getCalls()[0];
        expect(firstCall && firstCall.args[0]).to.equal(400);
      });
    });
    describe("Invalid ID Number (Infinity))", function () {
      let sandbox: Sinon.SinonSandbox;
      let client: PrismaClientSkillAreaFindUnique;
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
        req.query.id = "Infinity";
        res = mockedReq.res;
        resJsonStub = sandbox.stub(res, "json");
        resStatusStub = sandbox.stub(res, "status");
        await specificSkillAreaHandler(req, res);
      });
      after(async function () {
        sandbox.restore();
      });
      it("have set response JSON to error", async function () {
        const firstCall = resJsonStub.getCalls()[0];
        expect(firstCall && firstCall.args[0]).to.deep.equal({
          error: "Unrecognized Skill Area ID format: Infinity",
        });
      });
      it("have set response Status Code to 400", async function () {
        const firstCall = resStatusStub.getCalls()[0];
        expect(firstCall && firstCall.args[0]).to.equal(400);
      });
    });
  });
});

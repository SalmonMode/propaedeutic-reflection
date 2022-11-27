import { Prisma, SkillArea } from "@prisma/client";
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import * as Sinon from "sinon";
import * as contextMod from "../../../getPrismaClient";
import { HttpMethod, SkillAreaSummary } from "../../../types";
import * as getSkillMod from "./getSkillArea";
import * as handleGetMod from "./handleGetSkillArea";
import { specificSkillAreaHandler } from "./specificSkillAreaHandler";

var expect = chai.expect;

chai.use(chaiAsPromised);

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
  "findUnique"
>;
interface PrismaClientSkillAreaFindUnique {
  skillArea: SkillAreaFindUnique;
}

describe("/api/skillArea/[id]", function () {
  describe("GET (valid)", function () {
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
      description: "Some",
      id: expectedSkillAreaId,
      updatedAt: new Date(),
    };
    const expectedCreatedSkillAreaSummary: SkillAreaSummary = {
      description: skillArea.description,
      id: skillArea.id,
    };
    before(async function () {
      sandbox = Sinon.createSandbox();
      findUniqueStub = sandbox.stub().returns(skillArea);
      client = {
        skillArea: {
          findUnique: findUniqueStub,
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
      expect(handlerSpy.getCalls()[0].args[0]).to.deep.equal(res);
    });
    it("should have passed skillAreaId to handleGetSkillArea", async function () {
      expect(handlerSpy.getCalls()[0].args[1]).to.equal(expectedSkillAreaId);
    });
    it("should have called getSkillArea once", async function () {
      expect(getSpy.getCalls().length).to.equal(1);
    });
    it("should have passed skillAreaId to getSkillArea", async function () {
      expect(getSpy.getCalls()[0].args[1]).to.equal(expectedSkillAreaId);
    });
    it("should have passed prisma to getSkillArea", async function () {
      expect(getSpy.getCalls()[0].args[0]).to.equal(client);
    });
    it("have set response JSON to summary", async function () {
      expect(resJsonStub.getCalls()[0].args[0]).to.deep.equal(
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
      findUniqueStub = sandbox.stub().returns(null);
      client = {
        skillArea: {
          findUnique: findUniqueStub,
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
      expect(handlerSpy.getCalls()[0].args[0]).to.deep.equal(res);
    });
    it("should have passed skillAreaId to handleGetSkillArea", async function () {
      expect(handlerSpy.getCalls()[0].args[1]).to.equal(expectedSkillAreaId);
    });
    it("should have called getSkillArea once", async function () {
      expect(getSpy.getCalls().length).to.equal(1);
    });
    it("should have passed skillAreaId to getSkillArea", async function () {
      expect(getSpy.getCalls()[0].args[1]).to.equal(expectedSkillAreaId);
    });
    it("should have passed prisma to getSkillArea", async function () {
      expect(getSpy.getCalls()[0].args[0]).to.equal(client);
    });
    it("have set response JSON to error", async function () {
      expect(resJsonStub.getCalls()[0].args[0]).to.deep.equal({
        error: `Unable to find skill area with id: ${expectedSkillAreaId}`,
      });
    });
    it("have set response Status Code to 404", async function () {
      expect(resStatusStub.getCalls()[0].args[0]).to.equal(404);
    });
  });
  describe("Undefined Method (invalid HTTP Method)", function () {
    let sandbox: Sinon.SinonSandbox;
    let client: PrismaClientSkillAreaFindUnique;
    let getPrismaStub: Sinon.SinonStub;
    let req: NextApiRequest;
    let res: NextApiResponse;
    before(async function () {
      sandbox = Sinon.createSandbox();
      getPrismaStub = sandbox.stub(contextMod, "getPrismaClient");
      getPrismaStub.returns(client);
      const mockedReq = mockRequestResponse();
      req = mockedReq.req;
      req.method = undefined;
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
      expect(resJsonStub.getCalls()[0].args[0]).to.deep.equal({
        error: "Method WEIRD Not Allowed",
      });
    });
    it("have set response Status Code to 405", async function () {
      expect(resStatusStub.getCalls()[0].args[0]).to.equal(405);
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
      expect(resJsonStub.getCalls()[0].args[0]).to.deep.equal({
        error: "Unrecognized skill area id format: ",
      });
    });
    it("have set response Status Code to 400", async function () {
      expect(resStatusStub.getCalls()[0].args[0]).to.equal(400);
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
      expect(resJsonStub.getCalls()[0].args[0]).to.deep.equal({
        error: "Unrecognized skill area id format: Infinity",
      });
    });
    it("have set response Status Code to 400", async function () {
      expect(resStatusStub.getCalls()[0].args[0]).to.equal(400);
    });
  });
});

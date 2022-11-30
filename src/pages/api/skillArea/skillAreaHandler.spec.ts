import { Prisma, SkillArea } from "@prisma/client";
import * as chai from "chai";
import ChaiAsPromised from "chai-as-promised";
import { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import * as Sinon from "sinon";
import * as createSkillMod from "../../../database/skillArea/createSkillArea";
import * as getSkillMod from "../../../database/skillArea/getAllSkillAreas";
import * as contextMod from "../../../getPrismaClient";
import { HttpMethod, SkillAreaSummary } from "../../../types";
import * as handleCreateMod from "./handleCreateSkillArea";
import * as handleGetMod from "./handleGetAllSkillAreas";
import { skillAreaHandler } from "./skillAreaHandler";

var expect = chai.expect;

chai.use(ChaiAsPromised);

const expectedCreationTitle = "Some Title";
const expectedCreationDescription = "Some Description";

function mockRequestResponse(method: HttpMethod = HttpMethod.GET) {
  const mockedReq: { req: any; res: any } = createMocks({ method });
  const { req, res }: { req: NextApiRequest; res: NextApiResponse } = mockedReq;
  return { req, res };
}

type SkillAreaFindMany = Pick<Prisma.SkillAreaDelegate<undefined>, "findMany">;
interface PrismaClientSkillAreaFindMany {
  skillArea: SkillAreaFindMany;
}
type SkillAreaCreate = Pick<Prisma.SkillAreaDelegate<undefined>, "create">;
interface PrismaClientSkillAreaCreate {
  skillArea: SkillAreaCreate;
}

describe("/api/skillArea", function () {
  describe("GET", function () {
    describe("Valid", function () {
      let sandbox: Sinon.SinonSandbox;
      let client: PrismaClientSkillAreaFindMany;
      let findManyStub: Sinon.SinonStub;
      let getPrismaStub: Sinon.SinonStub;
      let handlerSpy: Sinon.SinonSpy;
      let getSpy: Sinon.SinonSpy;
      let req: NextApiRequest;
      let res: NextApiResponse;
      let resJsonStub: Sinon.SinonStub;
      const skillArea1: SkillArea = {
        createdAt: new Date(),
        title: expectedCreationTitle,
        description: expectedCreationDescription,
        id: 123,
        updatedAt: new Date(),
      };
      const skillArea2: SkillArea = {
        createdAt: new Date(),
        title: expectedCreationTitle,
        description: expectedCreationDescription,
        id: 456,
        updatedAt: new Date(),
      };
      const expectedSkillAreaSummaries: SkillAreaSummary[] = [
        {
          title: skillArea1.title,
          description: skillArea1.description,
          id: skillArea1.id,
        },
        {
          title: skillArea2.title,
          description: skillArea2.description,
          id: skillArea2.id,
        },
      ];
      before(async function () {
        sandbox = Sinon.createSandbox();
        findManyStub = sandbox.stub().returns([skillArea1, skillArea2]);
        client = {
          skillArea: {
            findMany: findManyStub,
          },
        };

        getPrismaStub = sandbox.stub(contextMod, "getPrismaClient");
        getPrismaStub.returns(client);
        handlerSpy = sandbox.spy(handleGetMod, "handleGetAllSkillAreas");
        getSpy = sandbox.spy(getSkillMod, "getAllSkillAreas");
        const mockedReq = mockRequestResponse();
        req = mockedReq.req;
        res = mockedReq.res;
        resJsonStub = sandbox.stub(res, "json");
        await skillAreaHandler(req, res);
      });
      after(async function () {
        sandbox.restore();
      });
      it("should have gotten the stubbed prisma client", async function () {
        expect(getPrismaStub.getCalls().length).to.equal(1);
      });
      it("should have called handleGetAllSkillAreas once", async function () {
        expect(handlerSpy.getCalls().length).to.equal(1);
      });
      it("should have passed response to handleGetAllSkillAreas", async function () {
        expect(handlerSpy.getCalls()[0].args[0]).to.deep.equal(res);
      });
      it("should have called getAllSkillAreas once", async function () {
        expect(getSpy.getCalls().length).to.equal(1);
      });
      it("should have passed prisma to getAllSkillAreas", async function () {
        expect(getSpy.getCalls()[0].args[0]).to.equal(client);
      });
      it("have set response JSON to summary", async function () {
        expect(resJsonStub.getCalls()[0].args[0]).to.deep.equal(
          expectedSkillAreaSummaries
        );
      });
    });
    describe("No Skill Areas Found", function () {
      let sandbox: Sinon.SinonSandbox;
      let client: PrismaClientSkillAreaFindMany;
      let findManyStub: Sinon.SinonStub;
      let getPrismaStub: Sinon.SinonStub;
      let handlerSpy: Sinon.SinonSpy;
      let getSpy: Sinon.SinonSpy;
      let req: NextApiRequest;
      let res: NextApiResponse;
      let resJsonStub: Sinon.SinonStub;
      let resStatusStub: Sinon.SinonStub;
      before(async function () {
        sandbox = Sinon.createSandbox();
        findManyStub = sandbox.stub().returns([]);
        client = {
          skillArea: {
            findMany: findManyStub,
          },
        };

        getPrismaStub = sandbox.stub(contextMod, "getPrismaClient");
        getPrismaStub.returns(client);
        handlerSpy = sandbox.spy(handleGetMod, "handleGetAllSkillAreas");
        getSpy = sandbox.spy(getSkillMod, "getAllSkillAreas");
        const mockedReq = mockRequestResponse();
        req = mockedReq.req;
        res = mockedReq.res;
        resJsonStub = sandbox.stub(res, "json");
        resStatusStub = sandbox.stub(res, "status");
        await skillAreaHandler(req, res);
      });
      after(async function () {
        sandbox.restore();
      });
      it("should have gotten the stubbed prisma client", async function () {
        expect(getPrismaStub.getCalls().length).to.equal(1);
      });
      it("should have called handleGetAllSkillAreas once", async function () {
        expect(handlerSpy.getCalls().length).to.equal(1);
      });
      it("should have passed response to handleGetAllSkillAreas", async function () {
        expect(handlerSpy.getCalls()[0].args[0]).to.deep.equal(res);
      });
      it("should have called getAllSkillAreas once", async function () {
        expect(getSpy.getCalls().length).to.equal(1);
      });
      it("should have passed prisma to getAllSkillAreas", async function () {
        expect(getSpy.getCalls()[0].args[0]).to.equal(client);
      });
      it("have set response JSON to error", async function () {
        expect(resJsonStub.getCalls()[0].args[0]).to.deep.equal([]);
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
        await expect(skillAreaHandler(req, res)).to.eventually.be.rejectedWith(
          Error
        );
      });
    });
    describe("Undefined Method (invalid HTTP Method)", function () {
      let sandbox: Sinon.SinonSandbox;
      let client: PrismaClientSkillAreaFindMany;
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
        await skillAreaHandler(req, res);
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
      let client: PrismaClientSkillAreaFindMany;
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
        await skillAreaHandler(req, res);
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
  });
  describe("POST", function () {
    describe("Valid", function () {
      let sandbox: Sinon.SinonSandbox;
      let client: PrismaClientSkillAreaCreate;
      let createStub: Sinon.SinonStub;
      let getPrismaStub: Sinon.SinonStub;
      let handlerSpy: Sinon.SinonSpy;
      let createSpy: Sinon.SinonSpy;
      let req: NextApiRequest;
      let res: NextApiResponse;
      let resJsonStub: Sinon.SinonStub;
      const skillArea: SkillArea = {
        createdAt: new Date(),
        title: expectedCreationTitle,
        description: expectedCreationDescription,
        id: 123,
        updatedAt: new Date(),
      };
      const expectedSkillAreaSummary: SkillAreaSummary = {
        title: skillArea.title,
        description: skillArea.description,
        id: skillArea.id,
      };
      before(async function () {
        sandbox = Sinon.createSandbox();
        createStub = sandbox.stub().returns(skillArea);
        client = {
          skillArea: {
            create: createStub,
          },
        };

        getPrismaStub = sandbox.stub(contextMod, "getPrismaClient");
        getPrismaStub.returns(client);
        handlerSpy = sandbox.spy(handleCreateMod, "handleCreateSkillArea");
        createSpy = sandbox.spy(createSkillMod, "createSkillArea");
        const mockedReq = mockRequestResponse(HttpMethod.POST);
        req = mockedReq.req;
        req.headers = {
          "Content-Type": "application/json",
        };
        req.body = {
          title: skillArea.title,
          description: skillArea.description,
        };
        res = mockedReq.res;
        resJsonStub = sandbox.stub(res, "json");
        await skillAreaHandler(req, res);
      });
      after(async function () {
        sandbox.restore();
      });
      it("should have gotten the stubbed prisma client", async function () {
        expect(getPrismaStub.getCalls().length).to.equal(1);
      });
      it("should have called handleCreateSkillArea once", async function () {
        expect(handlerSpy.getCalls().length).to.equal(1);
      });
      it("should have passed request to handleCreateSkillArea", async function () {
        expect(handlerSpy.getCalls()[0].args[0]).to.deep.equal(req);
      });
      it("should have passed response to handleCreateSkillArea", async function () {
        expect(handlerSpy.getCalls()[0].args[1]).to.deep.equal(res);
      });
      it("should have called createSkillArea once", async function () {
        expect(createSpy.getCalls().length).to.equal(1);
      });
      it("should have passed prisma to createSkillArea", async function () {
        expect(createSpy.getCalls()[0].args[0]).to.equal(client);
      });
      it("should have passed title to createSkillArea", async function () {
        expect(createSpy.getCalls()[0].args[1]).to.equal(expectedCreationTitle);
      });
      it("should have passed description to createSkillArea", async function () {
        expect(createSpy.getCalls()[0].args[2]).to.equal(
          expectedCreationDescription
        );
      });
      it("have set response JSON to summary", async function () {
        expect(resJsonStub.getCalls()[0].args[0]).to.deep.equal(
          expectedSkillAreaSummary
        );
      });
    });
    describe("Invalid (Empty Description)", function () {
      let sandbox: Sinon.SinonSandbox;
      let client: PrismaClientSkillAreaCreate;
      let createStub: Sinon.SinonStub;
      let getPrismaStub: Sinon.SinonStub;
      let handlerSpy: Sinon.SinonSpy;
      let createSpy: Sinon.SinonSpy;
      let req: NextApiRequest;
      let res: NextApiResponse;
      let resJsonStub: Sinon.SinonStub;
      let resStatusStub: Sinon.SinonStub;
      const skillArea: SkillArea = {
        createdAt: new Date(),
        title: expectedCreationTitle,
        description: "",
        id: 123,
        updatedAt: new Date(),
      };
      before(async function () {
        sandbox = Sinon.createSandbox();
        createStub = sandbox.stub().returns(skillArea);
        client = {
          skillArea: {
            create: createStub,
          },
        };

        getPrismaStub = sandbox.stub(contextMod, "getPrismaClient");
        getPrismaStub.returns(client);
        handlerSpy = sandbox.spy(handleCreateMod, "handleCreateSkillArea");
        createSpy = sandbox.spy(createSkillMod, "createSkillArea");
        const mockedReq = mockRequestResponse(HttpMethod.POST);
        req = mockedReq.req;
        req.headers = {
          "Content-Type": "application/json",
        };
        req.body = {
          title: skillArea.title,
          description: skillArea.description,
        };
        res = mockedReq.res;
        resJsonStub = sandbox.stub(res, "json");
        resStatusStub = sandbox.stub(res, "status");
        await skillAreaHandler(req, res);
      });
      after(async function () {
        sandbox.restore();
      });
      it("have set response JSON to error", async function () {
        expect(resJsonStub.getCalls()[0].args[0]).to.deep.equal({
          error: `Unrecognized skill area description format: `,
        });
      });
      it("have set response Status Code to 400", async function () {
        expect(resStatusStub.getCalls()[0].args[0]).to.equal(400);
      });
    });
    describe("Invalid (Description Wrong Type)", function () {
      let sandbox: Sinon.SinonSandbox;
      let client: PrismaClientSkillAreaCreate;
      let createStub: Sinon.SinonStub;
      let getPrismaStub: Sinon.SinonStub;
      let handlerSpy: Sinon.SinonSpy;
      let createSpy: Sinon.SinonSpy;
      let req: NextApiRequest;
      let res: NextApiResponse;
      let resJsonStub: Sinon.SinonStub;
      let resStatusStub: Sinon.SinonStub;
      const skillArea = {
        createdAt: new Date(),
        title: expectedCreationTitle,
        description: 123,
        id: 123,
        updatedAt: new Date(),
      };
      before(async function () {
        sandbox = Sinon.createSandbox();
        createStub = sandbox.stub().returns(skillArea);
        client = {
          skillArea: {
            create: createStub,
          },
        };

        getPrismaStub = sandbox.stub(contextMod, "getPrismaClient");
        getPrismaStub.returns(client);
        handlerSpy = sandbox.spy(handleCreateMod, "handleCreateSkillArea");
        createSpy = sandbox.spy(createSkillMod, "createSkillArea");
        const mockedReq = mockRequestResponse(HttpMethod.POST);
        req = mockedReq.req;
        req.headers = {
          "Content-Type": "application/json",
        };
        req.body = {
          title: skillArea.title,
          description: skillArea.description,
        };
        res = mockedReq.res;
        resJsonStub = sandbox.stub(res, "json");
        resStatusStub = sandbox.stub(res, "status");
        await skillAreaHandler(req, res);
      });
      after(async function () {
        sandbox.restore();
      });
      it("have set response JSON to error", async function () {
        expect(resJsonStub.getCalls()[0].args[0]).to.deep.equal({
          error: `Value is not CreateNewSkillArea`,
        });
      });
      it("have set response Status Code to 400", async function () {
        expect(resStatusStub.getCalls()[0].args[0]).to.equal(400);
      });
    });
    describe("Invalid (Empty Title)", function () {
      let sandbox: Sinon.SinonSandbox;
      let client: PrismaClientSkillAreaCreate;
      let createStub: Sinon.SinonStub;
      let getPrismaStub: Sinon.SinonStub;
      let handlerSpy: Sinon.SinonSpy;
      let createSpy: Sinon.SinonSpy;
      let req: NextApiRequest;
      let res: NextApiResponse;
      let resJsonStub: Sinon.SinonStub;
      let resStatusStub: Sinon.SinonStub;
      const skillArea: SkillArea = {
        createdAt: new Date(),
        title: "",
        description: expectedCreationDescription,
        id: 123,
        updatedAt: new Date(),
      };
      before(async function () {
        sandbox = Sinon.createSandbox();
        createStub = sandbox.stub().returns(skillArea);
        client = {
          skillArea: {
            create: createStub,
          },
        };

        getPrismaStub = sandbox.stub(contextMod, "getPrismaClient");
        getPrismaStub.returns(client);
        handlerSpy = sandbox.spy(handleCreateMod, "handleCreateSkillArea");
        createSpy = sandbox.spy(createSkillMod, "createSkillArea");
        const mockedReq = mockRequestResponse(HttpMethod.POST);
        req = mockedReq.req;
        req.headers = {
          "Content-Type": "application/json",
        };
        req.body = {
          title: skillArea.title,
          description: skillArea.description,
        };
        res = mockedReq.res;
        resJsonStub = sandbox.stub(res, "json");
        resStatusStub = sandbox.stub(res, "status");
        await skillAreaHandler(req, res);
      });
      after(async function () {
        sandbox.restore();
      });
      it("have set response JSON to error", async function () {
        expect(resJsonStub.getCalls()[0].args[0]).to.deep.equal({
          error: `Unrecognized skill area title format: `,
        });
      });
      it("have set response Status Code to 400", async function () {
        expect(resStatusStub.getCalls()[0].args[0]).to.equal(400);
      });
    });
    describe("Invalid (Title Wrong Type)", function () {
      let sandbox: Sinon.SinonSandbox;
      let client: PrismaClientSkillAreaCreate;
      let createStub: Sinon.SinonStub;
      let getPrismaStub: Sinon.SinonStub;
      let handlerSpy: Sinon.SinonSpy;
      let createSpy: Sinon.SinonSpy;
      let req: NextApiRequest;
      let res: NextApiResponse;
      let resJsonStub: Sinon.SinonStub;
      let resStatusStub: Sinon.SinonStub;
      const skillArea = {
        createdAt: new Date(),
        title: 1223,
        description: expectedCreationDescription,
        id: 123,
        updatedAt: new Date(),
      };
      before(async function () {
        sandbox = Sinon.createSandbox();
        createStub = sandbox.stub().returns(skillArea);
        client = {
          skillArea: {
            create: createStub,
          },
        };

        getPrismaStub = sandbox.stub(contextMod, "getPrismaClient");
        getPrismaStub.returns(client);
        handlerSpy = sandbox.spy(handleCreateMod, "handleCreateSkillArea");
        createSpy = sandbox.spy(createSkillMod, "createSkillArea");
        const mockedReq = mockRequestResponse(HttpMethod.POST);
        req = mockedReq.req;
        req.headers = {
          "Content-Type": "application/json",
        };
        req.body = {
          title: skillArea.title,
          description: skillArea.description,
        };
        res = mockedReq.res;
        resJsonStub = sandbox.stub(res, "json");
        resStatusStub = sandbox.stub(res, "status");
        await skillAreaHandler(req, res);
      });
      after(async function () {
        sandbox.restore();
      });
      it("have set response JSON to error", async function () {
        expect(resJsonStub.getCalls()[0].args[0]).to.deep.equal({
          error: `Value is not CreateNewSkillArea`,
        });
      });
      it("have set response Status Code to 400", async function () {
        expect(resStatusStub.getCalls()[0].args[0]).to.equal(400);
      });
    });
  });
});

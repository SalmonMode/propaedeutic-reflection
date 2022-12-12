import { fireEvent, screen } from "@testing-library/react";
import * as chai from "chai";
import { default as chaiAsPromised } from "chai-as-promised";
import { default as nock } from "nock";
import * as Sinon from "sinon";
import { assertIsObject } from "typed-http-client";
import * as ApiPathing from "../apiClient/apiPathing";
import * as parserMod from "../apiClient/parsers/SkillArea";
import { AppState, AppStore, makeStore } from "../app/store";
import { SkillAreaSummary } from "../types";
import { renderWithProviderAndSessionProvider } from "../utility";
import LandingPage from "./Landing";

chai.use(chaiAsPromised);

var expect = chai.expect;

const baseUrl = new URL("http://localhost:3000");

describe("React Integration: Landing Page", function () {
  describe("Success", function () {
    before(function () {
      nock(baseUrl.toString())
        .get(ApiPathing.getSkillAreaPath(baseUrl).pathname)
        .reply(200, []);
      renderWithProviderAndSessionProvider(<LandingPage />, {
        session: {
          expires: "123",
          user: {
            id: 123,
          },
        },
      });
    });
    after(function () {
      nock.cleanAll();
    });
    it("should show list", async function () {
      const listComponent = screen.getByTestId(`assessmentList`);
      const node = listComponent.querySelector(
        "[data-testid='assessmentListLoading']"
      );
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.textContent).to.equal("Loading...");
      await screen.findByText(/No Skill Areas have been submitted yet/i);
      expect(screen.getByTestId("assessmentListItems")).to.not.be.null;
    });
  });
  describe("Unauthenticated", function () {
    before(function () {
      nock(baseUrl.toString())
        .get(ApiPathing.getSkillAreaPath(baseUrl).pathname)
        .reply(200, []);
      renderWithProviderAndSessionProvider(<LandingPage />);
    });
    after(function () {
      nock.cleanAll();
    });
    it("should show sign in", async function () {
      const link = screen.getByText(/Sign In/i);
      expect(link.tagName).to.equal("A");
    });
  });
  describe("Submit With Full Form", function () {
    let form: HTMLElement;
    let store: AppStore;
    const expectedSkillAreaId = 123;
    const expectedSkillAreaTitle = "Some Title";
    const expectedSkillAreaDescription = "Some Description";
    const skillAreaSummary: SkillAreaSummary = {
      id: expectedSkillAreaId,
      title: expectedSkillAreaTitle,
      description: expectedSkillAreaDescription,
    };
    beforeEach(async function () {
      const preloadedState: AppState = {
        submitSkillAreas: {
          loading: false,
        },
        assessments: {
          loading: {},
          assessments: {},
          error: {},
        },
        skillAreas: {
          loading: false,
          skillAreas: {},
        },
      };
      nock(baseUrl.toString())
        .get(ApiPathing.getSkillAreaPath(baseUrl).pathname)
        .reply(200, []);
      nock(baseUrl.toString())
        .post(ApiPathing.getSkillAreaPath(baseUrl).pathname)
        .reply(200, skillAreaSummary);
      nock(baseUrl.toString())
        .get(ApiPathing.getSkillAreaPath(baseUrl).pathname)
        .reply(200, [skillAreaSummary]);
      nock(baseUrl.toString())
        .get(
          ApiPathing.getSelfAssessmentPath(baseUrl, expectedSkillAreaId)
            .pathname
        )
        .reply(404);
      store = makeStore();

      renderWithProviderAndSessionProvider(<LandingPage />, {
        preloadedState,
        session: {
          expires: "123",
          user: {
            id: 123,
          },
        },
        store,
      });
      form = screen.getByTestId(`newSkillAreaFormCard`);
      const titleInput = form.querySelector<HTMLInputElement>(
        "input#newSkillArea-titleInput"
      );
      assertIsObject(titleInput);
      fireEvent.change(titleInput, {
        target: { value: expectedSkillAreaTitle },
      });
      const descriptionInput = form.querySelector<HTMLInputElement>(
        "input#newSkillArea-descriptionInput"
      );
      assertIsObject(descriptionInput);
      fireEvent.change(descriptionInput, {
        target: { value: expectedSkillAreaDescription },
      });
      const button = form.querySelector<HTMLButtonElement>("button");
      assertIsObject(button);
      await fireEvent.click(button);
      await screen.findByText(/Score/i);
    });
    afterEach(function () {
      nock.cleanAll();
    });

    it("should show header", function () {
      const node = form.querySelector("h3");
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.textContent).to.equal("Submit A New Skill Area");
    });
    it("should show blank title input", function () {
      const input = form.querySelector<HTMLInputElement>(
        "input#newSkillArea-titleInput"
      );
      expect(input).to.not.be.null;
      assertIsObject(input);
      expect(input.value).to.equal("");
    });
    it("should show blank description input", function () {
      const input = form.querySelector<HTMLInputElement>(
        "input#newSkillArea-descriptionInput"
      );
      expect(input).to.not.be.null;
      assertIsObject(input);
      expect(input.value).to.equal("");
    });
    it("should have new skill area in redux store", function () {
      expect(store.getState().skillAreas.skillAreas).to.deep.equal({
        [expectedSkillAreaId]: skillAreaSummary,
      });
    });
  });
  describe("Submit With Full Form (Rejected)", function () {
    let form: HTMLElement;
    let store: AppStore;
    const expectedSkillAreaId = 123;
    const expectedSkillAreaTitle = "Some Title";
    const expectedSkillAreaDescription = "Some Description";
    const skillAreaSummary: SkillAreaSummary = {
      id: expectedSkillAreaId,
      title: expectedSkillAreaTitle,
      description: expectedSkillAreaDescription,
    };
    beforeEach(async function () {
      const preloadedState: AppState = {
        submitSkillAreas: {
          loading: false,
        },
        assessments: {
          loading: {},
          assessments: {},
          error: {},
        },
        skillAreas: {
          loading: false,
          skillAreas: {},
        },
      };
      nock(baseUrl.toString())
        .get(ApiPathing.getSkillAreaPath(baseUrl).pathname)
        .reply(200, []);
      nock(baseUrl.toString())
        .post(ApiPathing.getSkillAreaPath(baseUrl).pathname)
        .reply(400, { error: "Some error" });
      store = makeStore();

      renderWithProviderAndSessionProvider(<LandingPage />, {
        preloadedState,
        session: {
          expires: "123",
          user: {
            id: 123,
          },
        },
        store,
      });
      form = screen.getByTestId(`newSkillAreaFormCard`);
      const titleInput = form.querySelector<HTMLInputElement>(
        "input#newSkillArea-titleInput"
      );
      assertIsObject(titleInput);
      fireEvent.change(titleInput, {
        target: { value: expectedSkillAreaTitle },
      });
      const descriptionInput = form.querySelector<HTMLInputElement>(
        "input#newSkillArea-descriptionInput"
      );
      assertIsObject(descriptionInput);
      fireEvent.change(descriptionInput, {
        target: { value: expectedSkillAreaDescription },
      });
      const button = form.querySelector<HTMLButtonElement>("button");
      assertIsObject(button);
      await fireEvent.click(button);
      await screen.findByText(/Hang On/i);
      await screen.findByText(/Submit New Skill Area/i);
    });
    afterEach(function () {
      nock.cleanAll();
    });

    it("should show header", function () {
      const node = form.querySelector("h3");
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.textContent).to.equal("Submit A New Skill Area");
    });
    it("should show blank title input", function () {
      const input = form.querySelector<HTMLInputElement>(
        "input#newSkillArea-titleInput"
      );
      expect(input).to.not.be.null;
      assertIsObject(input);
      expect(input.value).to.equal("");
    });
    it("should show blank description input", function () {
      const input = form.querySelector<HTMLInputElement>(
        "input#newSkillArea-descriptionInput"
      );
      expect(input).to.not.be.null;
      assertIsObject(input);
      expect(input.value).to.equal("");
    });
    it("should have new skill area in redux store", function () {
      expect(store.getState().submitSkillAreas.error).to.equal(
        "Value is not SkillAreaSummary"
      );
    });
  });
  describe("Submit With Full Form (Unhandled Error)", function () {
    let form: HTMLElement;
    let store: AppStore;
    let sandbox: Sinon.SinonSandbox;
    const expectedSkillAreaId = 123;
    const expectedSkillAreaTitle = "Some Title";
    const expectedSkillAreaDescription = "Some Description";
    const skillAreaSummary: SkillAreaSummary = {
      id: expectedSkillAreaId,
      title: expectedSkillAreaTitle,
      description: expectedSkillAreaDescription,
    };
    beforeEach(async function () {
      sandbox = Sinon.createSandbox();
      sandbox.stub(parserMod, "parseSkillAreaSummary").throws(Error);
      const preloadedState: AppState = {
        submitSkillAreas: {
          loading: false,
        },
        assessments: {
          loading: {},
          assessments: {},
          error: {},
        },
        skillAreas: {
          loading: false,
          skillAreas: {},
        },
      };

      nock(baseUrl.toString())
        .get(ApiPathing.getSkillAreaPath(baseUrl).pathname)
        .reply(200, []);
      nock(baseUrl.toString())
        .post(ApiPathing.getSkillAreaPath(baseUrl).pathname)
        .reply(400, { error: "Some error" });
      store = makeStore();

      renderWithProviderAndSessionProvider(<LandingPage />, {
        preloadedState,
        session: {
          expires: "123",
          user: {
            id: 123,
          },
        },
        store,
      });
      form = screen.getByTestId(`newSkillAreaFormCard`);
      const titleInput = form.querySelector<HTMLInputElement>(
        "input#newSkillArea-titleInput"
      );
      assertIsObject(titleInput);
      fireEvent.change(titleInput, {
        target: { value: expectedSkillAreaTitle },
      });
      const descriptionInput = form.querySelector<HTMLInputElement>(
        "input#newSkillArea-descriptionInput"
      );
      assertIsObject(descriptionInput);
      fireEvent.change(descriptionInput, {
        target: { value: expectedSkillAreaDescription },
      });
      const button = form.querySelector<HTMLButtonElement>("button");
      assertIsObject(button);
      await fireEvent.click(button);
      await screen.findByText(/Hang On/i);
      await screen.findByText(/Submit New Skill Area/i);
    });
    afterEach(function () {
      sandbox.restore();
      nock.cleanAll();
    });

    it("should show header", function () {
      const node = form.querySelector("h3");
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.textContent).to.equal("Submit A New Skill Area");
    });
    it("should show blank title input", function () {
      const input = form.querySelector<HTMLInputElement>(
        "input#newSkillArea-titleInput"
      );
      expect(input).to.not.be.null;
      assertIsObject(input);
      expect(input.value).to.equal("");
    });
    it("should show blank description input", function () {
      const input = form.querySelector<HTMLInputElement>(
        "input#newSkillArea-descriptionInput"
      );
      expect(input).to.not.be.null;
      assertIsObject(input);
      expect(input.value).to.equal("");
    });
    it("should have new error in redux store", function () {
      expect(store.getState().submitSkillAreas.error).to.equal(
        "Something went wrong"
      );
    });
  });
});

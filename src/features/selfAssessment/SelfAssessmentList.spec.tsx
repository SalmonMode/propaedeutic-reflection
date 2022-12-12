import { fireEvent, screen } from "@testing-library/react";
import { expect } from "chai";
import { default as nock } from "nock";
import * as Sinon from "sinon";
import { assertIsObject } from "typed-http-client";
import * as ApiPathing from "../../apiClient/apiPathing";
import * as selfAssessParserMod from "../../apiClient/parsers/SelfAssessment";
import * as skillParserMod from "../../apiClient/parsers/SkillArea";
import { SelfAssessmentSummary, SuccessfulJsonResponse } from "../../types";
import { renderWithProviderAndSessionProvider } from "../../utility";
import SelfAssessmentList from "./SelfAssessmentList";

const baseUrl = new URL("http://localhost:3000");

describe("React Integration: SelfAssessmentList", () => {
  describe("Existing Skills", () => {
    const expectedSkillAreaId1 = 123;
    const expectedSkillAreaTitle1 = "My Title 1";
    const expectedSkillAreaDescription1 = "My Description 1";
    const expectedScore = 6;
    const expectedAverageScore = 4.3;
    const expectedSkillAreaId2 = 456;
    const expectedSkillAreaTitle2 = "My Title 2";
    const expectedSkillAreaDescription2 = "My Description 2";
    const expectedSkillAreaId3 = 789;
    const expectedSkillAreaTitle3 = "My Title 3";
    const expectedSkillAreaDescription3 = "My Description 3";
    const expectedSkillAreas = [
      {
        title: expectedSkillAreaTitle1,
        description: expectedSkillAreaDescription1,
        id: expectedSkillAreaId1,
      },
      {
        title: expectedSkillAreaTitle2,
        description: expectedSkillAreaDescription2,
        id: expectedSkillAreaId2,
      },
      {
        title: expectedSkillAreaTitle3,
        description: expectedSkillAreaDescription3,
        id: expectedSkillAreaId3,
      },
    ];
    const expectedSelfAssessmentSummary1: SelfAssessmentSummary = {
      averageScore: expectedAverageScore,
      score: expectedScore,
      skillAreaId: expectedSkillAreaId1,
    };

    beforeEach(function () {
      nock(baseUrl.toString())
        .get(ApiPathing.getSkillAreaPath(baseUrl).pathname)
        .reply(200, expectedSkillAreas);
      nock(baseUrl.toString())
        .get(
          ApiPathing.getSelfAssessmentPath(baseUrl, expectedSkillAreaId1)
            .pathname
        )
        .reply(200, expectedSelfAssessmentSummary1);
      nock(baseUrl.toString())
        .get(
          ApiPathing.getSelfAssessmentPath(baseUrl, expectedSkillAreaId2)
            .pathname
        )
        .reply(404);
      nock(baseUrl.toString())
        .get(
          ApiPathing.getSelfAssessmentPath(baseUrl, expectedSkillAreaId3)
            .pathname
        )
        .reply(400, { error: "Something bad happened" });
      renderWithProviderAndSessionProvider(<SelfAssessmentList />, {
        session: {
          expires: "123",
          user: {
            id: 123,
          },
        },
      });
    });
    afterEach(function () {
      nock.cleanAll();
    });

    it("should show skill area 1 loading and then scored", async function () {
      let card = await screen.findByTestId(`skillArea-${expectedSkillAreaId1}`);
      expect(card.classList.value.split(" ")).to.include(`loading`);
      await screen.findByText(/Average/i);
      card = await screen.findByTestId(`skillArea-${expectedSkillAreaId1}`);
      expect(card.classList.value.split(" ")).to.include(`scored`);
    });
    it("should show skill area 2 loading and then form", async function () {
      let card = await screen.findByTestId(`skillArea-${expectedSkillAreaId2}`);
      expect(card.classList.value.split(" ")).to.include(`loading`);
      await screen.findByText(/Submit/i);
      card = await screen.findByTestId(`skillArea-${expectedSkillAreaId2}`);
      expect(card.classList.value.split(" ")).to.include(`form`);
    });
    it("should show skill area 3 loading and then error", async function () {
      let card = await screen.findByTestId(`skillArea-${expectedSkillAreaId3}`);
      expect(card.classList.value.split(" ")).to.include(`loading`);
      await screen.findByText(/Error/i);
      card = await screen.findByTestId(`skillArea-${expectedSkillAreaId3}`);
      expect(card.classList.value.split(" ")).to.include(`error`);
    });
  });
  describe("Error", () => {
    beforeEach(function () {
      nock(baseUrl.toString())
        .get(ApiPathing.getSkillAreaPath(baseUrl).pathname)
        .reply(400, { error: "Something bad happened" });
      renderWithProviderAndSessionProvider(<SelfAssessmentList />, {
        session: {
          expires: "123",
          user: {
            id: 123,
          },
        },
      });
    });
    afterEach(function () {
      nock.cleanAll();
    });

    it("should show error", async function () {
      let card = await screen.findByTestId(`assessmentListError`);
      expect(card.classList.value.split(" ")).to.include(`error`);
    });
  });
  describe("Unauthorized", () => {
    beforeEach(function () {
      renderWithProviderAndSessionProvider(<SelfAssessmentList />);
    });

    it("should show not allowed", async function () {
      const content = await screen.findByText(/Not allowed/i);
      expect(content).to.not.be.null;
    });
  });
  describe("Submitting Score", () => {
    const expectedSkillAreaId1 = 123;
    const expectedSkillAreaTitle1 = "My Title 1";
    const expectedSkillAreaDescription1 = "My Description 1";
    const expectedScore = 6;
    const expectedAverageScore = 4.3;
    const expectedSkillAreas = [
      {
        title: expectedSkillAreaTitle1,
        description: expectedSkillAreaDescription1,
        id: expectedSkillAreaId1,
      },
    ];
    const expectedSelfAssessmentSummary1: SelfAssessmentSummary = {
      averageScore: expectedAverageScore,
      score: expectedScore,
      skillAreaId: expectedSkillAreaId1,
    };

    beforeEach(function () {
      nock(baseUrl.toString())
        .get(ApiPathing.getSkillAreaPath(baseUrl).pathname)
        .reply(200, expectedSkillAreas);
      // first attempt should yield 404 because the user hasn't submitted a score for this area yet.
      nock(baseUrl.toString())
        .get(
          ApiPathing.getSelfAssessmentPath(baseUrl, expectedSkillAreaId1)
            .pathname
        )
        .reply(404);
      nock(baseUrl.toString())
        .post(
          ApiPathing.getSelfAssessmentPath(baseUrl, expectedSkillAreaId1)
            .pathname
        )
        .reply(200, SuccessfulJsonResponse);
      nock(baseUrl.toString())
        .get(
          ApiPathing.getSelfAssessmentPath(baseUrl, expectedSkillAreaId1)
            .pathname
        )
        .reply(200, expectedSelfAssessmentSummary1);
      renderWithProviderAndSessionProvider(<SelfAssessmentList />, {
        session: {
          expires: "123",
          user: {
            id: 123,
          },
        },
      });
    });
    afterEach(function () {
      nock.cleanAll();
    });

    it("should show score after submitting", async function () {
      let card = await screen.findByTestId(`skillArea-${expectedSkillAreaId1}`);
      expect(card.classList.value.split(" ")).to.include(`loading`);
      // wait for the form to load
      await screen.findByText(/Submit/i);
      card = await screen.findByTestId(`skillArea-${expectedSkillAreaId1}`);
      const input = card.querySelector("input");
      expect(input).to.not.be.null;
      assertIsObject(input);
      fireEvent.change(input, { target: { value: expectedScore.toString() } });
      const button = card.querySelector("button");
      expect(button).to.not.be.null;
      assertIsObject(button);
      fireEvent.click(button);
      // wait for it to rerender with the latest info
      await screen.findByText(/Average/i);
      card = await screen.findByTestId(`skillArea-${expectedSkillAreaId1}`);
      expect(card.classList.value.split(" ")).to.include(`scored`);
    });
  });
  describe("Submitting Error", () => {
    const expectedSkillAreaId1 = 123;
    const expectedSkillAreaTitle1 = "My Title 1";
    const expectedSkillAreaDescription1 = "My Description 1";
    const expectedScore = 6;
    const expectedAverageScore = 4.3;
    const expectedSkillAreas = [
      {
        title: expectedSkillAreaTitle1,
        description: expectedSkillAreaDescription1,
        id: expectedSkillAreaId1,
      },
    ];

    beforeEach(function () {
      nock(baseUrl.toString())
        .get(ApiPathing.getSkillAreaPath(baseUrl).pathname)
        .reply(200, expectedSkillAreas);
      // first attempt should yield 404 because the user hasn't submitted a score for this area yet.
      nock(baseUrl.toString())
        .get(
          ApiPathing.getSelfAssessmentPath(baseUrl, expectedSkillAreaId1)
            .pathname
        )
        .reply(404);
      nock(baseUrl.toString())
        .post(
          ApiPathing.getSelfAssessmentPath(baseUrl, expectedSkillAreaId1)
            .pathname
        )
        .reply(400, { error: "Random Error" });
      renderWithProviderAndSessionProvider(<SelfAssessmentList />, {
        session: {
          expires: "123",
          user: {
            id: 123,
          },
        },
      });
    });
    afterEach(function () {
      nock.cleanAll();
    });

    it("should show error after submitting", async function () {
      let card = await screen.findByTestId(`skillArea-${expectedSkillAreaId1}`);
      expect(card.classList.value.split(" ")).to.include(`loading`);
      // wait for the form to load
      await screen.findByText(/Submit/i);
      card = await screen.findByTestId(`skillArea-${expectedSkillAreaId1}`);
      const input = card.querySelector("input");
      expect(input).to.not.be.null;
      assertIsObject(input);
      fireEvent.change(input, { target: { value: expectedScore.toString() } });
      const button = card.querySelector("button");
      expect(button).to.not.be.null;
      assertIsObject(button);
      fireEvent.click(button);
      // wait for it to rerender with the latest info
      await screen.findByText(/Error/i);
      card = await screen.findByTestId(`skillArea-${expectedSkillAreaId1}`);
      expect(card.classList.value.split(" ")).to.include(`error`);
    });
  });
  describe("Submitting Assessment With Unparsable Error", () => {
    const expectedSkillAreaId1 = 123;
    const expectedSkillAreaTitle1 = "My Title 1";
    const expectedSkillAreaDescription1 = "My Description 1";
    const expectedScore = 6;
    const expectedAverageScore = 4.3;
    const expectedSkillAreas = [
      {
        title: expectedSkillAreaTitle1,
        description: expectedSkillAreaDescription1,
        id: expectedSkillAreaId1,
      },
    ];

    beforeEach(function () {
      nock(baseUrl.toString())
        .get(ApiPathing.getSkillAreaPath(baseUrl).pathname)
        .reply(200, expectedSkillAreas);
      // first attempt should yield 404 because the user hasn't submitted a score for this area yet.
      nock(baseUrl.toString())
        .get(
          ApiPathing.getSelfAssessmentPath(baseUrl, expectedSkillAreaId1)
            .pathname
        )
        .reply(404);
      nock(baseUrl.toString())
        .post(
          ApiPathing.getSelfAssessmentPath(baseUrl, expectedSkillAreaId1)
            .pathname
        )
        .reply(400, "something worse");
      renderWithProviderAndSessionProvider(<SelfAssessmentList />, {
        session: {
          expires: "123",
          user: {
            id: 123,
          },
        },
      });
    });
    afterEach(function () {
      nock.cleanAll();
    });

    it("should show error after submitting", async function () {
      let card = await screen.findByTestId(`skillArea-${expectedSkillAreaId1}`);
      expect(card.classList.value.split(" ")).to.include(`loading`);
      // wait for the form to load
      await screen.findByText(/Submit/i);
      card = await screen.findByTestId(`skillArea-${expectedSkillAreaId1}`);
      const input = card.querySelector("input");
      expect(input).to.not.be.null;
      assertIsObject(input);
      fireEvent.change(input, { target: { value: expectedScore.toString() } });
      const button = card.querySelector("button");
      expect(button).to.not.be.null;
      assertIsObject(button);
      fireEvent.click(button);
      // wait for it to rerender with the latest info
      await screen.findByText(/Error/i);
      card = await screen.findByTestId(`skillArea-${expectedSkillAreaId1}`);
      expect(card.classList.value.split(" ")).to.include(`error`);
    });
  });
  describe("Submitting Assessment With undefined Error", () => {
    const expectedSkillAreaId1 = 123;
    const expectedSkillAreaTitle1 = "My Title 1";
    const expectedSkillAreaDescription1 = "My Description 1";
    const expectedScore = 6;
    const expectedAverageScore = 4.3;
    const expectedSkillAreas = [
      {
        title: expectedSkillAreaTitle1,
        description: expectedSkillAreaDescription1,
        id: expectedSkillAreaId1,
      },
    ];

    beforeEach(function () {
      nock(baseUrl.toString())
        .get(ApiPathing.getSkillAreaPath(baseUrl).pathname)
        .reply(200, expectedSkillAreas);
      // first attempt should yield 404 because the user hasn't submitted a score for this area yet.
      nock(baseUrl.toString())
        .get(
          ApiPathing.getSelfAssessmentPath(baseUrl, expectedSkillAreaId1)
            .pathname
        )
        .reply(404);
      nock(baseUrl.toString())
        .post(
          ApiPathing.getSelfAssessmentPath(baseUrl, expectedSkillAreaId1)
            .pathname
        )
        .reply(400, undefined);
      renderWithProviderAndSessionProvider(<SelfAssessmentList />, {
        session: {
          expires: "123",
          user: {
            id: 123,
          },
        },
      });
    });
    afterEach(function () {
      nock.cleanAll();
    });

    it("should show error after submitting", async function () {
      let card = await screen.findByTestId(`skillArea-${expectedSkillAreaId1}`);
      expect(card.classList.value.split(" ")).to.include(`loading`);
      // wait for the form to load
      await screen.findByText(/Submit/i);
      card = await screen.findByTestId(`skillArea-${expectedSkillAreaId1}`);
      const input = card.querySelector("input");
      expect(input).to.not.be.null;
      assertIsObject(input);
      fireEvent.change(input, { target: { value: expectedScore.toString() } });
      const button = card.querySelector("button");
      expect(button).to.not.be.null;
      assertIsObject(button);
      fireEvent.click(button);
      // wait for it to rerender with the latest info
      await screen.findByText(/Error/i);
      card = await screen.findByTestId(`skillArea-${expectedSkillAreaId1}`);
      expect(card.classList.value.split(" ")).to.include(`error`);
    });
  });
  describe("Fetch Assessment With Unparsable Error", () => {
    const expectedSkillAreaId1 = 123;
    const expectedSkillAreaTitle1 = "My Title 1";
    const expectedSkillAreaDescription1 = "My Description 1";
    const expectedScore = 6;
    const expectedAverageScore = 4.3;
    const expectedSkillAreas = [
      {
        title: expectedSkillAreaTitle1,
        description: expectedSkillAreaDescription1,
        id: expectedSkillAreaId1,
      },
    ];

    beforeEach(function () {
      nock(baseUrl.toString())
        .get(ApiPathing.getSkillAreaPath(baseUrl).pathname)
        .reply(200, expectedSkillAreas);
      // first attempt should yield 404 because the user hasn't submitted a score for this area yet.
      nock(baseUrl.toString())
        .get(
          ApiPathing.getSelfAssessmentPath(baseUrl, expectedSkillAreaId1)
            .pathname
        )
        .reply(400, "something worse");
      renderWithProviderAndSessionProvider(<SelfAssessmentList />, {
        session: {
          expires: "123",
          user: {
            id: 123,
          },
        },
      });
    });
    afterEach(function () {
      nock.cleanAll();
    });

    it("should show error after submitting", async function () {
      let card = await screen.findByTestId(`skillArea-${expectedSkillAreaId1}`);
      expect(card.classList.value.split(" ")).to.include(`loading`);
      // wait for it to rerender with the latest info
      await screen.findByText(/Error/i);
      card = await screen.findByTestId(`skillArea-${expectedSkillAreaId1}`);
      expect(card.classList.value.split(" ")).to.include(`error`);
    });
  });
  describe("Fetch Assessments With Unhandled Error", () => {
    let sandbox: Sinon.SinonSandbox;
    const expectedSkillAreaId1 = 123;
    const expectedSkillAreaTitle1 = "My Title 1";
    const expectedSkillAreaDescription1 = "My Description 1";
    const expectedScore = 6;
    const expectedAverageScore = 4.3;
    const expectedSkillAreas = [
      {
        title: expectedSkillAreaTitle1,
        description: expectedSkillAreaDescription1,
        id: expectedSkillAreaId1,
      },
    ];

    beforeEach(function () {
      sandbox = Sinon.createSandbox();
      sandbox
        .stub(selfAssessParserMod, "parseSelfAssessmentSummary")
        .throws(Error);
      nock(baseUrl.toString())
        .get(ApiPathing.getSkillAreaPath(baseUrl).pathname)
        .reply(200, expectedSkillAreas);
      // first attempt should yield 404 because the user hasn't submitted a score for this area yet.
      nock(baseUrl.toString())
        .get(
          ApiPathing.getSelfAssessmentPath(baseUrl, expectedSkillAreaId1)
            .pathname
        )
        .reply(400, undefined);
      renderWithProviderAndSessionProvider(<SelfAssessmentList />, {
        session: {
          expires: "123",
          user: {
            id: 123,
          },
        },
      });
    });
    afterEach(function () {
      sandbox.restore();
      nock.cleanAll();
    });

    it("should show error after submitting", async function () {
      let card = await screen.findByTestId(`skillArea-${expectedSkillAreaId1}`);
      expect(card.classList.value.split(" ")).to.include(`loading`);
      // wait for it to rerender with the latest info
      await screen.findByText(/Error/i);
      card = await screen.findByTestId(`skillArea-${expectedSkillAreaId1}`);
      expect(card.classList.value.split(" ")).to.include(`error`);
    });
  });
  describe("Fetch Skills With Unhandled Error", () => {
    let sandbox: Sinon.SinonSandbox;
    const expectedSkillAreaId1 = 123;
    const expectedSkillAreaTitle1 = "My Title 1";
    const expectedSkillAreaDescription1 = "My Description 1";
    const expectedScore = 6;
    const expectedAverageScore = 4.3;
    const expectedSkillAreas = [
      {
        title: expectedSkillAreaTitle1,
        description: expectedSkillAreaDescription1,
        id: expectedSkillAreaId1,
      },
    ];

    beforeEach(function () {
      sandbox = Sinon.createSandbox();
      sandbox.stub(skillParserMod, "parseSkillAreaSummaryArray").throws(Error);
      nock(baseUrl.toString())
        .get(ApiPathing.getSkillAreaPath(baseUrl).pathname)
        .reply(200, expectedSkillAreas);
      renderWithProviderAndSessionProvider(<SelfAssessmentList />, {
        session: {
          expires: "123",
          user: {
            id: 123,
          },
        },
      });
    });
    afterEach(function () {
      sandbox.restore();
      nock.cleanAll();
    });

    it("should show error after submitting", async function () {
      await screen.findByTestId(`assessmentList`);
      const loadingComponent = await screen.findByTestId(
        `assessmentListLoading`
      );
      expect(loadingComponent.classList.value.split(" ")).to.include(`loading`);
      // wait for it to rerender with the latest info
      await screen.findByText(/Error/i);
      const errorComponent = await screen.findByTestId(`assessmentListError`);
      expect(errorComponent.classList.value.split(" ")).to.include(`error`);
    });
  });
});

import { screen } from "@testing-library/react";
import { expect } from "chai";
import { assertIsObject } from "typed-http-client";
import { AppState } from "../../app/store";
import { SkillAreaSummaryMap } from "../../types";
import { renderWithProvider } from "../../utility";
import SelfAssessmentListItems from "./SelfAssessmentListItems";
import { SelfAssessmentState } from "./selfAssessmentSlice";

describe("SelfAssessmentListItems", function () {
  describe("Existing", function () {
    let list: HTMLElement;
    const expectedErrorMessage = "Something bad happened";
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
    const expectedSkillAreaId4 = 101112;
    const expectedSkillAreaTitle4 = "My Title 4";
    const expectedSkillAreaDescription4 = "My Description 4";
    const assessments: SelfAssessmentState = {
      loading: {
        [expectedSkillAreaId1]: false,
        [expectedSkillAreaId2]: true,
        [expectedSkillAreaId3]: false,
        [expectedSkillAreaId4]: false,
      },
      assessments: {
        [expectedSkillAreaId1]: {
          averageScore: expectedAverageScore,
          score: expectedScore,
          skillAreaId: expectedSkillAreaId1,
        },
      },
      error: { [expectedSkillAreaId4]: expectedErrorMessage },
    };

    const skillAreas: SkillAreaSummaryMap = {
      [expectedSkillAreaId1]: {
        title: expectedSkillAreaTitle1,
        description: expectedSkillAreaDescription1,
        id: expectedSkillAreaId1,
      },
      [expectedSkillAreaId2]: {
        title: expectedSkillAreaTitle2,
        description: expectedSkillAreaDescription2,
        id: expectedSkillAreaId2,
      },
      [expectedSkillAreaId3]: {
        title: expectedSkillAreaTitle3,
        description: expectedSkillAreaDescription3,
        id: expectedSkillAreaId3,
      },
      [expectedSkillAreaId4]: {
        title: expectedSkillAreaTitle4,
        description: expectedSkillAreaDescription4,
        id: expectedSkillAreaId4,
      },
    };
    const preloadedState: AppState = {
      submitSkillAreas: {
        loading: false,
      },
      assessments,
      skillAreas: {
        loading: false,
        skillAreas,
      },
    };

    beforeEach(function () {
      renderWithProvider(<SelfAssessmentListItems />, {
        preloadedState,
      });

      list = screen.getByTestId(`assessmentListItems`);
    });

    it("should show scored skill area 1", function () {
      const node = list.querySelector(
        `[data-testid='skillArea-${expectedSkillAreaId1}']`
      );
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.classList.value.split(" ")).to.include(`selfAssessmentCard`);
      expect(node.classList.value.split(" ")).to.include(`scored`);
    });
    it("should show loading skill area 2", function () {
      const node = list.querySelector(
        `[data-testid='skillArea-${expectedSkillAreaId2}']`
      );
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.classList.value.split(" ")).to.include(`selfAssessmentCard`);
      expect(node.classList.value.split(" ")).to.include(`loading`);
    });
    it("should show form for skill area 3", function () {
      const node = list.querySelector(
        `[data-testid='skillArea-${expectedSkillAreaId3}']`
      );
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.classList.value.split(" ")).to.include(`selfAssessmentCard`);
      expect(node.classList.value.split(" ")).to.include(`form`);
    });
    it("should show error for skill area 4", function () {
      const node = list.querySelector(
        `[data-testid='skillArea-${expectedSkillAreaId4}']`
      );
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.classList.value.split(" ")).to.include(`selfAssessmentCard`);
      expect(node.classList.value.split(" ")).to.include(`error`);
    });
  });
  describe("Submitting Score", function () {
    let list: HTMLElement;
    const expectedErrorMessage = "Something bad happened";
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
    const expectedSkillAreaId4 = 101112;
    const expectedSkillAreaTitle4 = "My Title 4";
    const expectedSkillAreaDescription4 = "My Description 4";
    const assessments: SelfAssessmentState = {
      loading: {
        [expectedSkillAreaId1]: false,
        [expectedSkillAreaId2]: true,
        [expectedSkillAreaId3]: false,
        [expectedSkillAreaId4]: false,
      },
      assessments: {
        [expectedSkillAreaId1]: {
          averageScore: expectedAverageScore,
          score: expectedScore,
          skillAreaId: expectedSkillAreaId1,
        },
      },
      error: { [expectedSkillAreaId4]: expectedErrorMessage },
    };

    const skillAreas: SkillAreaSummaryMap = {
      [expectedSkillAreaId1]: {
        title: expectedSkillAreaTitle1,
        description: expectedSkillAreaDescription1,
        id: expectedSkillAreaId1,
      },
      [expectedSkillAreaId2]: {
        title: expectedSkillAreaTitle2,
        description: expectedSkillAreaDescription2,
        id: expectedSkillAreaId2,
      },
      [expectedSkillAreaId3]: {
        title: expectedSkillAreaTitle3,
        description: expectedSkillAreaDescription3,
        id: expectedSkillAreaId3,
      },
      [expectedSkillAreaId4]: {
        title: expectedSkillAreaTitle4,
        description: expectedSkillAreaDescription4,
        id: expectedSkillAreaId4,
      },
    };
    const preloadedState: AppState = {
      submitSkillAreas: {
        loading: false,
      },
      assessments,
      skillAreas: {
        loading: false,
        skillAreas,
      },
    };

    beforeEach(function () {
      renderWithProvider(<SelfAssessmentListItems />, {
        preloadedState,
      });

      list = screen.getByTestId(`assessmentListItems`);
    });

    it("should show scored skill area 1", function () {
      const node = list.querySelector(
        `[data-testid='skillArea-${expectedSkillAreaId1}']`
      );
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.classList.value.split(" ")).to.include(`selfAssessmentCard`);
      expect(node.classList.value.split(" ")).to.include(`scored`);
    });
    it("should show loading skill area 2", function () {
      const node = list.querySelector(
        `[data-testid='skillArea-${expectedSkillAreaId2}']`
      );
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.classList.value.split(" ")).to.include(`selfAssessmentCard`);
      expect(node.classList.value.split(" ")).to.include(`loading`);
    });
    it("should show form for skill area 3", function () {
      const node = list.querySelector(
        `[data-testid='skillArea-${expectedSkillAreaId3}']`
      );
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.classList.value.split(" ")).to.include(`selfAssessmentCard`);
      expect(node.classList.value.split(" ")).to.include(`form`);
    });
    it("should show error for skill area 4", function () {
      const node = list.querySelector(
        `[data-testid='skillArea-${expectedSkillAreaId4}']`
      );
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.classList.value.split(" ")).to.include(`selfAssessmentCard`);
      expect(node.classList.value.split(" ")).to.include(`error`);
    });
  });
});

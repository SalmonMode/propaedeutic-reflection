import { screen } from "@testing-library/react";
import { expect } from "chai";
import { assertIsObject } from "typed-http-client";
import { AppState } from "../../../app/store";
import { renderWithProvider } from "../../../utility";
import SelfAssessmentCard from "./SelfAssessmentCard";

describe("SelfAssessmentCard", function () {
  describe("No Skill Area", function () {
    const expectedSkillAreaId = 123;
    const preloadedState: AppState = {
      submitSkillAreas: {
        loading: false,
      },
      assessments: {
        loading: { [expectedSkillAreaId]: false },
        assessments: {},
        error: {},
      },
      skillAreas: {
        loading: false,
        skillAreas: {},
      },
    };

    it("should throw Error", function () {
      expect(() =>
        renderWithProvider(<SelfAssessmentCard skillAreaId={123} />, {
          preloadedState,
        })
      ).to.throw(Error);
    });
  });
  describe("Error", function () {
    let card: HTMLElement;
    const expectedSkillAreaId = 123;
    const expectedSkillAreaTitle = "My Title";
    const expectedSkillAreaDescription = "My Description";
    const expectedErrorMessage = "Some Error";

    beforeEach(function () {
      const preloadedState: AppState = {
        submitSkillAreas: {
          loading: false,
        },
        assessments: {
          loading: { [expectedSkillAreaId]: false },
          assessments: {},
          error: {
            [expectedSkillAreaId]: expectedErrorMessage,
          },
        },
        skillAreas: {
          loading: false,
          skillAreas: {
            [expectedSkillAreaId]: {
              title: expectedSkillAreaTitle,
              description: expectedSkillAreaDescription,
              id: expectedSkillAreaId,
            },
          },
        },
      };

      renderWithProvider(<SelfAssessmentCard skillAreaId={123} />, {
        preloadedState,
      });
      card = screen.getByTestId(`skillArea-${expectedSkillAreaId}`);
    });
    it("should have error contents", function () {
      expect(screen.getByText(/Error/i)).to.not.be.null;
    });
    it("should have selfAssessmentCard class", function () {
      expect(card.classList.value.split(" ")).to.include(`selfAssessmentCard`);
    });
    it("should have error class", function () {
      expect(card.classList.value.split(" ")).to.include(`error`);
    });
    it("should show title", function () {
      const node = card.querySelector("h3");
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.textContent).to.equal(expectedSkillAreaTitle);
    });
    it("should show description", function () {
      const node = card.querySelector("h4");
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.textContent).to.equal(expectedSkillAreaDescription);
    });
  });
  describe("Loading", function () {
    let card: HTMLElement;
    const expectedSkillAreaId = 123;
    const expectedSkillAreaTitle = "My Title";
    const expectedSkillAreaDescription = "My Description";

    beforeEach(function () {
      const preloadedState: AppState = {
        submitSkillAreas: {
          loading: false,
        },
        assessments: {
          loading: { [expectedSkillAreaId]: true },
          assessments: {},
          error: {},
        },
        skillAreas: {
          loading: false,
          skillAreas: {
            [expectedSkillAreaId]: {
              title: expectedSkillAreaTitle,
              description: expectedSkillAreaDescription,
              id: expectedSkillAreaId,
            },
          },
        },
      };

      renderWithProvider(<SelfAssessmentCard skillAreaId={123} />, {
        preloadedState,
      });
      card = screen.getByTestId(`skillArea-${expectedSkillAreaId}`);
    });
    it("should have error contents", function () {
      expect(screen.getByText(/Loading/i)).to.not.be.null;
    });
    it("should have selfAssessmentCard class", function () {
      expect(card.classList.value.split(" ")).to.include(`selfAssessmentCard`);
    });
    it("should have loading class", function () {
      expect(card.classList.value.split(" ")).to.include(`loading`);
    });
    it("should show title", function () {
      const node = card.querySelector("h3");
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.textContent).to.equal(expectedSkillAreaTitle);
    });
    it("should show description", function () {
      const node = card.querySelector("h4");
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.textContent).to.equal(expectedSkillAreaDescription);
    });
  });
  describe("Form", function () {
    let card: HTMLElement;
    const expectedSkillAreaId = 123;
    const expectedSkillAreaTitle = "My Title";
    const expectedSkillAreaDescription = "My Description";

    beforeEach(function () {
      const preloadedState: AppState = {
        submitSkillAreas: {
          loading: false,
        },
        assessments: {
          loading: { [expectedSkillAreaId]: false },
          assessments: {},
          error: {},
        },
        skillAreas: {
          loading: false,
          skillAreas: {
            [expectedSkillAreaId]: {
              title: expectedSkillAreaTitle,
              description: expectedSkillAreaDescription,
              id: expectedSkillAreaId,
            },
          },
        },
      };

      renderWithProvider(<SelfAssessmentCard skillAreaId={123} />, {
        preloadedState,
      });
      card = screen.getByTestId(`skillArea-${expectedSkillAreaId}`);
    });
    it("should have form contents", function () {
      expect(screen.getByText(/Rate/i)).to.not.be.null;
    });
    it("should have selfAssessmentCard class", function () {
      expect(card.classList.value.split(" ")).to.include(`selfAssessmentCard`);
    });
    it("should have form class", function () {
      expect(card.classList.value.split(" ")).to.include(`form`);
    });
    it("should show title", function () {
      const node = card.querySelector("h3");
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.textContent).to.equal(expectedSkillAreaTitle);
    });
    it("should show description", function () {
      const node = card.querySelector("h4");
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.textContent).to.equal(expectedSkillAreaDescription);
    });
  });
  describe("Scored", function () {
    let card: HTMLElement;
    const expectedSkillAreaId = 123;
    const expectedSkillAreaTitle = "My Title";
    const expectedSkillAreaDescription = "My Description";
    const expectedScore = 7;
    const expectedAverageScore = 6.3;

    beforeEach(function () {
      const preloadedState: AppState = {
        submitSkillAreas: {
          loading: false,
        },
        assessments: {
          loading: { [expectedSkillAreaId]: false },
          assessments: {
            [expectedSkillAreaId]: {
              skillAreaId: expectedSkillAreaId,
              score: expectedScore,
              averageScore: expectedAverageScore,
            },
          },
          error: {},
        },
        skillAreas: {
          loading: false,
          skillAreas: {
            [expectedSkillAreaId]: {
              title: expectedSkillAreaTitle,
              description: expectedSkillAreaDescription,
              id: expectedSkillAreaId,
            },
          },
        },
      };

      renderWithProvider(<SelfAssessmentCard skillAreaId={123} />, {
        preloadedState,
      });
      card = screen.getByTestId(`skillArea-${expectedSkillAreaId}`);
    });
    it("should have scored contents", function () {
      expect(screen.getByText(/Your Score/i).textContent).to.equal(
        `Your Score: ${expectedScore}, Average: ${expectedAverageScore}`
      );
    });
    it("should have selfAssessmentCard class", function () {
      expect(card.classList.value.split(" ")).to.include(`selfAssessmentCard`);
    });
    it("should have scored class", function () {
      expect(card.classList.value.split(" ")).to.include(`scored`);
    });
    it("should show title", function () {
      const node = card.querySelector("h3");
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.textContent).to.equal(expectedSkillAreaTitle);
    });
    it("should show description", function () {
      const node = card.querySelector("h4");
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.textContent).to.equal(expectedSkillAreaDescription);
    });
  });
  describe("No Skill Area", function () {
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

    beforeEach(function () {});
    it("should throw error", function () {
      expect(() =>
        renderWithProvider(<SelfAssessmentCard skillAreaId={123} />, {
          preloadedState,
        })
      ).to.throw(Error);
    });
  });
});

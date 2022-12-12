import { fireEvent, screen } from "@testing-library/react";
import { expect } from "chai";
import { assertIsObject } from "typed-http-client";
import { AppState } from "../../app/store";
import { renderWithProviderAndSessionProvider } from "../../utility";
import NewSkillArea from "./NewSkillArea";

describe("NewSkillArea", function () {
  describe("Success", async function () {
    let form: HTMLElement;
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

      renderWithProviderAndSessionProvider(<NewSkillArea />, {
        preloadedState,
        session: {
          expires: "123",
          user: {
            id: 123,
          },
        },
      });
      await screen.findByText(/Submit New Skill Area/i);
      form = screen.getByTestId(`newSkillAreaFormCard`);
    });

    it("should show header", function () {
      const node = form.querySelector("h3");
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.textContent).to.equal("Submit A New Skill Area");
    });
    it("should show title input", function () {
      const input = form.querySelector<HTMLInputElement>(
        "input#newSkillArea-titleInput"
      );
      expect(input).to.not.be.null;
      assertIsObject(input);
      assertIsObject(input.labels);
      const label = input.labels[0];
      assertIsObject(label);
      expect(label.textContent).to.include("Title");
    });
    it("should show description input", function () {
      const input = form.querySelector<HTMLInputElement>(
        "input#newSkillArea-descriptionInput"
      );
      expect(input).to.not.be.null;
      assertIsObject(input);
      assertIsObject(input.labels);
      const label = input.labels[0];
      assertIsObject(label);
      expect(label.textContent).to.include("Description");
    });
    it("should have a button to submit the form", function () {
      const node = form.querySelector<HTMLButtonElement>("button");
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.textContent).to.equal("Submit New Skill Area");
    });
  });
  describe("Unauthorized", function () {
    let container: HTMLElement;
    beforeEach(function () {
      const result = renderWithProviderAndSessionProvider(<NewSkillArea />);
      container = result.container;
    });

    it("should show nothing", async function () {
      expect(container.textContent).to.equal("");
    });
  });
  describe("Title Missing Submit", async function () {
    let form: HTMLElement;
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

      renderWithProviderAndSessionProvider(<NewSkillArea />, {
        preloadedState,
        session: {
          expires: "123",
          user: {
            id: 123,
          },
        },
      });
      form = screen.getByTestId(`newSkillAreaFormCard`);
      const input = form.querySelector<HTMLInputElement>(
        "input#newSkillArea-descriptionInput"
      );
      assertIsObject(input);
      fireEvent.change(input, { target: { value: "Some Description" } });
      const button = form.querySelector<HTMLButtonElement>("button");
      assertIsObject(button);
      fireEvent.click(button);
      await screen.findByText(/Missing/i);
    });

    it("should show title input is invalid", function () {
      const input = form.querySelector<HTMLInputElement>(
        "input#newSkillArea-titleInput"
      );
      expect(input).to.not.be.null;
      assertIsObject(input);
      const ariaInvalid = input.attributes.getNamedItem("aria-invalid");
      expect(ariaInvalid).to.not.be.null;
      assertIsObject(ariaInvalid);
      expect(ariaInvalid.value).to.equal("true");
    });
    it("should show description input is not invalid", function () {
      const input = form.querySelector<HTMLInputElement>(
        "input#newSkillArea-descriptionInput"
      );
      expect(input).to.not.be.null;
      assertIsObject(input);
      const ariaInvalid = input.attributes.getNamedItem("aria-invalid");
      expect(ariaInvalid).to.not.be.null;
      assertIsObject(ariaInvalid);
      expect(ariaInvalid.value).to.equal("false");
    });
  });
  describe("Description Missing Submit", async function () {
    let form: HTMLElement;
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

      renderWithProviderAndSessionProvider(<NewSkillArea />, {
        preloadedState,
        session: {
          expires: "123",
          user: {
            id: 123,
          },
        },
      });
      form = screen.getByTestId(`newSkillAreaFormCard`);
      const input = form.querySelector<HTMLInputElement>(
        "input#newSkillArea-titleInput"
      );
      assertIsObject(input);
      fireEvent.change(input, { target: { value: "Some Title" } });
      const button = form.querySelector<HTMLButtonElement>("button");
      assertIsObject(button);
      fireEvent.click(button);
      await screen.findByText(/Missing/i);
    });

    it("should show title input is invalid", function () {
      const input = form.querySelector<HTMLInputElement>(
        "input#newSkillArea-titleInput"
      );
      expect(input).to.not.be.null;
      assertIsObject(input);
      const ariaInvalid = input.attributes.getNamedItem("aria-invalid");
      expect(ariaInvalid).to.not.be.null;
      assertIsObject(ariaInvalid);
      expect(ariaInvalid.value).to.equal("false");
    });
    it("should show description input is not invalid", function () {
      const input = form.querySelector<HTMLInputElement>(
        "input#newSkillArea-descriptionInput"
      );
      expect(input).to.not.be.null;
      assertIsObject(input);
      const ariaInvalid = input.attributes.getNamedItem("aria-invalid");
      expect(ariaInvalid).to.not.be.null;
      assertIsObject(ariaInvalid);
      expect(ariaInvalid.value).to.equal("true");
    });
  });
  describe("Both Title And Description Missing Submit", async function () {
    let form: HTMLElement;
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

      renderWithProviderAndSessionProvider(<NewSkillArea />, {
        preloadedState,
        session: {
          expires: "123",
          user: {
            id: 123,
          },
        },
      });
      form = screen.getByTestId(`newSkillAreaFormCard`);
      const button = form.querySelector<HTMLButtonElement>("button");
      assertIsObject(button);
      fireEvent.click(button);
      await screen.findAllByText(/Missing/i);
    });

    it("should show title input is invalid", function () {
      const input = form.querySelector<HTMLInputElement>(
        "input#newSkillArea-titleInput"
      );
      expect(input).to.not.be.null;
      assertIsObject(input);
      const ariaInvalid = input.attributes.getNamedItem("aria-invalid");
      expect(ariaInvalid).to.not.be.null;
      assertIsObject(ariaInvalid);
      expect(ariaInvalid.value).to.equal("true");
    });
    it("should show description input is not invalid", function () {
      const input = form.querySelector<HTMLInputElement>(
        "input#newSkillArea-descriptionInput"
      );
      expect(input).to.not.be.null;
      assertIsObject(input);
      const ariaInvalid = input.attributes.getNamedItem("aria-invalid");
      expect(ariaInvalid).to.not.be.null;
      assertIsObject(ariaInvalid);
      expect(ariaInvalid.value).to.equal("true");
    });
  });
});

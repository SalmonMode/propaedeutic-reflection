import { fireEvent, screen } from "@testing-library/react";
import { expect } from "chai";
import * as Sinon from "sinon";
import { assertIsObject } from "typed-http-client";
import { AppState } from "../../../app/store";
import { renderWithProvider } from "../../../utility";
import SelfAssessmentForm from "./SelfAssessmentForm";

describe("SelfAssessmentForm", function () {
  describe("Success", function () {
    const expectedSkillAreaId = 123;

    beforeEach(function () {
      renderWithProvider(<SelfAssessmentForm skillAreaId={123} />);
    });

    it("should show instructions", function () {
      const node = screen.getByText(/Rate/i);
      expect(node.textContent).to.equal("Rate Yourself (0-10)");
    });
    it("should have a slider for the score", function () {
      const node = screen.getByTestId(
        `skillArea-${expectedSkillAreaId}-slider`
      );
      expect(node).to.not.be.null;
    });
    it("should have a button to submit the form", function () {
      const node = screen.getByRole("button");
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.textContent).to.equal("Submit Score");
    });
  });
  describe("Handles Changes", function () {
    const expectedSkillAreaId = 123;
    let sandbox: Sinon.SinonSandbox;

    beforeEach(function () {
      sandbox = Sinon.createSandbox();

      renderWithProvider(<SelfAssessmentForm skillAreaId={123} />);
    });
    after(function () {
      sandbox.restore();
    });

    it("should handle change", async function () {
      let slider = screen.getByRole("slider");
      const ariaValue = slider.attributes.getNamedItem("aria-valuenow");
      expect(ariaValue && ariaValue.value).to.equal("5");

      const sliderContainer = screen.getByTestId(
        `skillArea-${expectedSkillAreaId}-slider`
      );
      expect(sliderContainer).to.not.be.null;
      assertIsObject(sliderContainer);
      sandbox.stub(sliderContainer, "getBoundingClientRect").returns({
        width: 100,
        left: 0,
        bottom: 0,
        height: 10,
        right: 0,
        top: 0,
        x: 0,
        y: 0,
        toJSON: () => {},
      });
      slider = screen.getByRole("slider");
      expect(slider).to.not.be.null;
      assertIsObject(slider);
      await fireEvent.mouseDown(slider, {
        clientX: 70,
        clientY: 5,
      });
      await fireEvent.mouseUp(slider, {
        clientX: 70,
        clientY: 5,
      });
      // wait for label to change
      await screen.findByText(/7/i);
      slider = screen.getByRole("slider");
      const newAriaValue = slider.attributes.getNamedItem("aria-valuenow");
      expect(newAriaValue && newAriaValue.value).to.equal("7");
    });
  });
});

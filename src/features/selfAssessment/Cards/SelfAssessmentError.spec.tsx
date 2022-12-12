import { screen } from "@testing-library/react";
import { expect } from "chai";
import { renderWithProvider } from "../../../utility";
import SelfAssessmentError from "./SelfAssessmentError";

describe("SelfAssessmentError", function () {
  describe("Success", function () {
    const expectedErrorMessage = "Some Error";

    beforeEach(function () {
      renderWithProvider(<SelfAssessmentError error={expectedErrorMessage} />);
    });

    it("should show error message", function () {
      const node = screen.getByText(/Error/i);
      expect(node.textContent).to.equal(`Error: ${expectedErrorMessage}`);
    });
  });
});

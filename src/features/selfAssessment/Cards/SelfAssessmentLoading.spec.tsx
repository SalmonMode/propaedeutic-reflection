import { screen } from "@testing-library/react";
import { expect } from "chai";
import { renderWithProvider } from "../../../utility";
import SelfAssessmentLoading from "./SelfAssessmentLoading";

describe("SelfAssessmentLoading", function () {
  beforeEach(function () {
    renderWithProvider(<SelfAssessmentLoading />);
  });

  it("should show error message", function () {
    const node = screen.getByText(/Loading/i);
    expect(node.textContent).to.equal(`Loading...`);
  });
});

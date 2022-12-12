import { screen } from "@testing-library/react";
import { expect } from "chai";
import { assertIsObject } from "typed-http-client";
import { renderWithProvider } from "../../utility";
import SelfAssessmentListError from "./SelfAssessmentListError";

describe("SelfAssessmentLisError", () => {
  let list: HTMLElement;
  const expectedErrorMessage = "Some Error";

  beforeEach(function () {
    renderWithProvider(
      <SelfAssessmentListError errorMessage={expectedErrorMessage} />
    );
    list = screen.getByTestId(`assessmentListError`);
  });

  it("should have error class", function () {
    expect(list.className).to.equal("error");
  });
  it("should show error", function () {
    const node = list.querySelector("p");
    expect(node).to.not.be.null;
    assertIsObject(node);
    expect(node.textContent).to.equal(`Error: ${expectedErrorMessage}`);
  });
});

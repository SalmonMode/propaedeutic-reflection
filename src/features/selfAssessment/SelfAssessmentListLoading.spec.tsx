import { screen } from "@testing-library/react";
import { expect } from "chai";
import { assertIsObject } from "typed-http-client";
import { renderWithProvider } from "../../utility";
import SelfAssessmentListLoading from "./SelfAssessmentListLoading";

describe("SelfAssessmentListLoading", () => {
  let list: HTMLElement;

  beforeEach(function () {
    renderWithProvider(<SelfAssessmentListLoading />);
    list = screen.getByTestId(`assessmentListLoading`);
  });

  it("should have loading class", function () {
    expect(list.className).to.equal("loading");
  });
  it("should show loading", function () {
    const node = list.querySelector("p");
    expect(node).to.not.be.null;
    assertIsObject(node);
    expect(node.textContent).to.equal("Loading...");
  });
});

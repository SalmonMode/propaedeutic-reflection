import { screen } from "@testing-library/react";
import { expect } from "chai";
import { renderWithProvider } from "../../utility";
import SelfAssessmentListHeader from "./SelfAssessmentListHeader";

describe("SelfAssessmentList Header", function () {
  const expectedUserId = 123;

  beforeEach(function () {
    renderWithProvider(<SelfAssessmentListHeader userId={expectedUserId} />);
  });

  it("should show title", function () {
    expect(screen.getByTestId(`assessmentListHeader`).textContent).to.equal(
      `List of Assessments (user id: ${expectedUserId})`
    );
  });
});

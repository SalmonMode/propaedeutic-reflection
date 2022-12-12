import { screen } from "@testing-library/react";
import { expect } from "chai";
import { renderWithProvider } from "../../../utility";
import SelfAssessmentScored from "./SelfAssessmentScored";

describe("SelfAssessmentScored", function () {
  const expectedScore = 8;
  const expectedAverageScore = 5.6;

  beforeEach(function () {
    renderWithProvider(
      <SelfAssessmentScored
        score={expectedScore}
        averageScore={expectedAverageScore}
      />
    );
  });

  it("should show score", function () {
    const node = screen.getByText(/Your Score/i);
    expect(node.textContent).to.equal(
      `Your Score: ${expectedScore}, Average: ${expectedAverageScore}`
    );
  });
});

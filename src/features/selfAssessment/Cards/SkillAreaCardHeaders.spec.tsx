import { screen } from "@testing-library/react";
import { expect } from "chai";
import { assertIsObject } from "typed-http-client";
import { renderWithProvider } from "../../../utility";
import SkillAreaCardHeaders from "./SkillAreaCardHeaders";

describe("SkillAreaCardHeaders", function () {
  describe("Success", function () {
    let wrapper: HTMLElement;
    const expectedSkillAreaId = 123;
    const expectedSkillAreaTitle = "My Title";
    const expectedSkillAreaDescription = "My Description";

    beforeEach(function () {
      renderWithProvider(
        <SkillAreaCardHeaders
          title={expectedSkillAreaTitle}
          description={expectedSkillAreaDescription}
        />
      );
      wrapper = screen.getByTestId(`skillAreaCardHeaders`);
    });

    it("should show title", function () {
      const node = wrapper.querySelector("h3");
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.textContent).to.equal(expectedSkillAreaTitle);
    });
    it("should show description", function () {
      const node = wrapper.querySelector("h4");
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.textContent).to.equal(expectedSkillAreaDescription);
    });
  });
});

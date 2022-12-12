import { screen } from "@testing-library/react";
import * as chai from "chai";
import { default as chaiAsPromised } from "chai-as-promised";
import { default as nock } from "nock";
import { assertIsObject } from "typed-http-client";
import IndexPage from ".";
import * as ApiPathing from "../apiClient/apiPathing";
import { renderWithProviderAndSessionProvider } from "../utility";

chai.use(chaiAsPromised);

var expect = chai.expect;

const baseUrl = new URL("http://localhost:3000");

describe("React Integration: Index Page", function () {
  describe("Success", function () {
    beforeEach(function () {
      nock(baseUrl.toString())
        .get(ApiPathing.getSkillAreaPath(baseUrl).pathname)
        .reply(200, []);
      const session = {
        expires: "123",
        user: {
          id: 123,
        },
      };
      renderWithProviderAndSessionProvider(<IndexPage />, { session });
    });
    afterEach(function () {
      nock.cleanAll();
    });
    it("should show list", async function () {
      const listComponent = screen.getByTestId(`assessmentList`);
      const node = listComponent.querySelector(
        "[data-testid='assessmentListLoading']"
      );
      expect(node).to.not.be.null;
      assertIsObject(node);
      expect(node.textContent).to.equal("Loading...");
      await screen.findByText(/No Skill Areas have been submitted yet/i);
      expect(screen.getByTestId("assessmentListItems")).to.not.be.null;
    });
  });
});

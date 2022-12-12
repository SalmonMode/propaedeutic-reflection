import { screen } from "@testing-library/react";
import * as chai from "chai";
import { default as chaiAsPromised } from "chai-as-promised";
import type { Router } from "next/router";
import { default as nock } from "nock";
import { assertIsObject } from "typed-http-client";
import * as ApiPathing from "../apiClient/apiPathing";
import { makeStore } from "./store";
import { render } from "@testing-library/react";
import LandingPage from "../features/Landing";
import App from "./App";

chai.use(chaiAsPromised);

var expect = chai.expect;

const baseUrl = new URL("http://localhost:3000");

describe("React Integration: App landing", function () {
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
      render(
        App({
          Component: LandingPage,
          router: {} as Router,
          pageProps: { session },
        })
      );
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

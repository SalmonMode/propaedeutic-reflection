import * as chai from "chai";
import { OAuthUserConfig } from "next-auth/providers";
import { GithubProfile } from "next-auth/providers/github";
import { getGitHubAppSecretInfo } from "./getGitHubAppSecretInfo";

var expect = chai.expect;

const expectedId = "SomethingId";
const expectedSecret = "SomethingSecret";
const expectedInfo: OAuthUserConfig<GithubProfile> = {
  clientId: expectedId,
  clientSecret: expectedSecret,
};
describe("Get GitHub App Secret Info", function () {
  let originalId: string | undefined;
  let originalSecret: string | undefined;
  before(function () {
    originalId = process.env.GITHUB_ID;
    originalSecret = process.env.GITHUB_SECRET;
  });
  after(function () {
    process.env.GITHUB_ID = originalId;
    process.env.GITHUB_SECRET = originalSecret;
  });
  describe("Both Environment Variables are Set", function () {
    before(function () {
      process.env.GITHUB_ID = expectedId;
      process.env.GITHUB_SECRET = expectedSecret;
    });
    it("should return the creds", function () {
      expect(getGitHubAppSecretInfo()).to.deep.equal(expectedInfo);
    });
  });
  describe("GITHUB_ID is Set, but GITHUB_SECRET is Empty", function () {
    before(function () {
      process.env.GITHUB_ID = expectedId;
      process.env.GITHUB_SECRET = "";
    });
    it("should throw an error", function () {
      expect(getGitHubAppSecretInfo).to.throw(Error);
    });
  });
  describe("GITHUB_SECRET is Set, but GITHUB_ID is Empty", function () {
    before(function () {
      process.env.GITHUB_ID = "";
      process.env.GITHUB_SECRET = expectedSecret;
    });
    it("should throw an error", function () {
      expect(getGitHubAppSecretInfo).to.throw(Error);
    });
  });
  describe("GITHUB_ID is Set, but GITHUB_SECRET is not Set", function () {
    before(function () {
      process.env.GITHUB_ID = expectedId;
      delete process.env.GITHUB_SECRET;
    });
    it("should throw an error", function () {
      expect(getGitHubAppSecretInfo).to.throw(Error);
    });
  });
  describe("GITHUB_SECRET is Set, but GITHUB_ID is not Set", function () {
    before(function () {
      delete process.env.GITHUB_ID;
      process.env.GITHUB_SECRET = expectedSecret;
    });
    it("should throw an error", function () {
      expect(getGitHubAppSecretInfo).to.throw(Error);
    });
  });
  describe("Neither Environment Variables Are Set", function () {
    before(function () {
      delete process.env.GITHUB_ID;
      delete process.env.GITHUB_SECRET;
    });
    it("should throw an error", function () {
      expect(getGitHubAppSecretInfo).to.throw(Error);
    });
  });
});

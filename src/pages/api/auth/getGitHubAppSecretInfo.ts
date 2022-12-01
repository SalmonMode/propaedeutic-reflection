import { OAuthUserConfig } from "next-auth/providers";
import { GithubProfile } from "next-auth/providers/github";

export function getGitHubAppSecretInfo(): OAuthUserConfig<GithubProfile> {
  const clientId = process.env.GITHUB_ID;
  if (typeof clientId !== "string" || clientId.length === 0) {
    throw new Error("Unable to find GitHub ID for App");
  }
  const clientSecret = process.env.GITHUB_SECRET;
  if (typeof clientSecret !== "string" || clientSecret.length === 0) {
    throw new Error("Unable to find GitHub Secret for App");
  }
  return {
    clientId,
    clientSecret,
  };
}

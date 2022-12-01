import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { getPrismaClient } from "../../../getPrismaClient";
import { getGitHubAppSecretInfo } from "./getGitHubAppSecretInfo";
import { getSecret } from "./getSecret";
import { session } from "./session";

const prisma = getPrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [GitHubProvider(getGitHubAppSecretInfo())],
  secret: getSecret(),

  callbacks: {
    session,
  },
};
export default NextAuth(authOptions);

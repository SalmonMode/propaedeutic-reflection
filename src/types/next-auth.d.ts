import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: number;
    } & DefaultSession["user"];
  }
}
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET?: string;
      GITHUB_SECRET?: string;
      GITHUB_ID?: string;
    }
  }
}

import { Session } from "next-auth";

export interface UserSession extends Required<Session> {}

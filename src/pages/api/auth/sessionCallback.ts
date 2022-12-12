import { CallbacksOptions } from "next-auth";

export function session({
  session,
  user,
}: Parameters<CallbacksOptions<any>["session"]>[0]): ReturnType<
  CallbacksOptions<any>["session"]
> {
  session.user.id = Number(user.id);
  return session;
}

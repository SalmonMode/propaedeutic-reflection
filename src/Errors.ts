import { HttpMethod } from "./types";

/**
 * This is thrown when an unsupported HTTP Method is used.
 */
export class InvalidHttpMethodError<
  T extends string | undefined
> extends Error {
  constructor(
    public supportedMethods: HttpMethod[],
    public methodUsed: T,
    message?: string
  ) {
    super(message);

    Object.setPrototypeOf(this, InvalidHttpMethodError.prototype);
    this.name = new.target.name;
  }
}
/**
 * This is thrown when a resource requiring authorization is accessed without proper authentication.
 */
export class UnauthorizedError extends Error {
  constructor(message?: string) {
    super(message);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
    this.name = new.target.name;
  }
}

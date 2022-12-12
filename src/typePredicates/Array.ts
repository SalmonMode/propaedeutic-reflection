export function assertIsArray(value: object): asserts value is Array<unknown> {
  if (!Array.isArray(value)) {
    throw new TypeError("Value is not an array");
  }
}

export function getSecret(): string {
  const secret = process.env.SECRET;
  if (typeof secret !== "string" || secret.length === 0) {
    throw new Error("Unable to find secret for App");
  }
  return secret;
}

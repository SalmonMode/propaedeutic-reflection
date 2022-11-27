export const SuccessfulJsonResponse = {
  status: "submitted successfully",
} as const;
export interface ErrorResponse {
  error: string;
}

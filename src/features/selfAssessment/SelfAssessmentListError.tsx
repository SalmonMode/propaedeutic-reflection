import { Typography } from "@material-ui/core";

export default function SelfAssessmentListError({
  errorMessage,
}: {
  errorMessage?: string;
}) {
  return (
    <div data-testid="assessmentListError" className="error">
      <Typography>Error: {errorMessage}</Typography>
    </div>
  );
}

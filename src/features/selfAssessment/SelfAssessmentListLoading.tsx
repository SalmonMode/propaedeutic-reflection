import { Typography } from "@material-ui/core";

export default function SelfAssessmentListLoading() {
  return (
    <div data-testid="assessmentListLoading" className="loading">
      <Typography>Loading...</Typography>
    </div>
  );
}

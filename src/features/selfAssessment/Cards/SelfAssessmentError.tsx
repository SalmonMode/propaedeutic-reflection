import { Typography } from "@material-ui/core";

export default function SelfAssessmentError({ error }: { error: string }) {
  return (
    <div>
      <Typography variant="h5">Error: {error}</Typography>
    </div>
  );
}

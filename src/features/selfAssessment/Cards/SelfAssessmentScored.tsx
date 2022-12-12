import { Typography } from "@material-ui/core";
import { SelfAssessmentSummary } from "../../../types";

export default function SelfAssessmentScored({
  score,
  averageScore,
}: {
  score: SelfAssessmentSummary["score"];
  averageScore: SelfAssessmentSummary["averageScore"];
}) {
  return (
    <div>
      <Typography>
        Your Score: {score}, Average: {averageScore}
      </Typography>
    </div>
  );
}

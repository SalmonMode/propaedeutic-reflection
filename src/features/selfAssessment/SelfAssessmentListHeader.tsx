import { Typography } from "@material-ui/core";
import { User } from "@prisma/client";

export default function SelfAssessmentListHeader({
  userId,
}: {
  userId: User["id"];
}) {
  return (
    <Typography variant="h4" component="h2" data-testid="assessmentListHeader">
      List of Assessments (user id: {userId})
    </Typography>
  );
}

import { Card, CardContent } from "@material-ui/core";
import { useAppSelector } from "../../../app/hooks";
import { SkillAreaSummary } from "../../../types";
import CardStyles from "./CardStyles";
import SelfAssessmentError from "./SelfAssessmentError";
import SelfAssessmentForm from "./SelfAssessmentForm";
import SelfAssessmentLoading from "./SelfAssessmentLoading";
import SelfAssessmentScored from "./SelfAssessmentScored";
import SkillAreaCardHeaders from "./SkillAreaCardHeaders";

export default function SelfAssessmentCard({
  skillAreaId,
}: {
  skillAreaId: SkillAreaSummary["id"];
}) {
  const { skillAreaSummary, assessment, loading, error } = useAppSelector(
    (state) => ({
      skillAreaSummary: state.skillAreas.skillAreas[skillAreaId],
      assessment: state.assessments.assessments[skillAreaId],
      loading: state.assessments.loading[skillAreaId],
      error: state.assessments.error[skillAreaId],
    })
  );
  const classes = CardStyles();
  if (!skillAreaSummary) {
    throw new Error(`Unable to find skill area with ID: ${skillAreaId}`);
  }
  let content: JSX.Element;
  let variant: string;
  if (loading) {
    content = <SelfAssessmentLoading />;
    variant = "loading";
  } else if (error) {
    content = <SelfAssessmentError error={error} />;
    variant = "error";
  } else if (assessment) {
    content = (
      <SelfAssessmentScored
        score={assessment.score}
        averageScore={assessment.averageScore}
      />
    );
    variant = "scored";
  } else {
    content = <SelfAssessmentForm skillAreaId={skillAreaId} />;
    variant = "form";
  }
  return (
    <Card
      className={`selfAssessmentCard ${variant} ${classes.root}`}
      data-testid={`skillArea-${skillAreaId}`}
    >
      <CardContent style={{ minWidth: "250px", maxWidth: "500px" }}>
        <SkillAreaCardHeaders
          title={skillAreaSummary.title}
          description={skillAreaSummary.description}
        />
        <div>{content}</div>
      </CardContent>
    </Card>
  );
}

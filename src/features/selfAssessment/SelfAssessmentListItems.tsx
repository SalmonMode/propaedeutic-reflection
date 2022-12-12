import { makeStyles, Typography } from "@material-ui/core";
import { useAppSelector } from "../../app/hooks";
import {
  SelfAssessmentError,
  SelfAssessmentForm,
  SelfAssessmentLoading,
  SelfAssessmentScored,
} from "./Cards";
import SelfAssessmentCard from "./Cards/SelfAssessmentCard";

const useStyles = makeStyles((theme) => ({
  list: {
    "& > *": {
      margin: theme.spacing(1),
      display: "inline-block",
    },
  },
}));

export default function SelfAssessmentListItems() {
  const skillAreas = useAppSelector((state) => state.skillAreas);
  const classes = useStyles();
  let content: JSX.Element;
  if (Object.keys(skillAreas.skillAreas).length === 0) {
    content = <Typography>No Skill Areas have been submitted yet</Typography>;
  } else {
    content = (
      <div>
        {Object.keys(skillAreas.skillAreas).map((skillArea, index) => {
          const id = Number(skillArea);
          return <SelfAssessmentCard key={index} skillAreaId={id} />;
        })}
      </div>
    );
  }
  return (
    <div data-testid="assessmentListItems" className={classes.list}>
      {content}
    </div>
  );
}

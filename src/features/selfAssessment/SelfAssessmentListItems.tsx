import { makeStyles, Typography } from "@material-ui/core";
import { useAppSelector } from "../../app/hooks";
import SelfAssessmentCard from "./Cards/SelfAssessmentCard";

const useStyles = makeStyles((theme) => ({
  list: {
    "& > *": {
      display: "inline-block",
      "min-width": "275px",
      "max-width": "500px",
      margin: "10px",
    },
    "& > * > *": {
      display: "inline-block",
      "min-width": "275px",
      "max-width": "500px",
    },
    "&": {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      alignItems: "stretch",
      justifyContent: "center",
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
      <div className={classes.list}>
        {Object.keys(skillAreas.skillAreas).map((skillArea, index) => {
          const id = Number(skillArea);
          return <SelfAssessmentCard key={index} skillAreaId={id} />;
        })}
      </div>
    );
  }
  return (
    <div data-testid="assessmentListItems" style={{ width: "100%" }}>
      {content}
    </div>
  );
}

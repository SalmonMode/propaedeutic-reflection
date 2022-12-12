import { Button, Slider, Typography } from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { assertIsNumber } from "../../../typePredicates";
import { SkillAreaSummary } from "../../../types";
import { submitAssessmentToApi } from "../selfAssessmentSlice";

export default function SelfAssessmentForm({
  skillAreaId,
}: {
  skillAreaId: SkillAreaSummary["id"];
}) {
  const [score, setScore] = useState<number>(5);
  const dispatch = useAppDispatch();
  const handleChange = (_: ChangeEvent<{}>, value: number | number[]) => {
    assertIsNumber(value);
    setScore(value);
  };
  return (
    <div>
      <Typography id={`skillArea-${skillAreaId}-sliderLabel`} gutterBottom>
        Rate Yourself (0-10)
      </Typography>
      <Slider
        data-testid={`skillArea-${skillAreaId}-slider`}
        defaultValue={5}
        getAriaValueText={() => `${score}`}
        aria-labelledby={`skillArea-${skillAreaId}-sliderLabel`}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={10}
        onChange={handleChange}
      />
      <Button
        id={`submitScoreBtn`}
        variant="contained"
        onClick={() => {
          dispatch(submitAssessmentToApi({ skillAreaId, score }));
        }}
      >
        Submit Score
      </Button>
    </div>
  );
}

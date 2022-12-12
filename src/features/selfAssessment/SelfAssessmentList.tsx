import { SkillArea } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import SelfAssessmentListError from "./SelfAssessmentListError";
import SelfAssessmentListHeader from "./SelfAssessmentListHeader";
import SelfAssessmentListItems from "./SelfAssessmentListItems";
import SelfAssessmentListLoading from "./SelfAssessmentListLoading";
import { fetchSelfAssessment } from "./selfAssessmentSlice";
import { fetchSkillAreas } from "./skillAreaSlice";

export default function AssessmentListView() {
  const { data: session } = useSession();
  if (!session) {
    return <div>Not allowed</div>;
  }
  const skillAreas = useAppSelector((state) => state.skillAreas);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSkillAreas());
  }, [session]);
  useEffect(() => {
    const idArray: SkillArea["id"][] = Object.keys(skillAreas.skillAreas).map(
      (key) => Number(key)
    );
    for (let skillAreaId of idArray) {
      dispatch(fetchSelfAssessment({ skillAreaId }));
    }
  }, [skillAreas]);
  let content: JSX.Element;
  if (skillAreas.loading) {
    content = <SelfAssessmentListLoading />;
  } else if (skillAreas.error) {
    content = <SelfAssessmentListError errorMessage={skillAreas.error} />;
  } else {
    content = <SelfAssessmentListItems />;
  }
  return (
    <div data-testid="assessmentList">
      <SelfAssessmentListHeader userId={session.user.id} />
      {content}
    </div>
  );
}

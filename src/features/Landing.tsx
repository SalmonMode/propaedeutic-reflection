import { useSession } from "next-auth/react";
import AssessmentListView from "./selfAssessment/SelfAssessmentList";
import NewSkillArea from "./skillArea/NewSkillArea";

export default function LandingPage() {
  const { data: session, status } = useSession();

  if (status !== "authenticated") {
    return <a href="/api/auth/signin">Sign in</a>;
  }
  return (
    <div>
      <NewSkillArea />
      <AssessmentListView />
    </div>
  );
}

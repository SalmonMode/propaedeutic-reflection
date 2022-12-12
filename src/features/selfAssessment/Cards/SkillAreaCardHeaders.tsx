import { Typography } from "@material-ui/core";
import { SkillAreaSummary } from "../../../types";

export default function SkillAreaCardHeaders({
  title,
  description,
}: {
  title: SkillAreaSummary["title"];
  description: SkillAreaSummary["description"];
}) {
  return (
    <div data-testid={`skillAreaCardHeaders`}>
      <Typography variant="h3">{title}</Typography>
      <Typography variant="h4">{description}</Typography>
    </div>
  );
}

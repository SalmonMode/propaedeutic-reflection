import { SkillArea } from "@prisma/client";

export interface CreateNewSkillArea {
  title: string;
  description: string;
}

export interface SkillAreaSummary {
  title: string;
  description: string;
  id: number;
}
export interface SkillAreaSummaryMap {
  [key: SkillArea["id"]]: SkillAreaSummary;
}

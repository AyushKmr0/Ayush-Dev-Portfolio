import type { IconType } from "react-icons/lib";

export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "tools";

export interface Skill {
  id: string;
  name: string;
  icon: IconType
  category: SkillCategory;
  level: "learning" | "familiar" | "proficient";
}

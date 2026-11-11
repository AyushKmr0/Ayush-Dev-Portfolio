
export type ExperienceType = "internship" | "full-time" | "freelance";

export interface Experience {
  id: string;
  company: string;
  role: string;
  type: ExperienceType;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  current: boolean;
}

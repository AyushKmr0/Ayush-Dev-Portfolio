import {
	House,
	User,
	Code2,
	BriefcaseBusiness,
	FolderGit2,
	Mail,
} from "lucide-react";

export const navigationItems = [
	{
		id: "home",
		label: "Home",
		icon: House,
	},
	{
		id: "about",
		label: "About",
		icon: User,
	},
	{
		id: "skills",
		label: "Skills",
		icon: Code2,
	},
	{
		id: "projects",
		label: "Projects",
		icon: FolderGit2,
	},
	{
		id: "experience",
		label: "Experience",
		icon: BriefcaseBusiness,
	},
	{
		id: "contact",
		label: "Contact",
		icon: Mail,
	},
] as const;

export type SectionId = (typeof navigationItems)[number]["id"];

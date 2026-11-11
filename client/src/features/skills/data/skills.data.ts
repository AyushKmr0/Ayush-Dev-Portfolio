import {
	SiReact,
	SiTypescript,
	SiJavascript,
	SiHtml5,
	SiTailwindcss,
	SiRedux,
	SiNodedotjs,
	SiExpress,
	SiDotnet,
	SiMongodb,
	SiMysql,
	SiRedis,
	SiGit,
	SiGithub,
	SiDocker,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { FaCss3Alt } from "react-icons/fa";
import { DiMsqlServer } from "react-icons/di";

import type { Skill } from "../types/skills.types";

export const skills: Skill[] = [
	// Frontend
	{
		id: "react",
		name: "React",
		icon: SiReact,
		category: "frontend",
		level: "proficient",
	},
	{
		id: "typescript",
		name: "TypeScript",
		icon: SiTypescript,
		category: "frontend",
		level: "familiar",
	},
	{
		id: "javascript",
		name: "JavaScript",
		icon: SiJavascript,
		category: "frontend",
		level: "proficient",
	},
	{
		id: "html",
		name: "HTML",
		icon: SiHtml5,
		category: "frontend",
		level: "proficient",
	},
	{
		id: "css",
		name: "CSS",
		icon: FaCss3Alt,
		category: "frontend",
		level: "proficient",
	},
	{
		id: "tailwind",
		name: "Tailwind CSS",
		icon: SiTailwindcss,
		category: "frontend",
		level: "familiar",
	},
	{
		id: "redux",
		name: "Redux Toolkit",
		icon: SiRedux,
		category: "frontend",
		level: "familiar",
	},

	// Backend
	{
		id: "node",
		name: "Node.js",
		icon: SiNodedotjs,
		category: "backend",
		level: "proficient",
	},
	{
		id: "express",
		name: "Express.js",
		icon: SiExpress,
		category: "backend",
		level: "proficient",
	},
	{
		id: "csharp",
		name: "C#",
		icon: TbBrandCSharp,
		category: "backend",
		level: "familiar",
	},
	{
		id: "dotnet",
		name: "ASP.NET Core",
		icon: SiDotnet,
		category: "backend",
		level: "learning",
	},

	// Databases
	{
		id: "mongodb",
		name: "MongoDB",
		icon: SiMongodb,
		category: "database",
		level: "proficient",
	},
	{
		id: "mysql",
		name: "MySQL",
		icon: SiMysql,
		category: "database",
		level: "learning",
	},
	{
		id: "sqlserver",
		name: "SQL Server",
		icon: DiMsqlServer ,
		category: "database",
		level: "learning",
	},
	{
		id: "redis",
		name: "Redis",
		icon: SiRedis,
		category: "database",
		level: "learning",
	},

	// Tools
	{
		id: "git",
		name: "Git",
		icon: SiGit,
		category: "tools",
		level: "familiar",
	},
	{
		id: "github",
		name: "GitHub",
		icon: SiGithub,
		category: "tools",
		level: "familiar",
	},
	{
		id: "docker",
		name: "Docker",
		icon: SiDocker,
		category: "tools",
		level: "learning",
	},
];

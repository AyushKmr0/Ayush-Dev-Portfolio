import type { CSSProperties } from "react";
import type { Skill } from "../types/skills.types";

const skillColors: Record<string, string> = {
	react: "#61DAFB",
	typescript: "#3178C6",
	javascript: "#F7DF1E",
	html: "#E34F26",
	css: "#1572B6",
	tailwind: "#06B6D4",
	redux: "#764ABC",
	node: "#5FA04E",
	express: "#000000",
	csharp: "#9B4F96",
	dotnet: "#512BD4",
	mongodb: "#47A248",
	mysql: "#4479A1",
	sqlserver: "#CC2927",
	redis: "#FF4438",
	git: "#F05032",
	github: "#181717",
	docker: "#2496ED",
};

interface SkillNodeProps {
	skill: Skill;
	index: number;
	registerElement: (index: number, element: HTMLDivElement | null) => void;
}

const SkillNode = ({ skill, index, registerElement }: SkillNodeProps) => {
	const Icon = skill.icon;
	const style: CSSProperties = {
		color: skillColors[skill.id] ?? "#475569",
		transform:
			"translate3d(-10000px, -10000px, 0) translate(-50%, -50%) scale(var(--node-scale, 1))",
	};

	return (
		<div
			ref={(element) => registerElement(index, element)}
			style={style}
			className="pointer-events-auto absolute left-0 top-0 z-10 flex cursor-pointer flex-col items-center whitespace-nowrap font-mono font-semibold transition-[opacity,transform] duration-200 "
			onPointerEnter={(event) =>
				event.currentTarget.style.setProperty("--node-scale", "1.12")
			}
			onPointerLeave={(event) =>
				event.currentTarget.style.setProperty("--node-scale", "1")
			}>
			<div className="hover:scale-130 transition-transform duration-200 flex flex-col items-center tracking-widest">
				<Icon
					className="text-5xl sm:text-6xl lg:text-7xl"
					style={{ filter: `drop-shadow(0 0 7px ${style.color}10)` }}
					aria-hidden="true"
				/>
				<span className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">
					{skill.name}
				</span>
			</div>
		</div>
	);
};

export default SkillNode;

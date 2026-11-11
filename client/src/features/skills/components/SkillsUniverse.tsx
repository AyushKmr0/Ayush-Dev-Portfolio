import { Globe } from "lucide-react";

import { skills } from "../data/skills.data";
import SkillGlobe from "./SkillGlobe";

const SkillsUniverse = () => {
	return (
		<div
			className="relative mx-auto flex h-[420px] w-full max-w-6xl items-center justify-center overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 sm:h-[580px] lg:h-[700px]"
			style={{
				backgroundImage:
					"linear-gradient(rgba(148,163,184,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.10) 1px, transparent 1px)",
				backgroundSize: "52px 52px",
			}}>
			<SkillGlobe skills={skills} />

			<div className="pointer-events-none absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-blue-200 bg-white/80 px-3 py-2 font-mono text-[10px] font-bold text-slate-600 shadow-sm backdrop-blur sm:bottom-5 sm:px-4 sm:text-xs">
				<Globe size={24} className="text-orange-600" />
				Drag to explore skills universe
			</div>
		</div>
	);
};

export default SkillsUniverse;

import { motion } from "framer-motion";
import {
	ArrowUpRight,
	GitBranchIcon,
	GitFork,
	Pin,
	Star,
} from "lucide-react";
import { IoGitCompare } from "react-icons/io5";


import type { Project } from "../types/projects.types";
import { ProjectLinks } from "./ProjectLinks";

interface ProjectCardProps {
	project: Project;
	index: number;
	isPinned: boolean;
	onTogglePin: (projectId: number) => void;
}

export function ProjectCard({
	project,
	index,
	isPinned,
	onTogglePin,
}: ProjectCardProps) {
	return (
		<motion.article
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.15 }}
			transition={{ duration: 0.4, delay: index * 0.06 }}
			className="flex h-full min-h-[280px] flex-col rounded-xl border border-slate-200 bg-white shadow-(--shadow-blue-hover) transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-(--shadow-multi-secondary)">

			<div className="flex flex-1 flex-col p-3 sm:p-4">
				<a
					href={project.htmlUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center justify-start gap-2 text-md font-bold text-slate-900 hover:text-blue-700">
					<IoGitCompare className=""/>
					{project.name.replace(/[-_]/g, " ")}
					<ArrowUpRight
						size={16}
						className="mt-1 shrink-0 text-slate-400 hover:text-blue-600"
					/>
				</a>
				<p className="mt-3 line-clamp-4 min-h-20 text-[12px] tracking-wider leading-6 text-slate-600">
					{project.description ||
						"No repository description provided."}
				</p>

				{project.topics.length > 0 && (
					<div className="mt-4 flex flex-wrap gap-2">
						{project.topics.slice(0, 5).map((topic) => (
							<span
								key={topic}
								className="rounded-md border border-blue-200 bg-blue-50 px-2 py-1 font-mono text-[10px] text-blue-700">
								{topic}
							</span>
						))}
					</div>
				)}

				<div className="mt-auto flex flex-nowrap items-center justify-between gap-2 border-t border-slate-100 pt-2 text-xs text-slate-500">
					<div className="flex shrink-0 gap-3">
						<span
							className="inline-flex items-center gap-1.5"
							title="Commits">
							<GitBranchIcon size={14} />
							{project.commitCount ?? "—"} commits
						</span>
						<span
							className="inline-flex items-center gap-1.5"
							title="Stars">
							<Star size={13} />
							{project.stars}
						</span>
						<span
							className="inline-flex items-center gap-1.5"
							title="Forks">
							<GitFork size={13} />
							{project.forks}
						</span>
					</div>
					<div className="flex shrink-0 items-center justify-end gap-3">
						<button
							type="button"
							onClick={() => onTogglePin(project.id)}
							aria-pressed={isPinned}
							aria-label={`${isPinned ? "Unpin" : "Pin"} ${project.name}`}
							title={isPinned ? "Unpin project" : "Pin project"}
							className={`rounded p-1 transition -rotate-45 hover:bg-blue-100 ${isPinned ? "text-slate-400" : "text-slate-400 hover:text-blue-700"}`}>
							<Pin
								size={14}
								className={isPinned ? "fill-current" : ""}
							/>
						</button>
						<ProjectLinks githubUrl={project.htmlUrl} />
					</div>
				</div>
			</div>
		</motion.article>
	);
}

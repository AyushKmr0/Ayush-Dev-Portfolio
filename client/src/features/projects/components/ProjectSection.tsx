import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, FolderGit2 } from "lucide-react";

import SectionWrapper from "../../../components/common/SectionWrapper";
import SectionHeading from "../../../components/common/SectionHeading";
import { fetchCommitCount, fetchGitHubProjects } from "../data/projects.api";
import { githubUsername } from "../data/projects.data";
import type { Project } from "../types/projects.types";
import { ProjectGrid } from "./ProjectGrid";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui";

const PINNED_PROJECTS_STORAGE_KEY = "portfolio:pinned-github-projects";
const PROJECTS_PER_PAGE = 4;

function readPinnedProjectIds(): number[] {
	if (typeof window === "undefined") return [];

	try {
		const storedValue: unknown = JSON.parse(
			window.localStorage.getItem(PINNED_PROJECTS_STORAGE_KEY) ?? "[]",
		);
		return Array.isArray(storedValue)
			? storedValue.filter((id): id is number => Number.isSafeInteger(id))
			: [];
	} catch {
		return [];
	}
}

function formatPushedAt(date: string | null) {
	if (!date) return "No pushes yet";
	return new Intl.DateTimeFormat("en", {
		month: "short",
		year: "numeric",
	}).format(new Date(date));
}

export function ProjectsSection() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [reloadKey, setReloadKey] = useState(0);
	const [page, setPage] = useState(0);
	const [pinnedIds, setPinnedIds] = useState<number[]>(readPinnedProjectIds);
	const [attemptedCommitIds, setAttemptedCommitIds] = useState<Set<number>>(
		() => new Set(),
	);
	const orderedProjects = useMemo(
		() =>
			[...projects].sort((a, b) => {
				const pinOrder =
					Number(pinnedIds.includes(b.id)) -
					Number(pinnedIds.includes(a.id));
				if (pinOrder !== 0) return pinOrder;

				const pushedOrder =
					Date.parse(b.pushedAt ?? "") - Date.parse(a.pushedAt ?? "");
				if (Number.isFinite(pushedOrder) && pushedOrder !== 0)
					return pushedOrder;
				if (a.pushedAt) return -1;
				if (b.pushedAt) return 1;
				return a.name.localeCompare(b.name);
			}),
		[projects, pinnedIds],
	);
	const pageCount = Math.ceil(orderedProjects.length / PROJECTS_PER_PAGE);
	const visibleProjects = useMemo(
		() =>
			orderedProjects.slice(
				page * PROJECTS_PER_PAGE,
				(page + 1) * PROJECTS_PER_PAGE,
			),
		[orderedProjects, page],
	);

	useEffect(() => {
		const controller = new AbortController();

		fetchGitHubProjects(githubUsername, controller.signal)
			.then(setProjects)
			.catch((fetchError: unknown) => {
				if (
					fetchError instanceof DOMException &&
					fetchError.name === "AbortError"
				)
					return;
				setError(
					fetchError instanceof Error
						? fetchError.message
						: "Could not load GitHub projects.",
				);
			})
			.finally(() => {
				if (!controller.signal.aborted) setLoading(false);
			});

		return () => controller.abort();
	}, [reloadKey]);

	useEffect(() => {
		try {
			window.localStorage.setItem(
				PINNED_PROJECTS_STORAGE_KEY,
				JSON.stringify(pinnedIds),
			);
		} catch {
			// Pinning still works for this session if browser storage is unavailable.
		}
	}, [pinnedIds]);

	useEffect(() => {
		if (loading) return;
		const projectsNeedingCommitCount = visibleProjects.filter(
			(project) =>
				project.commitCount === null &&
				!attemptedCommitIds.has(project.id),
		);
		if (projectsNeedingCommitCount.length === 0) return;

		const controller = new AbortController();
		Promise.all(
			projectsNeedingCommitCount.map(async (project) => ({
				id: project.id,
				commitCount: await fetchCommitCount(
					githubUsername,
					project.name,
					controller.signal,
				),
			})),
		)
			.then((results) => {
				if (controller.signal.aborted) return;
				setProjects((currentProjects) =>
					currentProjects.map((project) => {
						const result = results.find(
							(item) => item.id === project.id,
						);
						return result
							? { ...project, commitCount: result.commitCount }
							: project;
					}),
				);
				setAttemptedCommitIds(
					(current) =>
						new Set([
							...current,
							...results.map((result) => result.id),
						]),
				);
			})
			.catch(() => {
				// A page change can abort the requests; the new page loads its own counts.
			});

		return () => controller.abort();
	}, [attemptedCommitIds, loading, visibleProjects]);

	const togglePinnedProject = (projectId: number) => {
		setPinnedIds((current) =>
			current.includes(projectId)
				? current.filter((id) => id !== projectId)
				: [...current, projectId],
		);
		setPage(0);
	};

	const retryFetchProjects = () => {
		setProjects([]);
		setError(null);
		setLoading(true);
		setPage(0);
		setAttemptedCommitIds(new Set());
		setReloadKey((current) => current + 1);
	};

	return (
		<SectionWrapper id="projects">
			<SectionHeading
				label="MY WORK"
				title="GitHub Projects"
				command="$ ls -la ~/projects"
				description="Live GitHub repository details. Pin projects here to keep them at the front of this list."
			/>

			<div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.6fr]">
				<aside className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-(--shadow-multi-secondary)">
					<div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
						<div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
							<FolderGit2 size={16} className="text-blue-600" />
							Repository Index
						</div>
						<span className="rounded-full bg-slate-200 px-2 py-0.5 font-mono text-xs text-slate-600">
							{projects.length}
						</span>
					</div>

					{loading ? (
						<LoadingState
							message="Loading repositories…"
							className="min-h-0 px-4 py-10"
						/>
					) : error ? (
						<p className="px-4 py-5 text-sm text-rose-600">
							{error}
						</p>
					) : (
						<ul className="max-h-[30rem] divide-y divide-slate-100 overflow-y-auto">
							{orderedProjects.map((project) => (
								<li key={project.id}>
									<a
										href={project.htmlUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="block px-4 py-4 transition hover:bg-blue-50/60">
										<div className="flex items-center justify-between gap-3">
											<span className="truncate font-semibold text-blue-600">
												{project.name}
											</span>
											<span className="capitalize bg-slate-200 px-3 py-1 rounded-full text-slate-700 font-medium text-xs">
												{project.visibility}
											</span>
										</div>
										<div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 italic font-light">
											<span>
												{project.language ?? "Unknown"}
											</span>
											<span>
												Updated{" "}
												{formatPushedAt(
													project.pushedAt,
												)}
											</span>
										</div>
									</a>
								</li>
							))}
						</ul>
					)}
				</aside>

				<div>
					<h3 className="mb-4 border-b border-slate-200 pb-3 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">
						GitHub Projects
					</h3>
					{loading ? (
						<LoadingState
							message="Fetching project details from GitHub…"
							className="min-h-40 rounded-xl border border-slate-200 bg-white p-6"
						/>
					) : error ? (
						<ErrorState
							message={error}
							onRetry={retryFetchProjects}
						/>
					) : projects.length > 0 ? (
						<>
							<div className="flex flex-col">
								<ProjectGrid
									projects={visibleProjects}
									pinnedIds={pinnedIds}
									onTogglePin={togglePinnedProject}
								/>
								<div className="mt-auto flex min-h-14 items-center justify-between pt-5">
									<button
										type="button"
										onClick={() =>
											setPage((current) =>
												Math.max(0, current - 1),
											)
										}
										disabled={page === 0}
										aria-label="Show previous projects"
										className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40">
										<ChevronLeft size={16} /> Previous
									</button>
									<span
										className="font-mono text-xs text-slate-500"
										aria-live="polite">
										{page + 1} / {pageCount}
									</span>
									<button
										type="button"
										onClick={() =>
											setPage((current) =>
												Math.min(
													pageCount - 1,
													current + 1,
												),
											)
										}
										disabled={page >= pageCount - 1}
										aria-label="Show next projects"
										className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40">
										Next <ChevronRight size={16} />
									</button>
								</div>
							</div>
						</>
					) : (
						<EmptyState
							title="No public repositories found"
							description="Public GitHub repositories will appear here when available."
						/>
					)}
				</div>
			</div>
		</SectionWrapper>
	);
}

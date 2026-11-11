import type { Project } from "../types/projects.types";

interface GitHubRepository {
	id: number;
	name: string;
	private: boolean;
	description: string | null;
	html_url: string;
	language: string | null;
	topics?: string[];
	stargazers_count: number;
	forks_count: number;
	pushed_at: string | null;
	fork: boolean;
	archived: boolean;
}

export async function fetchCommitCount(
	username: string,
	repository: string,
	signal: AbortSignal,
): Promise<number | null> {
	try {
		const response = await fetch(
			`https://api.github.com/repos/${username}/${repository}/commits?per_page=1`,
			{ headers: { Accept: "application/vnd.github+json" }, signal },
		);

		if (!response.ok) return null;

		const commits: unknown[] = await response.json();
		if (commits.length === 0) return 0;

		const lastPage = response.headers
			.get("Link")
			?.match(/[?&]page=(\d+)>;\s*rel="last"/)?.[1];

		return lastPage ? Number(lastPage) : commits.length;
	} catch (error) {
		if (error instanceof DOMException && error.name === "AbortError") throw error;
		return null;
	}
}

export async function fetchGitHubProjects(
	username: string,
	signal: AbortSignal,
): Promise<Project[]> {
	const response = await fetch(
		`https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=100&type=owner`,
		{ headers: { Accept: "application/vnd.github+json" }, signal },
	);

	if (!response.ok) {
		throw new Error(
			response.status === 403
				? "GitHub API rate limit reached. Please try again later."
				: "Could not load projects from GitHub.",
		);
	}

	const repositories: GitHubRepository[] = await response.json();
	return repositories.map((repository) => ({
			id: repository.id,
			name: repository.name,
			visibility: repository.private ? "private" : "public",
			description: repository.description,
			htmlUrl: repository.html_url,
			language: repository.language,
			topics: repository.topics ?? [],
			stars: repository.stargazers_count,
			forks: repository.forks_count,
			pushedAt: repository.pushed_at,
			commitCount: null,
		}));
}

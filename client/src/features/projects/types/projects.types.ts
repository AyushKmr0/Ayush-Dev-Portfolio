export interface Project {
	id: number;
	name: string;
	visibility: "public" | "private";
	description: string | null;
	htmlUrl: string;
	language: string | null;
	topics: string[];
	stars: number;
	forks: number;
	pushedAt: string | null;
	commitCount: number | null;
}

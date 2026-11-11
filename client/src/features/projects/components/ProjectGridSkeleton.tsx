import { ProjectCardSkeleton } from "./ProjectCardSkeleton";

interface ProjectGridSkeletonProps {
	count?: number;
}

export function ProjectGridSkeleton({ count = 3 }: ProjectGridSkeletonProps) {
	return (
		<div
			className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
			aria-label="Loading projects">
			{Array.from({ length: count }, (_, index) => (
				<ProjectCardSkeleton key={index} />
			))}
		</div>
	);
}

import { Skeleton } from "../../../components/ui/Skeleton";

export function ProjectCardSkeleton() {
	return (
		<div className="overflow-hidden rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
			<Skeleton className="h-44 w-full" />

			<div className="mt-5 space-y-3">
				<Skeleton className="h-3 w-1/4" />
				<Skeleton className="h-6 w-2/3" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-5/6" />

				<div className="flex gap-2 pt-2">
					<Skeleton className="h-7 w-16" />
					<Skeleton className="h-7 w-20" />
					<Skeleton className="h-7 w-16" />
				</div>
			</div>
		</div>
	);
}

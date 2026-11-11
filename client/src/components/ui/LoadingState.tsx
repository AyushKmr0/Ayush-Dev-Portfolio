import LatticeLoader from "./animations/LatticeLoader";

interface LoadingStateProps {
	message?: string;
	className?: string;
}

export function LoadingState({
	message = "Loading...",
	className = "min-h-40",
}: LoadingStateProps) {
	return (
		<div
			className={`flex items-center justify-center text-slate-500 ${className}`}>
			<LatticeLoader
				label={message}
				color="#2563eb"
				pattern="orbit"
				cellSize={7}
				gap={2}
				fontSize={14}
				showTimer={false}
			/>
		</div>
	);
}

import { GitCommitHorizontal } from "lucide-react";

interface TimelineConnectorProps {
	isLast: boolean;
}

const TimelineConnector = ({ isLast }: TimelineConnectorProps) => {
	return (
		<div className="relative flex h-full flex-col items-center">
			<div
				className="
        relative z-10 flex h-10 w-10 shrink-0
        items-center justify-center rounded-xl
        border border-blue-200 bg-white
        text-blue-600 shadow-sm
      ">
				<GitCommitHorizontal size={20} />
			</div>

			{!isLast && (
				<div
					className="
          mt-2 min-h-20 w-px flex-1
          bg-gradient-to-b from-blue-400 to-blue-100
        "
				/>
			)}
		</div>
	);
};

export default TimelineConnector;

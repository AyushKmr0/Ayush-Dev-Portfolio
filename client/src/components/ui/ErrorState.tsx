import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
	message?: string;
	onRetry?: () => void;
}

export function ErrorState({
	message = "Something went wrong. Please try again.",
	onRetry,
}: ErrorStateProps) {
	return (
		<div
			role="alert"
			className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-xl border border-red-100 bg-red-50/50 p-6 text-center">
			<AlertCircle size={28} className="text-red-500" />

			<p className="max-w-md text-sm text-slate-700">{message}</p>

			{onRetry && (
				<button
					type="button"
					onClick={onRetry}
					className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
					<RefreshCw size={15} />
					Try again
				</button>
			)}
		</div>
	);
}

import { Terminal, ChevronRight, Code2 } from "lucide-react";

import { aboutProfile } from "../data/about.data";

const AboutTerminal = () => {
	return (
		<div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-(--shadow-multi-secondary)">
			<div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-4">
				<div className="flex items-center gap-3">
					<Terminal size={17} className="text-blue-600" />

					<span className="font-mono text-xs font-semibold text-slate-700">
						about.sh
					</span>
				</div>

				<div className="flex gap-1.5">
					<span className="h-2.5 w-2.5 rounded-full bg-red-400" />
					<span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
					<span className="h-2.5 w-2.5 rounded-full bg-green-400" />
				</div>
			</div>

			<div className="space-y-6 p-5 sm:p-7">
				<div>
					<div className="flex items-center gap-2 font-mono text-xs text-blue-600">
						<ChevronRight size={15} />
						whoami
					</div>

					<h3 className="mt-3 text-xl font-bold text-slate-900">
						A developer who enjoys building things.
					</h3>

					<p className="mt-3 text-sm leading-7 text-slate-600">
						{aboutProfile.introduction}
					</p>
				</div>

				<div className="border-t border-slate-100 pt-5">
					<div className="flex items-center gap-2 font-mono text-xs text-blue-600">
						<ChevronRight size={15} />
						cat interests.json
					</div>

					<div className="mt-4 flex flex-wrap gap-2">
						{aboutProfile.interests.map((interest) => (
							<span
								key={interest}
								className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700">
								{interest}
							</span>
						))}
					</div>
				</div>

				<div className="border-t border-slate-100 pt-5">
					<div className="flex items-center gap-2 font-mono text-xs text-blue-600">
						<ChevronRight size={15} />
						current_focus
					</div>

					<div className="mt-4 flex items-start gap-3 rounded-xl p-4">
						<Code2
							size={19}
							className="mt-0.5 shrink-0 text-blue-600"
						/>

						<div>
							<p className="text-sm font-semibold text-slate-800">
								Modern Web Engineering
							</p>

							<p className="mt-1 text-xs leading-5 text-slate-500">
								Exploring scalable frontend architecture,
								backend development and database design.
							</p>
						</div>
					</div>
				</div>
			</div>

		</div>
	);
};

export default AboutTerminal;

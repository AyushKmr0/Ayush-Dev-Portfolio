import type { ReactNode } from "react";
import { Code2 } from "lucide-react";

import { aboutProfile, socialLinks } from "../../about/data/about.data";

const email =
	socialLinks
		.find((link) => link.name === "Email")
		?.url.replace("mailto:", "") ?? "Email unavailable";
const github =
	socialLinks
		.find((link) => link.name === "GitHub")
		?.url.replace("https://", "") ?? "GitHub unavailable";
const linkedIn =
	socialLinks
		.find((link) => link.name === "LinkedIn")
		?.url.replace("https://www.", "") ?? "LinkedIn unavailable";

const codeLines: ReactNode[] = [
	<span className="text-slate-800">{"{"}</span>,
	<>
		{"  "}
		<span className="text-blue-600">"status"</span>:{" "}
		<span className="text-orange-600">"open to opportunities"</span>,
	</>,
	<>
		{"  "}
		<span className="text-blue-600">"email"</span>:{" "}
		<span className="text-orange-600">"{email}"</span>,
	</>,
	<>
		{"  "}
		<span className="text-blue-600">"socials"</span>:{" "}
		<span className="text-slate-600">{"{"}</span>
	</>,
	<>
		{"    "}
		<span className="text-blue-600">"github"</span>:{" "}
		<span className="text-orange-600">"{github}"</span>,
	</>,
	<>
		{"    "}
		<span className="text-blue-600">"linkedin"</span>:{" "}
		<span className="text-orange-600">"{linkedIn}"</span>
	</>,
	<>
		<span className="text-slate-600">{"  },"}</span>
	</>,
	<>
		{"  "}
		<span className="text-blue-600">"location"</span>:{" "}
		<span className="text-orange-600">"{aboutProfile.about.location}"</span>
	</>,
	<span className="text-slate-600">{"}"}</span>,
];

export function ContactInfo() {
	return (
		<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-(--shadow-multi-secondary)">
			<div className="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-4 py-3 sm:px-5">
				<div className="flex items-center gap-2">
					<span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
					<span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
					<span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
				</div>
				<div className="flex items-center gap-2 font-mono text-xs text-slate-500">
					<Code2 size={14} className="text-blue-600" />
					contact_info.json
				</div>
			</div>

			<div className="overflow-x-auto bg-white px-6 py-6 sm:px-8 sm:py-8">
				<div className="min-w-max font-mono text-xs leading-8 sm:text-sm">
					{codeLines.map((line, index) => (
						<div
							key={index}
							className="grid grid-cols-[2rem_1fr] gap-6">
							<span className="select-none text-right text-slate-600">
								{String(index + 1).padStart(2, "0")}
							</span>
							<code className="whitespace-pre">{line}</code>
						</div>
					))}
					<div className="mt-5 grid grid-cols-[2rem_1fr] gap-4 text-slate-500">
						<span className="select-none text-right">10</span>
						<code>// waiting for your message...</code>
					</div>
					<div className="grid grid-cols-[2rem_1fr] gap-4">
						<span className="select-none text-right text-slate-600">
							11
						</span>
						<span
							className="h-4 w-2 animate-pulse bg-orange-500"
							aria-hidden="true"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

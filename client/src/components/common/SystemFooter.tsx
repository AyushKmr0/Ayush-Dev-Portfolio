import { Code2 } from "lucide-react";

const SystemFooter = () => (
	<footer className="relative border-t border-blue-100 px-4 py-10 text-center sm:px-6 flex flex-col items-center justify-center">
		<Code2 className="absolute lg:left-1/3 text-slate-200" size={150} />
		<div className="z-100">
			<p className="flex flex-wrap items-center justify-center gap-2 font-mono text-lg font-bold text-slate-800">
				Ayush Kumar
				<span className="text-slate-400">|</span>
				Software Developer
			</p>
			<p className="mt-2 font-mono text-xs text-slate-400">
				© {new Date().getFullYear()} Ayush Kumar. All rights reserved.
			</p>
		</div>
	</footer>
);

export default SystemFooter;

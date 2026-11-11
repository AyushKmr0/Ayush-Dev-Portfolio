import { useEffect, useState } from "react";

import TechText from "@/components/ui/animations/TechText";

const INTRO_DURATION_MS = 4000;
const EXIT_TRANSITION_MS = 800;

const LandingIntro = () => {
	const [isMounted, setIsMounted] = useState(true);
	const [isLeaving, setIsLeaving] = useState(false);

	useEffect(() => {
		if (!isMounted) return;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [isMounted]);

	useEffect(() => {
		if (!isMounted || isLeaving) return;

		const timeoutId = window.setTimeout(
			() => setIsLeaving(true),
			INTRO_DURATION_MS,
		);
		return () => window.clearTimeout(timeoutId);
	}, [isMounted, isLeaving]);

	useEffect(() => {
		if (!isLeaving) return;

		const timeoutId = window.setTimeout(
			() => setIsMounted(false),
			EXIT_TRANSITION_MS,
		);
		return () => window.clearTimeout(timeoutId);
	}, [isLeaving]);

	if (!isMounted) return null;

	return (
		<div
			className={`portfolio-content-zoom fixed inset-0 z-[100] flex min-h-screen flex-col justify-between overflow-hidden bg-slate-100 px-6 py-7 text-slate-400 transition-opacity duration-500 ease-out motion-reduce:transition-none sm:px-10 sm:py-9 ${
				isLeaving ? "pointer-events-none opacity-0" : "opacity-100"
			}`}>
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.16),transparent_58%)]" />

			<header className="relative z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400 sm:text-xs">
				<span>Ayush Kumar</span>
				<span>Portfolio</span>
			</header>

			<div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-center justify-center">
				<div className="relative h-[min(480px,60vh)] w-full">
					<TechText
						text="AYUSH"
						fontWeight={600}
						fontSize={250}
						reveal="letter"
						dashLength={4}
						dashGap={2}
						specks={15}
						intro="none"
						introDuration={2}
						clickKick
						guides
						fontFamily="JetBrains Mono, monospace"
						letterSpacing={-0.05}
						accentColor="currentColor"
						reach={200}
						softness={0.7}
						lineStyle="dashed"
						strokeWidth={1.5}
						speed={2.9}
						bounce={0.8}
						selection
						labels
						color="currentColor"
						align="center"
						draggable
						sweep
						className="text-slate-800"
						style={{ width: "100%", height: "100%" }}
					/>
				</div>
			</div>

			<footer className="relative z-10 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
				<span>Full-stack developer</span>
				<span>Loading portfolio...</span>
			</footer>
		</div>
	);
};

export default LandingIntro;

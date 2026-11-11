import { useEffect, useState } from "react";

export const useActiveSection = () => {
	const [activeSection, setActiveSection] = useState("home");

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const visibleSections = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);

				if (visibleSections.length > 0) {
					setActiveSection(visibleSections[0].target.id);
				}
			},
			{
				rootMargin: "-20% 0px -60% 0px",
				threshold: [0, 0.25, 0.5, 0.75],
			},
		);

		const sections = document.querySelectorAll("section[id]");

		sections.forEach((section) => observer.observe(section));

		return () => observer.disconnect();
	}, []);

	return activeSection;
};

import type { ReactNode } from "react";

interface SectionWrapperProps {
	id: string;
	children: ReactNode;
	className?: string;
}

const SectionWrapper = ({
	id,
	children,
	className = "",
}: SectionWrapperProps) => {
	return (
		<section
			id={id}
			className={`
        relative mx-auto min-h-screen w-full max-w-[90rem]
        scroll-mt-8
        px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-24
        ${className}
      `}>
			<div className="container-custom">{children}</div>
		</section>
	);
};

export default SectionWrapper;

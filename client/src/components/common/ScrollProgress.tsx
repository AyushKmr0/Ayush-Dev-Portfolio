import { motion, useScroll } from "framer-motion";

const ScrollProgress = () => {
	const { scrollYProgress } = useScroll();

	return (
		<motion.div
			className="
        fixed left-0 top-0 z-[100]
        h-1 w-full origin-left
        bg-blue-600
      "
			style={{
				scaleX: scrollYProgress,
			}}
		/>
	);
};

export default ScrollProgress;

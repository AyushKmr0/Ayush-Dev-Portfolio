
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import { fadeUp } from "../../animations/variants";

interface ScrollRevealProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
}

const ScrollReveal = ({
  children,
  variants = fadeUp,
  className = "",
  delay = 0,
}: ScrollRevealProps) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;


import type { ReactNode } from "react";
import { motion } from "framer-motion";

import {
  staggerContainer,
  staggerItem,
} from "../../animations/variants";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
}

const StaggerContainer = ({
  children,
  className = "",
}: StaggerContainerProps) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
            >
              {child}
            </motion.div>
          ))
        : (
            <motion.div variants={staggerItem}>
              {children}
            </motion.div>
          )}
    </motion.div>
  );
};

export default StaggerContainer;

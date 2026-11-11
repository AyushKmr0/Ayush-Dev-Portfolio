
export const smoothTransition = {
  duration: 0.3,
  ease: "easeInOut" as const,
};

export const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};

export const pageTransition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const hoverTransition = {
  duration: 0.2,
  ease: "easeOut" as const,
};

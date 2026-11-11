
import type { HTMLAttributes } from "react";

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

const Panel = ({
  children,
  glow = false,
  className = "",
  ...props
}: PanelProps) => {
  return (
    <div
      className={`
        rounded-xl border border-border
        bg-white p-6
        card-shadow
        ${glow ? "blue-glow" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Panel;

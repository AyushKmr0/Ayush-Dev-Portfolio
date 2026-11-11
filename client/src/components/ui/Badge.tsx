import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	dot?: boolean;
}

const Badge = ({
	children,
	dot = false,
	className = "",
	...props
}: BadgeProps) => {
	return (
		<span
			className={`
        inline-flex items-center gap-2
        rounded-md border border-blue-200
        bg-blue-50 px-3 py-1.5
        font-mono text-xs font-medium
        text-blue-700
        ${className}
      `}
			{...props}>
			{dot && <span className="h-2 w-2 rounded-full bg-blue-500" />}

			{children}
		</span>
	);
};

export default Badge;

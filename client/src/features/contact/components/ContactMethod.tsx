import type { ReactNode } from "react";

interface ContactMethodProps {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  description: string;
}

export function ContactMethod({
  icon,
  label,
  value,
  href,
  description,
}: ContactMethodProps) {
  return (
    <a
      href={ href }
      target={ href.length ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="group flex items-start gap-4 rounded-xl border border-blue-100 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
        {icon}
      </span>

      <span className="min-w-0">
        <span className="block text-sm font-semibold text-slate-900">
          {label}
        </span>

        <span className="mt-1 block break-all text-sm text-blue-600">
          {value}
        </span>

        <span className="mt-1 block text-xs text-slate-500">
          {description}
        </span>
      </span>
    </a>
  );
}
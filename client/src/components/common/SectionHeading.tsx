import { Cpu, FolderOpen, GitBranch, Mail, Terminal } from "lucide-react";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  number?: string;
  command: string;
}

const SectionHeading = ({
  label,
  title,
  description,
  command,
}: SectionHeadingProps) => {
  const Icon = label.toLowerCase().includes("skills") || label.toLowerCase().includes("technology")
    ? Cpu
    : label.toLowerCase().includes("history")
      ? GitBranch
      : label.toLowerCase().includes("work")
        ? FolderOpen
        : label.toLowerCase().includes("contact")
          ? Mail
          : Terminal;

  return (
    <header className="mb-10 flex items-center gap-3 sm:mb-14">
      <Icon aria-hidden="true" className="shrink-0 text-blue-600" size={24} />
      <h2 className="font-mono text-xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {command.startsWith("$ ") && <span className="text-blue-600">$ </span>}
        {command.startsWith("$ ") ? command.slice(2) : command}
        <span className="sr-only"> — {title}</span>
      </h2>
      {description && <p className="sr-only">{description}</p>}
    </header>
  );
};

export default SectionHeading;

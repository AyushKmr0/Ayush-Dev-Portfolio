import { FaGithub } from "react-icons/fa";

interface ProjectLinksProps {
  githubUrl?: string;
}

export function ProjectLinks({ githubUrl }: ProjectLinksProps) {
  return (
    <div className="flex items-center gap-4">
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View source code on GitHub"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
        >
          <FaGithub size={17} />
          Source
        </a>
      )}

    </div>
  );
}

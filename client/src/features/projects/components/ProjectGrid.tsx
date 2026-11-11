import { ProjectCard } from "./ProjectCard";
import type { Project } from "../types/projects.types";

interface ProjectGridProps {
  projects: Project[];
  pinnedIds: number[];
  onTogglePin: (projectId: number) => void;
}

export function ProjectGrid({ projects, pinnedIds, onTogglePin }: ProjectGridProps) {
  return (
    <div className="grid h-[1160px] grid-cols-1 grid-rows-4 gap-6 xl:h-[588px] xl:grid-cols-2 xl:grid-rows-2">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          isPinned={pinnedIds.includes(project.id)}
          onTogglePin={onTogglePin}
        />
      ))}
    </div>
  );
}

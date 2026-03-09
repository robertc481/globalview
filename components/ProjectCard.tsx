import Image from "next/image";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  coverUrl: string;
  priority?: boolean;
  onClick?: () => void;
}

export default function ProjectCard({
  project,
  coverUrl,
  priority = false,
  onClick,
}: ProjectCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className="group block cursor-pointer text-left"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
        <Image
          src={coverUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
        />
      </div>
      <div className="mt-4">
        <span className="text-xs font-medium uppercase tracking-wider text-primary">
          {project.category}
        </span>
        <h3 className="mt-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-primary">
          {project.title}
        </h3>
      </div>
    </div>
  );
}

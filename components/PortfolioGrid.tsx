"use client";

import { useState } from "react";
import type { Project } from "@/types";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

export interface ProjectWithImages {
  project: Project;
  coverUrl: string;
  galleryUrls: string[];
}

interface PortfolioGridProps {
  items: ProjectWithImages[];
  priorityCount?: number;
}

export default function PortfolioGrid({
  items,
  priorityCount = 3,
}: PortfolioGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <ProjectCard
            key={item.project.slug}
            project={item.project}
            coverUrl={item.coverUrl}
            priority={i < priorityCount}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>

      {activeIndex !== null && (
        <ProjectModal
          images={items[activeIndex].galleryUrls}
          title={items[activeIndex].project.title}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </>
  );
}

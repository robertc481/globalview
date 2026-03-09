import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { getFolderImages, getCloudinaryUrl } from "@/lib/cloudinary";
import PortfolioGrid from "@/components/PortfolioGrid";
import type { ProjectWithImages } from "@/components/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore our collection of architectural projects spanning residential, commercial, hospitality, and cultural spaces.",
  openGraph: {
    title: "Portfolio | Global View",
    description:
      "Explore our collection of architectural projects spanning residential, commercial, hospitality, and cultural spaces.",
  },
};

export default async function PortfolioPage() {
  const items: ProjectWithImages[] = await Promise.all(
    projects.map(async (project) => {
      const images = await getFolderImages(project.folder);
      const cover = images.length > 1 ? images[1] : images[0];

      return {
        project,
        coverUrl: cover
          ? getCloudinaryUrl(cover.public_id, {
              width: 600,
              height: 450,
              crop: "fill",
            })
          : "/placeholder.svg",
        galleryUrls: images.map((img) =>
          getCloudinaryUrl(img.public_id, { width: 1200, crop: "limit" })
        ),
      };
    })
  );

  return (
    <section aria-label="Project portfolio" className="pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="section-label">Our Portfolio</span>
          <h1 className="heading-display mt-4">Global Works</h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-500">
            A curated collection of projects that define our commitment to
            precision, sustainability, and architectural innovation.
          </p>
        </div>

        <div className="mt-16">
          <PortfolioGrid items={items} />
        </div>
      </div>
    </section>
  );
}

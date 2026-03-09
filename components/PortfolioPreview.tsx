import Link from "next/link";
import { projects } from "@/data/projects";
import { getFolderImages, getCloudinaryUrl } from "@/lib/cloudinary";
import PortfolioGrid from "./PortfolioGrid";
import type { ProjectWithImages } from "./PortfolioGrid";

export default async function PortfolioPreview() {
  const featured = projects.slice(0, 3);

  const items: ProjectWithImages[] = await Promise.all(
    featured.map(async (project) => {
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
    <section aria-label="Selected projects" className="section-padding">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="section-label">Selected Work</span>
            <h2 className="heading-section mt-4">Global Works</h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden text-sm font-semibold text-slate-600 transition-colors hover:text-primary md:block"
          >
            See All Projects &rarr;
          </Link>
        </div>

        <div className="mt-12">
          <PortfolioGrid items={items} />
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link
            href="/portfolio"
            className="text-sm font-semibold text-primary"
          >
            See All Projects &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

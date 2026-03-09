import Image from "next/image";
import Link from "next/link";
import { getCloudinaryUrl } from "@/lib/cloudinary";

const features = [
  {
    label: "Sustainable Materials",
    description:
      "Ethically sourced, high-performance composites designed to minimize environmental impact without compromising structural integrity.",
  },
  {
    label: "Fast and efficient",
    description:
      "We perform our work in the most effective manner possible, making every effort to ensure that the process is as smooth as possible. ",
  },
];

export default function AboutSection() {
  return (
    <section aria-label="Our philosophy" className="section-padding">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="section-label">Our Philosophy</span>
            <h2  className="heading-section mt-4">
              Professional approach 
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              Our philosophy centers on the attention to detail and aesthetics are values that are deeply rooted in our company. We make every effort to ensure that the results are fully in line with your dream vision.
            </p>

            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
            >
              Learn more about us
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>

            <div className="mt-10 space-y-8">
              {features.map((feature) => (
                <div key={feature.label} className="flex gap-4">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                      {feature.label}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100">
            <Image
              src={getCloudinaryUrl("globalview/logo/gv_logo_tlo_vert0v", {
                width: 600,
                crop: "limit",
              })}
              alt="Global View Construction"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

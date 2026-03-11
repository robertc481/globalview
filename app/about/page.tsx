import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCloudinaryUrl } from "@/lib/cloudinary";

export const metadata: Metadata = {
  title: "About",
  description:
    "Global View is a multi-disciplinary construction firm focused on bringing your vision to life. We build your dream space.",
  openGraph: {
    title: "About | Global View",
    description:
      "A multi-disciplinary construction firm focused on futuristic design and technical excellence.",
  },
};

const philosophy = [
  {
    number: "01",
    category: "Innovation",
    title: "Professional Expertise",
    description:
      "We provide a wide range of expertise to help you bring your vision to life.",
  },
  {
    number: "02",
    category: "Quality of services",
    title: "Quality of services",
    description:
      "We make every effort to ensure that your vision is reflected in the best possible way.",
  },
  {
    number: "03",
    category: "Aesthetics",
    title: "Comprehensive care",
    description:
      "We guarantee professional and easy communication during and after the completion of the renovation.",
  },
];

const services = ["House extension", "Home renovation", "Loft conversions", "Plumbing and heating", "Electrics and wiring", "Kitchen installation", "Bathroom installation", "Painting and decorating services", "Plastering and rendering", "Groundworks", "Garden landscaping"]

const locations = ["Wiltshire", "Somerset", "Gloucestershire", "Berkshire", "Hampshire"];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section aria-label="About GV Construction" className="pb-4 pt-32 md:pb-6 md:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <span className="section-label">Visionary Construction</span>
              <h1 className="heading-display mt-4">
                Defined by
                <br />
                Precision.
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-slate-500">
                Global View is a multi-disciplinary construction firm focused on
                the synthesis of futuristic design and technical excellence. We
                build for the next century.
              </p>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={getCloudinaryUrl("globalview/logo/gv_logo_tlo_vert0v", {
                  width: 600,
                  height: 450,
                  crop: "fill",
                })}
                alt="Modern architectural structure"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

       {/* Services */}
       <section aria-label="Locations of services" className="section-padding bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="section-label">Our services</span>
          <h2 className="heading-section mt-4">We specialise in:</h2>
          <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service} className="flex items-center gap-2 text-base font-medium text-slate-900">
                <span className="text-slate-900">&bull;</span>
                {service}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Locations */}
      <section aria-label="Locations of services" className="section-padding">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="section-label">Our Locations</span>
          <h2 className="heading-section mt-4">We do operate in the following areas:</h2>
          <ul className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            {locations.map((location) => (
              <li key={location} className="flex items-center gap-2 text-base font-medium text-slate-900">
                <span className="text-slate-900">&bull;</span>
                {location}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Map */}
      <section aria-label="Location map" className="pb-10 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="section-label">Our Location</span>
          <h2 className="heading-section mt-4">Find Us</h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-500">
            GV Construction, 36 Moonrakers, Devizes SN10 2DY
          </p>
          <div className="mt-10 aspect-[21/9] overflow-hidden rounded-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2488.5!2d-1.9948!3d51.3524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84b8f3bf33e56f5d%3A0xd5b851a4a84c9442!2sGV%20Construction%2C%2036%20Moonrakers%2C%20Devizes%20SN10%202DY!5e0!3m2!1sen!2suk!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="GV Construction location"
            />
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section aria-label="Our services" className="section-padding bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {philosophy.map((philosophy) => (
              <article
                key={philosophy.number}
                className="border-t border-slate-200 pt-8"
              >
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-semibold">{philosophy.number}</span>
                  <span>/</span>
                  <span className="uppercase tracking-wider">
                    {philosophy.category}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  {philosophy.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {philosophy.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-label="Call to action" className="py-10 md:py-14 lg:py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="heading-display mx-auto max-w-xl">
            Ready to build the <em className="not-italic text-primary">next era</em>?
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Start Exploration
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border-2 border-slate-300 px-8 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900"
            >
              Our Portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

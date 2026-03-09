import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have a project in mind? Reach out to Global View. We specialize in translating futuristic concepts into structural reality.",
  openGraph: {
    title: "Contact | Global View",
    description:
      "Have a project in mind? Reach out to Global View. We specialize in translating futuristic concepts into structural reality.",
  },
};

const contactInfo = [
  {
    label: "Call Us",
    value: "+44 7947322132",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
        />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "ratynski.cezary@gmail.com",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        />
      </svg>
    ),
  },
  {
    label: "Headquarters",
    value: "36 Moonrakers, Devizes SN10 2DY",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
      </svg>
    ),
  },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com/globalview_construction" },
];

export default function ContactPage() {
  return (
    <>
      {/* Contact hero + form */}
      <section aria-label="Contact information and inquiry form" className="pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Left column — info */}
            <div>
              <span className="section-label flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
                Contact Hub
              </span>
              <h1 className="heading-display mt-4">
                Constructing
                <br />
                <span className="text-primary">Visionary</span>
                <br />
                Spaces.
              </h1>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-slate-500">
                Have a project in mind? Our team specializes in translating
                futuristic concepts into structural reality. Reach out today.
              </p>

              <div className="mt-10 space-y-4">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 rounded-xl border border-slate-100 p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-600">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-xs font-medium uppercase tracking-wider text-primary">
                        {item.label}
                      </span>
                      <p className="text-sm font-medium text-slate-900">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Follow Us
                </p>
                <div className="mt-3 flex gap-4">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.label} (opens in new tab)`}
                      className="text-sm text-slate-500 transition-colors hover:text-primary"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column — form */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:p-8 lg:mt-4">
              <h2 className="text-xl font-bold text-slate-900">
                Send an Inquiry
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                We respond to all professional inquiries within one business
                day.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section aria-label="Location map" className="pb-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="aspect-[21/9] overflow-hidden rounded-lg">
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
    </>
  );
}

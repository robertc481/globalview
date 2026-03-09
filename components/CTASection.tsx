import Link from "next/link";

export default function CTASection() {
  return (
    <section aria-label="Start a project" className="section-padding bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <h2 className="heading-display mx-auto max-w-xl">
          Let&apos;s build with intent.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base text-slate-500">
          Ready to transform your vision into architectural reality? Start the
          conversation today.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full border-2 border-slate-900 px-8 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-900 hover:text-white"
          >
            Start a Project
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border-2 border-slate-300 px-8 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900"
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const connect = [
  { label: "Instagram", href: "https://www.instagram.com/gv_construction.uk/" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Link
              href="/"
              className="text-sm font-bold uppercase tracking-[0.15em] text-slate-900"
            >
              Global View
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              Setting the standard for modern renovations through sustainable
              materials and flawless execution.
            </p>
          </div>

          <div>
            <nav aria-label="Footer navigation">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3" role="list">
              {navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-slate-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
              Connect
            </h3>
            <ul className="mt-4 space-y-3" role="list">
              {connect.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.label} (opens in new tab)`}
                    className="text-sm text-slate-600 transition-colors hover:text-slate-900"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 md:flex-row">
          <p className="text-xs text-slate-400">
            Global View Construction &copy; {new Date().getFullYear()}
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-xs text-slate-400 transition-colors hover:text-slate-600"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-slate-400 transition-colors hover:text-slate-600"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

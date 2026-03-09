"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[110] bg-white transition-all duration-300",
          (scrolled || mobileOpen) && "border-b border-slate-200/80"
        )}
      >
        <nav aria-label="Main navigation" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-20 lg:px-8">
          <Link
            href="/"
            className="relative block"
            aria-label="Global View — Home"
          >
            <svg
              width="220"
              height="70"
              viewBox="0 0 220 70"
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-auto lg:h-12"
              aria-label="Global View Construction"
            >
              <path
                d="M70 18 L110 6 L150 18"
                stroke="#111111"
                strokeWidth={2}
                fill="none"
              />
              <text
                x="110"
                y="40"
                fontFamily="'Segoe UI', Helvetica, Arial, sans-serif"
                fontSize="36"
                fontWeight="700"
                letterSpacing="2"
                fill="#111111"
                textAnchor="middle"
              >
                GV
              </text>
              <text
                x="110"
                y="58"
                fontFamily="'Segoe UI', Helvetica, Arial, sans-serif"
                fontSize="12"
                letterSpacing="3"
                fill="#555555"
                textAnchor="middle"
              >
                CONSTRUCTION
              </text>
            </svg>
          </Link>

          <ul className="hidden items-center gap-8 md:flex" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Link
              href="/contact"
              className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              Get a Quote
            </Link>
          </div>

          <button
            type="button"
            className="relative z-[110] flex h-10 w-10 items-center justify-center md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={cn(
                  "block h-px w-full bg-slate-900 transition-all duration-300",
                  mobileOpen && "translate-y-[3.5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-px w-full bg-slate-900 transition-all duration-300",
                  mobileOpen && "-translate-y-[3.5px] -rotate-45"
                )}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile menu — rendered as sibling so it's outside header stacking context */}
      <div
        className={cn(
          "fixed inset-0 z-[105] bg-white transition-all duration-300 md:hidden",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-2xl font-medium text-slate-900"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-4 rounded-full bg-slate-900 px-8 py-3 text-sm font-medium text-white"
            onClick={() => setMobileOpen(false)}
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </>
  );
}

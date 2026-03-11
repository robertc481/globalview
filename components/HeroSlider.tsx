"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SlideImage {
  src: string;
  alt: string;
}

interface HeroSliderProps {
  images: SlideImage[];
}

const AUTOPLAY_MS = 3000;

export default function HeroSlider({ images }: HeroSliderProps) {
  const slides = images.length > 0 ? images : [{ src: "/placeholder.svg", alt: "Placeholder" }];
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (slides.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_MS);
  }, [slides.length]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(index);
      resetTimer();
    },
    [resetTimer]
  );

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo, slides.length]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo, slides.length]);

  return (
    <section aria-label="Project showcase slideshow" aria-roledescription="carousel" className="pt-20 lg:pt-24">
      {/* Welcome banner */}
      <div className="mx-auto max-w-7xl px-6 pb-6 text-center lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          Welcome to GV Construction
        </h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base lg:text-lg">
          Building excellence across the&nbsp;UK&nbsp;&mdash; from concept to completion.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative aspect-[16/7] max-h-[525px] overflow-hidden rounded-lg">
          {slides.map((slide, i) => (
            <Image
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              fill
              className={cn(
                "object-cover object-center transition-opacity duration-[1200ms] ease-in-out",
                i === current ? "opacity-100" : "opacity-0"
              )}
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              quality={90}
              sizes="(max-width: 1280px) 100vw, 1200px"
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />

          {/* Navigation arrows */}
          {slides.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/40 md:left-6 md:h-12 md:w-12"
                aria-label="Previous slide"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/40 md:right-6 md:h-12 md:w-12"
                aria-label="Next slide"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Get a Quote button */}
          <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 md:bottom-14">
            <Link
              href="/contact"
              className="rounded-full bg-white px-4 py-1.5 text-[10px] font-semibold text-slate-900 shadow-lg transition-colors hover:bg-slate-100 md:px-6 md:py-2 md:text-xs"
            >
              Get a Quote
            </Link>
          </div>

          {/* Slide indicators */}
          {slides.length > 1 && (
            <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === current ? "w-8 bg-white" : "w-1.5 bg-white/50"
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

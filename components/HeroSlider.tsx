"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
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
    <section aria-label="Project showcase slideshow" aria-roledescription="carousel" className="relative h-screen max-h-[900px] min-h-[600px] w-full overflow-hidden">
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
          sizes="100vw"
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

      {/* Slide indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
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
    </section>
  );
}

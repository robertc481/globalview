"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
}

const reviews: Review[] = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "I am extremely pleased with the work undertaken. They made a beautiful job of our bathroom renovation and cleared up any mess resulting from the job. Couldn't recommend highly enough!",
    date: "2 months ago",
  },
  {
    name: "James P.",
    rating: 5,
    text: "Came to look at the work on Saturday morning, gave me a quotation which I accepted and came back first thing on Monday. Finished and cleared up in no time. Very friendly and did a very good job.",
    date: "3 months ago",
  },
  {
    name: "David T.",
    rating: 5,
    text: "Hard working, polite and punctual guys. Reasonable price and excellent work done on our kitchen renovation. Would definitely give 6 stars out of 5 if I could!",
    date: "4 months ago",
  },
  {
    name: "Karen L.",
    rating: 5,
    text: "Excellent workmanship, very reliable and always on time. Really pleased with how quickly they completed the work and the quality of the finish. Highly recommend.",
    date: "5 months ago",
  },
  {
    name: "Michael R.",
    rating: 5,
    text: "Really friendly team and such hard workers. They left the area spotless after finishing. The quotation was very fair and the result was first class. Will be using them again for future projects.",
    date: "6 months ago",
  },
  {
    name: "Emma W.",
    rating: 5,
    text: "Fantastic renovation of our en-suite. Professional from start to finish, great communication throughout the project. The attention to detail was outstanding. Would not hesitate to use them again.",
    date: "7 months ago",
  },
];

const VISIBLE = 3;
const MAX_PAGE = Math.ceil(reviews.length / VISIBLE) - 1;

function Stars({ rating }: { rating: number }) {
  return (
    <div role="img" aria-label={`Rated ${rating} out of 5 stars`} className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-amber-500" : "text-slate-300"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [page, setPage] = useState(0);

  const prev = useCallback(() => {
    setPage((p) => (p - 1 + MAX_PAGE + 1) % (MAX_PAGE + 1));
  }, []);

  const next = useCallback(() => {
    setPage((p) => (p + 1) % (MAX_PAGE + 1));
  }, []);

  const visible = reviews.slice(page * VISIBLE, page * VISIBLE + VISIBLE);

  return (
    <section aria-label="Client testimonials" aria-roledescription="carousel" className="section-padding bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="section-label">Testimonials</span>
            <h2 className="heading-section mt-4">What Our Clients Say</h2>
          </div>

          {MAX_PAGE > 0 && (
            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900"
                aria-label="Previous reviews"
              >
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
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900"
                aria-label="Next reviews"
              >
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
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((review, i) => (
            <article
              key={page * VISIBLE + i}
              className="flex flex-col rounded-xl border border-slate-100 bg-white p-6"
            >
              <Stars rating={review.rating} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <div className="mt-6 border-t border-slate-100 pt-4">
                <p className="text-sm font-semibold text-slate-900">
                  {review.name}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">{review.date}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Dot indicators */}
        {MAX_PAGE > 0 && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: MAX_PAGE + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === page ? "w-6 bg-slate-900" : "w-1.5 bg-slate-300"
                )}
                aria-label={`Go to reviews page ${i + 1}`}
              />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href="https://www.google.com/maps/place/GV+Construction/@51.3592528,-1.9787631,17z/data=!3m1!4b1!4m6!3m5!1s0x84b8f3bf33e56f5d:0xd5b851a4a84c9442!8m2!3d51.3592528!4d-1.9787631!16s%2Fg%2F11v0yml6q8!17m2!4m1!1e3!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDMwOC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="See all reviews on Google Maps (opens in new tab)"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-primary"
          >
            See all reviews on Google
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
                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useFormState, useFormStatus } from "react-dom";
import { sendContactForm } from "@/lib/actions";
import type { ContactFormState } from "@/types";

const initialState: ContactFormState = { success: false };

const categories = [
  "Commercial Development",
  "Residential",
  "Hospitality",
  "Mixed Use",
  "Cultural",
  "Other",
];

const inputStyles =
  "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
    >
      {pending ? "Sending..." : "Send Message"}
      {!pending && (
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
      )}
    </button>
  );
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p className="mt-1.5 text-xs text-red-500" role="alert">
      {error}
    </p>
  );
}

export default function ContactForm() {
  const [state, formAction] = useFormState(sendContactForm, initialState);

  if (state.success && state.message) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-7 w-7 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-bold text-slate-900">
          Message Sent
        </h3>
        <p className="mt-2 text-sm text-slate-500">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="_honey"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500"
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            className={inputStyles}
            required
          />
          <FieldError error={state.errors?.name} />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email@company.com"
            className={inputStyles}
            required
          />
          <FieldError error={state.errors?.email} />
        </div>
      </div>

      <div>
        <label
          htmlFor="category"
          className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500"
        >
          Project Category
        </label>
        <select
          id="category"
          name="category"
          className={inputStyles}
          defaultValue=""
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <FieldError error={state.errors?.category} />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500"
        >
          Message Brief
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your project requirements..."
          className={inputStyles + " resize-none"}
          required
        />
        <FieldError error={state.errors?.message} />
      </div>

      {state.message && !state.success && (
        <p className="text-sm text-red-500" role="alert">
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}

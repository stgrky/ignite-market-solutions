"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useState } from "react";

import { styleDirections } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          phone: data.get("phone"),
          website: data.get("website"),
          message: data.get("message"),
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      sendGAEvent("event", "generate_lead", { form_name: "contact_form" });
      setStatus("success");
      form.reset();
    } catch {
      sendGAEvent("event", "form_error", { form_name: "contact_form" });
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto mt-10 w-full max-w-lg rounded-2xl bg-[var(--color-surface)] p-8 text-center shadow-[var(--shadow-card)]">
        <p className="font-serif text-xl font-bold text-[var(--color-foreground)]">
          Message sent.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
          Thanks for reaching out &mdash; I&rsquo;ll get back to you within a day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 w-full max-w-lg rounded-2xl bg-[var(--color-surface)] p-6 text-left shadow-[var(--shadow-card)] sm:p-8"
    >
      <p className="font-serif text-xl font-bold text-[var(--color-foreground)]">
        Send a message
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
        Fill this out and it lands straight in my inbox.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="First name" name="firstName" required autoComplete="given-name" />
        <Field label="Last name" name="lastName" autoComplete="family-name" />
      </div>
      <div className="mt-4">
        <Field label="Email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="mt-4">
        <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
      </div>
      <div className="mt-4">
        <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
          Website you&rsquo;re interested in
        </label>
        <select
          name="website"
          defaultValue=""
          className="mt-1.5 w-full rounded-lg border border-[var(--color-subtle)] bg-[var(--color-background)] px-3.5 py-2.5 text-sm text-[var(--color-foreground)] outline-none transition-colors focus:border-[var(--color-accent)]"
        >
          <option value="">Not sure yet — just have a question</option>
          {styleDirections.designs.map((design) => (
            <option key={design.name} value={design.name}>
              {design.name} — {design.vibe}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={4}
          className="mt-1.5 w-full rounded-lg border border-[var(--color-subtle)] bg-[var(--color-background)] px-3.5 py-2.5 text-sm text-[var(--color-foreground)] outline-none transition-colors focus:border-[var(--color-accent)]"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)] disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>

      {status === "error" ? (
        <p className="mt-3 text-sm text-red-600">
          Something went wrong — try again, or email {" "}
          <a href="mailto:grant@ignitecreativeco.world" className="underline">
            grant@ignitecreativeco.world
          </a>{" "}
          directly.
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="mt-1.5 w-full rounded-lg border border-[var(--color-subtle)] bg-[var(--color-background)] px-3.5 py-2.5 text-sm text-[var(--color-foreground)] outline-none transition-colors focus:border-[var(--color-accent)]"
      />
    </div>
  );
}

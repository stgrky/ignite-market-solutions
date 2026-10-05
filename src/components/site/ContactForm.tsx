"use client";

import { sendGAEvent } from "@next/third-parties/google";
import Link from "next/link";
import { useState } from "react";

/**
 * The short form on the home page: name, email, message.
 *
 * The long version of this used to live here — the branching intake with
 * templates, goals and existing-site questions. It moved to /get-started,
 * where it has room to be one question per screen instead of a wall.
 *
 * What's left is for someone who just wants to ask something. Anyone ready to
 * start is pointed at the full intake, which is the path that makes the call
 * short. Both post to the same endpoint; the intake simply sends more fields.
 */

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-[var(--color-subtle)] bg-[var(--color-background)] px-3.5 py-2.5 text-sm text-[var(--color-foreground)] outline-none transition-colors focus:border-[var(--color-accent)]";
const labelClass =
  "block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          email: data.get("email"),
          anythingElse: data.get("message"),
          completedStep: 1,
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(body.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      sendGAEvent("event", "generate_lead", { form_name: "contact_short" });
      setStatus("sent");
    } catch {
      setError("Something went wrong. Please try again, or email grant@ignitecreativeco.world.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="mx-auto mt-10 w-full max-w-lg rounded-2xl bg-[var(--color-surface)] p-8 text-center shadow-[var(--shadow-card)]">
        <p className="font-serif text-xl font-bold text-[var(--color-foreground)]">Message sent.</p>
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
      <p className="font-serif text-xl font-bold text-[var(--color-foreground)]">Ask me anything</p>
      <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
        A question, a maybe, or just curious — this reaches me directly.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className={labelClass} htmlFor="contact-firstName">
            First name
          </label>
          <input
            id="contact-firstName"
            name="firstName"
            required
            autoComplete="given-name"
            maxLength={100}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={200}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="contact-message">
            What&rsquo;s on your mind?
          </label>
          <textarea id="contact-message" name="message" rows={4} maxLength={5000} className={inputClass} />
        </div>
      </div>

      {error ? (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send"}
      </button>

      <p className="mt-5 border-t border-[var(--color-subtle)] pt-5 text-sm leading-relaxed text-[var(--color-muted)]">
        Ready to get going?{" "}
        <Link
          href="/get-started"
          className="font-semibold text-[var(--color-accent-strong)] underline decoration-[var(--color-subtle)] underline-offset-4 transition hover:decoration-[var(--color-accent)]"
        >
          Start the full intake →
        </Link>{" "}
        It takes about ten minutes and means our call can be fifteen.
      </p>
    </form>
  );
}

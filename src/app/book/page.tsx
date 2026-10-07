import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Pick a time for a free fifteen-minute call about your practice website. No pressure and no pitch.",
  alternates: { canonical: "/book" },
};

/**
 * The calendar, embedded rather than linked.
 *
 * Sending someone to calendar.app.google means handing them to another tab on
 * another domain at the exact moment they were ready to act, and whatever they
 * do next happens somewhere we cannot see. Embedding keeps the visit, keeps
 * the page view, and keeps the header so they can get back to the rest of the
 * site when they are done.
 *
 * The direct link stays visible underneath. Privacy extensions and locked-down
 * browsers do block third-party frames, and a blank box with no way out is a
 * worse outcome than the outbound link we started with.
 */
export default function BookPage() {
  return (
    <section className="bg-[var(--color-background)] py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
            Book a call
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight text-[var(--color-foreground)] md:text-[3rem]">
            Fifteen minutes, whenever suits you.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
            Pick a time below. No pressure and no pitch. We talk about your practice, what
            you need the website to do, and whether I am the right person to build it.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            Want the call to be shorter and more useful?{" "}
            <Link
              href="/get-started"
              className="font-semibold text-[var(--color-accent-strong)] underline decoration-[var(--color-subtle)] underline-offset-4 transition hover:decoration-[var(--color-accent)]"
            >
              Fill out the intake first
            </Link>{" "}
            and I will have read it before we speak.
          </p>

          <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-surface)]">
            <iframe
              src={site.bookingEmbedUrl}
              title="Book a fifteen-minute call with Ignite Creative Co"
              /* Tall enough that the time slots are visible without scrolling
                 inside the frame, which is the thing that makes embedded
                 calendars feel broken on a phone. */
              className="h-[720px] w-full border-0 md:h-[640px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <p className="mt-6 text-sm leading-relaxed text-[var(--color-muted)]">
            Calendar not loading? Some browsers and privacy extensions block embedded
            calendars.{" "}
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--color-accent-strong)] underline decoration-[var(--color-subtle)] underline-offset-4 transition hover:decoration-[var(--color-accent)]"
            >
              Open it in a new tab instead
            </a>
            , or just email me at{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-semibold text-[var(--color-accent-strong)] underline decoration-[var(--color-subtle)] underline-offset-4 transition hover:decoration-[var(--color-accent)]"
            >
              {site.email}
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}

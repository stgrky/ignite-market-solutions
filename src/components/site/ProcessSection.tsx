"use client";

import Link from "next/link";

import { Container } from "@/components/Container";

import { JourneyVisual } from "./JourneyVisual";
import { StickyJourney } from "./StickyJourney";

/**
 * The client journey, from browsing the collection to ongoing care.
 *
 * Scroll-driven, not scroll-jacked: the page scrolls at whatever speed the
 * visitor's device scrolls. No wheel or touch handler exists here. What
 * responds to scrolling is which step is marked current, and a progress line
 * that fills — both driven by one IntersectionObserver.
 *
 * Layout: at ≥1024px the left column sticks (title, progress line, step list)
 * while panels pass on the right. Below that it's a single vertical timeline.
 *
 * Deliberately no animation library. The reveal is a CSS transition keyed off a
 * class the observer sets — the same approach used by Reveal, and for the same
 * reason: this section is eight panels long, and a JS animation runtime per
 * panel is what made the page slow in the first place.
 *
 * With JavaScript off, every panel is visible and the list is complete: the
 * hidden state lives behind `.journey-ready`, which only exists once this
 * component has mounted.
 */

type Step = {
  title: string;
  body: string;
  badge?: string;
  visual?: string;
  marker?: string;
  cta?: { label: string; href: string };
};

type Props = {
  process: {
    heading: string;
    intro: string;
    steps: Step[];
    notes?: { marker: string; note: string }[];
    primaryCta?: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
  };
};

export function ProcessSection({ process }: Props) {
  // The layout, the observer and the progress rail live in StickyJourney now,
  // so the pricing section can use the same mechanism rather than a copy of it
  // that quietly drifts. What stays here is what is particular to this
  // section: the panel itself, the closing actions and the footnotes.
  const steps = process.steps.map((step, i) => ({
    label: step.title,
    content: (
                <article className="rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-surface)] p-6 md:p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-strong)]">
              Step {i + 1}
            </p>
            <h3 className="mt-2 font-serif text-xl leading-snug text-[var(--color-foreground)] md:text-2xl">
              {step.title}
              {step.marker ? (
                <sup className="ml-0.5 text-sm text-[var(--color-accent-strong)]">
                  {step.marker}
                </sup>
              ) : null}
            </h3>
          </div>
          {step.visual ? (
            <div className="hidden shrink-0 sm:block">
              <JourneyVisual kind={step.visual} />
            </div>
          ) : null}
        </div>

        <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-muted)]">
          {step.body}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          {step.badge ? (
            <span className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-xs font-medium text-[var(--color-accent-strong)]">
              {step.badge}
            </span>
          ) : null}
          {step.cta ? (
            <Link
              href={step.cta.href}
              className="text-sm font-semibold text-[var(--color-accent-strong)] underline decoration-[var(--color-subtle)] underline-offset-4 transition hover:decoration-[var(--color-accent)]"
            >
              {step.cta.label}
            </Link>
          ) : null}
        </div>
      </article>
    ),
  }));

  return (
    <section id="process" className="bg-[var(--color-background)] py-20 md:py-28">
      <Container>
        <StickyJourney heading={process.heading} intro={process.intro} steps={steps} />

        {/* Closing actions */}
        <div className="mt-14 flex flex-wrap items-center gap-5 lg:mt-16">
          {process.primaryCta ? (
            <Link
              href={process.primaryCta.href}
              className="inline-flex items-center rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)]"
            >
              {process.primaryCta.label}
            </Link>
          ) : null}
          {process.secondaryCta ? (
            <Link
              href={process.secondaryCta.href}
              className="text-sm font-semibold text-[var(--color-foreground)] underline decoration-[var(--color-subtle)] underline-offset-[6px] transition hover:decoration-[var(--color-accent)]"
            >
              {process.secondaryCta.label}
            </Link>
          ) : null}
        </div>

        {/* Footnotes, as before */}
        {(process.notes ?? []).length > 0 ? (
          <div className="mt-10 space-y-3 border-t border-[var(--color-subtle)] pt-6">
            {(process.notes ?? []).map((note) => (
              <p key={note.marker} className="max-w-3xl text-sm leading-relaxed text-[var(--color-muted)]">
                <sup className="mr-1 text-[var(--color-accent-strong)]">{note.marker}</sup>
                {note.note}
              </p>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/Container";

import { JourneyVisual } from "./JourneyVisual";

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
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    // Marked on the node rather than through state: this only switches on the
    // hidden-until-revealed CSS, and nothing in the render depends on it, so a
    // re-render would be wasted work.
    sectionRef.current?.classList.add("journey-ready");

    const panels = panelRefs.current.filter(Boolean) as HTMLLIElement[];
    if (panels.length === 0) return;

    // One observer for all eight panels. The middle band of the viewport is
    // what counts as "current", which is why the margins are asymmetric.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = panels.indexOf(entry.target as HTMLLIElement);
          if (index === -1) continue;
          if (entry.isIntersecting) {
            entry.target.classList.add("journey-shown");
            setActive((current) => (index > current ? index : current));
          }
        }
      },
      { rootMargin: "-25% 0px -45% 0px", threshold: 0.01 },
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, []);

  const progress = ((active + 1) / process.steps.length) * 100;

  return (
    <section ref={sectionRef} id="process" className="bg-[var(--color-background)] py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* Left: sticky title, progress, step list */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-serif text-3xl leading-[1.15] text-[var(--color-foreground)] md:text-[2.6rem]">
              {process.heading}
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--color-muted)]">
              {process.intro}
            </p>

            <div className="mt-10 hidden lg:block">
              <div className="flex gap-5">
                <div
                  className="relative w-0.5 shrink-0 overflow-hidden rounded-full bg-[var(--color-subtle)]"
                  aria-hidden
                >
                  <div
                    className="absolute inset-x-0 top-0 rounded-full transition-[height] duration-500 ease-out"
                    style={{ height: `${progress}%`, background: "var(--ignite-gradient)" }}
                  />
                </div>
                <ol className="space-y-3 text-sm">
                  {process.steps.map((step, i) => (
                    <li
                      key={step.title}
                      className={`transition-colors duration-300 ${
                        i === active
                          ? "font-semibold text-[var(--color-foreground)]"
                          : i < active
                            ? "text-[var(--color-muted)]"
                            : "text-[var(--color-muted)]/60"
                      }`}
                    >
                      <span aria-hidden className="mr-2 text-[var(--color-accent-strong)]">
                        {i < active ? "✓" : i === active ? "→" : "·"}
                      </span>
                      {step.title}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Right: the panels */}
          <ol className="journey-panels relative space-y-6 border-l border-[var(--color-subtle)] pl-6 lg:space-y-10 lg:border-0 lg:pl-0">
            {process.steps.map((step, i) => (
              <li
                key={step.title}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className="journey-panel relative"
              >
                {/* Timeline dot, small screens only */}
                <span
                  aria-hidden
                  className="absolute -left-[31px] top-7 h-2.5 w-2.5 rounded-full bg-[var(--color-accent)] lg:hidden"
                />
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
              </li>
            ))}
          </ol>
        </div>

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

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * The sticky-column-and-panels layout, extracted so more than one section can
 * use it.
 *
 * This is the shape the process section uses, and the thing people respond to
 * in it: a title and a list of where you are that stay put on the left, while
 * the panels pass on the right and the list keeps up. It suits any section
 * whose parts are genuinely a sequence, and it suits nothing else. Applied to
 * unordered content it invents an order that isn't there, which is worse than
 * a plain stack.
 *
 * Scroll-driven, not scroll-jacked. There is no wheel or touch handler here.
 * What responds to scrolling is which step is marked current and a progress
 * line that fills, both from one IntersectionObserver shared by every panel.
 *
 * Deliberately no animation library. The reveal is a CSS transition keyed off
 * a class the observer sets. A JS animation runtime per panel is what made
 * this page slow enough to need fixing in the first place, and a section like
 * this is many panels long.
 *
 * With JavaScript off every panel is visible and the list is complete: the
 * hidden state lives behind `.journey-ready`, which only exists once this has
 * mounted.
 */

export type JourneyStep = {
  /** Short label for the sticky list. Not necessarily the panel's own heading. */
  label: string;
  content: ReactNode;
};

type Props = {
  heading: string;
  intro?: string;
  steps: JourneyStep[];
  /** Panels are wider than the rail by default; even splits suit short panels. */
  ratio?: "rail" | "even";
};

export function StickyJourney({ heading, intro, steps, ratio = "rail" }: Props) {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    // Marked on the node rather than through state: this only switches on the
    // hidden-until-revealed CSS, and nothing in the render depends on it, so a
    // re-render would be wasted work.
    sectionRef.current?.classList.add("journey-ready");

    const panels = panelRefs.current.filter(Boolean) as HTMLLIElement[];
    if (panels.length === 0) return;

    // Which panels are currently in the band. Kept as a set rather than a
    // single index because during a transition two panels touch it at once,
    // and entries arrive in no particular order.
    const inBand = new Set<number>();

    // One observer for every panel. The middle band of the viewport is what
    // counts as "current", which is why the margins are asymmetric.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = panels.indexOf(entry.target as HTMLLIElement);
          if (index === -1) continue;
          if (entry.isIntersecting) {
            // The reveal is one-way on purpose. Only the current marker
            // follows the scroll back up; panels do not un-reveal.
            entry.target.classList.add("journey-shown");
            inBand.add(index);
          } else {
            inBand.delete(index);
          }
        }
        // Topmost panel in the band, so scrolling back up moves the marker
        // back up with it. This used to keep whichever step was furthest
        // reached, which left the last one marked current forever.
        if (inBand.size > 0) setActive(Math.min(...inBand));
      },
      { rootMargin: "-25% 0px -45% 0px", threshold: 0.01 },
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, []);

  const progress = ((active + 1) / steps.length) * 100;
  const columns =
    ratio === "even"
      ? "lg:grid-cols-2"
      : "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]";

  return (
    <div ref={sectionRef}>
      <div className={`grid gap-12 ${columns} lg:gap-16`}>
        {/* Left: sticky title, progress, step list */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-serif text-3xl leading-[1.15] text-[var(--color-foreground)] md:text-[2.6rem]">
            {heading}
          </h2>
          {intro ? (
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--color-muted)]">
              {intro}
            </p>
          ) : null}

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
                {steps.map((step, i) => (
                  <li
                    key={step.label}
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
                    {step.label}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Right: the panels */}
        <ol className="journey-panels relative space-y-6 border-l border-[var(--color-subtle)] pl-6 lg:space-y-10 lg:border-0 lg:pl-0">
          {steps.map((step, i) => (
            <li
              key={step.label}
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
              {step.content}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

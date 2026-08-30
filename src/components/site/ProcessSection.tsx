"use client";

import { useState } from "react";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";

type PlainStep = { title: string; body: string };
type AnnotatedStep = {
  title: string;
  bodyLead: string;
  bodyHighlight: string;
  bodyAfter: string;
  /** Footnote symbol — "*", "†", etc. Also keys the hover highlight. */
  marker: string;
  note: string;
};
type Step = PlainStep | AnnotatedStep;

const isAnnotated = (step: Step): step is AnnotatedStep => "note" in step;

export function ProcessSection({
  process,
}: {
  process: { heading: string; intro: string; steps: Step[] };
}) {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const notes = process.steps.filter(isAnnotated);

  return (
    <section
      id="process"
      className="bg-[var(--color-foreground)] py-20 md:py-28"
    >
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="font-serif text-3xl font-bold leading-[1.1] text-white md:text-[2.6rem]">
              {process.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              {process.intro}
            </p>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, i) => {
            const annotated = isAnnotated(step);
            const active = annotated && activeMarker === step.marker;

            return (
              <Reveal key={step.title} delay={0.08 * i}>
                {/* Steps with a footnote make the whole card the hover target,
                    so the linked phrase and its note light up together. */}
                <div
                  className={`h-full rounded-lg border-t-2 pt-5 transition-colors duration-300 ${
                    annotated ? "cursor-default" : ""
                  } ${active ? "border-[var(--color-accent)]" : "border-white/15"}`}
                  onMouseEnter={
                    annotated ? () => setActiveMarker(step.marker) : undefined
                  }
                  onMouseLeave={
                    annotated ? () => setActiveMarker(null) : undefined
                  }
                  onClick={
                    annotated
                      ? () =>
                          setActiveMarker((m) =>
                            m === step.marker ? null : step.marker,
                          )
                      : undefined
                  }
                >
                  <span className="text-gradient font-serif text-3xl font-bold">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-serif text-lg font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/65">
                    {!isAnnotated(step) ? (
                      step.body
                    ) : (
                      <>
                        {step.bodyLead}
                        <span
                          className={`border-b border-dotted underline underline-offset-2 transition-colors duration-300 ${
                            active
                              ? "border-white text-white decoration-white"
                              : "border-[var(--color-accent)] text-[var(--color-accent)] decoration-[var(--color-accent)]"
                          }`}
                        >
                          {step.bodyHighlight}
                        </span>
                        <sup
                          className={`transition-colors duration-300 ${
                            active ? "text-white" : "text-[var(--color-accent)]"
                          }`}
                        >
                          {step.marker}
                        </sup>
                        {step.bodyAfter}
                      </>
                    )}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {notes.length > 0 ? (
          <Reveal delay={0.32}>
            <div className="mt-10 space-y-3 border-t border-white/15 pt-6">
              {notes.map((step) => (
                <p
                  key={step.marker}
                  className={`rounded-lg text-sm leading-relaxed transition-all duration-300 ${
                    activeMarker === step.marker
                      ? "-mx-4 bg-[var(--color-accent)]/15 px-4 py-3 text-white ring-1 ring-[var(--color-accent)]/50"
                      : "py-3 text-white/50"
                  }`}
                >
                  <span className="text-[var(--color-accent)]">
                    {step.marker}
                  </span>{" "}
                  {step.note}
                </p>
              ))}
            </div>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}

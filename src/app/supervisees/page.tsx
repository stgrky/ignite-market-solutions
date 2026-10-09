import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { PriceToggle } from "@/components/site/PriceToggle";
import { WaysToStart } from "@/components/site/WaysToStart";
import { pricing, supervisees } from "@/lib/content";
import { halfPrice } from "@/lib/half-price";

export const metadata: Metadata = {
  title: "Supervisee pricing",
  description:
    "Associates and pre-licensure clinicians pay half for the website build and half for every add-on. The same site, not a cut-down version.",
  alternates: { canonical: "/supervisees" },
};

/**
 * The supervisee landing page.
 *
 * Structured around the two objections that actually stop this person from
 * buying, in the order they arrive: "half price means a worse site" (answered
 * before the add-on menu, because it has to be settled before any further
 * number means anything), and "there'll be a catch when I ask" (answered last,
 * by publishing the claim process as three steps with no proof required).
 *
 * The add-on figures are computed from `pricing.addOns` rather than typed out,
 * so this page cannot quote a discount off a price we no longer charge.
 */
export default function SuperviseesPage() {
  const s = supervisees;

  return (
    <>
      {/* Hero: the number first. Everything else on this page is support. */}
      <section className="bg-[var(--color-surface)] py-20 md:py-28">
        <Container className="max-w-3xl text-center">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
              {s.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.1] tracking-tight text-[var(--color-foreground)] md:text-[3.2rem]">
              {s.heading}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
              {s.intro}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10">
              <PriceToggle />
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/#ask"
                className="rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)]"
              >
                Get in touch
              </Link>
              <Link
                href="/book"
                className="rounded-full border border-[var(--color-subtle)] px-6 py-3 text-sm font-semibold text-[var(--color-foreground)] transition hover:border-[var(--color-accent)]"
              >
                Book fifteen minutes
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Who qualifies. Broad on purpose: the failure mode is someone who */}
      {/* needs this deciding they are not quite the right kind of broke. */}
      <section className="bg-[var(--color-background)] py-16 md:py-24">
        <Container className="max-w-4xl">
          <Reveal>
            <h2 className="font-serif text-3xl leading-tight text-[var(--color-foreground)] md:text-[2.4rem]">
              {s.whoHeading}
            </h2>
            <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-[var(--color-muted)]">
              {s.whoIntro}
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {s.who.map((item, i) => (
              <Reveal key={item.title} delay={0.06 * i} className="h-full">
                <li className="flex h-full flex-col rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-surface)] px-7 py-7">
                  <h3 className="font-serif text-xl text-[var(--color-foreground)]">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-muted)]">
                    {item.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Objection one, answered before any further pricing. */}
      <section className="bg-[var(--color-surface)] py-16 md:py-24">
        <Container className="max-w-3xl">
          <Reveal>
            <h2 className="font-serif text-3xl leading-tight text-[var(--color-foreground)] md:text-[2.4rem]">
              {s.sameHeading}
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-[var(--color-muted)]">
              {s.sameIntro}
            </p>
          </Reveal>
          <ul className="mt-8 grid gap-3">
            {s.same.map((line, i) => (
              <Reveal key={line} delay={0.04 * i}>
                <li className="flex gap-3 rounded-xl bg-[var(--color-background)] px-5 py-4 text-[15px] leading-relaxed text-[var(--color-foreground)]">
                  <span aria-hidden className="text-[var(--color-accent-strong)]">
                    &#10003;
                  </span>
                  <span>{line}</span>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.3}>
            <p className="mt-8 text-[17px] leading-relaxed text-[var(--color-foreground)]">
              {s.sameClose}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Add-on menu, halved from the real list rather than retyped. */}
      <section className="bg-[var(--color-background)] py-16 md:py-24">
        <Container className="max-w-3xl">
          <Reveal>
            <h2 className="font-serif text-3xl leading-tight text-[var(--color-foreground)] md:text-[2.4rem]">
              {s.addOnsHeading}
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-[var(--color-muted)]">
              {s.addOnsIntro}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full border-collapse text-left text-[15px]">
                <thead>
                  <tr className="border-b border-[var(--color-subtle)]">
                    <th className="py-3 pr-4 font-semibold text-[var(--color-foreground)]">
                      Add-on
                    </th>
                    <th className="py-3 pr-4 text-right font-medium text-[var(--color-muted)]">
                      List price
                    </th>
                    <th className="py-3 text-right font-semibold text-[var(--color-accent-strong)]">
                      You pay
                    </th>
                  </tr>
                </thead>
                <tbody className="[font-variant-numeric:tabular-nums]">
                  {pricing.addOns.map((addOn) => (
                    <tr key={addOn.label} className="border-b border-[var(--color-subtle)]/40">
                      <td className="py-3 pr-4 text-[var(--color-foreground)]">{addOn.label}</td>
                      <td className="py-3 pr-4 text-right text-[var(--color-muted)] line-through">
                        {addOn.price}
                      </td>
                      <td className="py-3 text-right font-semibold text-[var(--color-foreground)]">
                        {halfPrice(addOn.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-6 rounded-xl border border-[var(--color-subtle)] bg-[var(--color-surface)] px-6 py-5">
              <h3 className="font-serif text-lg text-[var(--color-foreground)]">
                {s.hourlyHeading}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">
                {s.hourlyBody}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 rounded-xl border border-[var(--color-subtle)] bg-[var(--color-surface)] px-6 py-5 text-[15px] leading-relaxed text-[var(--color-muted)]">
              {s.addOnsNote}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* The one price that does not move, explained rather than buried. */}
      <section className="bg-[var(--color-surface)] py-16 md:py-24">
        <Container className="max-w-3xl">
          <Reveal>
            <h2 className="font-serif text-3xl leading-tight text-[var(--color-foreground)] md:text-[2.4rem]">
              {s.hostingHeading}
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-[var(--color-muted)]">
              {s.hostingBody}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Objection two: the fear that asking will be awkward. */}
      <section className="bg-[var(--color-background)] py-16 md:py-24">
        <Container className="max-w-3xl">
          <Reveal>
            <h2 className="font-serif text-3xl leading-tight text-[var(--color-foreground)] md:text-[2.4rem]">
              {s.claimHeading}
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-[var(--color-muted)]">
              {s.claimIntro}
            </p>
          </Reveal>
          <ol className="mt-8 grid gap-4">
            {s.claimSteps.map((step, i) => (
              <Reveal key={step} delay={0.06 * i}>
                <li className="flex gap-4 rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-surface)] px-6 py-5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-xs font-semibold text-white">
                    {i + 1}
                  </span>
                  <span className="text-[15px] leading-relaxed text-[var(--color-foreground)]">
                    {step}
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.2}>
            <p className="mt-6 text-[15px] leading-relaxed text-[var(--color-muted)]">
              {s.claimNote}
            </p>
          </Reveal>

          {/* The other door. Deliberately not a fourth numbered step: it is a
              different person on a different path, and numbering it would
              imply supervisees have one more hoop. Accent border so someone
              scanning the page and finding nothing that describes them still
              catches it. */}
          <Reveal delay={0.26}>
            <div className="mt-10 rounded-2xl border border-[var(--color-accent)] bg-[var(--color-surface)] px-7 py-7 shadow-[var(--shadow-card)]">
              <h3 className="font-serif text-xl leading-tight text-[var(--color-foreground)]">
                {s.otherHeading}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-muted)]">
                {s.otherBody}
              </p>
              <Link
                href={s.otherCta.href}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)]"
              >
                {s.otherCta.label}
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-[var(--color-surface)] py-16 md:py-24">
        <Container className="max-w-3xl">
          <WaysToStart heading={s.ctaHeading} intro={s.ctaBody} />
        </Container>
      </section>
    </>
  );
}

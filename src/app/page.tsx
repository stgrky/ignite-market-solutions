import { Container } from "@/components/Container";
import { GradientMesh } from "@/components/motion/GradientMesh";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { WordReveal } from "@/components/motion/WordReveal";
import { ContactForm } from "@/components/site/ContactForm";
import { HeroShowcase } from "@/components/site/HeroShowcase";
import { Marquee } from "@/components/site/Marquee";
import { ProcessSection } from "@/components/site/ProcessSection";
import {
  contact,
  faqs,
  finalCta,
  hero,
  manifesto,
  marquee,
  pricing,
  problems,
  process,
  referral,
  site,
  styleDirections,
  system,
  value,
  work,
} from "@/lib/content";

/**
 * Heading for one step of the pricing journey.
 *
 * Pricing is genuinely sequential — you pick a site, then you host it, then you
 * add extras — so the numbers carry real information rather than decorating
 * three unrelated price lists. All three steps share this so they read as one
 * path instead of three separate asks.
 */
function StepHeading({
  step,
  title,
  intro,
  note,
}: {
  step: string;
  title: string;
  intro: string;
  note?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Reveal>
        <p className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
          {step}
          {note ? (
            <span className="rounded-full bg-[var(--color-accent-soft)] px-2 py-0.5 text-[10px] font-semibold normal-case tracking-normal text-[var(--color-accent-strong)]">
              {note}
            </span>
          ) : null}
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h3 className="mt-3 font-serif text-2xl font-bold leading-tight text-[var(--color-foreground)] md:text-3xl">
          {title}
        </h3>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-muted)]">
          {intro}
        </p>
      </Reveal>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section
        id="top"
        className="relative overflow-hidden bg-[var(--color-surface)]"
      >
        <GradientMesh className="absolute inset-0" />
        <Container className="relative py-24 md:py-32">
          <div className="grid items-center gap-12 md:grid-cols-[1.08fr_0.92fr] md:gap-10">
            <div>
            <Reveal distance={12} duration={0.7}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-strong)]">
                {hero.eyebrow}
              </p>
            </Reveal>

            <h1 className="mt-6 font-serif text-[2.7rem] font-semibold leading-[1.07] tracking-[-0.01em] text-[var(--color-foreground)] md:text-[3.5rem]">
              <WordReveal text={hero.headlineLead} />{" "}
              <span className="text-gradient italic font-medium">
                {hero.headlineAccent1}
              </span>{" "}
              <WordReveal text={hero.headlineMid} />{" "}
              <span className="text-gradient italic font-medium">
                {hero.headlineAccent2}
              </span>
            </h1>{/* md headline sized for the 2-col layout below */}

            <Reveal delay={0.35} distance={18} duration={0.85}>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)]">
                {hero.subhead}
              </p>
            </Reveal>

            <Reveal delay={0.5} distance={14} duration={0.8}>
              <div className="mt-9 flex flex-wrap gap-4">
                <MagneticButton
                  href={hero.primaryCta.href}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_34px_-12px_var(--color-accent)] transition hover:bg-[var(--color-accent-strong)]"
                >
                  {hero.primaryCta.label}
                  <span aria-hidden>→</span>
                </MagneticButton>
                <MagneticButton
                  href={hero.secondaryCta.href}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--color-foreground)]/15 px-7 py-3.5 text-sm font-semibold text-[var(--color-foreground)] transition hover:border-[var(--color-accent)]"
                >
                  {hero.secondaryCta.label}
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.65} duration={0.8}>
              <p className="mt-8 text-sm text-[var(--color-muted)]">
                {hero.trustLine}
              </p>
            </Reveal>
            </div>

            <Reveal
              className="hidden md:block"
              delay={0.3}
              distance={24}
              duration={1}
            >
              <HeroShowcase />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ─────────────────── NICHE MARQUEE ────────────────────── */}
      <Marquee items={marquee} />

      {/* ─────────────────────── PROBLEMS ─────────────────────── */}
      <section className="bg-[var(--color-background)] py-20 md:py-28">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <h2 className="font-serif text-3xl font-bold leading-[1.15] text-[var(--color-foreground)] md:text-[2.4rem]">
                {problems.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
                {problems.intro}
              </p>
            </Reveal>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {problems.items.map((item, i) => (
              <Reveal
                key={item}
                delay={0.06 * i}
                className={
                  i === problems.items.length - 1
                    ? "sm:col-span-2"
                    : i === 1
                      ? "sm:row-span-2"
                      : undefined
                }
              >
                <div className="flex h-full items-start gap-3 rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-surface)] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-accent)]/40 hover:shadow-[var(--shadow-card)]">
                  <span
                    aria-hidden
                    className="mt-0.5 text-lg text-[var(--color-accent)]"
                  >
                    ✕
                  </span>
                  <p className="text-[15px] leading-relaxed text-[var(--color-foreground)]">
                    {item}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-10 font-serif text-2xl font-bold text-[var(--color-foreground)]">
              {problems.closer}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ─────────────────────── MANIFESTO ────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-foreground)] py-24 md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[150%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: "var(--ignite-gradient)" }}
        />
        <Container className="relative text-center">
          <Reveal>
            <p className="mx-auto max-w-4xl font-serif text-[1.9rem] font-medium italic leading-[1.3] text-[var(--color-background)] md:text-[2.9rem]">
              {manifesto.line}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-[var(--color-background)]/70">
              {manifesto.sub}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ──────────────────────── VALUE ───────────────────────── */}
      <section id="value" className="bg-[var(--color-surface)] py-20 md:py-28">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <h2 className="font-serif text-3xl font-bold leading-[1.15] text-[var(--color-foreground)] md:text-[2.4rem]">
                {value.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
                {value.intro}
              </p>
            </Reveal>
          </div>
          <div
            className="mt-12 grid gap-6 md:grid-cols-3"
            style={{ perspective: 1000 }}
          >
            {value.cards.map((card, i) => (
              <Reveal
                key={card.title}
                delay={0.08 * (i % 3)}
                className={`h-full ${[2, 1, 1, 2, 2, 1][i] === 2 ? "md:col-span-2" : "md:col-span-1"}`}
              >
                <TiltCard className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-background)] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-card)]">
                    <div className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-1 text-lg text-[var(--color-accent)]"
                      >
                        ✓
                      </span>
                      <h3 className="font-serif text-xl font-bold leading-tight text-[var(--color-foreground)]">
                        {card.title}
                      </h3>
                    </div>
                    <p className="mt-3 flex-grow text-[15px] leading-relaxed text-[var(--color-muted)]">
                      {card.body}
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────────── FIVE READY-BUILT DESIGNS ─────────────── */}
      <section id="shop" className="bg-[var(--color-background)] py-20 md:py-28">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-strong)]">
                {styleDirections.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-4 font-serif text-3xl font-bold leading-[1.15] text-[var(--color-foreground)] md:text-[2.4rem]">
                <span className="text-gradient">
                  {styleDirections.headingCount}
                </span>
                {styleDirections.headingRest}
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
                {styleDirections.intro}
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <a
                href="#pricing"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-accent-strong)] hover:text-[var(--color-accent)]"
              >
                {styleDirections.scopeLinkLabel}
                <span aria-hidden>→</span>
              </a>
            </Reveal>
          </div>

          <div
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5"
            style={{ perspective: 1000 }}
          >
            {styleDirections.designs.map((design, i) => {
              const card = (
                <div className="flex h-full flex-col rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-surface)] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-accent)]/50 hover:shadow-[var(--shadow-card)]">
                  <span
                    aria-hidden
                    className="block h-10 w-10 rounded-full"
                    style={{ background: design.swatch }}
                  />
                  <h3 className="mt-5 font-serif text-lg font-bold text-[var(--color-foreground)]">
                    {design.name}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {design.vibe}
                  </p>
                  {design.href ? (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-accent-strong)]">
                      View live demo
                      <span aria-hidden>→</span>
                    </span>
                  ) : (
                    <span className="mt-4 inline-flex items-center text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
                      In progress
                    </span>
                  )}
                </div>
              );
              return (
                <Reveal key={design.name} delay={0.06 * i} className="h-full">
                  <TiltCard className="h-full">
                    {design.href ? (
                      <a
                        href={design.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full"
                      >
                        {card}
                      </a>
                    ) : (
                      card
                    )}
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-8 text-sm text-[var(--color-muted)]">
              {styleDirections.note}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ─────────────────── THE TEMPLATE SYSTEM ──────────────── */}
      <section className="bg-[var(--color-surface)] py-20 md:py-28">
        <Container>
          <div className="grid items-start gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
            <div>
              <Reveal>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-strong)]">
                  {system.eyebrow}
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-4 font-serif text-3xl font-bold leading-[1.15] text-[var(--color-foreground)] md:text-[2.4rem]">
                  {system.heading}
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
                  {system.intro}
                </p>
              </Reveal>
            </div>
            <div className="space-y-5">
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-surface)] p-7">
                  <h3 className="font-serif text-lg font-bold text-[var(--color-foreground)]">
                    {system.included.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {system.included.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[15px] text-[var(--color-foreground)]"
                      >
                        <span aria-hidden className="mt-0.5 font-bold text-[var(--color-accent)]">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="rounded-2xl border border-dashed border-[var(--color-subtle)] p-7">
                  <h3 className="font-serif text-lg font-bold text-[var(--color-muted)]">
                    {system.excluded.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {system.excluded.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[15px] text-[var(--color-muted)]"
                      >
                        <span aria-hidden className="mt-0.5">
                          —
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.26}>
                <p className="rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-accent-soft)]/60 p-5 text-[15px] leading-relaxed text-[var(--color-foreground)]">
                  {system.note}
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ─────────────────────── PROCESS ──────────────────────── */}
      <ProcessSection process={process} />

      {/* ───────────────────────── WORK ───────────────────────── */}
      <section id="work" className="bg-[var(--color-surface)] py-20 md:py-28">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <h2 className="font-serif text-3xl font-bold leading-[1.15] text-[var(--color-foreground)] md:text-[2.4rem]">
                {work.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
                {work.intro}
              </p>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {work.projects.map((project, i) => (
              <Reveal key={project.name} delay={0.08 * i} className="h-full">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col justify-between rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-background)] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-card)]"
                >
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-strong)]">
                      {project.tag}
                    </p>
                    <h3 className="mt-4 font-serif text-2xl font-bold text-[var(--color-foreground)]">
                      {project.name}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-muted)]">
                      {project.body}
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-strong)]">
                    {project.linkLabel}
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────────────────── PRICING ──────────────────────── */}
      <section id="pricing" className="bg-[var(--color-background)] py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <h2 className="font-serif text-3xl font-bold leading-[1.15] text-[var(--color-foreground)] md:text-[2.4rem]">
                {pricing.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
                {pricing.intro}
              </p>
            </Reveal>
          </div>

          {/* Step 1 — Initial build */}
          <div className="mt-16">
            <StepHeading
              step={pricing.buildStep}
              title={pricing.buildHeading}
              intro={pricing.buildStepIntro}
            />
          </div>
          <Reveal delay={0.1}>
            <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-surface)] p-8 shadow-[var(--shadow-card)] md:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    {pricing.build.label}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-[var(--color-foreground)]">
                    {pricing.build.name}
                  </h3>
                </div>
                <span className="font-serif text-5xl font-bold text-[var(--color-foreground)]">
                  {pricing.build.price}
                </span>
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-muted)]">
                {pricing.build.blurb}
              </p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {pricing.build.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-[15px] text-[var(--color-foreground)]"
                  >
                    <span aria-hidden className="mt-0.5 font-bold text-[var(--color-accent)]">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-[var(--color-subtle)] pt-5 text-sm italic leading-relaxed text-[var(--color-muted)]">
                {pricing.build.overageNote}
              </p>
            </div>
          </Reveal>

          {/* Step 2 — Hosting */}
          <div className="mt-20">
            <StepHeading
              step={pricing.tiersStep}
              title={pricing.tiersHeading}
              intro={pricing.tiersIntro}
            />
          </div>
          <div className="mx-auto mt-10 grid max-w-xl items-start gap-6">
            {pricing.tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={0.08 * i} className="h-full">
                <div
                  className={`relative flex h-full flex-col rounded-2xl border p-8 ${
                    tier.featured
                      ? "border-[var(--color-accent)] bg-[var(--color-surface)] shadow-[0_24px_60px_-30px_var(--color-accent)]"
                      : "border-[var(--color-subtle)] bg-[var(--color-surface)]"
                  }`}
                >
                  {/* "Recommended" only means something next to an alternative.
                      With a single plan the badge is noise, so it appears only
                      if a second tier is ever reintroduced. */}
                  {tier.featured && pricing.tiers.length > 1 ? (
                    <span
                      className="absolute -top-3 left-8 inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white"
                      style={{ background: "var(--ignite-gradient)" }}
                    >
                      Recommended
                    </span>
                  ) : null}
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">
                    {tier.tierLabel}
                  </p>
                  <h4 className="mt-2 font-serif text-xl font-bold text-[var(--color-foreground)]">
                    {tier.name}
                  </h4>
                  <p className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="font-serif text-4xl font-bold text-[var(--color-foreground)]">
                      {tier.price}
                    </span>
                    <span className="text-sm text-[var(--color-muted)]">
                      {tier.cadence}
                    </span>
                    {"altPrice" in tier && tier.altPrice ? (
                      <span className="text-[13px] text-[var(--color-muted)]/80">
                        {tier.altPrice}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-muted)]">
                    {tier.blurb}
                  </p>
                  <ul className="mt-6 flex-grow space-y-2.5">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-[15px] text-[var(--color-foreground)]"
                      >
                        <span aria-hidden className="mt-0.5 font-bold text-[var(--color-accent)]">
                          ✓
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-t border-[var(--color-subtle)] pt-5 text-sm italic leading-relaxed text-[var(--color-muted)]">
                    {tier.bestFor}
                  </p>
                  <a
                    href="#contact"
                    className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
                      tier.featured
                        ? "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-strong)]"
                        : "border-2 border-[var(--color-foreground)]/15 text-[var(--color-foreground)] hover:border-[var(--color-accent)]"
                    }`}
                  >
                    Get started
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Step 3 — Add-ons */}
          <div className="mt-20">
            <StepHeading
              step={pricing.addOnsStep}
              note={pricing.addOnsStepNote}
              title={pricing.addOnsHeading}
              intro={pricing.addOnsIntro}
            />
          </div>
          <Reveal delay={0.12}>
            <div className="mx-auto mt-8 grid max-w-3xl items-start gap-x-10 sm:grid-cols-2">
              {pricing.addOns.map((item) => (
                <details
                  key={item.label}
                  className="group border-b border-[var(--color-subtle)] [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer select-none items-baseline justify-between gap-4 py-3">
                    <span className="flex items-center gap-2 text-[15px] text-[var(--color-foreground)]">
                      {item.label}
                      <svg
                        aria-hidden
                        viewBox="0 0 20 20"
                        width="11"
                        height="11"
                        className="flex-shrink-0 text-[var(--color-muted)] transition-transform duration-300 group-open:rotate-180"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 8l5 5 5-5"
                        />
                      </svg>
                    </span>
                    <span className="whitespace-nowrap font-serif font-semibold text-[var(--color-foreground)]">
                      {item.price}
                    </span>
                  </summary>
                  <div className="space-y-3 pb-5 pt-1">
                    {(
                      [
                        { kicker: "What", body: item.what },
                        { kicker: "Why", body: item.why },
                        { kicker: "Who it's for", body: item.whoFor },
                      ] as const
                    ).map((row) => (
                      <div key={row.kicker}>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                          {row.kicker}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-[var(--color-muted)]">
                          {row.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mx-auto mt-8 max-w-3xl rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-surface)] p-6 text-[15px] leading-relaxed text-[var(--color-muted)]">
              {pricing.addOnsNote}
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mx-auto mt-4 max-w-3xl rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)]/50 p-6 text-[15px] leading-relaxed text-[var(--color-foreground)]">
              {pricing.addOnsCustomNote}
            </p>
          </Reveal>

          {/* Terms */}
          <div className="mx-auto mt-20 max-w-2xl text-center">
            <Reveal>
              <h3 className="font-serif text-2xl font-bold leading-tight text-[var(--color-foreground)] md:text-3xl">
                {pricing.terms.heading}
              </h3>
            </Reveal>
          </div>
          <div className="mx-auto mt-8 grid max-w-3xl gap-5 sm:grid-cols-2">
            {pricing.terms.items.map((term, i) => (
              <Reveal key={term.title} delay={0.06 * i}>
                <div className="h-full rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-surface)] p-6">
                  <h4 className="font-serif text-base font-bold text-[var(--color-foreground)]">
                    {term.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {term.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-10 max-w-2xl text-center text-sm font-medium text-[var(--color-foreground)]">
              {pricing.footnote}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ───────────────────────── FAQ ────────────────────────── */}
      <section className="bg-[var(--color-surface)] py-20 md:py-28">
        <Container>
          <Reveal>
            <h2 className="font-serif text-3xl font-bold leading-[1.15] text-[var(--color-foreground)] md:text-[2.4rem]">
              {faqs.heading}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {faqs.items.map((item, i) => (
              <Reveal key={item.q} delay={0.06 * i}>
                <h3 className="scroll-mt-24 font-serif text-lg font-bold text-[var(--color-foreground)]">
                  {item.q}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-muted)]">
                  {item.a}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ──────────────────────── REFERRAL ────────────────────── */}
      <section className="bg-[var(--color-accent-soft)] py-20 md:py-28">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-serif text-3xl font-bold leading-[1.15] text-[var(--color-foreground)] md:text-[2.4rem]">
              {referral.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
              {referral.body}
            </p>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-xl gap-4 sm:grid-cols-2">
            {referral.cards.map((card, i) => (
              <Reveal key={card.label} delay={0.1 + i * 0.06}>
                <div className="rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-surface)] p-7 text-left transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-accent)]/40 hover:shadow-[var(--shadow-card)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    {card.label}
                  </p>
                  <p className="mt-3 font-serif text-2xl font-bold text-[var(--color-foreground)]">
                    {card.amount}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {card.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────────────── FINAL CTA + CONTACT ──────────────── */}
      <section
        id="contact"
        className="relative overflow-hidden bg-[var(--color-foreground)] py-24 md:py-32"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 left-[-10%] h-[480px] w-[480px] rounded-full opacity-25 blur-3xl"
          style={{ background: "var(--ignite-gradient)" }}
        />
        <Container className="relative text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-serif text-3xl font-bold leading-[1.1] text-white md:text-[2.8rem]">
              {finalCta.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              {finalCta.body}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col items-center gap-4">
              <MagneticButton
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-[var(--color-foreground)] transition hover:bg-[var(--color-accent)] hover:text-white"
              >
                {finalCta.cta.label}
                <span aria-hidden>→</span>
              </MagneticButton>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-white/60">
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-white"
                >
                  {contact.emailLabel}: {site.email}
                </a>
                <span aria-hidden className="text-white/30">
                  ·
                </span>
                <a
                  href={site.phoneHref}
                  className="transition-colors hover:text-white"
                >
                  {contact.phoneLabel}: {site.phone}
                </a>
              </div>

              <div className="mt-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                <span className="h-px w-10 bg-white/20" aria-hidden />
                Or send a message
                <span className="h-px w-10 bg-white/20" aria-hidden />
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

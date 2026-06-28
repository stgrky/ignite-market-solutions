import { Container } from "@/components/Container";
import { GradientMesh } from "@/components/motion/GradientMesh";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { HeroShowcase } from "@/components/site/HeroShowcase";
import { Marquee } from "@/components/site/Marquee";
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
  value,
  work,
} from "@/lib/content";

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
                {hero.headlineAccent}
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
              <Reveal key={item} delay={0.06 * i}>
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
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {value.cards.map((card, i) => (
              <Reveal key={card.title} delay={0.08 * (i % 3)} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-background)] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-card)]">
                  <h3 className="font-serif text-xl font-bold leading-tight text-[var(--color-foreground)]">
                    {card.title}
                  </h3>
                  <p className="mt-3 flex-grow text-[15px] leading-relaxed text-[var(--color-muted)]">
                    {card.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ─────────────────────── PROCESS ──────────────────────── */}
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
            {process.steps.map((step, i) => (
              <Reveal key={step.title} delay={0.08 * i}>
                <div className="border-t-2 border-white/15 pt-5">
                  <span className="text-gradient font-serif text-3xl font-bold">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-serif text-lg font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/65">
                    {step.body}
                  </p>
                </div>
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

          {/* Initial build */}
          <Reveal delay={0.1}>
            <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-surface)] p-8 shadow-[var(--shadow-card)] md:p-10">
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
            </div>
          </Reveal>

          {/* Monthly tiers */}
          <div className="mx-auto mt-20 max-w-2xl text-center">
            <Reveal>
              <h3 className="font-serif text-2xl font-bold leading-tight text-[var(--color-foreground)] md:text-3xl">
                {pricing.tiersHeading}
              </h3>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-muted)]">
                {pricing.tiersIntro}
              </p>
            </Reveal>
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl items-start gap-6 md:grid-cols-2">
            {pricing.tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={0.08 * i} className="h-full">
                <div
                  className={`relative flex h-full flex-col rounded-2xl border p-8 ${
                    tier.featured
                      ? "border-[var(--color-accent)] bg-[var(--color-surface)] shadow-[0_24px_60px_-30px_var(--color-accent)]"
                      : "border-[var(--color-subtle)] bg-[var(--color-surface)]"
                  }`}
                >
                  {tier.featured ? (
                    <span
                      className="absolute -top-3 left-8 inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white"
                      style={{ background: "var(--ignite-gradient)" }}
                    >
                      Recommended
                    </span>
                  ) : null}
                  <h4 className="font-serif text-xl font-bold text-[var(--color-foreground)]">
                    {tier.name}
                  </h4>
                  <p className="mt-3 flex items-baseline gap-1">
                    <span className="font-serif text-4xl font-bold text-[var(--color-foreground)]">
                      {tier.price}
                    </span>
                    <span className="text-sm text-[var(--color-muted)]">
                      {tier.cadence}
                    </span>
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
                        {f}
                      </li>
                    ))}
                  </ul>
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

          {/* Add-ons */}
          <div className="mx-auto mt-20 max-w-2xl text-center">
            <Reveal>
              <h3 className="font-serif text-2xl font-bold leading-tight text-[var(--color-foreground)] md:text-3xl">
                {pricing.addOnsHeading}
              </h3>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-muted)]">
                {pricing.addOnsIntro}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <div className="mx-auto mt-8 grid max-w-3xl gap-x-10 sm:grid-cols-2">
              {pricing.addOns.map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between gap-4 border-b border-[var(--color-subtle)] py-3"
                >
                  <span className="text-[15px] text-[var(--color-foreground)]">
                    {item.label}
                  </span>
                  <span className="whitespace-nowrap font-serif font-semibold text-[var(--color-foreground)]">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-10 max-w-2xl text-center text-sm font-medium text-[var(--color-foreground)]">
              {pricing.footnote}
            </p>
          </Reveal>
        </Container>
      </section>

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

      {/* ───────────────────────── FAQ ────────────────────────── */}
      <section className="bg-[var(--color-background)] py-20 md:py-28">
        <Container>
          <Reveal>
            <h2 className="font-serif text-3xl font-bold leading-[1.15] text-[var(--color-foreground)] md:text-[2.4rem]">
              {faqs.heading}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {faqs.items.map((item, i) => (
              <Reveal key={item.q} delay={0.06 * i}>
                <h3 className="font-serif text-lg font-bold text-[var(--color-foreground)]">
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
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                {contact.emailLabel}: {site.email}
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

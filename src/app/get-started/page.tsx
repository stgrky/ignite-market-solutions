import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { IntakeForm } from "@/components/site/IntakeForm";
import { WaysToStart } from "@/components/site/WaysToStart";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Get started",
  description:
    "A short intake so your website can be built around your practice — and so our call can be fifteen minutes rather than an hour.",
  alternates: { canonical: "/get-started" },
};

export default function GetStartedPage() {
  return (
    <section className="bg-[var(--color-background)] py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-accent-strong)]">
            Get started
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight text-[var(--color-foreground)] md:text-[3rem]">
            Tell me about your practice.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
            This is the long way round, and it is worth it if you already know you want a
            website. Answer what you can and I will have read it before we speak.
          </p>
          <p className="mt-5 text-sm text-[var(--color-muted)]">
            Haven&rsquo;t seen the websites yet?{" "}
            <Link
              href="/#shop"
              className="font-semibold text-[var(--color-accent-strong)] underline decoration-[var(--color-subtle)] underline-offset-4"
            >
              Browse them first
            </Link>{" "}
            — it only takes a minute, and one question here asks which you liked.
          </p>
        </div>

        <div className="mt-12">
          <IntakeForm />
        </div>

        {/* Below the form, not above it. These are the ways out, and offering
            them first invited people to leave before they had looked at what
            they were leaving. Kept outside the form component either way: the
            intake is one thing, the contact form is another, and the calendar
            is a third. */}
        <div className="mt-16 border-t border-[var(--color-subtle)] pt-12">
          <WaysToStart
            omit="intake"
            compact
            heading="Rather not fill in a form?"
            intro="Both of these reach me just the same."
          />
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-[var(--color-muted)]">
          Your answers go to {site.name} and nowhere else. Nothing is stored on this website —
          see the{" "}
          <Link href="/privacy" className="underline decoration-[var(--color-subtle)] underline-offset-4">
            privacy policy
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}

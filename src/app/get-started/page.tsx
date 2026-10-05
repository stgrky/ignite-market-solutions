import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { IntakeForm } from "@/components/site/IntakeForm";
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
            About ten minutes, and you can skip anything you&rsquo;re unsure about. I read it
            before we speak, which is what keeps the call to fifteen minutes.
          </p>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
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

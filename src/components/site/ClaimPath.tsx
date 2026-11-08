"use client";

import { sendGAEvent } from "@next/third-parties/google";
import Link from "next/link";

import { claimPath } from "@/lib/content";

/**
 * The claim path under the hero.
 *
 * Replaces the two buttons that used to sit here. Two buttons offered a
 * choice; this offers a route, which is what someone arriving cold from an
 * ad needs — the first paid traffic averaged eight seconds on this page.
 *
 * Two numbered steps, and the second holds two alternatives rather than
 * being split into a third step. Choosing a site genuinely precedes getting
 * in touch; booking and texting are the same move through different doors,
 * and numbering them in sequence would claim an order that does not exist.
 *
 * Step 1 is the only filled button — three equal buttons is three primary
 * actions, which is none. Every link fires its own event, because the point
 * of a path is that the drop-off tells you which ask is too big.
 */

/** An `sms:` URL is not a route, so next/link has nothing to do with it. */
function StepLink({
  href,
  event,
  className,
  children,
}: {
  href: string;
  event: string;
  className: string;
  children: React.ReactNode;
}) {
  const track = () => sendGAEvent("event", event);
  if (href.startsWith("sms:")) {
    return (
      <a href={href} onClick={track} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={track} className={className}>
      {children}
    </Link>
  );
}

function StepNumber({ n, dark }: { n: string; dark?: boolean }) {
  return (
    <span
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
        dark
          ? "bg-white/20 text-white"
          : "bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]"
      }`}
    >
      {n}
    </span>
  );
}

export function ClaimPath() {
  const { lead, step1, step2 } = claimPath;

  return (
    <div className="max-w-md">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-strong)]">
        {lead}
      </p>

      <div className="mt-4 flex flex-col gap-2.5">
        <StepLink
          href={step1.href}
          event={step1.event}
          className="group inline-flex items-center gap-3 rounded-2xl bg-[var(--color-accent)] px-5 py-3.5 text-white shadow-[0_14px_34px_-12px_var(--color-accent)] transition hover:bg-[var(--color-accent-strong)]"
        >
          <StepNumber n={step1.n} dark />
          <span className="flex flex-col text-left leading-tight">
            <span className="text-sm font-semibold">{step1.label}</span>
            <span className="text-[11px] text-white/75">{step1.hint}</span>
          </span>
          <span
            aria-hidden
            className="ml-auto transition group-hover:translate-x-0.5"
          >
            →
          </span>
        </StepLink>

        <div className="rounded-2xl border-2 border-[var(--color-foreground)]/12 px-5 py-3.5">
          <div className="flex items-center gap-3">
            <StepNumber n={step2.n} />
            <span className="text-sm font-semibold text-[var(--color-foreground)]">
              {step2.label}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {step2.options.map((option, i) => (
              <span key={option.label} className="flex items-center gap-2">
                {i > 0 ? (
                  <span className="text-xs text-[var(--color-muted)]">or</span>
                ) : null}
                <StepLink
                  href={option.href}
                  event={option.event}
                  className="inline-flex items-baseline gap-1.5 rounded-full bg-[var(--color-accent-soft)] px-4 py-2 text-sm font-semibold text-[var(--color-accent-strong)] transition hover:bg-[var(--color-accent)] hover:text-white"
                >
                  {option.label}
                  <span className="text-[11px] font-normal opacity-70">
                    {option.hint}
                  </span>
                </StepLink>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

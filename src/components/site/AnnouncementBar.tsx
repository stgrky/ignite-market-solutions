"use client";

import { sendGAEvent } from "@next/third-parties/google";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Container } from "@/components/Container";
import { announcement } from "@/lib/content";

const DISMISS_KEY = "icc-announcement-dismissed";

/**
 * The offer bar.
 *
 * Why this and not a modal: the first paid traffic arrived from a boosted
 * Facebook post, which means almost all of it is mobile and almost none of it
 * has heard of us. An interstitial on first load is the wrong move for that
 * audience on three counts — Google demotes intrusive interstitials on mobile
 * search, a popup is the opposite of the calm, unpushy tone the rest of the
 * site sells to therapists, and it hides the one thing a cold visitor came to
 * do, which is look at the websites.
 *
 * A bar costs ~40px, says the offer before anyone scrolls, and stays visible
 * on every page. It renders inside the Header's sticky container rather than
 * as its own sticky element: two `sticky top-0` siblings would overlap, and
 * any `top-[Npx]` offset breaks the moment the copy wraps to two lines on a
 * narrow phone.
 *
 * Dismissal is what makes a permanent bar acceptable — someone who has read
 * it once can take the space back, and we remember that.
 */
export function AnnouncementBar() {
  // Starts visible so the server and the first client render agree, and so
  // the offer is never missing for the (large) majority who have not
  // dismissed it. A returning visitor sees it for one frame; the alternative
  // is everyone seeing a blank gap until hydration.
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(DISMISS_KEY) === "1") setDismissed(true);
    } catch {
      // Private mode, or storage blocked. Showing the bar is the safe failure.
    }
  }, []);

  if (dismissed) return null;

  function dismiss() {
    setDismissed(true);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Nothing to do — it will show again next visit, which is harmless.
    }
  }

  return (
    <div className="relative bg-[var(--color-accent-strong)] text-white">
      {/* Stacks on a phone and sits on one line from `sm` up. The right
          padding clears the dismiss button at every width. */}
      <Container className="flex flex-col items-center justify-center gap-1 py-2 pr-9 text-center sm:flex-row sm:gap-3">
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] leading-snug">
          <span className="whitespace-nowrap rounded-full bg-[var(--color-amber)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-foreground)]">
            {announcement.badge}
          </span>
          <span className="font-semibold">{announcement.headline}</span>
          {/* Held back to `lg`: at narrower widths this clause is what pushes
              the bar onto a third line, and the badge plus headline already
              carry the offer. */}
          <span className="hidden text-white/75 lg:inline">
            {announcement.detail}
          </span>
          {announcement.spotsLeft !== null ? (
            <span className="font-semibold text-[var(--color-amber)]">
              Only {announcement.spotsLeft} spots left.
            </span>
          ) : null}
        </p>

        <Link
          href={announcement.cta.href}
          onClick={() => sendGAEvent("event", "promo_bar_click")}
          className="shrink-0 whitespace-nowrap text-[13px] font-semibold underline decoration-white/50 underline-offset-4 transition hover:decoration-white"
        >
          {announcement.cta.label}
          <span aria-hidden> →</span>
        </Link>
      </Container>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss this announcement"
        className="absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
      >
        <span aria-hidden className="text-sm leading-none">
          ✕
        </span>
      </button>
    </div>
  );
}

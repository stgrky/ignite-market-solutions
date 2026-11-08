"use client";

import { sendGAEvent } from "@next/third-parties/google";
import Link from "next/link";
import { useSyncExternalStore } from "react";

import { Container } from "@/components/Container";
import { announcement } from "@/lib/content";

const DISMISS_KEY = "icc-announcement-dismissed";

/**
 * Dismissal lives outside React because it is browser state, not component
 * state: it has to be readable during render without a post-mount `setState`,
 * which is both a cascading render and a lint error. `useSyncExternalStore`
 * is the supported way to read it, and the module-level listener list is what
 * makes the dismiss button update this tab — the native `storage` event only
 * fires in *other* tabs.
 */
let listeners: Array<() => void> = [];

function subscribe(onChange: () => void) {
  listeners.push(onChange);
  return () => {
    listeners = listeners.filter((l) => l !== onChange);
  };
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    // Private mode, or storage blocked. Showing the bar is the safe failure.
    return false;
  }
}

/** On the server nothing is dismissed, so the offer is in the HTML. */
function getServerSnapshot() {
  return false;
}

function dismiss() {
  try {
    window.localStorage.setItem(DISMISS_KEY, "1");
  } catch {
    // It will come back next visit, which is harmless.
  }
  listeners.forEach((l) => l());
}

export function AnnouncementBar() {
  const dismissed = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  if (dismissed) return null;

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

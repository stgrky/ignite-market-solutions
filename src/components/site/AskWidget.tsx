"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useEffect, useRef, useState } from "react";

import { askWidget } from "@/lib/content";

/** Where the hero stops being the thing on screen. */
const SHOW_AFTER_PX = 520;

/**
 * The floating ask button.
 *
 * It appears only after the hero has scrolled past, which is a deliberate
 * trade. In the hero the claim path is the better ask and this would compete
 * with it; below the hero there is no persistent call to action at all, and
 * that is the stretch of page where someone who has read enough to have a
 * question has nowhere to put it.
 *
 * Why not live chat: see the note on `askWidget` in content.ts. Short
 * version — a bubble promises an answer now, and promising that while
 * working a full-time job is worse than not offering it.
 */
export function AskWidget() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    // Deferred a frame rather than called straight away: setState in an
    // effect body is a cascading render. This also catches a reload that
    // restores a scrolled position, where no scroll event ever fires.
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 transition-all duration-300 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      {open ? (
        <div
          id="ask-widget-panel"
          className="w-[16.5rem] rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-surface)] p-4 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.35)]"
        >
          <p className="font-serif text-lg text-[var(--color-foreground)]">
            {askWidget.heading}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[var(--color-muted)]">
            {askWidget.note}
          </p>

          <div className="mt-3 flex flex-col gap-2">
            {askWidget.options.map((option) => (
              <a
                key={option.label}
                href={option.href}
                onClick={() => {
                  sendGAEvent("event", option.event);
                  setOpen(false);
                }}
                className="flex items-baseline justify-between gap-2 rounded-xl bg-[var(--color-accent-soft)] px-3.5 py-2.5 text-sm font-semibold text-[var(--color-accent-strong)] transition hover:bg-[var(--color-accent)] hover:text-white"
              >
                <span className="whitespace-nowrap">{option.label}</span>
                <span className="whitespace-nowrap text-[11px] font-normal opacity-70">
                  {option.hint}
                </span>
              </a>
            ))}
          </div>
        </div>
      ) : null}

      <button
        type="button"
        aria-expanded={open}
        aria-controls="ask-widget-panel"
        onClick={() => {
          // Only the opening is worth counting: the close is the same button.
          if (!open) sendGAEvent("event", "ask_widget_open");
          setOpen((v) => !v);
        }}
        className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] py-3 pl-4 pr-5 text-sm font-semibold text-white shadow-[0_14px_34px_-10px_var(--color-accent)] transition hover:bg-[var(--color-accent-strong)]"
      >
        {open ? (
          <>
            <svg
              aria-hidden
              viewBox="0 0 20 20"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
            {askWidget.closeLabel}
          </>
        ) : (
          <>
            <svg
              aria-hidden
              viewBox="0 0 20 20"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            >
              <path d="M17 11.5a1.5 1.5 0 0 1-1.5 1.5H7l-3.5 3V5A1.5 1.5 0 0 1 5 3.5h10.5A1.5 1.5 0 0 1 17 5z" />
            </svg>
            {askWidget.label}
          </>
        )}
      </button>
    </div>
  );
}

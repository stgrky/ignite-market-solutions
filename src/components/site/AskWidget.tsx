"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useEffect, useRef, useState } from "react";

import { askWidget } from "@/lib/content";

/** Where the hero stops being the thing on screen. */
const SHOW_AFTER_PX = 520;

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full rounded-lg border border-[var(--color-subtle)] bg-[var(--color-background)] px-3 py-2 text-[13px] text-[var(--color-foreground)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)]";

/**
 * The pre-Clipboard-API copy, kept as a fallback rather than removed.
 *
 * `navigator.clipboard.writeText` is rejected outright in a surprising number
 * of real contexts — an insecure origin, an embedded or automated browser, a
 * locked-down enterprise profile, Firefox without the permission. Each of
 * those would otherwise leave the button doing nothing at all, which is the
 * exact failure this panel was rebuilt to remove. `execCommand` is deprecated
 * but still implemented everywhere, and it is synchronous, so it works inside
 * the click that triggered it.
 */
function legacyCopy(value: string) {
  try {
    const field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.top = "-1000px";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand("copy");
    field.remove();
    return ok;
  } catch {
    return false;
  }
}

function CopyIcon({ done }: { done: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {done ? (
        <path d="M4 10.5l4 4 8-9" />
      ) : (
        <>
          <rect x="7" y="7" width="9" height="10" rx="2" />
          <path d="M13 4.5H6A1.5 1.5 0 0 0 4.5 6v7" />
        </>
      )}
    </svg>
  );
}

/**
 * The floating ask button.
 *
 * It appears only after the hero has scrolled past, which is a deliberate
 * trade. In the hero the claim path is the better ask and this would compete
 * with it; below the hero there is no persistent call to action at all, and
 * that is the stretch of page where someone who has read enough to have a
 * question has nowhere to put it.
 *
 * The panel leads with a form because it is the only channel here that cannot
 * silently fail. A `mailto:` is a request that the operating system open a
 * mail client, and on a desktop with none registered the click does nothing
 * observable — which is exactly how this widget first shipped. The form posts
 * to the same endpoint as the homepage contact form; the number and address
 * underneath are copyable text for anyone who would rather use their own app.
 *
 * Why not live chat: see the note on `askWidget` in content.ts. Short
 * version — a bubble promises an answer now, and promising that while
 * working a full-time job is worse than not offering it.
 */
export function AskWidget() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState<string | null>(null);
  // The draft is component state rather than left in the DOM so that closing
  // the panel and reopening it does not throw away a half-written message.
  const [draft, setDraft] = useState({ name: "", email: "", message: "" });
  const rootRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasDraft = Boolean(draft.name || draft.email || draft.message);

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

  // Escape and a click outside dismiss the panel only while it is empty. Once
  // there is something typed in it, a stray key or a misplaced click would
  // destroy work the visitor cannot get back, so the Close button becomes the
  // only way out.
  useEffect(() => {
    if (!open || hasDraft) return;

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
  }, [open, hasDraft]);

  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    []
  );

  async function copyValue(key: string, value: string) {
    let ok = false;
    try {
      await navigator.clipboard.writeText(value);
      ok = true;
    } catch {
      ok = legacyCopy(value);
    }

    // A failed copy says so. Silence is what the visitor reads as a broken
    // button, and the number is right there to select by hand.
    setCopied(ok ? key : "failed");
    if (ok) sendGAEvent("event", "ask_widget_copy", { channel: key });
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(null), ok ? 1800 : 4000);
  }

  async function submit() {
    const form = formRef.current;
    // Native validation normally runs on submit; nothing here submits, so ask
    // for it explicitly — see the note on the form element below.
    if (!form || !form.reportValidity()) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: draft.name,
          email: draft.email,
          anythingElse: draft.message || undefined,
          completedStep: 1,
        }),
      });
      if (!response.ok) {
        setStatus("error");
        return;
      }
      sendGAEvent("event", "generate_lead", { form_name: "ask_widget" });
      setDraft({ name: "", email: "", message: "" });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

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
          className="max-h-[min(78vh,34rem)] w-[min(21rem,calc(100vw-2.5rem))] overflow-y-auto rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-surface)] p-4 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.35)]"
        >
          {status === "sent" ? (
            <>
              <p className="font-serif text-lg text-[var(--color-foreground)]">
                {askWidget.form.sentHeading}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--color-muted)]">
                {askWidget.form.sentNote}
              </p>
            </>
          ) : (
            <>
              <p className="font-serif text-lg text-[var(--color-foreground)]">
                {askWidget.heading}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--color-muted)]">
                {askWidget.note}
              </p>

              {/*
                Deliberately not submitted natively: HubSpot's
                collectedforms.js scrapes every submit event on the page into
                its own contact, alongside the one the API composes. See the
                longer note in IntakeForm.
              */}
              <form
                ref={formRef}
                data-hs-do-not-collect="true"
                onSubmit={(event) => event.preventDefault()}
                onKeyDown={(event) => {
                  if (event.key !== "Enter") return;
                  if ((event.target as HTMLElement).tagName === "TEXTAREA") return;
                  event.preventDefault();
                  if (status !== "sending") void submit();
                }}
                className="mt-3 flex flex-col gap-2"
              >
                <label className="sr-only" htmlFor="ask-name">
                  First name
                </label>
                <input
                  id="ask-name"
                  name="firstName"
                  required
                  autoComplete="given-name"
                  maxLength={100}
                  placeholder="First name"
                  value={draft.name}
                  onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                  className={fieldClass}
                />

                <label className="sr-only" htmlFor="ask-email">
                  Email
                </label>
                <input
                  id="ask-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  maxLength={200}
                  placeholder="Email"
                  value={draft.email}
                  onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                  className={fieldClass}
                />

                <label className="sr-only" htmlFor="ask-message">
                  Your question
                </label>
                <textarea
                  id="ask-message"
                  name="message"
                  rows={3}
                  maxLength={5000}
                  placeholder="What's on your mind?"
                  value={draft.message}
                  onChange={(e) => setDraft((d) => ({ ...d, message: e.target.value }))}
                  className={`${fieldClass} resize-none`}
                />

                {status === "error" ? (
                  <p
                    role="alert"
                    className="rounded-lg bg-red-50 px-3 py-2 text-[11px] leading-relaxed text-red-700"
                  >
                    {askWidget.form.error}
                  </p>
                ) : null}

                <button
                  type="button"
                  onClick={() => void submit()}
                  disabled={status === "sending"}
                  className="mt-0.5 inline-flex w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[var(--color-accent-strong)] disabled:opacity-60"
                >
                  {status === "sending"
                    ? askWidget.form.sendingLabel
                    : askWidget.form.submitLabel}
                </button>
              </form>
            </>
          )}

          <p className="mt-4 border-t border-[var(--color-subtle)] pt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]">
            {askWidget.directLead}
          </p>

          <div className="mt-2 flex flex-col gap-1.5">
            {askWidget.direct.map((channel) => (
              <div
                key={channel.key}
                className="flex items-center gap-1 rounded-xl bg-[var(--color-accent-soft)] px-3 py-2"
              >
                <a
                  href={channel.href}
                  onClick={() => sendGAEvent("event", channel.event)}
                  // `title` alone would become the link's accessible name,
                  // leaving a screen reader with "Tap to text" and no number.
                  title={channel.hint}
                  aria-label={`${channel.hint}: ${channel.value}`}
                  className="min-w-0 flex-1 truncate text-[13px] font-semibold text-[var(--color-accent-strong)] underline decoration-transparent underline-offset-2 transition hover:decoration-[var(--color-accent)]"
                >
                  {channel.value}
                </a>
                <button
                  type="button"
                  onClick={() => void copyValue(channel.key, channel.value)}
                  aria-label={`Copy ${channel.value}`}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[var(--color-accent-strong)] transition hover:bg-[var(--color-accent)]/15"
                >
                  <CopyIcon done={copied === channel.key} />
                </button>
              </div>
            ))}
          </div>

          {copied === "failed" ? (
            <p className="mt-2 text-[11px] leading-relaxed text-[var(--color-muted)]">
              Your browser blocked the copy — select the text above
              instead.
            </p>
          ) : null}

          {/* Announced rather than only drawn, so the check mark is not the
              sole confirmation that something was copied. */}
          <p aria-live="polite" className="sr-only">
            {copied === "failed" ? "Copy blocked" : copied ? "Copied" : ""}
          </p>
        </div>
      ) : null}

      <button
        type="button"
        aria-expanded={open}
        aria-controls="ask-widget-panel"
        onClick={() => {
          // Only the opening is worth counting: the close is the same button.
          if (!open) {
            sendGAEvent("event", "ask_widget_open");
            // A second question after a send starts from a blank form.
            if (status === "sent") setStatus("idle");
          }
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

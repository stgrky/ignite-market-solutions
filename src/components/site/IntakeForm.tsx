"use client";

import { sendGAEvent } from "@next/third-parties/google";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Field, intakeSteps } from "@/lib/intake-steps";

/**
 * The guided intake. One step per screen, everything after the first skippable.
 *
 * It exists to replace the discovery call: by the time Grant speaks to someone,
 * he has already read what they picked, what they'd change, how they want it to
 * feel and when they want to launch — so the call is fifteen minutes to confirm
 * and close, not an hour of scoping.
 *
 * Three decisions worth knowing:
 *
 * - **Only first name and email are required.** A half-finished intake from
 *   someone who got bored is worth incomparably more than a perfect one they
 *   abandoned, so every step offers Skip and step one offers "send it now".
 * - **The draft is kept in localStorage**, because people fill these in on a
 *   phone between sessions and will lose the tab. Every access is wrapped: a
 *   browser in private mode throws on read, and that must not break the form.
 * - **Nothing here is stored by us.** The draft lives in the visitor's own
 *   browser and is cleared on submit; the server passes answers to HubSpot
 *   without writing them anywhere.
 */

const DRAFT_KEY = "icc-intake-draft";

type Values = Record<string, string | string[] | number>;

type Draft = { values: Values; step: number };

/**
 * Drafts used to be a bare map of answers, which meant someone who left from
 * step 4 came back to step 1 with their answers filled in — while the banner
 * told them they had picked up where they left off. The step is stored now.
 * The old shape is still read, so a draft saved before this change survives.
 */
const readDraft = (): Draft => {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return { values: {}, step: 0 };
    const parsed = JSON.parse(raw) as Partial<Draft> & Values;
    if (parsed && typeof parsed === "object" && "values" in parsed) {
      return { values: parsed.values ?? {}, step: Number(parsed.step) || 0 };
    }
    return { values: parsed as Values, step: 0 };
  } catch {
    return { values: {}, step: 0 };
  }
};

const writeDraft = (values: Values, step: number) => {
  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ values, step }));
  } catch {
    /* private mode, or storage full — the form still works, just without a draft */
  }
};

const clearDraft = () => {
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* nothing to do */
  }
};

const inputClass =
  "mt-1.5 w-full rounded-lg border border-[var(--color-subtle)] bg-[var(--color-background)] px-3.5 py-2.5 text-base text-[var(--color-foreground)] outline-none transition-colors focus:border-[var(--color-accent)]";
const labelClass = "block text-sm font-semibold text-[var(--color-foreground)]";

export function IntakeForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState<Values>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [restored, setRestored] = useState(false);

  // Reading the visitor's own storage can only happen after mount: it doesn't
  // exist on the server, and seeding it into the first client render would make
  // the hydrated inputs disagree with the server-rendered ones. This is the
  // case the rule exists to catch, and the one place it's the right thing.
  useEffect(() => {
    const draft = readDraft();
    if (Object.keys(draft.values).length === 0) return;
    /* eslint-disable react-hooks/set-state-in-effect */
    setValues(draft.values);
    // Clamped: a draft written before a step was removed must not land out of range.
    setStepIndex(Math.min(Math.max(draft.step, 0), intakeSteps.length - 1));
    setRestored(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const set = useCallback(
    (name: string, value: string | string[] | number) => {
      setValues((prev) => {
        const next = { ...prev, [name]: value };
        writeDraft(next, stepIndex);
        return next;
      });
    },
    [stepIndex],
  );

  // Moving between steps is itself worth saving: someone who fills step 3 and
  // then clicks through to step 4 before leaving should return to step 4.
  useEffect(() => {
    if (Object.keys(values).length > 0) writeDraft(values, stepIndex);
    // Only the step crossing matters here; value edits already write above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex]);

  const step = intakeSteps[stepIndex];
  const isLast = stepIndex === intakeSteps.length - 1;
  const progress = ((stepIndex + 1) / intakeSteps.length) * 100;

  const visibleFields = useMemo(
    () =>
      step.fields.filter(
        (field) =>
          !field.showWhen ||
          field.showWhen.equals.includes(String(values[field.showWhen.field] ?? "")),
      ),
    [step, values],
  );

  const missingRequired = step.fields.some(
    (field) => field.required && !String(values[field.name] ?? "").trim(),
  );

  async function submit(completedStep: number) {
    setStatus("sending");
    setError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, completedStep }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(body.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      sendGAEvent("event", "generate_lead", {
        form_name: "intake",
        completed_step: completedStep,
      });
      clearDraft();
      setStatus("sent");
    } catch {
      setError("Something went wrong. Please try again, or email grant@ignitecreativeco.world.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <ThankYou firstName={String(values.firstName ?? "")} email={String(values.email ?? "")} />;
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-medium text-[var(--color-foreground)]">
            {step.title}
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            Step {stepIndex + 1} of {intakeSteps.length}
          </p>
        </div>
        <div
          className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-subtle)]"
          role="progressbar"
          aria-valuenow={stepIndex + 1}
          aria-valuemin={1}
          aria-valuemax={intakeSteps.length}
          aria-label="Intake progress"
        >
          <div
            className="h-full rounded-full transition-[width] duration-500"
            style={{ width: `${progress}%`, background: "var(--ignite-gradient)" }}
          />
        </div>
      </div>

      {restored && stepIndex === 0 ? (
        <p className="mb-6 rounded-lg bg-[var(--color-accent-soft)] px-4 py-3 text-sm text-[var(--color-accent-strong)]">
          Picked up where you left off. Nothing has been sent yet.
        </p>
      ) : null}

      {step.intro ? (
        <p className="mb-6 text-[var(--color-muted)]">{step.intro}</p>
      ) : null}

      {step.caution ? (
        <p className="mb-6 rounded-lg border border-[var(--color-subtle)] bg-[var(--color-background)] px-4 py-3 text-sm text-[var(--color-muted)]">
          {step.caution}
        </p>
      ) : null}

      {/*
        Nothing in here is a submit button, and Enter is swallowed below, so a
        native submit event never fires. That is deliberate and load-bearing.

        HubSpot's tracking code includes collectedforms.js, which listens for
        submit events on every form on the page and scrapes the fields into a
        contact by itself. preventDefault() does not stop it — it runs off the
        same event. Because this wizard is one long form, a Next button that
        submitted made HubSpot create a contact the moment someone left step 1,
        with raw field names and none of the summary the API composes. The only
        submission that should reach HubSpot is the one submit() sends.
      */}
      <form
        data-hs-do-not-collect="true"
        onSubmit={(event) => event.preventDefault()}
        onKeyDown={(event) => {
          if (event.key !== "Enter") return;
          if ((event.target as HTMLElement).tagName === "TEXTAREA") return;
          // Would otherwise be an implicit submission.
          event.preventDefault();
          if (missingRequired || status === "sending") return;
          if (isLast) void submit(intakeSteps.length);
          else setStepIndex((i) => i + 1);
        }}
        className="space-y-6"
      >
        {visibleFields.map((field) => (
          <FieldInput key={field.name} field={field} value={values[field.name]} onChange={set} />
        ))}

        {error ? (
          <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {stepIndex > 0 ? (
            <button
              type="button"
              onClick={() => setStepIndex((i) => i - 1)}
              className="rounded-full border border-[var(--color-subtle)] px-5 py-2.5 text-sm font-medium text-[var(--color-foreground)] transition hover:border-[var(--color-accent)]"
            >
              Back
            </button>
          ) : null}

          <button
            type="button"
            onClick={() => {
              if (isLast) void submit(intakeSteps.length);
              else setStepIndex((i) => i + 1);
            }}
            disabled={missingRequired || status === "sending"}
            className="rounded-full bg-[var(--color-accent)] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)] disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : isLast ? "Send my intake" : "Next"}
          </button>

          {!isLast && stepIndex > 0 ? (
            <button
              type="button"
              onClick={() => setStepIndex((i) => i + 1)}
              className="text-sm text-[var(--color-muted)] underline decoration-[var(--color-subtle)] underline-offset-4 transition hover:text-[var(--color-foreground)]"
            >
              Skip this step
            </button>
          ) : null}
        </div>

        {stepIndex === 0 ? (
          <p className="pt-2 text-sm text-[var(--color-muted)]">
            Just have a quick question?{" "}
            <button
              type="button"
              disabled={missingRequired || status === "sending"}
              onClick={() => void submit(1)}
              className="font-semibold text-[var(--color-accent-strong)] underline decoration-[var(--color-subtle)] underline-offset-4 transition hover:decoration-[var(--color-accent)] disabled:opacity-60"
            >
              Send it now
            </button>{" "}
            and skip the rest.
          </p>
        ) : null}
      </form>
    </div>
  );
}

/**
 * A way out of a question that can't be answered from this page — today just
 * the one asking which website they liked. Says the draft is kept, because the
 * reason people don't go and look is the fear of losing what they've typed.
 */
function FieldAction({ field }: { field: Field }) {
  if (!field.action) return null;
  const { label, href, newTab } = field.action;
  return (
    <p className="mt-2.5 text-sm text-[var(--color-muted)]">
      <Link
        href={href}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="font-semibold text-[var(--color-accent-strong)] underline decoration-[var(--color-subtle)] underline-offset-4 transition hover:decoration-[var(--color-accent)]"
      >
        {label}
      </Link>{" "}
      Your answers are saved on this device, so you&rsquo;ll come back to exactly where you left off.
    </p>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: string | string[] | number | undefined;
  onChange: (name: string, value: string | string[] | number) => void;
}) {
  const id = `intake-${field.name}`;

  if (field.type === "textarea") {
    return (
      <div>
        <label className={labelClass} htmlFor={id}>
          {field.label}
        </label>
        {field.hint ? <p className="mt-1 text-sm text-[var(--color-muted)]">{field.hint}</p> : null}
        <textarea
          id={id}
          rows={4}
          maxLength={field.maxLength}
          value={String(value ?? "")}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={inputClass}
        />
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div>
        <label className={labelClass} htmlFor={id}>
          {field.label}
        </label>
        <select
          id={id}
          value={String(value ?? "")}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={inputClass}
        >
          <option value="">Choose one…</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FieldAction field={field} />
      </div>
    );
  }

  if (field.type === "radio") {
    return (
      <fieldset>
        <legend className={labelClass}>{field.label}</legend>
        {field.hint ? <p className="mt-1 text-sm text-[var(--color-muted)]">{field.hint}</p> : null}
        <div className="mt-2.5 space-y-2">
          {field.options?.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2.5 text-[15px] text-[var(--color-foreground)]"
            >
              <input
                type="radio"
                name={field.name}
                value={option.value}
                checked={String(value ?? "") === option.value}
                onChange={() => onChange(field.name, option.value)}
                className="h-4 w-4 accent-[var(--color-accent)]"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  if (field.type === "checkboxes") {
    const selected = Array.isArray(value) ? value : [];
    return (
      <fieldset>
        <legend className={labelClass}>{field.label}</legend>
        {field.hint ? <p className="mt-1 text-sm text-[var(--color-muted)]">{field.hint}</p> : null}
        <div className="mt-2.5 space-y-2">
          {field.options?.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-start gap-2.5 text-[15px] text-[var(--color-foreground)]"
            >
              <input
                type="checkbox"
                value={option.value}
                checked={selected.includes(option.value)}
                onChange={(e) =>
                  onChange(
                    field.name,
                    e.target.checked
                      ? [...selected, option.value]
                      : selected.filter((v) => v !== option.value),
                  )
                }
                className="mt-0.5 h-4 w-4 accent-[var(--color-accent)]"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  if (field.type === "colors") {
    const colors = Array.isArray(value) ? value : [];
    return (
      <fieldset>
        <legend className={labelClass}>{field.label}</legend>
        {field.hint ? <p className="mt-1 text-sm text-[var(--color-muted)]">{field.hint}</p> : null}
        <div className="mt-2.5 flex gap-3">
          {Array.from({ length: field.count ?? 4 }).map((_, i) => (
            <input
              key={i}
              type="color"
              aria-label={`${field.label} ${i + 1}`}
              value={colors[i] ?? "#f8f5ef"}
              onChange={(e) => {
                const next = [...colors];
                next[i] = e.target.value;
                onChange(field.name, next);
              }}
              className="h-11 w-14 cursor-pointer rounded-lg border border-[var(--color-subtle)] bg-transparent"
            />
          ))}
        </div>
      </fieldset>
    );
  }

  if (field.type === "slider") {
    const current = typeof value === "number" ? value : 50;
    return (
      <div>
        <label className={labelClass} htmlFor={id}>
          {field.label}
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          step={5}
          value={current}
          onChange={(e) => onChange(field.name, Number(e.target.value))}
          className="mt-3 w-full accent-[var(--color-accent)]"
        />
        <div className="mt-1 flex justify-between text-xs text-[var(--color-muted)]">
          <span>{field.ends?.[0]}</span>
          <span>{field.ends?.[1]}</span>
        </div>
      </div>
    );
  }

  const inputType =
    field.type === "email" ? "email" : field.type === "tel" ? "tel" : "text";

  return (
    <div>
      <label className={labelClass} htmlFor={id}>
        {field.label}
        {field.required ? <span aria-hidden className="text-[var(--color-muted)]"> *</span> : null}
      </label>
      {field.hint ? <p className="mt-1 text-sm text-[var(--color-muted)]">{field.hint}</p> : null}
      <input
        id={id}
        type={inputType}
        required={field.required}
        placeholder={field.placeholder}
        maxLength={field.maxLength}
        autoComplete={
          field.name === "firstName"
            ? "given-name"
            : field.name === "lastName"
              ? "family-name"
              : field.name === "email"
                ? "email"
                : field.name === "phone"
                  ? "tel"
                  : undefined
        }
        value={String(value ?? "")}
        onChange={(e) => onChange(field.name, e.target.value)}
        className={inputClass}
      />
    </div>
  );
}

function ThankYou({ firstName, email }: { firstName: string; email: string }) {
  const booking = process.env.NEXT_PUBLIC_BOOKING_URL;
  // Calendly reads these straight off the query string, so the person doesn't
  // retype what they just told us.
  const bookingUrl =
    booking && booking.includes("calendly.com")
      ? `${booking}${booking.includes("?") ? "&" : "?"}name=${encodeURIComponent(firstName)}&email=${encodeURIComponent(email)}`
      : booking;

  return (
    <div className="mx-auto w-full max-w-xl text-center">
      <h2 className="font-serif text-3xl text-[var(--color-foreground)]">
        Thanks{firstName ? `, ${firstName}` : ""} — that&rsquo;s everything I need.
      </h2>
      <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
        I&rsquo;ll read this before we talk, so our call can be short and about next steps
        rather than questions you&rsquo;ve already answered.
      </p>
      {bookingUrl ? (
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)]"
        >
          Book your 15 minutes
          <span aria-hidden>→</span>
        </a>
      ) : (
        <p className="mt-8 text-[var(--color-muted)]">
          I&rsquo;ll be in touch within one business day to find a time.
        </p>
      )}
      <p className="mt-8 text-sm text-[var(--color-muted)]">
        <Link href="/" className="underline decoration-[var(--color-subtle)] underline-offset-4">
          Back to the homepage
        </Link>
      </p>
    </div>
  );
}

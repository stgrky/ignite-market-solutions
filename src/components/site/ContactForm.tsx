"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useState } from "react";

import { styleDirections } from "@/lib/content";
import {
  CUSTOM_DEV_BRANCH_ENABLED,
  deriveTrack,
  GOALS,
  PAGE_COUNTS,
  TEMPLATE_NOT_SURE,
} from "@/lib/intake";

type Status = "idle" | "submitting" | "success" | "error";
type Offering = "productized" | "custom";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-[var(--color-subtle)] bg-[var(--color-background)] px-3.5 py-2.5 text-sm text-[var(--color-foreground)] outline-none transition-colors focus:border-[var(--color-accent)]";
const labelClass =
  "block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]";

/**
 * A branching intake form. Follow-up questions appear only for the path a
 * visitor chooses, and hidden questions are unmounted rather than hidden, so an
 * answer typed into a branch they backed out of is never submitted. The server
 * applies the same rules again (see src/lib/intake.ts).
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [offering, setOffering] = useState<Offering | "">(
    CUSTOM_DEV_BRANCH_ENABLED ? "" : "productized",
  );
  const [hasExistingSite, setHasExistingSite] = useState("");
  const [customKind, setCustomKind] = useState("");
  const [wantsPortal, setWantsPortal] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);
    const answers = { offering, hasExistingSite, customKind };
    const text = (name: string) => data.get(name) ?? undefined;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...answers,
          firstName: text("firstName"),
          lastName: text("lastName"),
          email: text("email"),
          phone: text("phone"),
          template: text("template"),
          existingSiteUrl: text("existingSiteUrl"),
          pageCount: text("pageCount"),
          carryOver: text("carryOver"),
          change: text("change"),
          scope: text("scope"),
          goals: data.getAll("goals"),
          otherGoal: text("otherGoal"),
          notes: text("notes"),
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      sendGAEvent("event", "generate_lead", {
        form_name: "contact_form",
        intake_track: deriveTrack(answers),
      });
      setStatus("success");
    } catch {
      sendGAEvent("event", "form_error", { form_name: "contact_form" });
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto mt-10 w-full max-w-lg rounded-2xl bg-[var(--color-surface)] p-8 text-center shadow-[var(--shadow-card)]">
        <p className="font-serif text-xl font-bold text-[var(--color-foreground)]">
          Message sent.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
          Thanks for reaching out &mdash; I&rsquo;ll get back to you within a day.
        </p>
      </div>
    );
  }

  const isProductized = offering === "productized";
  const isCustom = offering === "custom";

  // Asked right after the website picker, while a visitor still has the designs
  // in mind — that's when they have something to say about them. The custom
  // branch has no picker, so it gets the same question at the end. Only one
  // branch ever renders, so the two never collide on the `notes` name.
  const notesField = (
    <div className="mt-6">
      <TextArea
        label="What stood out to you, and what would you change?"
        name="notes"
        rows={4}
        hint="Or just ask anything."
      />
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 w-full max-w-lg rounded-2xl bg-[var(--color-surface)] p-6 text-left shadow-[var(--shadow-card)] sm:p-8"
    >
      <p className="font-serif text-xl font-bold text-[var(--color-foreground)]">
        Send a message
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
        A few quick questions so I can come to our call prepared. Only your name
        and email are required.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="First name" name="firstName" required autoComplete="given-name" />
        <Field label="Last name" name="lastName" autoComplete="family-name" />
      </div>
      <div className="mt-4">
        <Field label="Email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="mt-4">
        <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
      </div>

      {CUSTOM_DEV_BRANCH_ENABLED ? (
        <ChoiceGroup
          legend="What are you looking for?"
          name="offering"
          value={offering}
          onChange={(value) => setOffering(value as Offering)}
          options={[
            {
              value: "productized",
              label: "A finished website, tailored to my practice",
              description: "Pick one of our websites and make it yours. Live in about a week or two.",
            },
            {
              value: "custom",
              label: "Custom development",
              description: "A site built from scratch, or changes to one you already have. $60/hour.",
            },
          ]}
        />
      ) : null}

      {isProductized ? (
        <>
          <ChoiceGroup
            legend="Do you already have a website?"
            name="hasExistingSite"
            value={hasExistingSite}
            onChange={setHasExistingSite}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "Not yet" },
            ]}
          />

          {hasExistingSite === "yes" ? (
            <Reveal>
              <Field
                label="Your current site’s address"
                name="existingSiteUrl"
                inputMode="url"
                placeholder="yourpractice.com"
              />
              <SelectField
                label="Roughly how many pages does it have?"
                name="pageCount"
                hint="Content from up to 6 pages moves across for you as part of the build."
                options={PAGE_COUNTS}
              />
              <TextArea label="Anything you definitely want carried over?" name="carryOver" rows={2} />
              <TextArea label="Anything you want changed or left behind?" name="change" rows={2} />
            </Reveal>
          ) : null}

          <div className="mt-4">
            <label className={labelClass} htmlFor="template">
              Which website stood out to you?
            </label>
            <select id="template" name="template" defaultValue={TEMPLATE_NOT_SURE} className={inputClass}>
              <option value={TEMPLATE_NOT_SURE}>Not sure yet</option>
              {styleDirections.designs.map((design) => (
                <option key={design.name} value={design.name}>
                  {design.name} — {design.vibe}
                </option>
              ))}
            </select>
          </div>

          {notesField}
        </>
      ) : null}

      {isCustom ? (
        <>
          <ChoiceGroup
            legend="Where are you starting from?"
            name="customKind"
            value={customKind}
            onChange={setCustomKind}
            options={[
              { value: "scratch", label: "From scratch" },
              { value: "existing", label: "A site I already have" },
            ]}
          />
          {customKind === "scratch" ? (
            <Reveal>
              <TextArea label="What do you want built?" name="scope" rows={3} />
              <SelectField label="Roughly how many pages?" name="pageCount" options={PAGE_COUNTS} />
            </Reveal>
          ) : null}
          {customKind === "existing" ? (
            <Reveal>
              <Field
                label="Your current site’s address"
                name="existingSiteUrl"
                inputMode="url"
                placeholder="yourpractice.com"
              />
              <TextArea
                label="What do you want changed?"
                name="change"
                rows={3}
                hint="For a site I didn’t build, we start with a paid discovery hour ($60), so the quote you get is a real one."
              />
            </Reveal>
          ) : null}

          {notesField}
        </>
      ) : null}

      {offering ? (
        <>
          <fieldset className="mt-6">
            <legend className={labelClass}>What are you hoping your website does for you?</legend>
            <p className="mt-1 text-xs text-[var(--color-muted)]">Choose any that apply.</p>
            <div className="mt-2.5 space-y-2">
              {GOALS.map((goal) => (
                <div key={goal.value}>
                  <label className="flex cursor-pointer items-start gap-2.5 text-sm text-[var(--color-foreground)]">
                    <input
                      type="checkbox"
                      name="goals"
                      value={goal.value}
                      onChange={
                        goal.value === "client_portal"
                          ? (event) => setWantsPortal(event.currentTarget.checked)
                          : undefined
                      }
                      className="mt-0.5 h-4 w-4 accent-[var(--color-accent)]"
                    />
                    {goal.label}
                  </label>
                  {goal.value === "client_portal" && wantsPortal ? (
                    <p className="ml-6.5 mt-1.5 rounded-lg bg-[var(--color-background)] px-3 py-2 text-xs leading-relaxed text-[var(--color-muted)]">
                      Good to know. A client portal holds your clients&rsquo; health
                      information, so it belongs in a HIPAA-compliant practice system like
                      SimplePractice. Your new site can link straight to it.
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="mt-3">
              <Field label="Something else?" name="otherGoal" />
            </div>
          </fieldset>
        </>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting" || !offering}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)] disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>

      {status === "error" ? (
        <p className="mt-3 text-sm text-red-600">
          Something went wrong — try again, or email {" "}
          <a href="mailto:grant@ignitecreativeco.world" className="underline">
            grant@ignitecreativeco.world
          </a>{" "}
          directly.
        </p>
      ) : null}
    </form>
  );
}

/** Follow-up questions for a chosen branch, set off so they read as a group. */
function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 space-y-4 border-l-2 border-[var(--color-subtle)] pl-4">{children}</div>
  );
}

function ChoiceGroup({
  legend,
  name,
  value,
  onChange,
  options,
}: {
  legend: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; description?: string }[];
}) {
  return (
    <fieldset className="mt-6">
      <legend className={labelClass}>{legend}</legend>
      <div className={`mt-2 grid gap-2 ${options.some((o) => o.description) ? "" : "grid-cols-2"}`}>
        {options.map((option) => (
          <label
            key={option.value}
            className="cursor-pointer rounded-lg border border-[var(--color-subtle)] bg-[var(--color-background)] px-3.5 py-2.5 text-sm text-[var(--color-foreground)] transition-colors has-[:checked]:border-[var(--color-accent)] has-[:checked]:bg-[var(--color-accent)]/8 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--color-accent)]"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              required
              className="sr-only"
            />
            <span className="font-medium">{option.label}</span>
            {option.description ? (
              <span className="mt-0.5 block text-xs leading-relaxed text-[var(--color-muted)]">
                {option.description}
              </span>
            ) : null}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function SelectField({
  label,
  name,
  hint,
  options,
}: {
  label: string;
  name: string;
  hint?: string;
  options: readonly { value: string; label: string }[];
}) {
  return (
    <div>
      <label className={labelClass} htmlFor={name}>
        {label}
      </label>
      <select id={name} name={name} defaultValue="" className={inputClass}>
        <option value="">Choose one</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint ? <p className="mt-1.5 text-xs text-[var(--color-muted)]">{hint}</p> : null}
    </div>
  );
}

function TextArea({
  label,
  name,
  rows,
  hint,
}: {
  label: string;
  name: string;
  rows: number;
  hint?: string;
}) {
  return (
    <div>
      <label className={labelClass} htmlFor={name}>
        {label}
      </label>
      {hint ? <p className="mt-1 text-xs text-[var(--color-muted)]">{hint}</p> : null}
      <textarea id={name} name={name} rows={rows} className={inputClass} />
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  inputMode,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string;
}) {
  return (
    <div>
      <label className={labelClass} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}

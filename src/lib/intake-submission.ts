import { z } from "zod";

import { allFields, intakeSteps, labelFor } from "./intake-steps";

/**
 * Validation and the readable summary, both derived from intake-steps.ts.
 *
 * Partial submissions are the normal case, not an error: every step after the
 * first can be skipped, and someone with a quick question can send from step 1.
 * So the only hard requirements are a first name and an email — everything else
 * is accepted if present and ignored if absent.
 */

const trimmedString = (max: number) =>
  z.string().trim().max(max).optional().or(z.literal("").transform(() => undefined));

/** Built from the field definitions, so a new question validates automatically. */
const shape: Record<string, z.ZodTypeAny> = {};
for (const field of allFields) {
  if (field.type === "checkboxes" || field.type === "colors") {
    shape[field.name] = z.array(z.string().trim().max(200)).max(24).optional();
  } else if (field.type === "slider") {
    shape[field.name] = z.coerce.number().min(0).max(100).optional();
  } else {
    shape[field.name] = trimmedString(field.maxLength ?? 500);
  }
}

// First name and email are the two things a lead is useless without. Both carry
// their own message for the missing case too: zod's default ("expected string,
// received undefined") is developer language, and this text reaches a visitor.
shape.firstName = z
  .string({ error: "Please add your first name" })
  .trim()
  .min(1, "Please add your first name")
  .max(100);
shape.email = z
  .string({ error: "Please add your email address" })
  .trim()
  .email("Please check your email address")
  .max(200);

/** Which step the visitor reached, so a partial submission is readable as such. */
shape.completedStep = z.coerce.number().int().min(1).max(intakeSteps.length).optional();

export const intakeSchema = z.object(shape).strip();
export type Intake = z.infer<typeof intakeSchema> & Record<string, unknown>;

export function parseIntake(raw: unknown) {
  const result = intakeSchema.safeParse(raw ?? {});
  if (result.success) return { ok: true as const, intake: result.data as Intake };
  const first = result.error.issues[0];
  return {
    ok: false as const,
    // The visitor sees this, so it must be a sentence rather than a field path.
    error: first?.message ?? "Please check the form and try again.",
  };
}

const isEmpty = (value: unknown) =>
  value === undefined ||
  value === null ||
  value === "" ||
  (Array.isArray(value) && value.length === 0);

/** A slider's stored 0–100 as words, since "62" means nothing in a CRM. */
function describeSlider(fieldName: string, value: number): string {
  const ends = allFields.find((f) => f.name === fieldName)?.ends;
  if (!ends) return String(value);
  const [low, high] = ends;
  if (value <= 20) return low;
  if (value <= 40) return `Leaning ${low.toLowerCase()}`;
  if (value < 60) return "Balanced";
  if (value < 80) return `Leaning ${high.toLowerCase()}`;
  return high;
}

function renderValue(fieldName: string, value: unknown): string {
  if (Array.isArray(value)) {
    return value.map((v) => labelFor(fieldName, String(v))).join(", ");
  }
  if (typeof value === "number") return describeSlider(fieldName, value);
  return labelFor(fieldName, String(value));
}

/**
 * The summary that lands on the HubSpot contact and in the notification email.
 *
 * Grouped by step and printed with the labels a person reads, so the whole
 * intake can be taken in before a 15-minute call without opening the form.
 */
export function composeIntakeSummary(intake: Intake): string {
  const reached = typeof intake.completedStep === "number" ? intake.completedStep : intakeSteps.length;
  const lines: string[] = [
    reached < intakeSteps.length
      ? `INTAKE — partial, reached step ${reached} of ${intakeSteps.length}`
      : `INTAKE — complete`,
  ];

  for (const step of intakeSteps) {
    const answered = step.fields
      .filter((field) => !isEmpty((intake as Record<string, unknown>)[field.name]))
      .map((field) => `  ${field.label}: ${renderValue(field.name, (intake as Record<string, unknown>)[field.name])}`);

    if (answered.length === 0) continue;
    lines.push("", step.title.toUpperCase(), ...answered);
  }

  return lines.join("\n");
}

/**
 * The five routing properties that exist in HubSpot today.
 *
 * Deliberately not one property per question: the account is on the free tier,
 * which allows ten custom properties across the whole portal. Everything else
 * rides in the note, which is free and unlimited. See
 * ims-ops/INTAKE_FORM_HUBSPOT_MAPPING.md.
 */
export function routingProperties(intake: Intake): Record<string, string> {
  const props: Record<string, string> = {};
  const track =
    intake.hasExistingSite === "yes" ? "productized_existing" : "productized_new";
  props.icc_track = track;
  if (intake.template) props.icc_template_choice = String(intake.template);
  if (intake.currentSiteUrl) props.icc_existing_site_url = String(intake.currentSiteUrl);
  if (Array.isArray(intake.goals) && intake.goals.length > 0) {
    props.icc_goals = intake.goals.join(";");
  }
  return props;
}

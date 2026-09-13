/**
 * The branching intake form: its options, and how a submission is validated,
 * classified, and written into HubSpot.
 *
 * Shared by the form (to render the choices) and the API route (to check and
 * compose what arrives). The route never trusts the browser's idea of which
 * branch a lead is on — it re-derives the track from the answers themselves.
 *
 * Deliberately free of imports so it can be exercised directly with Node.
 */

/**
 * The custom-dev branch of the form ships with the custom-dev offering, which
 * isn't published yet (it waits on whether the client service agreement covers
 * that work). While this is false the form asks only the productized questions,
 * and the route treats every submission as productized.
 */
export const CUSTOM_DEV_BRANCH_ENABLED = true;

/** The routing key. Values are HubSpot internal values for `icc_track`. */
export const TRACKS = {
  productized_new: "Productized — no existing site",
  productized_existing: "Productized — has existing site",
  custom_scratch: "Custom — from scratch",
  custom_existing: "Custom — existing site",
} as const;
export type Track = keyof typeof TRACKS;

/** Buckets line up with the 6-page migration cap: anything past 1–6 is a quote. */
export const PAGE_COUNTS = [
  { value: "1_6", label: "1–6 pages" },
  { value: "7_15", label: "7–15 pages" },
  { value: "16_plus", label: "16 or more" },
  { value: "not_sure", label: "Not sure" },
] as const;

export const GOALS = [
  { value: "more_inquiries", label: "More inquiries and bookings" },
  { value: "clearer_info", label: "Clearer information for my current clients" },
  { value: "client_portal", label: "A client portal" },
  { value: "online_presence", label: "A professional presence online — a digital business card" },
] as const;

export const TEMPLATE_NOT_SURE = "not_sure";

export type Intake = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  track: Track;
  /** Productized only; a template name or TEMPLATE_NOT_SURE. */
  template: string;
  existingSiteUrl: string;
  pageCount: string;
  carryOver: string;
  change: string;
  scope: string;
  goals: string[];
  otherGoal: string;
  /** The shared closing question: what stood out, what they'd change, or any question. */
  notes: string;
};

const clip = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const oneOf = (value: unknown, allowed: readonly string[]) =>
  typeof value === "string" && allowed.includes(value) ? value : "";

/** Accepts "example.com" as readily as "https://example.com". */
function normalizeUrl(value: unknown) {
  const url = clip(value, 300);
  if (!url) return "";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export function deriveTrack(answers: {
  offering?: unknown;
  hasExistingSite?: unknown;
  customKind?: unknown;
}, customEnabled = CUSTOM_DEV_BRANCH_ENABLED): Track {
  if (customEnabled && answers.offering === "custom") {
    return answers.customKind === "existing" ? "custom_existing" : "custom_scratch";
  }
  return answers.hasExistingSite === "yes" ? "productized_existing" : "productized_new";
}

type NormalizeResult = { ok: true; intake: Intake } | { ok: false; error: string };

export function normalizeIntake(
  raw: unknown,
  options: { allowedTemplates: readonly string[]; customEnabled?: boolean },
): NormalizeResult {
  if (!raw || typeof raw !== "object") return { ok: false, error: "Missing required fields" };
  const body = raw as Record<string, unknown>;

  const firstName = clip(body.firstName, 100);
  const email = clip(body.email, 200);
  if (!firstName || !email) return { ok: false, error: "Missing required fields" };

  const track = deriveTrack(body, options.customEnabled ?? CUSTOM_DEV_BRANCH_ENABLED);
  const isProductized = track === "productized_new" || track === "productized_existing";
  const hasSite = track === "productized_existing" || track === "custom_existing";

  // Only keep the answers that belong to the branch the lead is actually on. A
  // visitor who clicks "yes", types a URL, then switches to "no" must not have
  // that URL filed against them.
  const goals = Array.isArray(body.goals)
    ? [...new Set(body.goals.filter((g): g is string => GOALS.some((o) => o.value === g)))]
    : [];

  const intake: Intake = {
    firstName,
    lastName: clip(body.lastName, 100),
    email,
    phone: clip(body.phone, 60),
    track,
    template: isProductized
      ? oneOf(body.template, [...options.allowedTemplates, TEMPLATE_NOT_SURE]) || TEMPLATE_NOT_SURE
      : "",
    existingSiteUrl: hasSite ? normalizeUrl(body.existingSiteUrl) : "",
    pageCount:
      track === "productized_existing" || track === "custom_scratch"
        ? oneOf(body.pageCount, PAGE_COUNTS.map((p) => p.value))
        : "",
    carryOver: track === "productized_existing" ? clip(body.carryOver, 2000) : "",
    change: hasSite ? clip(body.change, 2000) : "",
    scope: track === "custom_scratch" ? clip(body.scope, 3000) : "",
    goals,
    otherGoal: clip(body.otherGoal, 300),
    notes: clip(body.notes, 5000),
  };
  return { ok: true, intake };
}

const labelFor = (list: readonly { value: string; label: string }[], value: string) =>
  list.find((item) => item.value === value)?.label ?? value;

/**
 * The HubSpot `message` field. The first line is the track, so the routing key
 * is the first thing in both the CRM record and the notification email.
 */
export function composeMessage(intake: Intake) {
  const lines: string[] = [`INTAKE — ${TRACKS[intake.track]}`];
  const add = (label: string, value: string) => {
    if (value) lines.push(`${label}: ${value}`);
  };

  if (intake.template) {
    add("Website that stood out", intake.template === TEMPLATE_NOT_SURE ? "Not sure yet" : intake.template);
  }
  add("Existing site", intake.existingSiteUrl);
  add("Rough page count", intake.pageCount ? labelFor(PAGE_COUNTS, intake.pageCount) : "");
  add("Scope / what they want built", intake.scope);
  add("What they'd carry over", intake.carryOver);
  add("What they want changed", intake.change);
  add("Goals", intake.goals.map((g) => labelFor(GOALS, g)).join("; "));
  add("Other goal", intake.otherGoal);
  if (intake.track === "custom_existing") {
    lines.push("→ Existing site ICC didn't build: schedule the paid discovery hour before quoting.");
  }

  if (intake.notes) lines.push("", "What stood out / what they'd change:", intake.notes);
  return lines.join("\n");
}

/**
 * Structured copies of the routing answers, for once the five custom contact
 * properties exist in HubSpot (see ims-ops/INTAKE_FORM_HUBSPOT_MAPPING.md).
 * HubSpot rejects a submission carrying a field the form doesn't have, so the
 * route only sends these when HUBSPOT_ICC_PROPERTIES is "on".
 */
export function hubspotCustomFields(intake: Intake) {
  const goals = [...intake.goals, ...(intake.otherGoal ? ["other"] : [])];
  return [
    { name: "icc_track", value: intake.track },
    { name: "icc_template_choice", value: intake.template ? intake.template.toLowerCase() : "" },
    { name: "icc_existing_site_url", value: intake.existingSiteUrl },
    { name: "icc_page_count", value: intake.pageCount },
    { name: "icc_goals", value: goals.join(";") },
  ].filter((field) => field.value);
}

import { pricing, styleDirections } from "./content";

/**
 * The intake, described as data.
 *
 * One definition drives three things that must never drift apart: the form the
 * visitor fills in, the validation on the server, and the readable summary that
 * lands in HubSpot before the call. Adding a question here adds it everywhere.
 *
 * Option values are stable snake_case keys; labels are what a person reads. The
 * summary prints labels, so a renamed label never breaks stored data.
 */

export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "textarea"
  | "select"
  | "radio"
  | "checkboxes"
  | "colors"
  | "slider"
  | "url";

export type Option = { value: string; label: string };

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  /** Only First name and Email are ever required — every step can be skipped. */
  required?: boolean;
  placeholder?: string;
  hint?: string;
  options?: Option[];
  /** Show this field only when another field holds one of these values. */
  showWhen?: { field: string; equals: string[] };
  /** For sliders: the two ends of the scale. */
  ends?: [string, string];
  /** For colors: how many pickers. */
  count?: number;
  maxLength?: number;
};

export type Step = {
  id: string;
  title: string;
  /** One line under the step title. */
  intro?: string;
  /** Shown in a tinted strip — used for the no-client-information warning. */
  caution?: string;
  fields: Field[];
};

/** Add-on labels and prices come from the pricing section, never retyped. */
const addOnOptions: Option[] = pricing.addOns.map((addOn) => ({
  value: addOn.label.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, ""),
  label: `${addOn.label} — ${addOn.price}`,
}));

/** The websites on offer come from the same array as the gallery. */
const templateOptions: Option[] = [
  ...styleDirections.designs.map((design) => ({
    value: design.name.toLowerCase(),
    label: `${design.name} — ${design.vibe}`,
  })),
  { value: "not_sure", label: "Not sure yet" },
];

const NO_CLIENT_INFO =
  "Please don't include any information about your clients — this form isn't a secure channel for it, and nothing here needs it.";

export const intakeSteps: Step[] = [
  {
    id: "you",
    title: "You",
    intro: "Just your name and email are required. Everything else is optional.",
    fields: [
      { name: "firstName", label: "First name", type: "text", required: true, maxLength: 100 },
      { name: "lastName", label: "Last name", type: "text", maxLength: 100 },
      { name: "email", label: "Email", type: "email", required: true, maxLength: 200 },
      { name: "phone", label: "Phone", type: "tel", maxLength: 60 },
      {
        name: "preferredContact",
        label: "How should I reach you?",
        type: "radio",
        options: [
          { value: "text", label: "Text" },
          { value: "email", label: "Email" },
          { value: "call", label: "Call" },
        ],
      },
    ],
  },
  {
    id: "practice",
    title: "Your practice",
    fields: [
      { name: "practiceName", label: "Practice name", type: "text", maxLength: 200 },
      {
        name: "practitionerType",
        label: "What do you do?",
        type: "radio",
        options: [
          { value: "therapist", label: "Therapist" },
          { value: "counselor", label: "Counselor" },
          { value: "coach", label: "Coach" },
          { value: "wellness", label: "Wellness practitioner" },
          { value: "other", label: "Something else" },
        ],
      },
      {
        name: "practiceSize",
        label: "Solo or a group?",
        type: "radio",
        options: [
          { value: "solo", label: "Just me" },
          { value: "group", label: "A group practice" },
        ],
      },
      {
        name: "clinicianCount",
        label: "How many clinicians?",
        type: "text",
        maxLength: 20,
        showWhen: { field: "practiceSize", equals: ["group"] },
      },
      { name: "location", label: "City and state", type: "text", maxLength: 120 },
      {
        name: "serviceMode",
        label: "How do you see clients?",
        type: "radio",
        options: [
          { value: "in_person", label: "In person" },
          { value: "telehealth", label: "Telehealth" },
          { value: "both", label: "Both" },
        ],
      },
      {
        name: "specialties",
        label: "Who do you work with?",
        type: "textarea",
        hint: "A sentence is plenty — the people you help and what you help with.",
        maxLength: 2000,
      },
      {
        name: "hasExistingSite",
        label: "Do you have a website now?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "Not yet" },
        ],
      },
      {
        name: "currentSiteUrl",
        label: "Your current site",
        type: "url",
        placeholder: "yourpractice.com",
        maxLength: 300,
        showWhen: { field: "hasExistingSite", equals: ["yes"] },
      },
      {
        name: "currentPlatform",
        label: "What's it built on?",
        type: "select",
        showWhen: { field: "hasExistingSite", equals: ["yes"] },
        options: [
          { value: "squarespace", label: "Squarespace" },
          { value: "wix", label: "Wix" },
          { value: "wordpress", label: "WordPress" },
          { value: "directory_profile", label: "A SimplePractice or Psychology Today profile" },
          { value: "other", label: "Something else / not sure" },
        ],
      },
      {
        name: "domainStatus",
        label: "Your domain name",
        type: "radio",
        hint: "The web address itself, e.g. yourpractice.com.",
        options: [
          { value: "own_it", label: "I own it" },
          { value: "tied_to_platform", label: "It came with my current website" },
          { value: "need_one", label: "I need one" },
          { value: "not_sure", label: "Not sure" },
        ],
      },
    ],
  },
  {
    id: "website",
    title: "The website you picked",
    intro: "If you haven't browsed them yet, that's fine — pick \"Not sure yet\".",
    fields: [
      { name: "template", label: "Which one stood out?", type: "select", options: templateOptions },
      {
        name: "drewYouIn",
        label: "What drew you to it?",
        type: "checkboxes",
        options: [
          { value: "layout", label: "The layout" },
          { value: "colors", label: "The colors" },
          { value: "fonts", label: "The fonts" },
          { value: "photos", label: "The photography" },
          { value: "feel", label: "The overall feel" },
          { value: "other", label: "Something else" },
        ],
      },
      { name: "keepAsIs", label: "Anything you'd keep exactly as it is?", type: "textarea", maxLength: 2000 },
      { name: "changeOrSwap", label: "Anything you'd change or swap out?", type: "textarea", maxLength: 2000 },
      {
        name: "addSections",
        label: "Sections you'd want added",
        type: "checkboxes",
        options: [
          { value: "faq", label: "FAQ" },
          { value: "team", label: "Team or clinician bios" },
          { value: "testimonials", label: "Testimonials" },
          { value: "fees", label: "Fees & insurance" },
          { value: "groups", label: "Groups or workshops" },
          { value: "gallery", label: "Photo gallery" },
          { value: "other", label: "Something else" },
        ],
      },
      { name: "removeSections", label: "Anything you'd leave off?", type: "textarea", maxLength: 2000 },
    ],
  },
  {
    id: "brand",
    title: "Brand & voice",
    intro: "However much of this you know. \"Help me choose\" is a perfectly good answer.",
    caution: NO_CLIENT_INFO,
    fields: [
      {
        name: "paletteChoice",
        label: "Colors",
        type: "radio",
        options: [
          { value: "keep", label: "Keep the colors on the site I picked" },
          { value: "have_brand", label: "I have brand colors" },
          { value: "help", label: "Help me choose" },
        ],
      },
      {
        name: "brandColors",
        label: "Your colors",
        type: "colors",
        count: 4,
        hint: "Pick what you have, or describe them in the box below.",
        showWhen: { field: "paletteChoice", equals: ["have_brand"] },
      },
      {
        name: "brandColorsNote",
        label: "Or describe them",
        type: "text",
        placeholder: "Sage green and warm cream",
        maxLength: 300,
        showWhen: { field: "paletteChoice", equals: ["have_brand", "help"] },
      },
      { name: "colorsToAvoid", label: "Any colors to avoid?", type: "text", maxLength: 300 },
      {
        name: "fontChoice",
        label: "Fonts",
        type: "radio",
        options: [
          { value: "keep", label: "Keep the fonts on the site I picked" },
          { value: "have_brand", label: "I have brand fonts" },
          { value: "describe", label: "I'll describe the feel I want" },
        ],
      },
      { name: "fontNotes", label: "Font notes", type: "text", maxLength: 300 },
      {
        name: "feelWords",
        label: "Three words for how you want someone to feel on your site",
        type: "text",
        placeholder: "Calm, safe, understood",
        maxLength: 200,
      },
      { name: "toneWarmth", label: "Clinical ↔ Warm", type: "slider", ends: ["Clinical", "Warm"] },
      { name: "toneFormality", label: "Formal ↔ Conversational", type: "slider", ends: ["Formal", "Conversational"] },
      {
        name: "logoStatus",
        label: "Logo",
        type: "radio",
        options: [
          { value: "have", label: "I have one" },
          { value: "need", label: "I'd like one designed (+$100)" },
          { value: "none", label: "I don't need one" },
        ],
      },
      {
        name: "photoStatus",
        label: "Photography",
        type: "radio",
        options: [
          { value: "professional", label: "I have professional photos" },
          { value: "own", label: "I'll take my own" },
          { value: "stock", label: "Stock photography is fine" },
          { value: "mix", label: "A mix" },
        ],
      },
      {
        name: "admiredSites",
        label: "Any sites you admire?",
        type: "textarea",
        hint: "One or two addresses, and what you like about them. They don't have to be therapy sites.",
        maxLength: 1000,
      },
    ],
  },
  {
    id: "goals",
    title: "Goals & features",
    fields: [
      {
        name: "goals",
        label: "What should this website do for you?",
        type: "checkboxes",
        options: [
          { value: "more_inquiries", label: "More inquiries and bookings" },
          { value: "clearer_info", label: "Clearer information for my current clients" },
          { value: "client_portal", label: "A client portal" },
          { value: "online_presence", label: "A professional presence online" },
        ],
      },
      { name: "otherGoal", label: "Something else?", type: "text", maxLength: 300 },
      {
        name: "primaryAction",
        label: "The one thing a visitor should do",
        type: "radio",
        options: [
          { value: "book", label: "Book a consult" },
          { value: "call", label: "Call me" },
          { value: "email", label: "Email me" },
          { value: "portal", label: "Go to my client portal" },
        ],
      },
      {
        name: "schedulingTool",
        label: "Do you use a scheduling or practice tool?",
        type: "select",
        options: [
          { value: "simplepractice", label: "SimplePractice" },
          { value: "therapynotes", label: "TherapyNotes" },
          { value: "jane", label: "Jane" },
          { value: "calendly", label: "Calendly" },
          { value: "none", label: "None" },
          { value: "other", label: "Something else" },
        ],
      },
      {
        name: "addOns",
        label: "Anything beyond the base five pages?",
        type: "checkboxes",
        hint: "Nothing here is committed — it just tells me what to quote.",
        options: addOnOptions,
      },
      { name: "extraPagesNote", label: "Which extra pages?", type: "text", maxLength: 300 },
      {
        name: "blogPlans",
        label: "Will you write a blog?",
        type: "radio",
        options: [
          { value: "regularly", label: "Yes, regularly" },
          { value: "occasionally", label: "Occasionally" },
          { value: "no", label: "No" },
        ],
      },
    ],
  },
  {
    id: "timing",
    title: "Timing & next step",
    caution: NO_CLIENT_INFO,
    fields: [
      {
        name: "timeline",
        label: "When would you like to be live?",
        type: "radio",
        options: [
          { value: "asap", label: "As soon as possible" },
          { value: "month", label: "Within a month" },
          { value: "quarter", label: "One to three months" },
          { value: "exploring", label: "Just exploring" },
        ],
      },
      {
        name: "decisionMaker",
        label: "Who decides?",
        type: "radio",
        options: [
          { value: "me", label: "Just me" },
          { value: "partner", label: "Me and a partner" },
          { value: "group", label: "A group decision" },
        ],
      },
      {
        name: "contentReadiness",
        label: "Your words",
        type: "radio",
        options: [
          { value: "move", label: "Move what's on my current site" },
          { value: "write_new", label: "I'll write new copy" },
          { value: "help", label: "I'd like help writing it" },
        ],
      },
      {
        name: "heardFrom",
        label: "How did you find me?",
        type: "radio",
        options: [
          { value: "referral", label: "Someone referred me" },
          { value: "search", label: "Google or search" },
          { value: "social", label: "Social media" },
          { value: "other", label: "Somewhere else" },
        ],
      },
      {
        name: "referrerName",
        label: "Who should I thank?",
        type: "text",
        maxLength: 200,
        showWhen: { field: "heardFrom", equals: ["referral"] },
      },
      { name: "anythingElse", label: "Anything else I should know?", type: "textarea", maxLength: 5000 },
    ],
  },
];

/** Every field, flattened — used by validation and the summary. */
export const allFields: Field[] = intakeSteps.flatMap((step) => step.fields);

export const fieldByName = new Map(allFields.map((field) => [field.name, field]));

/** Label for a stored option value, for the summary. */
export function labelFor(fieldName: string, value: string): string {
  const field = fieldByName.get(fieldName);
  const option = field?.options?.find((o) => o.value === value);
  return option?.label ?? value;
}

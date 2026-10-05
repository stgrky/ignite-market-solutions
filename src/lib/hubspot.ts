import { composeIntakeSummary, routingProperties, type Intake } from "./intake-submission";

/**
 * HubSpot delivery, by whichever route is available.
 *
 * CRM API (preferred) when HUBSPOT_PRIVATE_APP_TOKEN is set: upserts the
 * contact by email, sets the five routing properties, marks them a lead, and
 * attaches the whole intake as a NOTE. The note matters — the account is on
 * HubSpot's free tier, which allows ten custom properties across the entire
 * portal, so one property per question is impossible. Notes are free and
 * unlimited, and a note is what you actually want to read before a call.
 *
 * Forms API (fallback) when the token isn't set: the pre-existing path, which
 * files everything into the standard `message` field. It keeps leads flowing
 * during the window between this shipping and the token being created.
 *
 * Nothing here logs a request body. HubSpot's error responses can echo
 * submitted values, so failures record a status and a short reason only.
 */

const PORTAL_ID = "246937212";
const FORM_ID = "ea2ce8f5-2cbf-478f-b1e9-dc952a6b35bf";
const FORMS_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`;
const CRM = "https://api.hubapi.com/crm/v3";

export type DeliveryResult =
  | { ok: true; via: "crm" | "forms" }
  | { ok: false; via: "crm" | "forms"; status: number; reason: string };

/** HubSpot's error bodies can contain submitted values — never return one raw. */
function safeReason(status: number): string {
  if (status === 401 || status === 403) return "authentication rejected";
  if (status === 429) return "rate limited";
  if (status >= 500) return "HubSpot server error";
  return "request rejected";
}

async function crmFetch(path: string, token: string, init: RequestInit) {
  return fetch(`${CRM}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
}

async function upsertContact(intake: Intake, token: string) {
  const properties: Record<string, string> = {
    email: String(intake.email),
    firstname: String(intake.firstName),
    lifecyclestage: "lead",
    ...routingProperties(intake),
  };
  if (intake.lastName) properties.lastname = String(intake.lastName);
  if (intake.phone) properties.phone = String(intake.phone);
  if (intake.practiceName) properties.company = String(intake.practiceName);

  // Idempotent by email: the same person filling the form twice updates one
  // contact rather than creating a duplicate the day before a call.
  const response = await crmFetch(
    `/objects/contacts/${encodeURIComponent(String(intake.email))}?idProperty=email`,
    token,
    { method: "PATCH", body: JSON.stringify({ properties }) },
  );

  if (response.ok) return { ok: true as const, id: (await response.json()).id as string };
  if (response.status !== 404) {
    return { ok: false as const, status: response.status };
  }

  const created = await crmFetch("/objects/contacts", token, {
    method: "POST",
    body: JSON.stringify({ properties }),
  });
  if (!created.ok) return { ok: false as const, status: created.status };
  return { ok: true as const, id: (await created.json()).id as string };
}

/** The full intake, attached to the contact as a timeline note. */
async function attachNote(contactId: string, intake: Intake, token: string) {
  const body = {
    properties: {
      hs_note_body: composeIntakeSummary(intake).replace(/\n/g, "<br>"),
      hs_timestamp: new Date().toISOString(),
    },
    associations: [
      {
        to: { id: contactId },
        types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 202 }],
      },
    ],
  };
  const response = await crmFetch("/objects/notes", token, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return response.ok ? { ok: true as const } : { ok: false as const, status: response.status };
}

async function viaForms(intake: Intake, hutk?: string): Promise<DeliveryResult> {
  const fields = [
    { name: "firstname", value: String(intake.firstName) },
    { name: "lastname", value: String(intake.lastName ?? "") },
    { name: "email", value: String(intake.email) },
    { name: "phone", value: String(intake.phone ?? "") },
    { name: "message", value: composeIntakeSummary(intake) },
  ];
  const response = await fetch(FORMS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields,
      context: {
        ...(hutk ? { hutk } : {}),
        pageUri: "https://ignitecreativeco.world/get-started",
        pageName: "Ignite Creative Co — intake",
      },
    }),
  });
  return response.ok
    ? { ok: true, via: "forms" }
    : { ok: false, via: "forms", status: response.status, reason: safeReason(response.status) };
}

export async function deliverToHubSpot(intake: Intake, hutk?: string): Promise<DeliveryResult> {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) return viaForms(intake, hutk);

  const contact = await upsertContact(intake, token);
  if (!contact.ok) {
    // The CRM path failed — fall back rather than lose the lead, and say so.
    console.error(`[intake] CRM upsert failed (${contact.status}); falling back to Forms API`);
    return viaForms(intake, hutk);
  }

  const note = await attachNote(contact.id, intake, token);
  if (!note.ok) {
    // The contact exists; only the readable summary is missing. Not worth
    // failing the submission over, but worth knowing about.
    console.error(`[intake] note creation failed (${note.status}); contact was saved`);
  }
  return { ok: true, via: "crm" };
}

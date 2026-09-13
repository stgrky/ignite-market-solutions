import { NextRequest, NextResponse } from "next/server";

import { styleDirections } from "@/lib/content";
import { composeMessage, hubspotCustomFields, normalizeIntake } from "@/lib/intake";

const HUBSPOT_PORTAL_ID = "246937212";
const HUBSPOT_FORM_ID = "ea2ce8f5-2cbf-478f-b1e9-dc952a6b35bf";
const HUBSPOT_SUBMIT_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

/**
 * Auto-confirmation to whoever submitted the form.
 *
 * No-op until RESEND_API_KEY and CONTACT_FROM_EMAIL are set, so this ships
 * inert and switches on the moment the Resend account exists (see
 * ims-ops/RUNBOOK.md §7b).
 *
 * Deliberately never throws: the lead is already safely in HubSpot by the time
 * this runs, and a courtesy email failing must not make the visitor think their
 * message didn't send.
 */
async function sendConfirmationEmail(to: string, firstName: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) return;

  const greeting = firstName ? `Hi ${firstName},` : "Hi there,";
  const lines = [
    greeting,
    "Thanks for reaching out to Ignite Creative Co. This is just a quick confirmation that your message came through.",
    "Grant reads every message personally and looks forward to being in touch soon — usually within one business day.",
    "You can reply directly to this email if you'd like to add anything.",
  ];

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: "grant@ignitecreativeco.world",
        subject: "Thanks for reaching out to Ignite Creative Co",
        text: `${lines.join("\n\n")}\n\n— Ignite Creative Co\nignitecreativeco.world`,
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.6;color:#2b2b2b;max-width:520px">
            ${lines.map((l) => `<p style="margin:0 0 16px">${l}</p>`).join("")}
            <p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #e3e8ef;font-size:14px;color:#64748b">
              — Ignite Creative Co<br>
              <a href="https://ignitecreativeco.world" style="color:#256bff;text-decoration:none">ignitecreativeco.world</a>
            </p>
          </div>
        `,
      }),
    });
  } catch (error) {
    console.error("Confirmation email failed (lead was still captured):", error);
  }
}

/** One HubSpot Forms API submission. Resolves to the error body on failure. */
async function submitToHubSpot(
  fields: { name: string; value: string }[],
  hutk: string | undefined,
): Promise<{ ok: true } | { ok: false; status: number; detail: string }> {
  const response = await fetch(HUBSPOT_SUBMIT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields,
      context: {
        ...(hutk ? { hutk } : {}),
        pageUri: "https://ignitecreativeco.world/#contact",
        pageName: "Ignite Creative Co",
      },
    }),
  });
  if (response.ok) return { ok: true };
  return { ok: false, status: response.status, detail: await response.text() };
}

export async function POST(request: NextRequest) {
  const result = normalizeIntake(await request.json().catch(() => null), {
    allowedTemplates: styleDirections.designs.map((design) => design.name),
  });
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  const { intake } = result;

  // Every answer rides in the standard `message` field, labelled, with the
  // track on the first line. That needs nothing configured in HubSpot.
  const standardFields = [
    { name: "firstname", value: intake.firstName },
    { name: "lastname", value: intake.lastName },
    { name: "email", value: intake.email },
    { name: "phone", value: intake.phone },
    { name: "message", value: composeMessage(intake) },
  ];

  // Links this submission to the visitor's tracked session, so the CRM contact
  // shows which pages they viewed before reaching out.
  const hutk = request.cookies.get("hubspotutk")?.value;

  // Once the five icc_* contact properties exist AND are added to the HubSpot
  // form, set HUBSPOT_ICC_PROPERTIES=on to also file the routing answers as
  // filterable properties.
  const withProperties = process.env.HUBSPOT_ICC_PROPERTIES === "on";
  let submission = await submitToHubSpot(
    withProperties ? [...standardFields, ...hubspotCustomFields(intake)] : standardFields,
    hutk,
  );

  // If the switch is on before HubSpot is actually ready for those fields,
  // HubSpot rejects the whole submission. A misconfigured property must never
  // cost a lead, so retry with the standard fields alone — the message still
  // carries every answer.
  if (!submission.ok && withProperties) {
    console.error(
      "HubSpot rejected the icc_* properties; retrying without them:",
      submission.status,
      submission.detail,
    );
    submission = await submitToHubSpot(standardFields, hutk);
  }

  if (!submission.ok) {
    console.error("HubSpot submission failed:", submission.status, submission.detail);
    return NextResponse.json(
      { error: "Submission failed", detail: submission.detail },
      { status: 502 },
    );
  }

  // Awaited rather than fire-and-forget: a serverless function can be frozen
  // the moment it returns, which would silently drop an unawaited request.
  await sendConfirmationEmail(intake.email, intake.firstName);

  return NextResponse.json({ ok: true });
}

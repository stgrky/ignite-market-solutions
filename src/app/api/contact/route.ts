import { NextRequest, NextResponse } from "next/server";

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

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body || !body.email || !body.firstName || !body.message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { firstName, lastName, email, phone, website, message } = body as {
    firstName: string;
    lastName?: string;
    email: string;
    phone?: string;
    website?: string;
    message: string;
  };

  // The HubSpot form has no custom property for this yet, so the selection is
  // prepended to the message — it still lands in the CRM and the notification
  // email. Swap to a real field once a custom property exists in HubSpot.
  const composedMessage = website
    ? `Interested in: ${website}\n\n${message}`
    : message;

  const fields = [
    { name: "firstname", value: firstName },
    { name: "lastname", value: lastName ?? "" },
    { name: "email", value: email },
    { name: "phone", value: phone ?? "" },
    { name: "message", value: composedMessage },
  ];

  // Links this submission to the visitor's tracked session, so the CRM contact
  // shows which pages they viewed before reaching out.
  const hutk = request.cookies.get("hubspotutk")?.value;

  const hsResponse = await fetch(HUBSPOT_SUBMIT_URL, {
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

  if (!hsResponse.ok) {
    const errorBody = await hsResponse.text();
    console.error("HubSpot submission failed:", hsResponse.status, errorBody);
    return NextResponse.json(
      { error: "Submission failed", detail: errorBody },
      { status: 502 },
    );
  }

  // Awaited rather than fire-and-forget: a serverless function can be frozen
  // the moment it returns, which would silently drop an unawaited request.
  await sendConfirmationEmail(email, firstName);

  return NextResponse.json({ ok: true });
}

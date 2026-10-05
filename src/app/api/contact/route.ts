import { NextRequest, NextResponse } from "next/server";

import { deliverToHubSpot } from "@/lib/hubspot";
import { composeIntakeSummary, parseIntake } from "@/lib/intake-submission";

/**
 * The intake endpoint. Serves both the short homepage form and the full
 * multi-step intake at /get-started.
 *
 * Nothing is stored here: the submission is validated, passed to HubSpot, and
 * a courtesy email is sent. No database, no files, and deliberately no logging
 * of request bodies — this form now collects practice details, and the one
 * place a payload could previously leak was HubSpot's own error body, which
 * used to be logged verbatim.
 */

/**
 * Auto-confirmation to whoever submitted.
 *
 * No-op until RESEND_API_KEY and CONTACT_FROM_EMAIL are set. Never throws: the
 * lead is already in HubSpot by this point, and a courtesy email failing must
 * not make the visitor think their message didn't send.
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
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
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
  } catch {
    // Intentionally silent about the cause: the error object can carry the
    // recipient address, and the lead is safe regardless.
    console.error("[intake] confirmation email failed; lead was still captured");
  }
}

/** Grant's own copy of the intake, so a lead doesn't depend on opening HubSpot. */
async function notifyGrant(summary: string, email: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_NOTIFY_EMAIL ?? "grant@ignitecreativeco.world";
  if (!apiKey || !from) return;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `New intake — ${email}`,
        text: summary,
      }),
    });
  } catch {
    console.error("[intake] notification email failed; lead is still in HubSpot");
  }
}

export async function POST(request: NextRequest) {
  const parsed = parseIntake(await request.json().catch(() => null));
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  const { intake } = parsed;

  // Links the submission to the visitor's tracked session, so the CRM record
  // shows which pages they read before reaching out.
  const hutk = request.cookies.get("hubspotutk")?.value;

  const delivery = await deliverToHubSpot(intake, hutk);
  if (!delivery.ok) {
    console.error(`[intake] delivery failed via ${delivery.via}: ${delivery.status} ${delivery.reason}`);
    return NextResponse.json(
      { error: "Something went wrong sending your answers. Please email grant@ignitecreativeco.world." },
      { status: 502 },
    );
  }

  // Awaited rather than fire-and-forget: a serverless function can be frozen
  // the moment it returns, which would silently drop an unawaited request.
  await Promise.all([
    sendConfirmationEmail(String(intake.email), String(intake.firstName ?? "")),
    notifyGrant(composeIntakeSummary(intake), String(intake.email)),
  ]);

  return NextResponse.json({ ok: true });
}

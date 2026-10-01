import { Resend } from "resend"
import { generateDossierPdf, dossierFilename } from "@/lib/report/generate-dossier"

// Sender identity. The domain (clearguidancestudio.com) must be verified in
// Resend for delivery to succeed. Override via env if you send from elsewhere.
const FROM_ADDRESS = process.env.LEAD_EMAIL_FROM ?? "ClearGuidance Studio <delivery@clearguidancestudio.com>"
const REPLY_TO = "support@clearguidancestudio.com"

type Audience = "investor" | "advisor"

type LeadConfirmationInput = {
  name: string
  email: string
  audienceType: Audience
}

export type EmailResult = "sent" | "skipped" | "failed"

function buildCopy(name: string, audienceType: Audience) {
  const firstName = name.split(" ")[0] || "there"
  if (audienceType === "advisor") {
    return {
      subject: "Your ClearGuidance Advisor beta request + Technical Dossier",
      heading: "Advisor beta access request received",
      body: `Hi ${firstName},\n\nThanks for requesting Advisor beta access to ClearGuidance Studio. Our team has your details and will reach out shortly with your onboarding and access information.\n\nAttached is your Technical Dossier — the Institutional Workflow & Asset Insulation Edition. It documents the platform's explicit valuation mathematics, historical stress-testing, and a friction diagnostic you can run against your current practice.\n\nIn the meantime, reply to this email with any questions about the platform, institutional modeling workflows, or how we compare to legacy TAMPs.\n\n— The ClearGuidance Studio team\nOklahoma City, OK`,
    }
  }
  return {
    subject: "Welcome to ClearGuidance Studio + your Technical Dossier",
    heading: "Your investor trial request is confirmed",
    body: `Hi ${firstName},\n\nThanks for your interest in ClearGuidance Studio. We've received your details and you're all set to get started. Our team will follow up shortly to help you activate your trial.\n\nAttached is your Technical Dossier — the Asset Value & Opportunity Evaluation Edition. It lays out the explicit valuation formulas, historical stress-testing, and a friction diagnostic you can run against your own holdings.\n\nReply to this email anytime with questions about valuation, portfolio analysis, or any of the three learning pillars.\n\n— The ClearGuidance Studio team\nOklahoma City, OK`,
  }
}

function renderHtml(heading: string, body: string): string {
  const paragraphs = body
    .split("\n\n")
    .map((p) => `<p style="margin:0 0 16px;line-height:1.6;color:#3f3f46;">${p.replace(/\n/g, "<br/>")}</p>`)
    .join("")
  return `<!doctype html><html><body style="margin:0;background:#f4f4f5;padding:24px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e4e4e7;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#0a0a0c;padding:20px 28px;">
          <span style="color:#f4f4f5;font-weight:700;letter-spacing:0.04em;font-size:15px;">CLEARGUIDANCE STUDIO</span>
        </td></tr>
        <tr><td style="padding:28px;">
          <h1 style="margin:0 0 16px;font-size:18px;color:#18181b;">${heading}</h1>
          ${paragraphs}
        </td></tr>
        <tr><td style="padding:16px 28px;border-top:1px solid #e4e4e7;">
          <span style="font-size:12px;color:#a1a1aa;">ClearGuidance Studio, Inc. · Oklahoma City, OK</span>
        </td></tr>
      </table>
    </td></tr></table>
  </body></html>`
}

/**
 * Sends a lead confirmation email. Safe to call unconditionally:
 * - Returns "skipped" (no throw) when RESEND_API_KEY is not configured.
 * - Returns "failed" (no throw) on provider errors, so lead capture is never blocked.
 */
export async function sendLeadConfirmation({ name, email, audienceType }: LeadConfirmationInput): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.log("[v0] RESEND_API_KEY not set — skipping lead confirmation email.")
    return "skipped"
  }

  const { subject, heading, body } = buildCopy(name, audienceType)

  // Generate the audience-specific Technical Dossier. A PDF failure must not
  // block the email itself, so we fall back to sending with no attachment.
  let attachments: { filename: string; content: Buffer }[] | undefined
  try {
    const pdf = await generateDossierPdf({ audience: audienceType, recipientName: name })
    attachments = [{ filename: dossierFilename(audienceType), content: pdf }]
  } catch (err) {
    console.log("[v0] Failed to generate dossier PDF — sending email without attachment:", err)
  }

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      replyTo: REPLY_TO,
      subject,
      html: renderHtml(heading, body),
      text: body,
      attachments,
    })
    if (error) {
      console.log("[v0] Resend returned an error sending lead confirmation:", error)
      return "failed"
    }
    return "sent"
  } catch (err) {
    console.log("[v0] Failed to send lead confirmation email:", err)
    return "failed"
  }
}

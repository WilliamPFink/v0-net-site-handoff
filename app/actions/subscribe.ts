"use server"

import { db } from "@/lib/db"
import { subscriberLead } from "@/lib/db/schema"
import { sendLeadConfirmation } from "@/lib/email/lead-confirmation"

const VALID_AUDIENCES = ["investor", "advisor"] as const
type Audience = (typeof VALID_AUDIENCES)[number]

export type SubscribeState = {
  status: "idle" | "success" | "error"
  message: string
  fieldErrors?: Record<string, string>
  // On success, carries what the client needs to build the dossier download link.
  dossier?: { audience: Audience; name: string }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function submitSubscriberLead(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  // Honeypot: real users never fill this hidden field. Bots do.
  if ((formData.get("company_website_hp") as string)?.trim()) {
    // Pretend success so the bot moves on without persisting anything.
    return { status: "success", message: "You're on the list — we'll be in touch shortly." }
  }

  const name = ((formData.get("name") as string) ?? "").trim()
  const email = ((formData.get("email") as string) ?? "").trim()
  const phone = ((formData.get("phone") as string) ?? "").trim()
  const audienceRaw = ((formData.get("audienceType") as string) ?? "").trim()
  const audienceType: Audience = VALID_AUDIENCES.includes(audienceRaw as Audience)
    ? (audienceRaw as Audience)
    : "investor"
  const smsConsent = (formData.get("smsConsent") as string) === "on"

  const fieldErrors: Record<string, string> = {}
  if (!name) fieldErrors.name = "Please enter your name."
  if (!email) fieldErrors.email = "Email is required."
  else if (!isValidEmail(email)) fieldErrors.email = "Enter a valid email address."

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please correct the highlighted fields.", fieldErrors }
  }

  try {
    await db.insert(subscriberLead).values({
      name,
      email,
      phone: phone || null,
      audienceType,
      smsConsent,
    })

    // Send a confirmation email. Never blocks capture: this returns
    // "skipped" when RESEND_API_KEY is absent and "failed" on provider
    // errors, so a healthy lead is always recorded regardless of email.
    await sendLeadConfirmation({ name, email, audienceType })

    return {
      status: "success",
      message:
        audienceType === "advisor"
          ? "You're on the Advisor beta list. Our team will reach out with your access details shortly."
          : "You're all set. Continue to activate your trial, or our team will follow up shortly.",
      dossier: { audience: audienceType, name },
    }
  } catch (err) {
    console.log("[v0] Failed to save subscriber lead:", err)
    return {
      status: "error",
      message: "Something went wrong. Please email support@clearguidancestudio.com and we'll help directly.",
    }
  }
}

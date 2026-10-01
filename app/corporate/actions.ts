"use server"

import { db } from "@/lib/db"
import { firmIntake } from "@/lib/db/schema"

const VALID_TIERS = ["Essential", "Advisor", "Advisor Pro"] as const

export type FirmIntakeState = {
  status: "idle" | "success" | "error"
  message: string
  fieldErrors?: Record<string, string>
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function submitFirmIntake(
  _prev: FirmIntakeState,
  formData: FormData,
): Promise<FirmIntakeState> {
  // Honeypot: real users never fill this hidden field. Bots do.
  if ((formData.get("company_website_hp") as string)?.trim()) {
    // Pretend success so the bot moves on without persisting anything.
    return { status: "success", message: "Thank you. Our team will be in touch shortly." }
  }

  const firmName = ((formData.get("firmName") as string) ?? "").trim()
  const contactName = ((formData.get("contactName") as string) ?? "").trim()
  const contactEmail = ((formData.get("contactEmail") as string) ?? "").trim()
  const contactPhone = ((formData.get("contactPhone") as string) ?? "").trim()
  const website = ((formData.get("website") as string) ?? "").trim()
  const advisorCount = ((formData.get("advisorCount") as string) ?? "").trim()
  const notes = ((formData.get("notes") as string) ?? "").trim()
  const tiers = formData
    .getAll("tiers")
    .map(String)
    .filter((t) => VALID_TIERS.includes(t as never))

  const fieldErrors: Record<string, string> = {}
  if (!firmName) fieldErrors.firmName = "Firm name is required."
  if (!contactName) fieldErrors.contactName = "Contact name is required."
  if (!contactEmail) fieldErrors.contactEmail = "Contact email is required."
  else if (!isValidEmail(contactEmail)) fieldErrors.contactEmail = "Enter a valid email address."

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please correct the highlighted fields.", fieldErrors }
  }

  try {
    await db.insert(firmIntake).values({
      firmName,
      contactName,
      contactEmail,
      contactPhone: contactPhone || null,
      firmWebsite: website || null,
      advisorCount: advisorCount || null,
      tiers: tiers.length ? tiers.join(", ") : null,
      comments: notes || null,
    })

    return {
      status: "success",
      message: "Thank you. Your firm profile has been received — our team will follow up shortly.",
    }
  } catch (err) {
    console.log("[v0] Failed to save firm intake submission:", err)
    return {
      status: "error",
      message: "Something went wrong saving your request. Please email support@clearguidancestudio.com directly.",
    }
  }
}

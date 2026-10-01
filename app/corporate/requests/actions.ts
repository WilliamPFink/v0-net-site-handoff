"use server"

import { desc, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { firmIntake } from "@/lib/db/schema"
import { isAdminAuthenticated, signInAdmin, signOutAdmin } from "@/lib/admin-auth"

export type LoginState = { error: string | null }

const VALID_STATUSES = ["new", "contacted", "onboarded", "archived"] as const
export type SubmissionStatus = (typeof VALID_STATUSES)[number]

export async function loginAdmin(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const passcode = ((formData.get("passcode") as string) ?? "").trim()
  if (!passcode) return { error: "Enter the admin passcode." }

  const ok = await signInAdmin(passcode)
  if (!ok) return { error: "Incorrect passcode, or no passcode is configured." }

  revalidatePath("/corporate/requests")
  return { error: null }
}

export async function logoutAdmin(): Promise<void> {
  await signOutAdmin()
  revalidatePath("/corporate/requests")
}

export async function getSubmissions() {
  if (!(await isAdminAuthenticated())) throw new Error("Unauthorized")
  return db.select().from(firmIntake).orderBy(desc(firmIntake.createdAt))
}

export async function updateSubmissionStatus(id: number, status: SubmissionStatus) {
  if (!(await isAdminAuthenticated())) throw new Error("Unauthorized")
  if (!VALID_STATUSES.includes(status)) throw new Error("Invalid status")
  await db.update(firmIntake).set({ status }).where(eq(firmIntake.id, id))
  revalidatePath("/corporate/requests")
}

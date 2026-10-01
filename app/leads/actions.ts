"use server"

import { desc, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { subscriberLead } from "@/lib/db/schema"
import { isAdminAuthenticated, signOutAdmin } from "@/lib/admin-auth"

const VALID_STATUSES = ["new", "contacted", "converted", "archived"] as const
export type LeadStatus = (typeof VALID_STATUSES)[number]

export async function logoutLeadsAdmin(): Promise<void> {
  await signOutAdmin()
  revalidatePath("/leads")
}

export async function getLeads() {
  if (!(await isAdminAuthenticated())) throw new Error("Unauthorized")
  return db.select().from(subscriberLead).orderBy(desc(subscriberLead.createdAt))
}

export async function updateLeadStatus(id: number, status: LeadStatus) {
  if (!(await isAdminAuthenticated())) throw new Error("Unauthorized")
  if (!VALID_STATUSES.includes(status)) throw new Error("Invalid status")
  await db.update(subscriberLead).set({ status }).where(eq(subscriberLead.id, id))
  revalidatePath("/leads")
}

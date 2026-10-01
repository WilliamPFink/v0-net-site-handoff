"use server"

import { randomUUID } from "crypto"
import { cookies } from "next/headers"
import { and, eq, sql } from "drizzle-orm"
import { db } from "@/lib/db"
import { articleReaction } from "@/lib/db/schema"

const VOTER_COOKIE = "cg_voter"
const ONE_YEAR = 60 * 60 * 24 * 365

export type Vote = "up" | "down"

export type ReactionState = {
  up: number
  down: number
  userVote: Vote | null
}

// Aggregate up/down counts for a slug in a single grouped query.
async function countFor(slug: string): Promise<{ up: number; down: number }> {
  const rows = await db
    .select({ vote: articleReaction.vote, total: sql<number>`count(*)::int` })
    .from(articleReaction)
    .where(eq(articleReaction.slug, slug))
    .groupBy(articleReaction.vote)

  let up = 0
  let down = 0
  for (const r of rows) {
    if (r.vote === "up") up = r.total
    else if (r.vote === "down") down = r.total
  }
  return { up, down }
}

// Read-only: current counts plus this visitor's existing vote (if any).
// Safe to call from a Server Component during render (does not set cookies).
export async function getReactionState(slug: string): Promise<ReactionState> {
  const jar = await cookies()
  const voterId = jar.get(VOTER_COOKIE)?.value ?? null

  const { up, down } = await countFor(slug)

  let userVote: Vote | null = null
  if (voterId) {
    const existing = await db
      .select({ vote: articleReaction.vote })
      .from(articleReaction)
      .where(and(eq(articleReaction.slug, slug), eq(articleReaction.voterId, voterId)))
      .limit(1)
    const v = existing[0]?.vote
    if (v === "up" || v === "down") userVote = v
  }

  return { up, down, userVote }
}

// Toggle a vote. Clicking the same vote again undoes it; clicking the other
// switches it. Returns the fresh shared counts + this visitor's resulting vote.
export async function submitReaction(slug: string, vote: Vote): Promise<ReactionState> {
  if (vote !== "up" && vote !== "down") {
    throw new Error("Invalid vote")
  }

  const jar = await cookies()
  let voterId = jar.get(VOTER_COOKIE)?.value ?? null

  if (!voterId) {
    voterId = randomUUID()
    jar.set(VOTER_COOKIE, voterId, {
      maxAge: ONE_YEAR,
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
    })
  }

  const existing = await db
    .select({ id: articleReaction.id, vote: articleReaction.vote })
    .from(articleReaction)
    .where(and(eq(articleReaction.slug, slug), eq(articleReaction.voterId, voterId)))
    .limit(1)

  const current = existing[0]

  if (!current) {
    // First vote from this visitor on this article.
    await db.insert(articleReaction).values({ slug, voterId, vote })
  } else if (current.vote === vote) {
    // Same button pressed again → undo.
    await db.delete(articleReaction).where(eq(articleReaction.id, current.id))
  } else {
    // Switch from up↔down.
    await db
      .update(articleReaction)
      .set({ vote, updatedAt: new Date() })
      .where(eq(articleReaction.id, current.id))
  }

  const { up, down } = await countFor(slug)
  const userVote: Vote | null = !current ? vote : current.vote === vote ? null : vote

  return { up, down, userVote }
}

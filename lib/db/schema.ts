import { boolean, pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core"

// Public firm onboarding submissions captured from /corporate.
// This is intake/lead data (not per-user data), so there is no userId column —
// the admin dashboard at /corporate/requests shows all rows behind a passcode gate.
export const firmIntake = pgTable("firm_intake", {
  id: serial("id").primaryKey(),
  firmName: text("firm_name").notNull(),
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone"),
  firmWebsite: text("firm_website"),
  advisorCount: text("advisor_count"),
  // Comma-separated list of requested tiers (Essential / Advisor / Advisor Pro).
  tiers: text("tiers"),
  comments: text("comments"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export type FirmIntake = typeof firmIntake.$inferSelect

// Sales-agent lead captures from the on-site "Talk to an Analyst" funnel.
// Public intake/lead data (no auth, no userId) — same treatment as firmIntake.
// audienceType mirrors the agent's active tab: "investor" | "advisor".
export const subscriberLead = pgTable("subscriber_lead", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  audienceType: text("audience_type").notNull().default("investor"),
  smsConsent: boolean("sms_consent").notNull().default(false),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export type SubscriberLead = typeof subscriberLead.$inferSelect

// Public blog article reactions (thumbs up / down). One row per anonymous
// voter per article, keyed by a first-party cookie token — so counts are
// shared across all visitors and each visitor can flip or undo a single vote
// without ballot-stuffing. Not per-user data (no auth required to react),
// hence a plain voterId token rather than a userId column.
export const articleReaction = pgTable(
  "article_reaction",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    voterId: text("voter_id").notNull(),
    // "up" | "down"
    vote: text("vote").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    slugVoterUnique: unique("article_reaction_slug_voter_unique").on(t.slug, t.voterId),
  }),
)

export type ArticleReaction = typeof articleReaction.$inferSelect

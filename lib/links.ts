// Single source of truth for outbound subscription / offering links.
// Checkout + Stripe live on the marketing site (clearguidancestudio.com),
// so every "Start Your Free Trial" / offering CTA on this site routes here.
export const OFFERING_URL = "https://clearguidancestudio.com/pricing"

// Build a tier-deep-linked offering URL, e.g. tierUrl("essential").
export function tierUrl(tier: string): string {
  return `${OFFERING_URL}?tier=${tier}`
}

// Authenticated destinations on the ClearGuidance Studio app (.com).
// STUDIO_URL logs into the valuation app; ACADEMY_URL opens the training
// modules — the app routes returning learners to their current progress and
// new users to the first lesson.
export const STUDIO_URL = "https://clearguidancestudio.com"
export const ACADEMY_URL = "https://clearguidancestudio.com/academy"

// Click tracking for CTAs. The Google tag and Meta Pixel snippets are loaded
// in app/layout.tsx (production only), so in development these calls are
// no-ops apart from a console.debug line to make wiring easy to verify.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

type GaItem = { item_id: string; item_name: string; item_variant?: string; price?: number }

export type CtaTrack = {
  /** GA4 recommended event name, e.g. "sign_up" or "begin_checkout". */
  event: string
  /** Where the CTA sits on the page, e.g. "hero". */
  location: string
  /** The CTA's visible text. */
  label: string
  value?: number
  currency?: string
  items?: GaItem[]
}

export function trackCta({ event, location, label, value, currency, items }: CtaTrack) {
  if (typeof window === "undefined") return

  const money = value != null ? { value, currency: currency ?? "USD" } : {}

  window.gtag?.("event", event, {
    cta_location: location,
    cta_text: label,
    ...(event === "sign_up" && { method: "free_trial" }),
    ...money,
    ...(items && { items }),
    // Most CTAs leave the page, so send with sendBeacon to survive the navigation.
    transport_type: "beacon",
  })

  window.fbq?.("track", "ViewContent", {
    content_name: label,
    content_category: location,
    ...money,
    ...(items && { content_ids: items.map((i) => i.item_id), content_type: "product" }),
  })

  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event, { location, label, ...money, items })
  }
}

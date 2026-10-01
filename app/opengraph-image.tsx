import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og"

// Rendered on demand so the build never depends on a build-time Google Fonts
// fetch (blocked in the deploy sandbox). The image is CDN-cached after first hit.
export const dynamic = "force-dynamic"

export const alt = "ClearGuidance Studio — Where Valuation Meets Conviction"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  return renderOgCard({
    section: "Platform",
    pill: "Where Valuation Meets Conviction",
    title: "Streamlined Financial Modeling",
    description:
      "Uncompromised analytical depth. Institutional-grade equity valuation, portfolio theory, and real-world probability simulation for advisors and serious investors.",
  })
}

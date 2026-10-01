import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og"

// Rendered on demand so the build never depends on a build-time Google Fonts
// fetch (blocked in the deploy sandbox). The image is CDN-cached after first hit.
export const dynamic = "force-dynamic"

export const alt = "The Valuation Encyclopedia — ClearGuidance Studio"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  return renderOgCard({
    section: "Encyclopedia",
    pill: "Three Pillars of Mastery",
    title: "The Valuation Encyclopedia",
    description:
      "Every concept explained three ways — plain-English analogies, real-world application, and the academic core math — so understanding compounds.",
  })
}

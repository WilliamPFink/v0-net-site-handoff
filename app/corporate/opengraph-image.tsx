import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og"

// Rendered on demand so the build never depends on a build-time Google Fonts
// fetch (blocked in the deploy sandbox). The image is CDN-cached after first hit.
export const dynamic = "force-dynamic"

export const alt = "Corporate Integrity & Infrastructure — ClearGuidance Studio"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  return renderOgCard({
    section: "Corporate",
    pill: "Integrity & Infrastructure",
    title: "Corporate Integrity & Infrastructure",
    description:
      "The structural foundation, calculation-logic integrity, headquarters registry, and firm onboarding pathway of ClearGuidance Studio, Inc.",
  })
}

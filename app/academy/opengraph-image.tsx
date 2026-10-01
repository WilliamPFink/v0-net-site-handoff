import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og"

// Rendered on demand so the build never depends on a build-time Google Fonts
// fetch (blocked in the deploy sandbox). The image is CDN-cached after first hit.
export const dynamic = "force-dynamic"

export const alt = "ClearGuidance Academy — Learn How to Value a Stock"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  return renderOgCard({
    section: "Academy",
    pill: "Learn to Value a Stock",
    title: "ClearGuidance Academy",
    description:
      "Intrinsic value and DCF in plain English, then linked into a live valuation terminal for hands-on practice — from first principles to a full analysis.",
  })
}

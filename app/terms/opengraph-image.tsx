import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og"

// Rendered on demand so the build never depends on a build-time Google Fonts
// fetch (blocked in the deploy sandbox). The image is CDN-cached after first hit.
export const dynamic = "force-dynamic"

export const alt = "Terms of Service — ClearGuidance Studio"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  return renderOgCard({
    section: "Legal",
    pill: "Terms",
    title: "Terms of Service",
    description:
      "The terms and conditions governing your use of the ClearGuidance Studio, Inc. stock analytics and portfolio management platform.",
  })
}

import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og"

// Rendered on demand so the build never depends on a build-time Google Fonts
// fetch (blocked in the deploy sandbox). The image is CDN-cached after first hit.
export const dynamic = "force-dynamic"

export const alt = "Privacy Policy — ClearGuidance Studio"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  return renderOgCard({
    section: "Legal",
    pill: "Privacy",
    title: "Privacy Policy",
    description:
      "How ClearGuidance Studio, Inc. collects, uses, discloses, and safeguards your information when you use our platform.",
  })
}

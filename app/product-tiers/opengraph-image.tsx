import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og"

// Rendered on demand so the build never depends on a build-time Google Fonts
// fetch (blocked in the deploy sandbox). The image is CDN-cached after first hit.
export const dynamic = "force-dynamic"

export const alt = "Platform Capabilities & Feature Scaling — ClearGuidance Studio"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  return renderOgCard({
    section: "Capabilities",
    pill: "Essential · Advisor · Advisor Pro",
    title: "Platform Capabilities & Feature Scaling",
    description:
      "Explore the explicit feature layers powering ClearGuidance Studio, engineered for every analytical scale and compliance requirement.",
  })
}

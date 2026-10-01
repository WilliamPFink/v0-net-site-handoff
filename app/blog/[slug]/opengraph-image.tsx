import { getArticleBySlug, formatArticleDate, getReadTime } from "@/lib/blog-data"
import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og"

// Route segment config — render on demand, cache the result.
export const alt = "ClearGuidance Studio — Insight"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

// Category accent colors, mirroring the on-site blog cards.
const CATEGORY_ACCENT: Record<string, string> = {
  "Growth & Value": "#60A5FA",
  "Capital Protection": "#FBBF24",
  "Advanced Modeling": "#22D3EE",
  "Platform Updates": "#34D399",
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  const category = article?.category ?? "Insights"
  return renderOgCard({
    section: "The Insights",
    pill: category,
    pillSub: article?.subCategory,
    title: article?.title ?? "Insight",
    description: article?.excerpt ?? "Institutional-grade valuation, thinking, and conviction.",
    accent: CATEGORY_ACCENT[category] ?? "#60A5FA",
    footerNote: article
      ? `${formatArticleDate(article.date).toUpperCase()}  ·  ${getReadTime(article.content).toUpperCase()}`
      : undefined,
  })
}

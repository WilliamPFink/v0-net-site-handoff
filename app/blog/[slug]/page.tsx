import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, CalendarDays, Clock, Map, User } from "lucide-react"
import { articles, getArticleBySlug, formatArticleDate, getReadTime, type ArticleBlock } from "@/lib/blog-data"
import { ReadingProgress } from "@/components/reading-progress"
import { ReturnToApp } from "@/components/return-to-app"
import { ArticleReactions } from "@/components/article-reactions"
import { OfferingCta } from "@/components/offering-cta"
import { OFFERING_URL } from "@/lib/links"
import { getReactionState } from "./reactions"

const CATEGORY_ACCENT: Record<string, string> = {
  "Growth & Value": "text-blue-400 border-blue-500/30",
  "Capital Protection": "text-amber-400 border-amber-500/30",
  "Advanced Modeling": "text-cyan-400 border-cyan-500/30",
  "Platform Updates": "text-emerald-400 border-emerald-500/30",
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: "Article Not Found | ClearGuidance Studio" }

  // The og:image / twitter:image are generated per-post by the co-located
  // opengraph-image.tsx and twitter-image.tsx route files, so they are
  // intentionally omitted here to avoid conflicting/duplicate tags.
  return {
    title: `${article.title} | ClearGuidance Studio`,
    description: article.excerpt,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `https://clearguidancestudio.net/blog/${article.slug}`,
      siteName: "ClearGuidance Studio",
      publishedTime: article.date,
      authors: ["ClearGuidance Studio, Inc."],
      section: article.category,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  }
}

// Renders inline [text](url) links, **bold**, and *italic* markers within body text.
function renderInline(text: string) {
  // Parse markdown links first, then bold/italic within the non-link chunks.
  const linkChunks = text.split(/(\[[^\]]+\]\([^)]+\))/g)
  return linkChunks.map((chunk, k) => {
    const link = chunk.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      const [, label, href] = link
      const external = /^https?:\/\//.test(href)
      return (
        <a
          key={k}
          href={href}
          className="text-blue-400 underline underline-offset-2 decoration-blue-500/40 hover:text-blue-300 hover:decoration-blue-400 transition-colors"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {label}
        </a>
      )
    }
    // Split on bold (**...**) first, then italics (*...*) within the remainder.
    const segments = chunk.split(/(\*\*[^*]+\*\*)/g)
    return (
      <span key={k}>
        {segments.map((segment, i) => {
          if (segment.startsWith("**") && segment.endsWith("**")) {
            return (
              <strong key={i} className="font-semibold text-white">
                {segment.slice(2, -2)}
              </strong>
            )
          }
          // Parse single-asterisk italics within non-bold segments.
          const italicParts = segment.split(/(\*[^*]+\*)/g)
          return (
            <span key={i}>
              {italicParts.map((part, j) =>
                part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
                  <em key={j} className="italic text-zinc-200">
                    {part.slice(1, -1)}
                  </em>
                ) : (
                  <span key={j}>{part}</span>
                ),
              )}
            </span>
          )
        })}
      </span>
    )
  })
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mt-12 mb-4 tracking-tight">{block.text}</h2>
    case "subheading":
      return <h3 className="font-serif text-xl font-semibold text-white mt-8 mb-3">{block.text}</h3>
    case "paragraph":
      return <p className="text-[15px] md:text-base text-[#D4D4D8] leading-[1.8] mb-6">{renderInline(block.text)}</p>
    case "list":
      return (
        <ul className="list-disc pl-6 mb-6 flex flex-col gap-2 marker:text-blue-400">
          {block.items.map((item, i) => (
            <li key={i} className="text-[15px] md:text-base text-[#D4D4D8] leading-[1.7]">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      )
    case "quote":
      return (
        <blockquote className="my-8 border-l-2 border-blue-500/50 bg-[#121214] rounded-r-lg pl-5 pr-4 py-4">
          <p className="font-serif text-lg md:text-xl italic text-zinc-200 leading-relaxed text-pretty">
            {block.text}
          </p>
          {block.cite ? (
            <cite className="not-italic text-[11px] font-mono uppercase tracking-widest text-[#71717A] mt-3 block">
              — {block.cite}
            </cite>
          ) : null}
        </blockquote>
      )
    case "table":
      return (
        <figure className="my-8 overflow-x-auto rounded-xl border border-[#27272A] bg-[#0E0E11]">
          <table className="w-full border-collapse text-left text-[13px] md:text-sm">
            <thead>
              <tr className="border-b border-[#27272A] bg-[#121214]">
                {block.headers.map((header, i) => (
                  <th
                    key={i}
                    scope="col"
                    className={`px-4 py-3 font-mono text-[11px] uppercase tracking-wide ${
                      i === 0 ? "text-[#A1A1AA]" : "text-blue-300"
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-b border-[#1F1F23] last:border-0">
                  {row.map((cell, c) => (
                    <td
                      key={c}
                      className={`px-4 py-3 align-top leading-relaxed ${
                        c === 0 ? "font-semibold text-zinc-200" : "text-[#D4D4D8]"
                      }`}
                    >
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption ? (
            <figcaption className="px-4 py-3 text-[11px] font-mono uppercase tracking-wide text-[#71717A] border-t border-[#1F1F23]">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      )
    case "callout":
      return (
        <aside
          role="note"
          className="my-12 rounded-2xl border border-blue-500/30 bg-[#0B0F19] p-6 md:p-8 shadow-[0_0_30px_rgba(59,130,246,0.07)]"
        >
          <div className="flex items-center gap-2 mb-4">
            <Map className="w-4 h-4 text-blue-400" aria-hidden="true" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-blue-300">{block.title}</span>
          </div>
          <div className="flex flex-col gap-3">
            {block.body.map((line, i) => (
              <p key={i} className="text-sm md:text-[15px] text-[#D4D4D8] leading-[1.7]">
                {renderInline(line)}
              </p>
            ))}
          </div>
        </aside>
      )
    default:
      return null
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const accent = CATEGORY_ACCENT[article.category] ?? "text-zinc-400 border-zinc-700"
  const reactions = await getReactionState(slug)

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#E4E4E7] font-sans antialiased relative selection:bg-zinc-800 selection:text-white">
      <ReadingProgress />

      {/* High-Tech Grid Background Accent Layer */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      {/* Global Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#0A0A0C]/90 backdrop-blur-md border-b border-[#1F1F23] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/#top" className="flex items-center gap-2.5">
            <Image
              src="/net/cgs-icon.jpeg"
              alt="ClearGuidance Studio emblem"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              priority
            />
            <Image
              src="/net/cgs-wordmark.jpeg"
              alt="ClearGuidance Studio, Inc."
              width={150}
              height={42}
              className="h-7 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wide uppercase text-[#A1A1AA] font-mono">
            <Link href="/#top" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/product-tiers" className="hover:text-white transition-colors">
              Product Tiers
            </Link>
            <Link href="/encyclopedia" className="hover:text-white transition-colors">
              Encyclopedia
            </Link>
            <Link href="/blog" className="text-white border-b border-white pb-1 transition-colors">
              Insights
            </Link>
            <Link href="/corporate" className="hover:text-white transition-colors">
              Corporate
            </Link>
            <Link href="/#contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          <OfferingCta />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 md:py-16 relative z-10">
        {/* Back link + return-to-app */}
        <div className="flex items-center justify-between gap-4 mb-10">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-[#A1A1AA] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Back to Insights
          </Link>
          <ReturnToApp />
        </div>

        {/* Article header */}
        <article>
          <span
            className={`inline-block text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded border mb-5 ${accent}`}
          >
            {article.category}
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white leading-[1.15] tracking-tight text-balance">
            {article.title}
          </h1>

          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 text-[11px] font-mono uppercase tracking-wide text-[#71717A]">
            <span className="inline-flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" aria-hidden="true" />
              ClearGuidance Studio
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />
              <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                {getReadTime(article.content)}
            </span>
          </div>

          {/* Header visual element */}
          <div className="relative mt-8 mb-10 h-40 md:h-52 rounded-xl overflow-hidden border border-[#27272A] bg-[#0B0F19]">
            <div
              className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-slate-500/10 to-emerald-500/20"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
              aria-hidden="true"
            />
            <div className="absolute bottom-4 left-5">
              <span className="font-serif text-lg md:text-xl text-white/90 italic">ClearGuidance Studio</span>
            </div>
          </div>

          {/* Body */}
          <div>
            {article.content.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          {/* Reader feedback (persisted up/down reactions) */}
          <ArticleReactions slug={slug} initial={reactions} />

          {/* Subscribe CTA */}
          <div className="mt-16 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-[#0B0F19] via-[#0E1525] to-[#0B1A14] p-8 md:p-10 shadow-[0_0_40px_rgba(59,130,246,0.08)]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-300/80">Put it into practice</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mt-3 text-balance">
              Turn these ideas into defensible models.
            </h2>
            <p className="text-sm text-[#A1A1AA] leading-relaxed mt-3 max-w-xl text-pretty">
              Subscribe to the Essential, Advisor, or Advisor Pro tiers to access live valuation terminals, Efficient
              Frontier modeling, and 1,000-trial Monte Carlo downside-protection tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <a
                href={OFFERING_URL}
                className="inline-flex items-center justify-center gap-2 bg-blue-500 text-[#04101F] text-sm font-bold px-5 py-3 rounded-lg hover:bg-blue-400 transition-colors group shadow-[0_0_20px_rgba(59,130,246,0.35)]"
              >
                Start Your Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/product-tiers"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-blue-400 text-sm font-semibold px-5 py-3 rounded-lg border border-blue-500/30 hover:bg-blue-500/10 transition-colors"
              >
                Compare Tiers
              </Link>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}

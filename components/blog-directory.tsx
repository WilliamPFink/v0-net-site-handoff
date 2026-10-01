"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ArrowRight, Search, X } from "lucide-react"
import {
  articles,
  CATEGORIES,
  TAXONOMY,
  formatArticleDate,
  getReadTime,
  type ArticleCategory,
  type ArticleSubCategory,
} from "@/lib/blog-data"
import { ReturnToApp } from "@/components/return-to-app"

// Tag/pill accent per category, reused for article cards and pill borders.
const CATEGORY_ACCENT: Record<string, string> = {
  "Growth & Value": "text-blue-400 border-blue-500/30",
  "Capital Protection": "text-amber-400 border-amber-500/30",
  "Advanced Modeling": "text-cyan-400 border-cyan-500/30",
  "Platform Updates": "text-emerald-400 border-emerald-500/30",
}

// Active-pill styling, keyed to the parent category's accent so the
// sub-row visually inherits its category color.
const ACTIVE_PILL: Record<string, string> = {
  All: "bg-[#18181B] text-white border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.08)]",
  "Growth & Value": "bg-[#18181B] text-white border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.08)]",
  "Capital Protection": "bg-[#18181B] text-white border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.08)]",
  "Advanced Modeling": "bg-[#18181B] text-white border-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.08)]",
  "Platform Updates": "bg-[#18181B] text-white border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.08)]",
}

const IDLE_PILL = "bg-transparent text-[#A1A1AA] border-[#27272A] hover:text-white hover:border-[#3F3F46]"

// Count color per category, matching the tag accent.
const COUNT_COLOR: Record<string, string> = {
  All: "text-white",
  "Growth & Value": "text-blue-400",
  "Capital Protection": "text-amber-400",
  "Advanced Modeling": "text-cyan-400",
  "Platform Updates": "text-emerald-400",
}

type CategoryFilter = (typeof CATEGORIES)[number]

function isCategory(value: string | null): value is ArticleCategory {
  return value !== null && value !== "All" && value in TAXONOMY
}

export function BlogDirectory() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // URL is the source of truth for category + sub-category.
  const categoryParam = searchParams.get("category")
  const category: CategoryFilter = isCategory(categoryParam) ? categoryParam : "All"
  const subParam = searchParams.get("sub")
  const activeSub: ArticleSubCategory | null =
    category !== "All" && subParam && (TAXONOMY[category].subs as readonly string[]).includes(subParam)
      ? (subParam as ArticleSubCategory)
      : null

  // Search text filters instantly from local state for responsiveness,
  // while the URL is updated on a debounce for shareable links.
  const [query, setQuery] = useState(() => searchParams.get("q") ?? "")
  const didMount = useRef(false)

  // Write params to the URL without adding history entries.
  const writeParams = useCallback(
    (next: { category?: CategoryFilter; sub?: ArticleSubCategory | null; q?: string }) => {
      const params = new URLSearchParams(searchParams.toString())

      if (next.category !== undefined) {
        if (next.category === "All") params.delete("category")
        else params.set("category", next.category)
        // Changing category always clears any stale sub-category.
        params.delete("sub")
      }
      if (next.sub !== undefined) {
        if (next.sub === null) params.delete("sub")
        else params.set("sub", next.sub)
      }
      if (next.q !== undefined) {
        if (next.q.trim() === "") params.delete("q")
        else params.set("q", next.q)
      }

      const qs = params.toString()
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    },
    [router, pathname, searchParams],
  )

  // Debounce the search query into the URL (skip the initial mount).
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }
    const id = setTimeout(() => writeParams({ q: query }), 250)
    return () => clearTimeout(id)
  }, [query, writeParams])

  // Derived, filtered list: category AND sub-category AND text query.
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return articles.filter((a) => {
      if (category !== "All" && a.category !== category) return false
      if (activeSub && a.subCategory !== activeSub) return false
      if (q && !(`${a.title} ${a.excerpt}`.toLowerCase().includes(q))) return false
      return true
    })
  }, [category, activeSub, query])

  // Counts (search-aware so the numbers reflect what a click would show).
  const q = query.trim().toLowerCase()
  const matchesQuery = (title: string, excerpt: string) =>
    !q || `${title} ${excerpt}`.toLowerCase().includes(q)

  const categoryCount = (c: CategoryFilter) =>
    articles.filter((a) => (c === "All" || a.category === c) && matchesQuery(a.title, a.excerpt)).length

  const subCount = (c: ArticleCategory, sub: ArticleSubCategory) =>
    articles.filter((a) => a.category === c && a.subCategory === sub && matchesQuery(a.title, a.excerpt)).length

  const hasActiveFilters = category !== "All" || activeSub !== null || query.trim() !== ""

  const clearAll = () => {
    setQuery("")
    router.replace(pathname, { scroll: false })
  }

  return (
    <div className="space-y-6">
      {/* Row 1: category pills + return-to-app */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter articles by category">
          {CATEGORIES.map((c) => {
            const isActive = category === c
            return (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => writeParams({ category: c })}
                className={`text-xs font-mono uppercase tracking-wide px-4 py-2 rounded-full border transition-all duration-200 ${
                  isActive ? ACTIVE_PILL[c] ?? ACTIVE_PILL.All : IDLE_PILL
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  {c}
                  <span className={`tabular-nums ${COUNT_COLOR[c] ?? "text-zinc-400"}`}>{categoryCount(c)}</span>
                </span>
              </button>
            )
          })}
        </div>

        <ReturnToApp className="shrink-0" />
      </div>

      {/* Row 2: sub-category pills (when a category is active) + search */}
      <div className="flex flex-col-reverse gap-3 lg:flex-row lg:items-center lg:justify-between">
        {category !== "All" ? (
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label={`Filter ${category} by focus area`}
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeSub === null}
              onClick={() => writeParams({ sub: null })}
              className={`text-[11px] font-mono uppercase tracking-wide px-3.5 py-1.5 rounded-full border transition-all duration-200 ${
                activeSub === null ? ACTIVE_PILL[category] ?? ACTIVE_PILL.All : IDLE_PILL
              }`}
            >
              {TAXONOMY[category].allLabel}
            </button>
            {TAXONOMY[category].subs.map((sub) => {
              const isActive = activeSub === sub
              return (
                <button
                  key={sub}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => writeParams({ sub })}
                  className={`text-[11px] font-mono uppercase tracking-wide px-3.5 py-1.5 rounded-full border transition-all duration-200 ${
                    isActive ? ACTIVE_PILL[category] ?? ACTIVE_PILL.All : IDLE_PILL
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {sub}
                    <span className={`tabular-nums ${COUNT_COLOR[category] ?? "text-zinc-400"}`}>
                      {subCount(category, sub)}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        ) : (
          <span aria-hidden="true" />
        )}

        {/* Search */}
        <div className="relative w-full lg:w-72 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search insights…"
            aria-label="Search articles by title or summary"
            className="w-full bg-[#121214] border border-[#27272A] rounded-full pl-9 pr-9 py-2 text-sm text-white placeholder:text-[#71717A] focus:outline-none focus:border-blue-500/40 focus:shadow-[0_0_15px_rgba(59,130,246,0.08)] transition-all duration-200"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Result count */}
      <p className="text-[11px] font-mono uppercase tracking-wide text-[#71717A]" aria-live="polite">
        Showing {visible.length} of {articles.length} {articles.length === 1 ? "insight" : "insights"}
      </p>

      {/* Article grid */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visible.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group flex flex-col justify-between bg-[#121214] border border-[#27272A] rounded-xl p-6 transition-all duration-200 hover:border-blue-500/30 hover:shadow-[0_0_24px_rgba(59,130,246,0.08)] hover:-translate-y-0.5"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-block text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded border ${
                      CATEGORY_ACCENT[article.category] ?? "text-zinc-400 border-zinc-700"
                    }`}
                  >
                    {article.category}
                  </span>
                  {article.subCategory && (
                    <span className="inline-block text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded border border-[#27272A] text-[#71717A]">
                      {article.subCategory}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-white leading-snug text-balance group-hover:text-blue-100 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed text-pretty">{article.excerpt}</p>
              </div>

              <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#1F1F23]">
                <div className="flex items-center gap-3 text-[11px] font-mono text-[#71717A] uppercase tracking-wide">
                  <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{getReadTime(article.content)}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center gap-4 border border-dashed border-[#27272A] rounded-xl py-20 px-6">
          <p className="font-serif text-lg text-white">No insights match your filters.</p>
          <p className="text-sm text-[#A1A1AA] max-w-md text-pretty">
            Try a different focus area or search term — or clear your filters to see the full library.
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-mono uppercase tracking-wide px-4 py-2 rounded-full border border-blue-500/40 text-blue-400 hover:bg-[#18181B] transition-all duration-200"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}

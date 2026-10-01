import fallbackData from "./academy-catalog-fallback.json"

// ---------------------------------------------------------------------------
// Types — mirror the shape of GET https://clearguidancestudio.com/api/academy/catalog
// The catalog is the single source of truth for the Academy curriculum, so the
// marketing page self-updates whenever a course is added or changed upstream.
// ---------------------------------------------------------------------------

export type CourseLevel = "foundational" | "intermediate" | "advanced"

export interface CatalogLesson {
  slug: string
  title: string
  summary: string
  durationMin: number
  free: boolean
  hasQuiz: boolean
}

export interface CatalogModule {
  title: string
  lessons: CatalogLesson[]
}

export interface CatalogCourse {
  slug: string
  title: string
  subtitle: string
  description: string
  level: CourseLevel
  free: boolean
  order: number
  lessonCount: number
  totalDurationMin: number
  freeLessonCount: number
  modules: CatalogModule[]
}

export interface CatalogPricingTier {
  standardAmount: number // in minor units (cents)
  bundleAmount: number // in minor units (cents)
}

export interface CatalogPricing {
  currency: string
  monthly: CatalogPricingTier
  annual: CatalogPricingTier
  note: string
}

export interface CatalogLinks {
  freeCourse: string
  subscribe: string
  browse: string
}

export interface AcademyCatalog {
  courses: CatalogCourse[]
  pricing: CatalogPricing
  links: CatalogLinks
  generatedAt?: string
}

export interface CatalogResult {
  catalog: AcademyCatalog
  /** True when the live fetch failed and the bundled snapshot was used. */
  fromFallback: boolean
}

// Use the canonical www host directly to avoid a redirect hop on every fetch.
const CATALOG_URL = "https://www.clearguidancestudio.com/api/academy/catalog"

const fallbackCatalog = fallbackData as AcademyCatalog

/** Courses sorted by their upstream `order` so the page ordering is stable. */
function sortCourses(catalog: AcademyCatalog): AcademyCatalog {
  return {
    ...catalog,
    courses: [...catalog.courses].sort((a, b) => a.order - b.order),
  }
}

/**
 * Fetch the live Academy catalog, revalidated hourly. If the request fails or
 * returns an unexpected shape, fall back to the bundled snapshot so the page
 * always renders a complete curriculum.
 */
export async function getCatalog(): Promise<CatalogResult> {
  try {
    const res = await fetch(CATALOG_URL, {
      next: { revalidate: 3600, tags: ["academy-catalog"] },
    })
    if (!res.ok) throw new Error(`Catalog fetch failed: ${res.status}`)

    const data = (await res.json()) as AcademyCatalog
    if (!data?.courses?.length || !data.pricing || !data.links) {
      throw new Error("Catalog response missing required fields")
    }

    return { catalog: sortCourses(data), fromFallback: false }
  } catch (error) {
    console.log("[v0] Academy catalog fetch failed, using bundled snapshot:", (error as Error).message)
    return { catalog: sortCourses(fallbackCatalog), fromFallback: true }
  }
}

// ---------------------------------------------------------------------------
// Presentation helpers
// ---------------------------------------------------------------------------

/** e.g. "13 lessons · ~99 min" or "3 lessons · ~18 min". */
export function formatCourseMeta(course: CatalogCourse): string {
  const lessons = `${course.lessonCount} ${course.lessonCount === 1 ? "lesson" : "lessons"}`
  const modules =
    course.modules.length > 1
      ? ` · ${course.modules.length} modules`
      : ""
  return `${lessons}${modules} · ~${course.totalDurationMin} min`
}

/** Human label for a course level. */
export function levelLabel(level: CourseLevel): string {
  switch (level) {
    case "foundational":
      return "Foundational"
    case "intermediate":
      return "Intermediate"
    case "advanced":
      return "Advanced"
  }
}

/** Format a minor-unit (cents) amount into a whole-dollar string, e.g. 1900 → "$19". */
export function formatPrice(amountMinor: number, currency: string): string {
  const major = amountMinor / 100
  const hasCents = major % 1 !== 0
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  }).format(major)
}

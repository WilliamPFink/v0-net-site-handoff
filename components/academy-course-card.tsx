import { ArrowRight, ClipboardCheck } from "lucide-react"
import {
  type CatalogCourse,
  type CatalogLesson,
  formatCourseMeta,
  levelLabel,
} from "@/lib/academy-catalog"
import { CourseCardVisual } from "@/components/course-card-visual"
import { AccordionList, type AccordionItem, type AccordionIconKey } from "@/components/academy-accordion"

// Cobalt-accented icon per module, cycled for courses with many modules.
const MODULE_ICON_KEYS: AccordionIconKey[] = ["brain", "terminal", "star", "checklist", "alert"]

type Access = "free" | "preview" | "included"

function lessonAccess(course: CatalogCourse, lesson: CatalogLesson): Access {
  if (course.free) return "free"
  return lesson.free ? "preview" : "included"
}

function AccessBadge({ access }: { access: Access }) {
  const styles: Record<Access, string> = {
    free: "text-emerald-400 border-emerald-500/30",
    preview: "text-emerald-400 border-emerald-500/30",
    included: "text-[#94A3B8] border-[#27272A]",
  }
  const label = access === "free" ? "Free" : access === "preview" ? "Preview" : "Included"
  return (
    <span
      className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded border shrink-0 ${styles[access]}`}
    >
      {label}
    </span>
  )
}

function LessonRow({ course, lesson }: { course: CatalogCourse; lesson: CatalogLesson }) {
  return (
    <li className="flex items-center justify-between gap-4 py-2.5 border-b border-[#1F1F23] last:border-0">
      <span className="flex items-center gap-2 text-sm text-[#D4D4D8] leading-snug">
        {lesson.title}
        {lesson.hasQuiz ? (
          <ClipboardCheck className="w-3.5 h-3.5 text-[#52525B] shrink-0" aria-label="Includes a knowledge-check quiz" />
        ) : null}
      </span>
      <AccessBadge access={lessonAccess(course, lesson)} />
    </li>
  )
}

export function AcademyCourseCard({ course }: { course: CatalogCourse }) {
  const accentBorder = course.free ? "border-emerald-500/20" : "border-blue-500/20"
  const badgeAccent = course.free
    ? "text-emerald-400 bg-black/70 border-emerald-500/30"
    : "text-blue-400 bg-black/70 border-blue-500/30"
  const badgeLabel = course.free ? "Free · Your on-ramp" : levelLabel(course.level)

  const singleModule = course.modules.length <= 1
  const flatLessons = course.modules.flatMap((m) => m.lessons)

  const moduleItems: AccordionItem[] = course.modules.map((mod, i) => ({
    id: `${course.slug}-mod-${i}`,
    title: `Module ${i + 1} — ${mod.title}`,
    meta: `${mod.lessons.length} ${mod.lessons.length === 1 ? "lesson" : "lessons"}`,
    icon: MODULE_ICON_KEYS[i % MODULE_ICON_KEYS.length],
    body: (
      <ul className="mt-1">
        {mod.lessons.map((lesson) => (
          <LessonRow key={lesson.slug} course={course} lesson={lesson} />
        ))}
      </ul>
    ),
  }))

  return (
    <div className={`bg-[#121214] border ${accentBorder} rounded-xl overflow-hidden flex flex-col`}>
      {/* Level-based header visual */}
      <div className="relative aspect-[16/9] bg-[#0A0A0C] border-b border-[#1F1F23] overflow-hidden">
        <CourseCardVisual level={course.level} free={course.free} slug={course.slug} />
        <div
          className={`pointer-events-none absolute inset-0 rounded-t-xl ring-1 ring-inset ${
            course.free ? "ring-emerald-400/10" : "ring-blue-400/10"
          }`}
        />
        <span
          className={`absolute top-3 left-3 z-10 text-[10px] font-mono font-bold uppercase tracking-widest border px-2 py-0.5 rounded ${badgeAccent}`}
        >
          {badgeLabel}
        </span>
      </div>

      <div className="p-6 space-y-4 flex flex-col flex-1">
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-white text-balance">{course.title}</h3>
          {course.subtitle ? (
            <p className="text-xs text-[#94A3B8] leading-relaxed text-pretty">{course.subtitle}</p>
          ) : null}
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#71717A]">
            {levelLabel(course.level)} · {formatCourseMeta(course)}
          </p>
          {!course.free ? (
            <p className="text-xs text-[#A1A1AA] leading-relaxed pt-1 text-pretty">
              {course.freeLessonCount > 0
                ? `${course.freeLessonCount === 1 ? "The first lesson is a free preview" : `${course.freeLessonCount} lessons are free to preview`}. The rest unlocks with an Academy subscription.`
                : "Included with an Academy subscription."}
            </p>
          ) : null}
        </div>

        {singleModule ? (
          <ul className="space-y-0.5 flex-1">
            {flatLessons.map((lesson) => (
              <LessonRow key={lesson.slug} course={course} lesson={lesson} />
            ))}
          </ul>
        ) : (
          <div className="flex-1">
            <AccordionList
              items={moduleItems}
              defaultOpenId={moduleItems[0]?.id}
              ariaLabel={`${course.title} modules`}
            />
          </div>
        )}
      </div>
    </div>
  )
}

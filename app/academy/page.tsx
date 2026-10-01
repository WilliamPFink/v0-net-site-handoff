import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  MonitorPlay,
  Brain,
  Library,
  ClipboardCheck,
  RefreshCw,
  Link2,
  Route,
  BookOpen,
  Users,
  Compass,
  Check,
  Minus,
  Sparkles,
} from "lucide-react"
import { AcademyPricing } from "@/components/academy-pricing"
import { AccordionList, type AccordionItem } from "@/components/academy-accordion"
import { AcademyCourseCard } from "@/components/academy-course-card"
import { getCatalog } from "@/lib/academy-catalog"

// Courses, quizzes, progress and checkout all live in the ClearGuidance Studio
// *app* (clearguidancestudio.com). This marketing page explains the Academy and
// loops every functional CTA out to the app via absolute URLs (same tab).
// The specific URLs come from the live catalog's `links` (see getCatalog).

export const metadata: Metadata = {
  title: "ClearGuidance Academy | Learn How to Value a Stock",
  description:
    "Learn how to value a stock from first principles. ClearGuidance Academy teaches intrinsic value and DCF in plain English, then links every concept into a live valuation terminal for hands-on practice.",
  keywords: [
    "learn how to value a stock",
    "understand DCF",
    "intrinsic value course",
    "discounted cash flow course",
    "stock valuation training",
    "learn fair value",
    "ClearGuidance Academy",
  ],
  alternates: {
    canonical: "/academy",
  },
  openGraph: {
    title: "ClearGuidance Academy | Learn How to Value a Stock",
    description:
      "Valuation from first principles — intrinsic value and DCF explained in plain English, linked straight into a live terminal so you can see it move real numbers.",
    type: "website",
    url: "https://clearguidancestudio.net/academy",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClearGuidance Academy | Learn How to Value a Stock",
    description:
      "Valuation from first principles — intrinsic value and DCF explained in plain English, linked into a live terminal.",
  },
}

const STEPS = [
  {
    icon: Brain,
    label: "01 // Learn",
    title: "Learn the concept",
    body: "Each lesson explains one idea in plain English — no prerequisites, no jargon walls. Discount rates, growth, terminal value: one clear idea at a time.",
  },
  {
    icon: MonitorPlay,
    label: "02 // Apply",
    title: "Apply it live in the terminal",
    body: "Every concept carries a \u201cSee this in the terminal\u201d deep link. Learn the discount rate, then jump to where you adjust it live on a real company.",
  },
  {
    icon: Sparkles,
    label: "03 // It sticks",
    title: "It sticks",
    body: "Moving real numbers on a real stock turns abstract theory into intuition you keep. Understanding replaces memorization.",
  },
]

const BENEFITS = [
  {
    icon: Library,
    title: "Every course, included",
    body: "Full access to every Academy course today — plus all future courses we add, at no extra cost.",
  },
  {
    icon: ClipboardCheck,
    title: "Knowledge-check quizzes",
    body: "Nearly every lesson ends with a short quiz so you can confirm the idea landed before moving on.",
  },
  {
    icon: RefreshCw,
    title: "Progress that syncs",
    body: "Per-user progress tracking follows you across devices. Pick up exactly where you left off, anywhere.",
  },
  {
    icon: Link2,
    title: "Deep links into the terminal",
    body: "Lessons connect directly to the live valuation terminal, so theory and practice sit one click apart.",
  },
  {
    icon: Route,
    title: "A structured path",
    body: "A self-paced route from absolute basics to a full DCF analysis — each course builds on the last.",
  },
]

const PERSONAS = [
  {
    icon: Compass,
    title: "DIY investors",
    body: "You want to value stocks yourself instead of trusting headlines and hot takes. Learn to build the number and defend it.",
  },
  {
    icon: BookOpen,
    title: "New to finance",
    body: "Intimidated by the jargon? Start from zero. A plain-English, no-prerequisites path that assumes nothing.",
  },
  {
    icon: Users,
    title: "Terminal users",
    body: "Already use the terminal? Finally understand every slider and gauge you touch — and why each one moves value.",
  },
]

const FAQ: { q: string; a: string }[] = [
  {
    q: "Do I need finance experience?",
    a: "No. Start with the free Investing Foundations course — it assumes no background and builds from absolute basics.",
  },
  {
    q: "Is this separate from the app subscription?",
    a: "Yes. The Academy is its own subscription. If you already subscribe to the ClearGuidance app, you get the discounted bundle price automatically at checkout.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Manage or cancel your Academy subscription anytime from your account — no lock-in.",
  },
  {
    q: "Do I need the app to benefit?",
    a: "No. The courses stand alone as a complete curriculum. They also link into the live terminal for hands-on practice when you want it.",
  },
  {
    q: "Will more courses be added?",
    a: "Yes. We add new courses over time, and every future course is included in your Academy subscription at no extra cost.",
  },
]

const faqItems: AccordionItem[] = FAQ.map((item, i) => ({
  id: `faq-${i}`,
  title: item.q,
  body: <p className="mt-1 text-pretty">{item.a}</p>,
}))

// Structured data is generated from the live catalog so search engines always
// see the current course lineup.
function buildJsonLd(courses: { title: string; description: string }[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        name: "ClearGuidance Academy",
        description:
          "Learn how to value a stock from first principles. Intrinsic value and DCF explained in plain English, linked into a live valuation terminal for hands-on practice.",
        provider: {
          "@type": "Organization",
          name: "ClearGuidance Studio, Inc.",
          sameAs: "https://clearguidancestudio.net",
        },
        hasCourseInstance: courses.map((course) => ({
          "@type": "CourseInstance",
          name: course.title,
          description: course.description,
          courseMode: "online",
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  }
}

export default async function AcademyPage() {
  const { catalog, fromFallback } = await getCatalog()
  const { courses, pricing, links } = catalog

  // CTA targets come from the catalog so links stay in sync with the app.
  const FREE_COURSE_URL = links.freeCourse
  const SUBSCRIBE_URL = links.subscribe
  const BROWSE_URL = links.browse

  const jsonLd = buildJsonLd(courses)
  const courseCount = courses.length
  const courseCountLabel =
    courseCount === 1 ? "One course" : courseCount === 2 ? "Two courses" : `${courseCount} courses`

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#E4E4E7] font-sans antialiased relative selection:bg-zinc-800 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            <Link href="/academy" className="text-white border-b border-white pb-1 transition-colors">
              Academy
            </Link>
            <Link href="/encyclopedia" className="hover:text-white transition-colors">
              Encyclopedia
            </Link>
            <Link href="/blog" className="hover:text-white transition-colors">
              Insights
            </Link>
            <Link href="/corporate" className="hover:text-white transition-colors">
              Corporate
            </Link>
          </nav>

          <a
            href={FREE_COURSE_URL}
            className="bg-[#121214] hover:bg-[#1C1C21] text-blue-400 text-xs font-mono font-bold px-4 py-2 rounded-full border border-blue-500/30 transition-all duration-200 shadow-[0_0_15px_rgba(59,130,246,0.05)]"
          >
            Start Free
          </a>
        </div>
      </header>

      <main className="relative z-10">
        {/* 1. HERO */}
        <section className="max-w-7xl mx-auto px-6 pt-10 pb-20 md:pt-14 md:pb-28">
          <Link
            href="/#top"
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-[#A1A1AA] hover:text-white transition-colors mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            Back to Home
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase bg-[#18181B] px-3 py-1 rounded-md border border-[#27272A]">
                <GraduationCap className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                ClearGuidance Academy
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] text-balance">
                Understand the numbers, not just the ticker.
              </h1>
              <p className="text-base text-[#A1A1AA] leading-relaxed max-w-xl text-pretty">
                ClearGuidance Academy teaches you valuation from first principles — then links every concept straight
                into the live terminal so you can see it move real numbers on a real company.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href={FREE_COURSE_URL}
                  className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white text-xs font-mono font-bold uppercase tracking-wide px-6 py-3.5 rounded-full transition-colors group"
                >
                  <span>Start free</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </a>
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 bg-[#121214] hover:bg-[#1C1C21] text-white text-xs font-mono font-bold uppercase tracking-wide px-6 py-3.5 rounded-full border border-[#27272A] transition-colors"
                >
                  See pricing
                </a>
              </div>
              <p className="text-xs font-mono text-[#71717A] tracking-wide pt-1">
                Free intro course · No card required to start · Cancel anytime.
              </p>
            </div>

            <div className="lg:col-span-6 relative">
              <div
                className="absolute -inset-6 bg-gradient-to-tr from-blue-500/10 to-emerald-500/10 rounded-2xl blur-3xl opacity-60 pointer-events-none"
                aria-hidden="true"
              />
              <div className="relative rounded-xl overflow-hidden border border-[#27272A] shadow-2xl">
                <Image
                  src="/net/academy-hero-workspace.jpeg"
                  alt="An analyst studying the ClearGuidance valuation terminal on a large monitor and tablet in a modern office, with DCF price charts and growth-driver graphs on screen"
                  width={1024}
                  height={585}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. THE CORE IDEA */}
        <section className="border-t border-[#1F1F23] bg-[#0B0B0E]">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="max-w-2xl space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">The core idea</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight text-balance">
                Independent courses, linked to a live terminal.
              </h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed text-pretty">
                The courses stand on their own as a real curriculum. But every concept also carries a
                {" \u201cSee this in the terminal\u201d "}
                deep link — so the moment you learn an idea, you can go move it on an actual company.
              </p>
            </div>

            <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {STEPS.map((step) => (
                <li
                  key={step.title}
                  className="bg-[#121214] border border-[#27272A] rounded-xl p-6 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#0A0A0C] border border-[#27272A]">
                      <step.icon className="w-5 h-5 text-blue-400" aria-hidden="true" />
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#71717A]">{step.label}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{step.title}</h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed text-pretty">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 3. WHAT YOU GET */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-2xl space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">What you get</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight text-balance">
              Everything included in one subscription.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-[#121214] border border-[#27272A] rounded-xl p-6 space-y-3 transition-all hover:border-blue-500/30 hover:shadow-[0_0_24px_rgba(59,130,246,0.08)]"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#0A0A0C] border border-[#27272A]">
                  <benefit.icon className="w-5 h-5 text-blue-400" aria-hidden="true" />
                </span>
                <h3 className="text-base font-bold text-white">{benefit.title}</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed text-pretty">{benefit.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. THE CURRICULUM */}
        <section className="border-t border-[#1F1F23] bg-[#0B0B0E]">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="max-w-2xl space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">The curriculum</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight text-balance">
                {courseCountLabel} today. More on the way, always included.
              </h2>
              <p className="text-sm text-[#A1A1AA] leading-relaxed text-pretty">
                A structured, self-paced path from what investing really is to reading a live market — each course
                builds on the last.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12 items-start">
              {courses.map((course) => (
                <AcademyCourseCard key={course.slug} course={course} />
              ))}
            </div>

            {fromFallback ? (
              <p className="mt-8 text-center text-[11px] font-mono uppercase tracking-widest text-[#52525B]">
                Showing our most recent saved course lineup.
              </p>
            ) : null}
          </div>
        </section>

        {/* 5. WHO IT'S FOR */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-2xl space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">Who it&apos;s for</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight text-balance">
              Built for anyone who wants to actually understand.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {PERSONAS.map((persona) => (
              <div key={persona.title} className="bg-[#121214] border border-[#27272A] rounded-xl p-6 space-y-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#0A0A0C] border border-[#27272A]">
                  <persona.icon className="w-5 h-5 text-blue-400" aria-hidden="true" />
                </span>
                <h3 className="text-base font-bold text-white">{persona.title}</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed text-pretty">{persona.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. FREE VS. PAID */}
        <section className="border-t border-[#1F1F23] bg-[#0B0B0E]">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="max-w-2xl space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">Free vs. paid</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight text-balance">
                Start free. Upgrade when you&apos;re ready.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="bg-[#121214] border border-[#27272A] rounded-xl p-7 space-y-4">
                <h3 className="text-lg font-bold text-white">Free</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed text-pretty">
                  A genuine, no-risk starting point — no card required.
                </p>
                <ul className="space-y-2.5 pt-1">
                  <li className="flex items-start gap-2.5 text-sm text-[#D4D4D8] leading-snug">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>The entire Investing Foundations course</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-[#D4D4D8] leading-snug">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>The first lesson of every paid course</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-[#71717A] leading-snug">
                    <Minus className="w-4 h-4 text-[#52525B] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Quizzes, progress tracking &amp; full courses locked</span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#121214] border border-blue-500/30 rounded-xl p-7 space-y-4 shadow-[0_0_24px_rgba(59,130,246,0.08)]">
                <h3 className="text-lg font-bold text-white">Academy subscription</h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed text-pretty">
                  Everything unlocks — and stays unlocked as we add more.
                </p>
                <ul className="space-y-2.5 pt-1">
                  {["All lessons in all courses", "Quizzes on nearly every lesson", "Progress tracking across devices", "Every future course, included"].map(
                    (item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#D4D4D8] leading-snug">
                        <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 7. PRICING */}
        <section id="pricing" className="max-w-5xl mx-auto px-6 py-20 scroll-mt-24">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">Pricing</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight text-balance">
              One subscription. Every course.
            </h2>
            <p className="text-sm text-[#A1A1AA] leading-relaxed text-pretty">
              Annual billing saves you two months. Already subscribe to the ClearGuidance app? Your bundle discount
              applies automatically at checkout.
            </p>
          </div>
          <div className="mt-12">
            <AcademyPricing pricing={pricing} subscribeUrl={SUBSCRIBE_URL} />
          </div>
        </section>

        {/* 8. SAMPLE / PROOF */}
        <section className="border-t border-[#1F1F23] bg-[#0B0B0E]">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="max-w-2xl space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">Peek inside a lesson</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight text-balance">
                See exactly how a lesson feels.
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-12 items-start">
              {/* Lesson excerpt */}
              <article className="lg:col-span-7 bg-[#121214] border border-[#27272A] rounded-xl p-7 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#71717A]">
                    Lesson · The Discount Rate
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight text-balance">
                  Why a dollar next year is worth less than a dollar today
                </h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed text-pretty">
                  The discount rate is how you translate future cash into today&apos;s money. A higher rate means you
                  demand more compensation for risk and waiting — so the same future cash flows are worth less right
                  now. Get this one number wrong and every downstream figure drifts with it.
                </p>

                {/* See it in the terminal callout */}
                <div className="flex items-start gap-3 bg-[#0A0A0C] border border-blue-500/30 rounded-lg p-4">
                  <MonitorPlay className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-white">See this in the terminal</p>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed text-pretty">
                      Jump to a live company and drag the discount rate yourself — watch fair value move in real time.
                    </p>
                  </div>
                </div>

                {/* Mini quiz */}
                <div className="bg-[#0A0A0C] border border-[#27272A] rounded-lg p-4 space-y-3">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-[#71717A]">Knowledge check</p>
                  <p className="text-sm font-semibold text-white text-pretty">
                    If you raise the discount rate, what happens to the estimated fair value?
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2.5 text-sm text-[#D4D4D8] rounded-md border border-emerald-500/30 bg-emerald-500/5 px-3 py-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                      <span>It goes down</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-[#71717A] rounded-md border border-[#27272A] px-3 py-2">
                      <span className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>It goes up</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-[#71717A] rounded-md border border-[#27272A] px-3 py-2">
                      <span className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>It stays the same</span>
                    </li>
                  </ul>
                </div>
              </article>

              {/* Social proof */}
              <div className="lg:col-span-5 space-y-6">
                <figure className="bg-[#121214] border border-[#27272A] rounded-xl p-6 space-y-4">
                  <blockquote className="text-sm text-[#D4D4D8] leading-relaxed text-pretty">
                    &ldquo;I&apos;d used DCF calculators for years without really understanding them. Two evenings in the
                    Academy and the sliders finally made sense.&rdquo;
                  </blockquote>
                  <figcaption className="text-xs font-mono uppercase tracking-widest text-[#71717A]">
                    — Independent investor
                  </figcaption>
                </figure>
                <figure className="bg-[#121214] border border-[#27272A] rounded-xl p-6 space-y-4">
                  <blockquote className="text-sm text-[#D4D4D8] leading-relaxed text-pretty">
                    &ldquo;It teaches the limits of DCF, not just the hype. That honesty is why I trust the rest of it.&rdquo;
                  </blockquote>
                  <figcaption className="text-xs font-mono uppercase tracking-widest text-[#71717A]">
                    — Advisor, RIA practice
                  </figcaption>
                </figure>
                <a
                  href={BROWSE_URL}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-[#A1A1AA] hover:text-white transition-colors group"
                >
                  Browse all courses
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 9. FAQ */}
        <section className="max-w-3xl mx-auto px-6 py-20">
          <div className="space-y-3 mb-12">
            <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">FAQ</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight text-balance">
              Questions, answered plainly.
            </h2>
          </div>
          <AccordionList items={faqItems} ariaLabel="Frequently asked questions" />
        </section>

        {/* 10. FINAL CTA BANNER */}
        <section className="border-t border-[#1F1F23]">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="relative overflow-hidden rounded-2xl border border-[#27272A] bg-[#121214] p-10 md:p-14">
              <div
                className="absolute -inset-10 bg-gradient-to-tr from-blue-500/10 to-emerald-500/10 blur-3xl opacity-60 pointer-events-none"
                aria-hidden="true"
              />
              <div className="relative max-w-2xl space-y-5">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight text-balance">
                  Start free, upgrade when you&apos;re ready.
                </h2>
                <p className="text-sm text-[#A1A1AA] leading-relaxed text-pretty">
                  Begin with the free Investing Foundations course today. When the terminal starts to click, unlock the
                  full curriculum with a single subscription.
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                  <a
                    href={FREE_COURSE_URL}
                    className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white text-xs font-mono font-bold uppercase tracking-wide px-6 py-3.5 rounded-full transition-colors group"
                  >
                    <span>Start free</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </a>
                  <a
                    href={SUBSCRIBE_URL}
                    className="inline-flex items-center justify-center gap-2 bg-[#0A0A0C] hover:bg-black text-white text-xs font-mono font-bold uppercase tracking-wide px-6 py-3.5 rounded-full border border-[#27272A] transition-colors"
                  >
                    Subscribe to Academy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

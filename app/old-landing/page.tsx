import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, GraduationCap } from "lucide-react"
import { articles, formatArticleDate, getReadTime } from "@/lib/blog-data"
import { OFFERING_URL } from "@/lib/links"
import { OfferingCta } from "@/components/offering-cta"
import { LoginMenu } from "@/components/login-menu"

const CATEGORY_ACCENT: Record<string, string> = {
  "Growth & Value": "text-blue-400 border-blue-500/30",
  "Capital Protection": "text-amber-400 border-amber-500/30",
  "Advanced Modeling": "text-cyan-400 border-cyan-500/30",
  "Platform Updates": "text-emerald-400 border-emerald-500/30",
}

const latestArticles = [...articles].sort((a, b) => +new Date(b.date) - +new Date(a.date)).slice(0, 3)

export const metadata: Metadata = {
  title: { absolute: "ClearGuidance Studio | Where Valuation Meets Conviction" },
  description:
    "Streamlined financial modeling with uncompromised analytical depth. Institutional-grade equity analysis across Essential, Advisor, and Advisor Pro tiers.",
  alternates: {
    canonical: "/old-landing",
  },
  // Previous homepage, kept for reference — the live homepage is app/page.tsx.
  robots: { index: false, follow: true },
  openGraph: {
    title: "ClearGuidance Studio | Where Valuation Meets Conviction",
    description: "Streamlined financial modeling with uncompromised analytical depth.",
    type: "website",
    url: "https://clearguidancestudio.net/old-landing",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClearGuidance Studio | Where Valuation Meets Conviction",
    description: "Streamlined financial modeling with uncompromised analytical depth.",
  },
}

export default function ClearGuidanceLandingNet() {
  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#E4E4E7] font-sans antialiased relative selection:bg-zinc-800 selection:text-white">
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
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Company Branding */}
          <Link href="#top" className="flex items-center gap-2.5 shrink-0">
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

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-7 text-xs font-semibold tracking-wide uppercase text-[#A1A1AA] font-mono whitespace-nowrap">
            <Link href="#top" className="text-white border-b border-white pb-1 transition-colors">
              Home
            </Link>
            <Link href="/product-tiers" className="hover:text-white transition-colors">
              Product Tiers
            </Link>
            <Link href="/academy" className="hover:text-white transition-colors">
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
            <Link href="#contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          {/* Auth + Sales Portal Loop CTA */}
          <div className="flex items-center gap-4 shrink-0">
            <LoginMenu />
            <OfferingCta />
          </div>
        </div>
      </header>

      {/* Main Content Body Container */}
      <main id="top" className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10 space-y-24">
        {/* HERO SECTION: Text Trajectories & Live Interface Container */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content Block */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase bg-[#18181B] px-3 py-1 rounded-md border border-[#27272A] inline-block">
              Where Valuation Meets Conviction
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
              Streamlined Financial Modeling.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-slate-300 to-emerald-400">
                Uncompromised Analytical Depth.
              </span>
            </h1>
            <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-xl text-pretty">
              Stop drowning in rigid spreadsheets and biased consensus estimates. ClearGuidance Studio
              delivers an intuitive, institutional-grade equity terminal built to unmask true intrinsic
              value. Whether you are an independent advisor scaling a professional practice or an
              everyday investor anchoring your financial logic, our platform transforms complex
              valuation modeling and real-world probability trials into a clean, visual narrative you
              can trust implicitly.
            </p>
            <div className="pt-2">
              <a
                href={OFFERING_URL}
                className="inline-flex items-center gap-2 bg-[#121214] hover:bg-[#1C1C21] text-white text-xs font-mono font-bold px-5 py-3 rounded-full border border-zinc-800 transition-all group"
              >
                <span>View Subscription</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Hero Frame: Deep-Dive Interface Preview */}
          <div className="lg:col-span-7 relative">
            {/* Soft Ambient Radial Glow Backdrop */}
            <div
              className="absolute -inset-6 bg-gradient-to-tr from-blue-500/10 to-emerald-500/10 rounded-2xl blur-3xl opacity-60 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative rounded-xl overflow-hidden border border-[#27272A] shadow-2xl">
              <Image
                src="/net/hero-composite.jpeg"
                alt="ClearGuidance Studio Institutional dashboard displayed on a tablet in a modern high-rise office, showing portfolio construction sliders, allocation donut charts, and the efficient frontier allocation map"
                width={1024}
                height={765}
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* PRODUCT TIERS ARCHITECTURE SECTION */}
        <section id="product-tiers" className="space-y-8 scroll-mt-24">
          <div className="border-b border-[#1F1F23] pb-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">Product Tiers Architecture</h2>
            <p className="text-sm text-[#71717A] mt-1 max-w-2xl leading-relaxed">
              A scalable ecosystem engineered to match your operational requirements. Explore how
              platform capabilities transition cleanly from core stock research to complex portfolio
              simulation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* Card 1: Essential */}
            <div className="bg-[#121214] border border-[#27272A] rounded-xl p-5 flex flex-col justify-between transition-all hover:border-blue-500/30 hover:shadow-[0_0_24px_rgba(59,130,246,0.08)] shadow-lg">
              <div className="space-y-4">
                <div className="relative aspect-[16/10] bg-[#0A0A0C] border border-[#1F1F23] rounded-lg overflow-hidden">
                  <Image
                    src="/net/tier-essential.jpeg"
                    alt="Essential tier Fair Value workspace showing a DCF price chart and valuation assumptions"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover object-left-top"
                  />
                  <span className="absolute top-2 right-2 text-[9px] font-mono bg-black/70 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded">
                    Tier 1
                  </span>
                </div>
                <div>
                  <Link
                    href="/product-tiers?tier=essential&from=home"
                    className="group inline-flex items-center gap-2.5 text-base font-bold text-white hover:text-blue-400 transition-colors"
                  >
                    <span className="relative inline-flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75 animate-ping [animation-duration:2s]" />
                      <span
                        className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500 ring-2 ring-white/20 transition-all duration-200 group-hover:scale-125"
                        style={{ boxShadow: "0 0 8px 2px #3b82f6, 0 0 14px 4px #3b82f666" }}
                      />
                    </span>
                    <span>Essential</span>
                  </Link>
                  <p className="text-xs text-[#71717A] mt-1 leading-relaxed">
                    Ditch generic, laggy retail tools. The Essential workspace delivers clean,
                    institutional-grade equity lookup terminals designed to unmask true intrinsic
                    value. Fine-tune growth assumptions instantly and control the narrative before
                    consensus models distort the trend.
                  </p>
                </div>
              </div>
              <div className="pt-5">
                <a
                  href={`${OFFERING_URL}?tier=essential`}
                  className="w-full text-center bg-[#18181B] hover:bg-[#222227] text-white text-xs font-mono py-2 rounded border border-[#27272A] flex items-center justify-center gap-1.5 group"
                >
                  <span>View Subscription</span>
                  <ArrowRight className="w-3 h-3 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Card 2: Advisor */}
            <div className="bg-[#121214] border border-emerald-500/20 rounded-xl p-5 flex flex-col justify-between transition-all hover:border-emerald-500/40 hover:shadow-[0_0_24px_rgba(16,185,129,0.1)] shadow-lg shadow-emerald-950/5">
              <div className="space-y-4">
                <div className="relative aspect-[16/10] bg-[#0A0A0C] border border-[#1F1F23] rounded-lg overflow-hidden">
                  <Image
                    src="/net/tier-advisor.jpeg"
                    alt="Advisor tier Portfolio Builder showing allocation sliders and the efficient frontier allocation map"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover object-left-top"
                  />
                  <span className="absolute top-2 right-2 text-[9px] font-mono bg-black/70 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                    Tier 2
                  </span>
                </div>
                <div>
                  <Link
                    href="/product-tiers?tier=advisor&from=home"
                    className="group inline-flex items-center gap-2.5 text-base font-bold text-white hover:text-emerald-400 transition-colors"
                  >
                    <span className="relative inline-flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping [animation-duration:2s]" />
                      <span
                        className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white/20 transition-all duration-200 group-hover:scale-125"
                        style={{ boxShadow: "0 0 8px 2px #10b981, 0 0 14px 4px #10b98166" }}
                      />
                    </span>
                    <span>Advisor</span>
                  </Link>
                  <p className="text-xs text-[#71717A] mt-1 leading-relaxed">
                    Engineered for independent wealth managers who use visual conviction to scale
                    their practice. Seamlessly model custom allocations, map assets against the
                    Efficient Frontier, and pinpoint peak mathematical efficiency in real time. Built
                    to turn complex portfolio construction into an engaging client conversation.
                  </p>
                </div>
              </div>
              <div className="pt-5">
                <a
                  href={`${OFFERING_URL}?tier=advisor`}
                  className="w-full text-center bg-[#18181B] hover:bg-[#222227] text-white text-xs font-mono py-2 rounded border border-[#27272A] flex items-center justify-center gap-1.5 group"
                >
                  <span>View Subscription</span>
                  <ArrowRight className="w-3 h-3 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Card 3: Advisor Pro */}
            <div className="bg-[#121214] border border-purple-500/20 rounded-xl p-5 flex flex-col justify-between transition-all hover:border-purple-500/40 hover:shadow-[0_0_24px_rgba(168,85,247,0.1)] shadow-lg shadow-purple-950/5">
              <div className="space-y-4">
                <div className="relative aspect-[16/10] bg-[#0A0A0C] border border-[#1F1F23] rounded-lg overflow-hidden">
                  <Image
                    src="/net/tier-pro.jpeg"
                    alt="Advisor Pro tier Institutional workspace showing a 1,000-trial Monte Carlo simulation projection"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover object-left-top"
                  />
                  <span className="absolute top-2 right-2 text-[9px] font-mono bg-black/70 text-purple-400 border border-purple-500/30 px-1.5 py-0.5 rounded">
                    Tier 3
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/product-tiers?tier=pro&from=home"
                      className="group inline-flex items-center gap-2.5 text-base font-bold text-white hover:text-purple-400 transition-colors"
                    >
                      <span className="relative inline-flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75 animate-ping [animation-duration:2s]" />
                        <span
                          className="relative inline-flex h-2.5 w-2.5 rounded-full bg-purple-500 ring-2 ring-white/20 transition-all duration-200 group-hover:scale-125"
                          style={{ boxShadow: "0 0 8px 2px #a855f7, 0 0 14px 4px #a855f766" }}
                        />
                      </span>
                      <span>Advisor Pro</span>
                    </Link>
                  </div>
                  <p className="text-xs text-[#71717A] mt-1 leading-relaxed">
                    The ultimate enterprise suite for high-end practices demanding absolute
                    analytical dominance. Run advanced, 1,000-trial simulation models to stress-test
                    market uncertainty, coordinate multi-seat teams seamlessly, and instantly export
                    compliance-ready justification reports to defend your fiduciary recommendations.
                  </p>
                </div>
              </div>
              <div className="pt-5">
                <a
                  href={`${OFFERING_URL}?tier=pro`}
                  className="w-full text-center bg-[#18181B] hover:bg-[#222227] text-white text-xs font-mono py-2 rounded border border-[#27272A] flex items-center justify-center gap-1.5 group"
                >
                  <span>View Subscription</span>
                  <ArrowRight className="w-3 h-3 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Card 4: Corporate Dynamic Interface Graphic */}
            <div className="relative rounded-xl overflow-hidden border border-[#27272A] bg-zinc-900 flex flex-col justify-end p-4 min-h-[200px]">
              <Image
                src="/net/corporate-advisory.png"
                alt="Advisory team reviewing a quarterly growth strategy on a whiteboard in a high-rise conference room"
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"
                aria-hidden="true"
              />
              {/* Small overlay banner content */}
              <div className="relative z-20 space-y-1">
                <span className="text-[9px] font-mono tracking-widest text-zinc-300 block uppercase">
                  Firm Infrastructure
                </span>
                <span className="text-xs font-bold text-white block">Enterprise Operations</span>
              </div>
            </div>
          </div>

          {/* Academy: elongated card spanning the full width beneath the tier grid */}
          <Link
            href="/academy"
            className="group relative block overflow-hidden rounded-xl border border-blue-500/20 bg-[#121214] shadow-lg transition-all hover:border-blue-500/40 hover:shadow-[0_0_28px_rgba(59,130,246,0.1)]"
          >
            {/* Faint left-edge accent rail to echo the terminal aesthetic */}
            <div
              className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500/60 via-blue-500/20 to-transparent"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-7">
              <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-400">
                  <GraduationCap className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-blue-400">
                      ClearGuidance Academy
                    </span>
                    <span className="rounded border border-emerald-500/30 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-widest text-emerald-400">
                      Bundle &amp; save
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    Master the investment concepts behind the app
                  </h3>
                  <p className="max-w-2xl text-xs leading-relaxed text-[#71717A]">
                    A standalone learning product that takes you from what investing really is to a full DCF analysis —
                    the same concepts the terminal applies. Subscription-based, and deeply discounted when bundled with a
                    platform subscription.
                  </p>
                </div>
              </div>
              <div className="flex md:shrink-0">
                <span className="inline-flex items-center justify-center gap-1.5 rounded-full bg-blue-500 px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wide text-[#04101F] transition-colors group-hover:bg-blue-400">
                  <span>Explore the Academy</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </div>
          </Link>
        </section>

        {/* ENCYCLOPEDIA SECTION */}
        <section id="encyclopedia" className="space-y-8 scroll-mt-24">
          <div className="border-b border-[#1F1F23] pb-4">
            <Link
              href="/encyclopedia"
              className="group inline-flex items-center gap-3 text-2xl font-bold text-white tracking-tight hover:text-blue-400 transition-colors"
            >
              <span className="relative inline-flex h-3 w-3 shrink-0" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75 animate-ping [animation-duration:2s]" />
                <span
                  className="relative inline-flex h-3 w-3 rounded-full bg-blue-500 ring-2 ring-white/20 transition-all duration-200 group-hover:scale-125"
                  style={{ boxShadow: "0 0 8px 2px #3b82f6, 0 0 14px 4px #3b82f666" }}
                />
              </span>
              <span>The Encyclopedia</span>
            </Link>
            <p className="text-sm text-[#71717A] mt-1 leading-relaxed">
              Your personal anchor. We built this section to be a quiet place to return to the basics and keep your core
              instincts sharp. Having these fundamental facts and clear formulas right at your fingertips makes it easy
              to refresh your memory, stay grounded, and effortlessly bring your clients up to speed.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tag: "VALUATION",
                title: "Intrinsic Value Foundations",
                image: "/net/enc-layman.png",
                body: "Grounding the Basics. A simple, clear look back at how true stock value is actually calculated. It keeps the core building blocks fresh in your mind so you can easily break down the math for a client and help them see the bigger picture with total confidence.",
              },
              {
                tag: "PORTFOLIO",
                title: "Modern Portfolio Theory",
                image: "/net/enc-practical.png",
                body: "The Balancing Act. A quick refresher on how different assets move together to protect a portfolio. Keep the core rules of risk and return top-of-mind, giving you the exact clarity you need to help clients understand why their money is positioned the way it is.",
              },
              {
                tag: "SIMULATION",
                title: "Monte Carlo Methods",
                image: "/net/enc-academic.png",
                body: "Making Sense of Probability. Keep a firm handle on the laws of chance without getting bogged down in messy math. This module gives you a clean translation toolkit to turn complicated risk models into simple, everyday stories that make sense to your clients.",
              },
            ].map((entry) => (
              <div
                key={entry.title}
                className="group flex flex-col bg-[#0B0F19] border border-[#27272A] rounded-xl overflow-hidden transition-all hover:border-blue-500/30"
              >
                <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
                  <Image
                    src={entry.image || "/placeholder.svg"}
                    alt={entry.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B0F19]" />
                </div>
                <div className="p-6">
                  <span className="text-[9px] font-mono tracking-widest text-[#94A3B8] uppercase">{entry.tag}</span>
                  <h3 className="text-base font-bold text-white mt-2">{entry.title}</h3>
                  <p className="text-xs text-[#D4D4D8] mt-2 leading-relaxed">{entry.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LATEST INSIGHTS SECTION */}
        <section id="insights" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-[#1F1F23] pb-4">
            <div>
              <Link
                href="/blog"
                className="group inline-flex items-center gap-3 text-2xl font-bold text-white tracking-tight hover:text-blue-400 transition-colors"
              >
                <span className="relative inline-flex h-3 w-3 shrink-0" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75 animate-ping [animation-duration:2s]" />
                  <span
                    className="relative inline-flex h-3 w-3 rounded-full bg-blue-500 ring-2 ring-white/20 transition-all duration-200 group-hover:scale-125"
                    style={{ boxShadow: "0 0 8px 2px #3b82f6, 0 0 14px 4px #3b82f666" }}
                  />
                </span>
                <span>Latest Insights</span>
              </Link>
              <p className="text-sm text-[#71717A] mt-1 max-w-2xl leading-relaxed">
                Plain-spoken, institutional-grade perspectives on valuation, corporate finance, and advanced portfolio
                strategy — written to sharpen your conviction and bring clients along with clarity.
              </p>
            </div>
            <Link
              href="/blog"
              className="group hidden sm:inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-[#A1A1AA] hover:text-white transition-colors whitespace-nowrap"
            >
              View All
              <ArrowRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group flex flex-col justify-between bg-[#121214] border border-[#27272A] rounded-xl p-6 transition-all duration-200 hover:border-blue-500/30 hover:shadow-[0_0_24px_rgba(59,130,246,0.08)] hover:-translate-y-0.5"
              >
                <div className="space-y-4">
                  <span
                    className={`inline-block text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded border ${
                      CATEGORY_ACCENT[article.category] ?? "text-zinc-400 border-zinc-700"
                    }`}
                  >
                    {article.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white leading-snug text-balance group-hover:text-blue-100 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed text-pretty">{article.excerpt}</p>
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
        </section>
      </main>
    </div>
  )
}

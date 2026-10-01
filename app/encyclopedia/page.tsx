"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { HelpCircle, Briefcase, GraduationCap } from "lucide-react"
import { OfferingCta } from "@/components/offering-cta"

type Pillar = "all" | "layman" | "practical" | "academic"

const pillarCards = [
  {
    id: "layman",
    image: "/net/enc-layman.png",
    icon: HelpCircle,
    accent: "text-blue-400",
    title: "The Layman Pillar",
    subtitle: "Simple Analogies First",
    body: [
      "We translate dense financial structures into clear, everyday stories.",
      "This is the perfect starting point to gain a natural, intuitive grasp of the core concepts before diving into the numbers—making it easy for anyone to build an instant baseline of clarity and understanding.",
    ],
    valuePanel: {
      header: "Leveling the Playing Field",
      subheader:
        "You don\u2019t need a finance degree to build ironclad conviction in your portfolio. The Layman Pillar is your translation bridge, turning complex terminal tools into transparent, intuitive insights you can use from the comfort of your couch.",
      points: [
        {
          bold: "Demystify the Noise",
          text: "Wall Street loves to hide behind dense, confusing terms to keep you guessing. We break down the absolute core variables of valuation into straightforward stories so you can see exactly how the numbers are built, with zero intimidation.",
        },
        {
          bold: "Take Control of Your Choices",
          text: "Instead of relying blindly on biased consensus estimates or laggy retail trackers, you get to sit in the driver's seat. Master the core building blocks of stock value so you can back up your long-term financial decisions with genuine understanding.",
        },
        {
          bold: "Shared Clarity, Better Conversations",
          text: "When you speak the same language as the professionals, everything changes. Whether you are managing your own path or aligning your strategy with an advisor, having these primitives at your fingertips creates complete confidence and removes the guesswork.",
        },
      ],
      cta: "Explore Essential Access \u2192",
      ctaHref: "/product-tiers",
    },
  },
  {
    id: "practical",
    image: "/net/enc-practical.png",
    icon: Briefcase,
    accent: "text-emerald-400",
    title: "The Practical Pillar",
    subtitle: "Real-World Application",
    body: [
      "This is where theory connects to everyday life. Step away from the textbook and look at how these core variables actually work in real-time scenarios.",
      "Discover exactly how to performance, explore historical lookbacks, and see how a portfolio operates day-to-day.",
    ],
    valuePanel: {
      header: "Theory Hits the Pavement",
      subheader:
        "Stop guessing how economic changes or market moves impact your balance. The Practical Pillar bridges the gap between financial concepts and your real-world money, transforming complex tracking variables into intuitive, visual workflows.",
      points: [
        {
          bold: "Track Performance with Confidence",
          text: "You shouldn\u2019t have to wait for a quarterly statement to understand where your investments stand. This pillar shows you exactly how to track your variables in real-time, giving you an immediate, transparent snapshot of your progress whenever you want it.",
        },
        {
          bold: "Learn from the Past, Clear the Future",
          text: "History is one of the best teachers in finance. We take the intimidation out of historical lookbacks, letting you easily explore how different asset combinations handled past market environments so you can position your current portfolio with complete clarity.",
        },
        {
          bold: "Run an Efficient Portfolio Effortlessly",
          text: "Managing a balanced portfolio isn\u2019t just for Wall Street institutions. We break down day-to-day portfolio mechanics into simple, visual adjustments. You\u2019ll see exactly how your choices interact, making it easy to protect your capital and stay aligned with your long-term goals.",
        },
      ],
      cta: "Explore Advisor & Individual Tiers \u2192",
      ctaHref: "/product-tiers",
    },
  },
  {
    id: "academic",
    image: "/net/enc-academic.png",
    icon: GraduationCap,
    accent: "text-purple-400",
    title: "The Academic Pillar",
    subtitle: "The Core Math",
    body: [
      "The uncompromised raw formulas and mechanics driving the entire engine.",
      "When you want to see the exact blueprint running behind the scenes, return to this pillar. It keeps the pure mathematical definitions completely transparent and available to anyone who wants to see exactly how the numbers are built.",
    ],
    valuePanel: {
      header: "Uncompromising Truth in Numbers",
      subheader:
        "We don\u2019t believe in proprietary secrets or hidden calculation layers. The Academic Pillar opens up the engine room, providing absolute visibility into the pure mathematical foundations that power every single valuation on your screen.",
      points: [
        {
          bold: "Total Transparency, Zero Guesswork",
          text: "Many financial platforms ask you to blindly trust an arbitrary number popped out by a hidden algorithm. We do the exact opposite. By making the raw formulas completely open and available, you can see exactly how every data point is calculated, removing doubt and building total trust.",
        },
        {
          bold: "Verify and Defend Your Logic",
          text: "Whether you are an investor backing up a personal lifecycle choice or a professional justifying a fiduciary recommendation to a client, you need an ironclad defense. This pillar acts as your mathematical proof, giving you the raw blueprints needed to stand behind your decisions with total conviction.",
        },
        {
          bold: "Keep Your Analytical Instincts Sharp",
          text: "Finance is a continuous learning process. Having direct access to institutional-grade evaluation logic and mathematical rules right at your fingertips makes it effortless to refresh your memory, ground your core instincts, and deepen your financial literacy from the comfort of your couch.",
        },
      ],
      cta: "Unlock Full Terminal Access \u2192",
      ctaHref: "/product-tiers",
    },
  },
] as const

export default function EncyclopediaPage() {
  const [activePillar, setActivePillar] = useState<Pillar>("all")

  const renderCard = (card: (typeof pillarCards)[number]) => {
    const Icon = card.icon
    return (
      <div
        key={card.id}
        className="group flex flex-col bg-[#0B0F19] border border-blue-500/20 rounded-xl overflow-hidden transition-all hover:border-blue-500/40 shadow-[0_0_25px_rgba(59,130,246,0.05)]"
      >
        <div className="relative w-full h-44 overflow-hidden">
          <Image
            src={card.image || "/placeholder.svg"}
            alt={card.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B0F19]" />
        </div>
        <div className="p-6 flex flex-col gap-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Icon className={`w-4 h-4 ${card.accent}`} />
            <span>{card.title}</span>
          </h3>
          <p className="text-sm font-semibold text-zinc-200">{card.subtitle}</p>
          {card.body.map((para, i) => (
            <p key={i} className="text-xs text-zinc-400 leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </div>
    )
  }

  const activeCard = activePillar === "all" ? null : pillarCards.find((c) => c.id === activePillar)

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
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
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
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/product-tiers" className="hover:text-white transition-colors">
              Product Tiers
            </Link>
            <Link href="/encyclopedia" className="text-white border-b border-white pb-1 transition-colors">
              Encyclopedia
            </Link>
            <Link href="/blog" className="hover:text-white transition-colors">
              Insights
            </Link>
            <Link href="/corporate" className="hover:text-white transition-colors">
              Corporate
            </Link>
          </nav>

          {/* Sales Portal Loop CTA */}
          <OfferingCta />
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Learning Pathways Sidebar */}
        <aside className="lg:col-span-3">
          <div className="rounded-xl bg-gradient-to-b from-blue-500/40 via-[#27272A] to-[#27272A] p-px lg:sticky lg:top-28 shadow-[0_0_25px_rgba(59,130,246,0.06)]">
            <div className="rounded-[11px] bg-[#0B0F19]/80 backdrop-blur-md p-4 flex flex-col gap-1.5 font-mono text-xs">
              <div className="text-xs tracking-wider text-zinc-300 px-3 pb-2">Learning Pathways</div>
              {([
                { id: "all", label: "Master Encyclopedia", dot: "bg-blue-400" },
                { id: "layman", label: "Layman Pillar", dot: "bg-blue-400/70" },
                { id: "practical", label: "Practical Pillar", dot: "bg-emerald-400/70" },
                { id: "academic", label: "Academic Pillar", dot: "bg-purple-400/70" },
              ] as { id: Pillar; label: string; dot: string }[]).map((item) => {
                const isActive = activePillar === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setActivePillar(item.id)}
                    className={`group relative w-full text-left pl-4 pr-3 py-2.5 rounded-lg flex items-center gap-3 transition-all duration-200 ${
                      isActive ? "bg-white/[0.04] text-white font-semibold" : "text-zinc-500 hover:text-white hover:bg-white/[0.02]"
                    }`}
                  >
                    <span
                      className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-blue-500 transition-opacity duration-200 shadow-[0_0_8px_rgba(59,130,246,0.8)] ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <span
                      className={`h-1.5 w-1.5 rounded-full shrink-0 transition-colors ${
                        isActive ? item.dot : "bg-zinc-600 group-hover:bg-zinc-400"
                      }`}
                    />
                    <span className="tracking-wide">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </aside>

        <div className="lg:col-span-9 flex flex-col gap-8">
          <div className="flex flex-col gap-3 border-b border-[#1F1F23] pb-6">
            <h1 className="text-3xl font-black text-white font-mono text-balance tracking-tight">
              The Knowledge Foundation
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl text-pretty">
              A shared space for absolute financial clarity. We built this sanctuary to strip away the complex noise and
              break down the core logic running behind our terminal. Whether you are an experienced professional keeping
              your instincts sharp or an everyday investor building a rock-solid understanding, these pillars are your
              personal guide to finding your footing with total confidence.
            </p>
          </div>

          {activeCard ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Single pillar card on the left */}
              <div className="lg:col-span-4">{renderCard(activeCard)}</div>

              {/* Dynamic Value Pitch Panel on the right */}
              <div className="lg:col-span-8">
                <div className="rounded-2xl bg-gradient-to-br from-blue-500/40 via-[#1F2937]/40 to-blue-500/10 p-px shadow-[0_0_35px_rgba(59,130,246,0.08)]">
                  <div className="rounded-2xl backdrop-blur-lg bg-[#0B0F19]/60 p-8 flex flex-col gap-7">
                    <div className="flex flex-col gap-3">
                      <h2 className="text-2xl font-bold text-white text-balance">
                        {activeCard.valuePanel.header}
                      </h2>
                      <p className="text-base text-zinc-300 leading-relaxed text-pretty">
                        {activeCard.valuePanel.subheader}
                      </p>
                    </div>

                    <div className="flex flex-col gap-6">
                      {activeCard.valuePanel.points.map((point) => (
                        <div key={point.bold} className="flex items-start gap-4">
                          <span
                            className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.9)]"
                            aria-hidden="true"
                          />
                          <p className="text-base text-zinc-400 leading-relaxed text-pretty">
                            <span className="font-semibold text-white">{point.bold}</span>
                            {" \u2014 "}
                            {point.text}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div>
                      <Link
                        href={activeCard.valuePanel.ctaHref}
                        className="inline-flex items-center justify-center rounded-lg bg-[#0A0A0C] text-white text-sm font-semibold px-6 py-3 border border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:scale-105 hover:border-blue-400 transition-transform duration-200"
                      >
                        {activeCard.valuePanel.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pillarCards.map((card) => renderCard(card))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

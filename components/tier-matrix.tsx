"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check, ArrowRight } from "lucide-react"
import { OFFERING_URL } from "@/lib/links"

type TierId = "essential" | "advisor" | "pro"

type Capability = { bold: string; text?: string }
type BenefitPoint = { bold: string; text: string }

type Tier = {
  id: TierId
  layer: string
  name: string
  badge: string
  badgeClass: string
  accent: string
  indicator: string
  glow: string
  cardBorder: string
  description: string
  featured?: string
  capabilities: Capability[]
  ctaText: string
  ctaHref: string
  ctaClass: string
  ctaArrow: string
  benefit: {
    header: string
    subheader: string
    points: BenefitPoint[]
    cta: string
  }
}

const TIERS: Tier[] = [
  {
    id: "essential",
    layer: "LAYER 01",
    name: "Essential",
    badge: "CORE WORKSPACE",
    badgeClass: "bg-[#1E1B4B] text-blue-300 border-blue-900",
    accent: "text-blue-400",
    indicator: "bg-blue-500",
    glow: "#3b82f6",
    cardBorder: "border-[#27272A] hover:border-blue-500/20",
    description:
      "Ditch generic, laggy retail tools. The Essential workspace delivers clean, institutional-grade equity lookup terminals designed to unmask true intrinsic value. Fine-tune growth assumptions instantly and control the narrative before consensus models distort the trend.",
    capabilities: [
      { bold: "Fair Value Search Engine:", text: "High-speed equity lookup terminal filtering individual tickers cleanly." },
      { bold: "Stock Screening & Watchlists:", text: "Build dynamic equity screens and track target asset performance seamlessly." },
      { bold: "Real-Time Alerts & News:", text: "Stay ahead of volatility with customized parameter alerts and live breaking market feeds." },
      { bold: "Manual DCF Adjustments:", text: "Fine-tune core assumptions using live Growth Rate and Terminal P/E sliders." },
      { bold: "Confidence Level Metrics:", text: "Instant calculation validation displays tracking model probability spreads." },
    ],
    ctaText: "Deploy Essential Engine",
    ctaHref: `${OFFERING_URL}?tier=essential`,
    ctaClass: "bg-[#18181B] hover:bg-[#222227] text-white border border-[#27272A]",
    ctaArrow: "text-blue-400",
    benefit: {
      header: "Unmasking True Market Value",
      subheader:
        "The Essential tier strips away the noise, lag, and biased price targets of generic retail finance sites, giving you an uncompromised foundation to evaluate equities with complete transparency.",
      points: [
        {
          bold: "Institutional Data at Your Fingertips",
          text: "Gain access to the exact clean, high-speed lookup engines used by professionals. Drop in any ticker symbol and instantly view core fundamentals, without distracting advertisements or algorithmically pushed narratives distorting your screen.",
        },
        {
          bold: "Take Control of Growth Assumptions",
          text: "Stop blindly accepting static expert consensus figures. With interactive adjustments right on your interface, you can test alternative growth metrics and track valuations yourself to find real opportunities early.",
        },
        {
          bold: "Alerts Tailored to Your Rules",
          text: "Stay seamlessly ahead of market volatility. Set up parameter alerts that trigger strictly based on your specific rules and model filters, ensuring you only receive the direct market news and information that truly impacts your thesis.",
        },
      ],
      cta: "Start Essential Workspace Trial \u2192",
    },
  },
  {
    id: "advisor",
    layer: "LAYER 02",
    name: "Advisor",
    badge: "MPT OPTIMIZER",
    badgeClass: "bg-[#064E3B] text-emerald-300 border-emerald-900",
    accent: "text-emerald-400",
    indicator: "bg-emerald-500",
    glow: "#10b981",
    cardBorder: "border-emerald-500/20 hover:border-emerald-500/40 shadow-2xl shadow-emerald-950/5",
    description:
      "Engineered for independent wealth managers who use visual conviction to scale their practice. Seamlessly model custom allocations, map assets against the Efficient Frontier, and pinpoint peak mathematical efficiency in real time. Built to turn complex portfolio construction into an engaging client conversation.",
    featured: "PROFESSIONAL SCALE",
    capabilities: [
      { bold: "All Essential Features Included" },
      { bold: "Portfolio Construction Canvas:", text: "Build and dynamically balance custom multi-asset weighting structures." },
      { bold: "Efficient Frontier Mapping:", text: "Instantly plot calculated risk assets across expected return vs. variance axes." },
      { bold: "Sharpe Ratio Optimization:", text: "Trigger integrated matrix algorithms to rapidly isolate peak mathematical efficiency." },
      { bold: "One-Click Client Handouts:", text: "Export clean, high-contrast visual summaries of your custom allocations and optimization curves directly from your workspace." },
    ],
    ctaText: "Deploy Advisor Architecture",
    ctaHref: `${OFFERING_URL}?tier=advisor`,
    ctaClass: "bg-white hover:bg-[#E4E4E7] text-[#0A0A0C] font-bold shadow-xl",
    ctaArrow: "text-emerald-600",
    benefit: {
      header: "Elevating Your Visual Practice",
      subheader:
        "The Advisor tier is custom-engineered for independent wealth managers who want to build immediate client trust and visual conviction while designing resilient, optimized portfolios.",
      points: [
        {
          bold: "Interactive Allocation Canvases",
          text: "Ditch static paper reports and complicated backend software. Map asset weights visually with your clients, demonstrating real-time changes to the portfolio balance and creating a highly engaging, collaborative environment.",
        },
        {
          bold: "Effortless Efficiency Mapping",
          text: "Instantly plot calculated allocations straight against the Efficient Frontier and isolate peak mathematical performance. It takes the mystery out of modern optimization theories, proving the concrete value of your professional guidance at a glance.",
        },
        {
          bold: "One-Click Client Handouts",
          text: "Export beautifully structured, high-contrast visual summaries of your custom models directly from your tablet workspace. Deliver professional clarity that clients can easily digest and share with their families.",
        },
      ],
      cta: "Scale Your Practice with Advisor \u2192",
    },
  },
  {
    id: "pro",
    layer: "LAYER 03",
    name: "Advisor Pro",
    badge: "SIMULATION ENGINE",
    badgeClass: "bg-[#4C1D95] text-purple-300 border-purple-900",
    accent: "text-purple-400",
    indicator: "bg-purple-500",
    glow: "#a855f7",
    cardBorder: "border-purple-500/20 hover:border-purple-500/40",
    description:
      "The ultimate enterprise suite for high-end practices demanding absolute analytical dominance. Run advanced, 1,000-trial simulation models to stress-test market uncertainty, coordinate multi-seat teams seamlessly, and instantly export compliance-ready justification reports to defend your fiduciary recommendations.",
    capabilities: [
      { bold: "All Advisor Features Included" },
      { bold: "Monte Carlo Simulators:", text: "Launch 1,000 iterative data trials projecting true 10-year probabilistic wealth horizons." },
      { bold: "Active Team Seat Allocation:", text: "Provision and track multi-user license pools (e.g., 5/10 seats) dynamically." },
      { bold: "Uptime Sync Guardrails:", text: "High-availability secure caching ensures customized client models stay persistent." },
      { bold: "FIA Lookback Terminal:", text: "Run empirical 5 and 10-year historical annuity backtests with custom variable constraints instantly." },
      { bold: "Fiduciary Justification Reports:", text: "Instantly generate comprehensive, compliant data books mapping out your FIA Lookbacks and Monte Carlo trials to archive in your client files." },
    ],
    ctaText: "Deploy Institutional Suite",
    ctaHref: `${OFFERING_URL}?tier=pro`,
    ctaClass: "bg-[#18181B] hover:bg-[#222227] text-white border border-[#27272A]",
    ctaArrow: "text-purple-400",
    benefit: {
      header: "Absolute Analytical Dominance",
      subheader:
        "The Advisor Pro tier delivers an uncompromised enterprise suite built for high-end practices that require multi-seat collaboration and sophisticated risk forecasting to protect substantial capital.",
      points: [
        {
          bold: "Simulating Market Uncertainty Safely",
          text: "Run advanced, 1,000-trial iterative simulations projecting true 10-year probabilistic horizons. Instead of relying on a single flat prediction, show your clients the true laws of chance so they remain completely grounded during shifting market cycles.",
        },
        {
          bold: "Coordinated Team Infrastructure",
          text: "Provision, deploy, and monitor multi-user license pools seamlessly across your entire office layout. Keep your advisors aligned on identical internal frameworks and shared compliance baselines effortlessly.",
        },
        {
          bold: "Automated Compliance and Justification",
          text: "Instantly generate and export comprehensive, defense-ready fiduciary justification summaries. Back up every single custom recommendation with transparent empirical data, keeping your firm completely insulated and audited cleanly.",
        },
      ],
      cta: "Deploy Advisor Pro Enterprise Suite \u2192",
    },
  },
]

function TierCard({
  tier,
  isActive,
  onToggle,
}: {
  tier: Tier
  isActive: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={`bg-[#121214] rounded-xl p-6 md:p-8 flex flex-col justify-between transition-all relative ${
        isActive
          ? "border border-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.35)]"
          : `border ${tier.cardBorder}`
      }`}
    >
      {tier.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-950 text-emerald-400 text-[9px] font-mono tracking-widest font-bold uppercase px-3 py-1 rounded-full border border-emerald-800">
          {tier.featured}
        </div>
      )}
      <div className="space-y-6">
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={isActive}
          className="w-full flex justify-between items-start border-b border-[#1F1F23] pb-4 text-left cursor-pointer group"
        >
          <div>
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block">{tier.layer}</span>
            <h2 className="inline-flex items-center gap-3 cursor-pointer text-2xl font-bold text-white tracking-tight transition-colors group-hover:text-white">
              <span className="relative inline-flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping [animation-duration:2s] ${tier.indicator}`}
                />
                <span
                  className={`relative inline-flex h-2.5 w-2.5 rounded-full ring-2 ring-white/20 ${tier.indicator} transition-all duration-200 group-hover:scale-125`}
                  style={{ boxShadow: `0 0 8px 2px ${tier.glow}, 0 0 14px 4px ${tier.glow}66` }}
                />
              </span>
              <span>{tier.name}</span>
            </h2>
          </div>
          <span
            className={`text-[10px] font-mono leading-none whitespace-nowrap border px-2 py-1 rounded ${tier.badgeClass}`}
          >
            {tier.badge}
          </span>
        </button>
        <p className="text-xs text-[#A1A1AA] leading-relaxed">{tier.description}</p>

        <div className="space-y-3 pt-2">
          <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">INCLUDED CAPABILITIES:</div>
          <ul className="space-y-2.5 text-xs text-zinc-400 font-mono">
            {tier.capabilities.map((cap) => (
              <li key={cap.bold} className="flex items-start gap-2.5">
                <Check className={`w-3.5 h-3.5 ${tier.accent} shrink-0 mt-0.5`} />
                {cap.text ? (
                  <span>
                    <strong className="text-white">{cap.bold}</strong> {cap.text}
                  </span>
                ) : (
                  <span className="text-white font-bold">{cap.bold}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-8">
        <a
          href={tier.ctaHref}
          className={`w-full text-center text-xs font-mono py-3 rounded-lg flex items-center justify-center gap-2 transition-all group ${tier.ctaClass}`}
        >
          <span>{tier.ctaText}</span>
          <ArrowRight className={`w-3.5 h-3.5 ${tier.ctaArrow} group-hover:translate-x-0.5 transition-transform`} />
        </a>
      </div>
    </div>
  )
}

function BenefitPanel({ tier }: { tier: Tier }) {
  return (
    <div className="backdrop-blur-lg bg-[#0B0F19]/75 p-8 rounded-xl border border-white/10 flex flex-col gap-7 shadow-[0_0_35px_rgba(59,130,246,0.08)]">
      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-bold text-white text-balance">{tier.benefit.header}</h3>
        <p className="text-base text-[#C4C7D0] leading-relaxed text-pretty">{tier.benefit.subheader}</p>
      </div>

      <div className="flex flex-col gap-6">
        {tier.benefit.points.map((point) => (
          <div key={point.bold} className="flex items-start gap-4">
            <span
              className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.9)]"
              aria-hidden="true"
            />
            <p className="text-base text-[#C4C7D0] leading-relaxed text-pretty">
              <span className="font-semibold text-white">{point.bold}</span>
              {" \u2014 "}
              {point.text}
            </p>
          </div>
        ))}
      </div>

      <div>
        <a
          href={tier.ctaHref}
          className="inline-flex items-center justify-center rounded-lg bg-[#0A0A0C] text-white text-sm font-semibold px-6 py-3 border border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-105 hover:border-blue-400 transition-all duration-200"
        >
          {tier.benefit.cta}
        </a>
      </div>
    </div>
  )
}

export function TierMatrix({
  initialTier,
  returnHref,
}: {
  initialTier?: TierId
  returnHref?: string
}) {
  const [activeId, setActiveId] = useState<TierId | null>(initialTier ?? null)
  const router = useRouter()
  const activeTier = activeId ? TIERS.find((t) => t.id === activeId) ?? null : null

  // Collapsing the expanded view: if the visitor deep-linked from another page
  // (returnHref set), send them back there; otherwise just collapse in place.
  const goBack = () => {
    if (returnHref) {
      router.push(returnHref)
    } else {
      setActiveId(null)
    }
  }

  if (activeTier) {
    const backLabel = "\u2190 View all tiers"
    return (
      <div className="space-y-6">
        {returnHref ? (
          <Link
            href={returnHref}
            className="inline-block text-xs font-mono tracking-wide uppercase text-[#A1A1AA] hover:text-white transition-colors"
          >
            {backLabel}
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setActiveId(null)}
            className="text-xs font-mono tracking-wide uppercase text-[#A1A1AA] hover:text-white transition-colors"
          >
            {backLabel}
          </button>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left column: selected tier card (40%) */}
          <div className="lg:col-span-2">
            <TierCard tier={activeTier} isActive onToggle={goBack} />
          </div>
          {/* Right column: expanded benefit panel (60%) */}
          <div className="lg:col-span-3">
            <BenefitPanel tier={activeTier} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
      {TIERS.map((tier) => (
        <TierCard key={tier.id} tier={tier} isActive={false} onToggle={() => setActiveId(tier.id)} />
      ))}
    </div>
  )
}

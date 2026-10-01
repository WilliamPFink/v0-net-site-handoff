"use client"

import { useState } from "react"
import { Check, ArrowRight } from "lucide-react"
import { type CatalogPricing, formatPrice } from "@/lib/academy-catalog"

type Billing = "monthly" | "annual"

const INCLUDED = [
  "Every lesson in every course, unlocked",
  "Knowledge-check quizzes on nearly every lesson",
  "Progress tracking that syncs across devices",
  "Deep links from lessons into the live terminal",
  "All future courses, included automatically",
]

export function AcademyPricing({
  pricing,
  subscribeUrl,
}: {
  pricing: CatalogPricing
  subscribeUrl: string
}) {
  const [billing, setBilling] = useState<Billing>("annual")
  const annual = billing === "annual"

  const tier = annual ? pricing.annual : pricing.monthly
  const unit = annual ? "/year" : "/month"
  const standardPrice = formatPrice(tier.standardAmount, pricing.currency)
  const bundlePrice = formatPrice(tier.bundleAmount, pricing.currency)

  return (
    <div className="space-y-8">
      {/* Billing toggle */}
      <div className="flex items-center justify-center">
        <div
          role="group"
          aria-label="Billing period"
          className="inline-flex items-center gap-1 bg-[#121214] border border-[#27272A] rounded-full p-1"
        >
          <button
            type="button"
            onClick={() => setBilling("monthly")}
            aria-pressed={!annual}
            className={`text-xs font-mono uppercase tracking-wide px-4 py-2 rounded-full transition-colors ${
              !annual ? "bg-[#1C1C21] text-white" : "text-[#A1A1AA] hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBilling("annual")}
            aria-pressed={annual}
            className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wide px-4 py-2 rounded-full transition-colors ${
              annual ? "bg-[#1C1C21] text-white" : "text-[#A1A1AA] hover:text-white"
            }`}
          >
            Annual
            <span className="text-[10px] font-bold text-emerald-400 normal-case tracking-normal">Save 2 months</span>
          </button>
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Standard */}
        <div className="flex flex-col bg-[#121214] border border-[#27272A] rounded-xl p-7 shadow-lg">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8]">Academy Subscription</span>
            <h3 className="text-lg font-bold text-white">Standard</h3>
          </div>
          <div className="flex items-baseline gap-1.5 pt-5">
            <span className="text-4xl font-extrabold text-white tracking-tight">{standardPrice}</span>
            <span className="text-sm font-mono text-[#71717A]">{unit}</span>
          </div>
          <p className="text-xs text-[#71717A] mt-2 leading-relaxed">
            {annual ? "Billed yearly. Full access to the entire Academy." : "Billed monthly. Full access to the entire Academy."}
          </p>
          <ul className="space-y-2.5 pt-6 flex-1">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[#D4D4D8] leading-snug">
                <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a
            href={subscribeUrl}
            className="mt-7 inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white text-xs font-mono font-bold uppercase tracking-wide px-5 py-3 rounded-full transition-colors group"
          >
            <span>Subscribe to Academy</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </a>
        </div>

        {/* Bundle — highlighted */}
        <div className="relative flex flex-col bg-[#121214] border border-emerald-500/30 rounded-xl p-7 shadow-lg shadow-emerald-950/10">
          <span className="absolute -top-3 left-7 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-[#0A0A0C] border border-emerald-500/30 px-2.5 py-1 rounded">
            App subscriber price
          </span>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/80">Bundle Discount</span>
            <h3 className="text-lg font-bold text-white">About half price</h3>
          </div>
          <div className="flex items-baseline gap-1.5 pt-5">
            <span className="text-4xl font-extrabold text-white tracking-tight">{bundlePrice}</span>
            <span className="text-sm font-mono text-[#71717A]">{unit}</span>
          </div>
          <p className="text-xs text-[#A1A1AA] mt-2 leading-relaxed text-pretty">{pricing.note}</p>
          <ul className="space-y-2.5 pt-6 flex-1">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[#D4D4D8] leading-snug">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a
            href={subscribeUrl}
            className="mt-7 inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-[#04120C] text-xs font-mono font-bold uppercase tracking-wide px-5 py-3 rounded-full transition-colors group"
          >
            <span>Subscribe to Academy</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </a>
        </div>
      </div>

      <p className="text-center text-xs font-mono text-[#71717A] tracking-wide">
        Secure checkout via Stripe. Cancel anytime.
      </p>
    </div>
  )
}

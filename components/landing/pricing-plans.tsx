"use client"

/* eslint-disable @next/next/no-img-element */
import { useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { OFFERING_URL } from "@/lib/links"

// Pricing / paywall implemented from Figma "ClearGuidenceStudio" → "Paywall" page
// (Monthly 160:1221 / 160:3027 / 160:3336, Yearly 160:5180 / 160:4912 / 160:4606).

type Period = "monthly" | "yearly"
type ProductId = "foundation" | "analyst" | "pro"

type Feature = { icon: string; name: string; value: string }
type Product = {
  id: ProductId
  tab: string
  /** Slug the offering page uses for this tier. */
  tierSlug: string
  headline: string
  subhead: string
  features: Record<Period, Feature[]>
  priceless: string
  totalValue: Record<Period, string>
  ctaLead: string
  monthlyPrice: string
  yearly: { was: string; now: string; discount: string }
  testimonial: { quote: string; author: string }
}

const A = "/landing"

const PRODUCTS: Product[] = [
  {
    id: "foundation",
    tab: "Foundation",
    tierSlug: "essential",
    headline: "Understand Your Investments With Confidence",
    subhead: "Learn how companies are valued and see the reasoning behind the numbers.",
    features: {
      monthly: [
        { icon: "pw-dcf.svg", name: "Interactive DCF Valuation Engine", value: "$49/month value" },
        { icon: "pw-ai-memory.svg", name: "AI Memory Companion", value: "$29/month value" },
        { icon: "pw-insights.svg", name: "Expert-Level Insights", value: "$29/month value" },
        { icon: "pw-action-plans.svg", name: "Personalized Action Plans", value: "$19/month value" },
        { icon: "pw-vault.svg", name: "Private Memory Vault", value: "$19/month value" },
      ],
      yearly: [
        { icon: "pw-dcf.svg", name: "Interactive DCF Valuation Engine", value: "$49/month value" },
        { icon: "pw-mpt.svg", name: "Dynamic Valuation Assumptions", value: "$29/month value" },
        { icon: "pw-market-implied.svg", name: "Market-Implied Valuation Analysis", value: "$29/month value" },
        { icon: "pw-company-workspace.svg", name: "Company Analysis Workspace", value: "$19/month value" },
        { icon: "pw-copilot.svg", name: "Annette Educational Co-Pilot", value: "$19/month value" },
      ],
    },
    priceless: "The confidence to understand what you own and why you own it.",
    totalValue: { monthly: "$145/month value", yearly: "$145/month" },
    ctaLead: "Get At",
    monthlyPrice: "$19.99/month",
    yearly: { was: "$239.88/year", now: "$191.90/year", discount: "20%" },
    testimonial: { quote: "Give clients more than recommendations. Give them understanding.", author: "Keith W. Utah, US" },
  },
  {
    id: "analyst",
    tab: "Analyst",
    tierSlug: "advisor",
    headline: "Analyze Investments Like A Professional",
    subhead: "Build a deeper research process with advanced valuation and portfolio tools.",
    features: {
      monthly: [
        { icon: "pw-everything.svg", name: "Everything In Investor Included", value: "$145/month value" },
        { icon: "pw-workspaces.svg", name: "Unlimited Valuation Workspaces", value: "$49/month value" },
        { icon: "pw-portfolio-risk.svg", name: "Portfolio & Risk Analysis Tools", value: "$79/month value" },
        { icon: "pw-mpt.svg", name: "Modern Portfolio Theory & Drift Monitoring", value: "$59/month value" },
        { icon: "pw-monitoring.svg", name: "Advanced Investment Monitoring", value: "$49/month value" },
      ],
      yearly: [],
    },
    priceless: "The ability to build an investment process backed by your own analysis.",
    totalValue: { monthly: "$381/month value", yearly: "$381/month / $4,572/year" },
    ctaLead: "Start At",
    monthlyPrice: "$79.99/month",
    yearly: { was: "$959.88/year", now: "$479.90/year", discount: "50%" },
    testimonial: { quote: "See the reasoning behind the numbers instead of relying on opinions.", author: "Kathleen M. Miami, US" },
  },
  {
    id: "pro",
    tab: "Advisor Pro",
    tierSlug: "pro",
    headline: "Bring Professional Analysis To Your Clients",
    subhead: "Deliver deeper investment insights with professional research and reporting tools.",
    features: {
      monthly: [
        { icon: "pw-everything.svg", name: "Everything In Professional Investor Included", value: "$381/month value" },
        { icon: "pw-shared-workspaces.svg", name: "Shared Model Workspaces", value: "$99/month value" },
        { icon: "pw-monte-carlo.svg", name: "Monte Carlo Outcome & Stress Testing", value: "$99/month value" },
        { icon: "pw-report-builder.svg", name: "Sector-Aware Research Report Builder", value: "$149/month value" },
        { icon: "pw-reg-bi.svg", name: "Reg BI Workflow & Audit Trail Documentation", value: "$99/month value" },
      ],
      yearly: [],
    },
    priceless: "The trust you build when clients understand the reasoning behind their investments.",
    totalValue: { monthly: "$827/month value", yearly: "$827/month / $9,924/year" },
    ctaLead: "Start At",
    monthlyPrice: "$159.99/month",
    yearly: { was: "$1,919.88/year", now: "$959.90/year", discount: "50%" },
    testimonial: { quote: "Finally understand what I’m actually investing in.", author: "Jon L. Delaware, US" },
  },
]

/** Analyst and Advisor Pro list the same features on both billing periods. */
const featuresFor = (p: Product, period: Period) => (p.features[period].length ? p.features[period] : p.features.monthly)
const checkoutUrl = (p: Product, period: Period) => `${OFFERING_URL}?tier=${p.tierSlug}&billing=${period}`

const FADE = "motion-safe:animate-in motion-safe:fade-in motion-safe:animation-duration-300"

/* -------------------------------------------------------------------------- */

function PeriodToggle({
  period,
  onChange,
  saveLabel,
  className,
}: {
  period: Period
  onChange: (p: Period) => void
  saveLabel: string
  className?: string
}) {
  return (
    <div role="radiogroup" aria-label="Billing period" className={cn("inline-flex rounded-full border border-white/10 bg-black/30 p-1", className)}>
      {(["monthly", "yearly"] as const).map((p) => (
        <button
          key={p}
          type="button"
          role="radio"
          aria-checked={period === p}
          onClick={() => onChange(p)}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-bold uppercase leading-3 tracking-[-0.24px] transition-colors duration-200",
            period === p ? "bg-[#2b7fff] text-white shadow-[0_2px_10px_rgba(43,127,255,0.45)]" : "text-white/70 hover:text-white",
          )}
        >
          {p === "monthly" ? "Monthly" : "Yearly"}
          {p === "yearly" && (
            <span className={cn("whitespace-nowrap rounded-full px-1.5 py-0.5 text-[10px] leading-3", period === p ? "bg-white/20" : "bg-[#2b7fff]/25 text-[#8bb8ff]")}>
              {saveLabel}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

function ValueStack({ product, period }: { product: Product; period: Period }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[16px] border border-[rgba(201,222,255,0.1)] bg-white p-px text-black drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
      <ul>
        {featuresFor(product, period).map((f) => (
          <li key={f.name} className="flex items-center gap-3 border-b border-[#e1e3e2] px-4 pb-[11px] pt-2.5">
            <img src={`${A}/${f.icon}`} alt="" aria-hidden width={24} height={24} className="size-6 shrink-0" />
            <span className="min-w-0 flex-1 text-[14px] font-medium leading-[1.22]">{f.name}</span>
            <span className="shrink-0 whitespace-nowrap text-[13px] font-bold leading-3 tracking-[-0.13px] text-[#2b7fff]">{f.value}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-start gap-1 bg-[#fff9e9] px-4 py-3">
        <p className="shrink-0 whitespace-nowrap text-[14px] font-medium leading-[1.22]">⭐ Priceless:</p>
        <p className="min-w-0 flex-1 text-right text-[13px] font-medium leading-[1.22]">{product.priceless}</p>
      </div>
      <div className="flex items-start justify-between gap-3 rounded-b-[12px] border-t border-[#e1e3e2] bg-[#f6faff] px-4 pb-3 pt-[13px] text-[15px] leading-[1.22]">
        <p className="font-medium">Total Value</p>
        <p className={cn("text-right line-through", period === "yearly" ? "font-semibold" : "font-bold")}>{product.totalValue[period]}</p>
      </div>
    </div>
  )
}

function PriceCard({ product, period }: { product: Product; period: Period }) {
  const yearly = period === "yearly"
  return (
    <div className={cn("flex flex-col gap-2 rounded-[16px] border border-[rgba(46,101,90,0.2)] bg-white px-4 pt-[22px] text-black", yearly ? "pb-3" : "pb-[22px]")}>
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-[32px] leading-none tracking-[-0.64px] text-[#2b7fff]">
          <span className="font-light">{product.ctaLead} </span>
          <span className="font-extrabold">$0 Today</span>
        </p>
        <p className="text-[14px] tracking-[-0.28px]">
          Then:{" "}
          {yearly ? (
            <span className="font-bold">
              <s>{product.yearly.was}</s> {product.yearly.now} ({product.yearly.discount} OFF)
            </span>
          ) : (
            <span className="font-bold">{product.monthlyPrice} after your trial ends</span>
          )}
        </p>
      </div>
      <a href={checkoutUrl(product, period)} className="group/cta block rounded-[8px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2b7fff]">
        <span
          className={cn(
            "flex items-center justify-center bg-[#2b7fff] px-4 py-5 text-center text-[16px] font-bold uppercase leading-3 text-white shadow-[inset_0_-4px_33px_#6fa5fb] transition duration-200 group-hover/cta:brightness-110 min-[400px]:text-[18px]",
            yearly ? "rounded-t-[8px]" : "rounded-[8px]",
          )}
        >
          Get {product.tab} at $0 Today
        </span>
        {yearly && (
          <span className="block rounded-b-[8px] bg-[#0e2b53] px-2 py-1 text-center text-[12px] font-semibold tracking-[-0.24px] text-white">
            Get today and save {product.yearly.discount}
          </span>
        )}
      </a>
      <p className="whitespace-pre text-center text-[12px] font-medium text-[#0e2b53]">{"7-day free trial  •  Cancel anytime"}</p>
    </div>
  )
}

function Testimonial({ product }: { product: Product }) {
  return (
    <figure className="flex flex-col items-center gap-1 text-center text-white lg:min-h-[76px]">
      <div className="flex" aria-label="Rated 5 out of 5">
        {Array.from({ length: 5 }, (_, i) => (
          <img key={i} src={`${A}/pw-star.svg`} alt="" aria-hidden width={16} height={16} className="-mr-px size-4" />
        ))}
      </div>
      <blockquote className="text-[15px] leading-[1.22] text-balance">“{product.testimonial.quote}”</blockquote>
      <figcaption className="text-[12px] font-bold leading-[1.22]">- {product.testimonial.author}</figcaption>
    </figure>
  )
}

function Headline({ product, className }: { product: Product; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-3 text-center text-white", className)}>
      <h3 className="text-[28px] leading-[1.08] tracking-[-0.56px] text-balance">{product.headline}</h3>
      <p className="max-w-[360px] text-[15px] font-light leading-[1.22] text-balance">{product.subhead}</p>
    </div>
  )
}

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative isolate overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#060a12] shadow-[0_1px_3px_rgba(0,0,0,0.4)]", className)}>
      <img src={`${A}/pw-bg.webp`} alt="" aria-hidden className="pointer-events-none absolute inset-0 -z-10 size-full object-cover object-top" />
      {children}
    </div>
  )
}

/* -------------------------------------------------------------------------- */

export function PricingPlans() {
  const [period, setPeriod] = useState<Period>("monthly")
  const [selected, setSelected] = useState<ProductId>("foundation")
  const product = PRODUCTS.find((p) => p.id === selected)!

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <PeriodToggle period={period} onChange={setPeriod} saveLabel="Save up to 50%" className="hidden lg:inline-flex" />

      {/* Mobile / tablet: one "screen" — pick billing period, then the product */}
      <Panel className="w-full max-w-[430px] lg:hidden">
        <div className="flex flex-col gap-6 pb-8 pt-5">
          <div className="flex flex-col items-center gap-3 px-6">
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <img src={`${A}/logo.svg`} alt="ClearGuidance Studio" width={127} height={27} className="h-[27px] w-[127px]" />
              <PeriodToggle period={period} onChange={setPeriod} saveLabel={`Save ${product.yearly.discount}`} />
            </div>
            <Headline key={`h-${selected}`} product={product} className={FADE} />
          </div>

          <div role="tablist" aria-label="Choose a package" className="flex gap-2 px-6">
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={selected === p.id}
                onClick={() => setSelected(p.id)}
                className={cn(
                  "min-w-0 flex-1 rounded-full border border-white/10 px-2 py-3 text-[12px] font-bold uppercase leading-3 tracking-[-0.24px] transition-colors duration-200",
                  selected === p.id ? "bg-white text-black" : "bg-black/30 text-white hover:bg-black/50",
                )}
              >
                {p.tab}
              </button>
            ))}
          </div>

          <div key={`${selected}-${period}`} className={cn("flex flex-col gap-6 px-6", FADE)}>
            <ValueStack product={product} period={period} />
            <PriceCard product={product} period={period} />
            <Testimonial product={product} />
          </div>
        </div>
      </Panel>

      {/* Desktop: all three products side by side */}
      <div className="hidden w-full grid-cols-3 gap-6 lg:grid">
        {PRODUCTS.map((p) => (
          <Panel key={p.id} className="flex flex-col">
            <div key={period} className={cn("flex flex-1 flex-col gap-6 px-6 pb-8 pt-7", FADE)}>
              <div className="flex flex-col items-center gap-3">
                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[12px] font-bold uppercase leading-3 tracking-[-0.24px] text-white">
                  {p.tab}
                </span>
                <Headline product={p} className="min-h-[112px] justify-start" />
              </div>
              <div className="flex-1">
                <ValueStack product={p} period={period} />
              </div>
              <PriceCard product={p} period={period} />
              <Testimonial product={p} />
            </div>
          </Panel>
        ))}
      </div>
    </div>
  )
}

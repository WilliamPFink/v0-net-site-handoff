/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next"
import Link from "next/link"
import { Fragment, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { OFFERING_URL, STUDIO_URL } from "@/lib/links"
import { Reveal } from "@/components/landing/reveal"
import { PricingPlans } from "@/components/landing/pricing-plans"

// Landing page implemented from Figma "ClearGuidenceStudio" → "LP ver 04"
// (desktop node 270:9182, mobile node 272:2). Static artwork lives in /public/landing.

export const metadata: Metadata = {
  title: { absolute: "ClearGuidance Studio | Understand The Companies You Invest In" },
  description:
    "Explore company valuations, financial models, and the reasoning behind investment decisions. Go beyond opinions and ratings to understand the assumptions and analysis behind the numbers.",
  alternates: { canonical: "/landing" },
  // Draft route while the new landing page is reviewed — keep it out of search results.
  robots: { index: false, follow: true },
}

const A = "/landing"

// Shared design tokens from the Figma file
const GRADIENT_TEXT =
  "bg-[linear-gradient(to_left,#ffffff_51.738%,#f4f8fe_61.251%,#3880f4)] bg-clip-text text-transparent"
const H2 = cn(
  GRADIENT_TEXT,
  "w-fit text-center font-light text-[32px] leading-[0.98] tracking-[-0.96px] text-balance lg:text-[48px] lg:leading-[1.18] lg:tracking-[-1.44px]",
)
const LEAD = "text-center text-[18px] leading-[1.38] tracking-[-0.36px] text-white/80"
const CARD_SHADOW = "shadow-[0_1px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]"
const GLASS_CARD = cn(
  "relative rounded-[20px] border border-white/[0.08] bg-[rgba(11,16,26,0.8)] backdrop-blur-[6px]",
  CARD_SHADOW,
)
const SOLID_CARD = cn("relative rounded-[20px] border border-white/[0.08] bg-[rgba(14,20,34,0.9)]", CARD_SHADOW)
const CARD_TITLE = "text-[22px] font-semibold leading-[28px] tracking-[-0.44px] text-white"
const SECTION = "w-full max-w-[1280px]"

// Motion: cards lift with a soft cyan glow on hover; the hero staggers in on load.
const CARD_HOVER =
  "group h-full transition-[translate,border-color,box-shadow] duration-300 ease-out motion-safe:hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_18px_40px_-16px_rgba(0,210,255,0.28),inset_0_1px_0_rgba(255,255,255,0.08)]"
const TILE_HOVER = "transition-transform duration-300 ease-out motion-safe:group-hover:scale-110"
const ENTER =
  "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:animation-duration-700 motion-safe:fill-mode-both"
const HERO_ART_ENTER =
  "motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:slide-in-from-right-6 motion-safe:animation-duration-1000 motion-safe:fill-mode-both"
const enterDelay = (ms: number) => ({ animationDelay: `${ms}ms` })

/** RGB triplets for the tinted icon tiles / badges used throughout the design. */
const TINT = {
  cyan: "6,182,212",
  teal: "20,184,166",
  emerald: "16,185,129",
  sky: "14,165,233",
  cyanLight: "34,211,238",
} as const

function tileStyle(rgb: string, borderAlpha = 0.2) {
  return { backgroundColor: `rgba(${rgb},0.1)`, borderColor: `rgba(${rgb},${borderAlpha})` }
}

function Icon({ src, w, h }: { src: string; w: number; h: number }) {
  return <img src={`${A}/${src}`} alt="" aria-hidden width={w} height={h} className="block shrink-0" style={{ width: w, height: h }} />
}

function IconTile({ src, w, h, rgb, size = 48, radius = 16 }: { src: string; w: number; h: number; rgb: string; size?: number; radius?: number }) {
  return (
    <div
      className={cn("flex shrink-0 items-center justify-center border", TILE_HOVER)}
      style={{ ...tileStyle(rgb), width: size, height: size, borderRadius: radius }}
    >
      <Icon src={src} w={w} h={h} />
    </div>
  )
}

function PrimaryCta({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-[linear-gradient(to_right,#00d2ff,#0077ff)] px-7 py-3 font-mono text-[14px] font-bold uppercase leading-[1.18] tracking-[-0.28px] text-black whitespace-nowrap",
        "shadow-[0_2px_8px_rgba(0,119,255,0.35),0_0_20px_rgba(0,210,255,0.2),inset_0_1px_0_rgba(255,255,255,0.35)] transition duration-300 ease-out hover:brightness-110 hover:shadow-[0_8px_22px_rgba(0,119,255,0.45),0_0_32px_rgba(0,210,255,0.35),inset_0_1px_0_rgba(255,255,255,0.35)] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0",
        className,
      )}
    >
      {children}
    </a>
  )
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-white/[0.06] bg-white/[0.04] px-3 py-1 font-mono text-[11px] leading-[16.5px] text-[#e2e8f0] transition-colors duration-200 hover:border-[rgba(0,210,255,0.35)] hover:bg-[rgba(0,210,255,0.08)] hover:text-white">
      {children}
    </span>
  )
}

function SectionHeader({ eyebrow, eyebrowClass, title, children, className }: { eyebrow?: string; eyebrowClass?: string; title: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <Reveal className={cn("flex flex-col items-center gap-4", className)}>
      {eyebrow && (
        <p className={cn("text-center font-mono font-medium uppercase leading-[16.5px] tracking-[1.1px]", eyebrowClass)}>{eyebrow}</p>
      )}
      <h2 className={H2}>{title}</h2>
      {children}
    </Reveal>
  )
}

/** Line break that only applies at desktop widths, where the design sets explicit breaks. */
const Br = () => <br className="hidden lg:block" />

/** Copy set as explicit lines in the desktop design; flows naturally below xl. */
function Lines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && !lines[i - 1].endsWith("-") && " "}
          {i > 0 && <br className="hidden xl:block" />}
          {line}
        </Fragment>
      ))}
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*                                   Content                                  */
/* -------------------------------------------------------------------------- */

const NAV = [
  { label: "Product Tiers", href: "/product-tiers" },
  { label: "Academy", href: "/academy" },
  { label: "Encyclopedia", href: "/encyclopedia" },
  { label: "Insights", href: "/blog" },
  { label: "Corporate", href: "/corporate" },
  { label: "Contact", href: "#contact" },
]

const PROBLEMS = [
  { n: "1", rgb: TINT.cyan, color: "#00e5ff", title: ["How a company is actually", "valued"], body: ["Deconstruct the structural", "mechanisms and revenue drivers", "behind top-line valuation headlines."] },
  { n: "2", rgb: TINT.teal, color: "#22d3ee", title: ["Which assumptions", "influence the numbers"], body: ["Trace terminal growth rates,", "margins, and cost of capital", "sensitivities that dramatically shift", "outputs."] },
  { n: "3", rgb: TINT.emerald, color: "#34d399", title: ["Why different analyses", "reach different conclusions"], body: ["Understand how divergent base-", "rate priors and discount structures", "generate conflicting price targets."] },
  { n: "4", rgb: TINT.sky, color: "#38bdf8", title: ["What the information that", "you have means."], body: ["Transform passive feeds and raw", "metrics into active, rational", "strategic understanding."] },
]

const PILLARS = [
  { icon: "icon-calculator.svg", w: 19.5, h: 19.5, rgb: TINT.cyan, title: ["Understand The Valuation"], body: ["See how company value is calculated and what factors influence the outcome."] },
  { icon: "icon-sliders.svg", w: 19.5, h: 19.5, rgb: TINT.emerald, title: ["Explore The Assumptions"], body: ["Adjust key inputs and understand how different scenarios impact the analysis."] },
  { icon: "icon-workflow.svg", w: 21.667, h: 19.5, rgb: TINT.cyanLight, title: ["Build Your Own Investment", "Process"], body: ["Use professional frameworks to research", "companies with more structure and confidence."] },
]

const STEPS = [
  { n: "01", ring: "rgba(6,182,212,0.3)", color: "#00e5ff", title: "1. Explore A Company", body: ["Research companies and understand the", "business behind the ticker."], icon: "icon-search.svg", iw: 12, ih: 12, meta: "SEC Edgar ingestion • KPI decomposition" },
  { n: "02", ring: "rgba(34,211,238,0.3)", color: "#22d3ee", title: "2. Analyze The Valuation", body: ["Review financial models, assumptions, and", "scenarios that influence company value."], icon: "icon-chart.svg", iw: 12, ih: 12, meta: "Scenario engines • Sensitivity matrices" },
  { n: "03", ring: "rgba(52,211,153,0.3)", color: "#34d399", title: "3. Build Your Perspective", body: ["Use analysis and education to create a stronger", "investment process."], icon: "icon-check-circle.svg", iw: 14.667, ih: 14, meta: "Thesis logs • Allocation sanity checks" },
]

const FRAMEWORKS = [
  { icon: "icon-dollar.svg", w: 21.667, h: 21.667, title: "Understand Company Value", tag: "[01 / VALUATION]", body: ["See how businesses are evaluated. Explore valuation models and", "understand the assumptions that influence a company's estimated value."], chips: ["Fair value analysis", "Valuation assumptions", "Growth and risk inputs", "Scenario comparisons"] },
  { icon: "icon-branch.svg", w: 19.5, h: 21.667, title: "Test Different Scenarios", tag: "[02 / SCENARIOS]", body: ["Understand how assumptions shape outcomes. Investing involves", "uncertainty. Explore how different variables can impact an analysis."], chips: ["Scenario modeling", "Sensitivity analysis", "Probability-based outcomes", "Long-term projections"] },
  { icon: "icon-pie.svg", w: 21.667, h: 21.667, title: "Analyze Portfolio Decisions", tag: "[03 / PORTFOLIO]", body: ["Understand how investments work together. Build a clearer picture of", "portfolio construction using professional frameworks designed to help", "analyze risk, return, and allocation decisions."], chips: ["Portfolio construction", "Asset allocation", "Risk and return analysis", "Efficient Frontier modeling"] },
  { icon: "icon-folder.svg", w: 21.667, h: 17.333, title: "Create A Structured Research Process", tag: "[04 / PROCESS]", body: ["Keep your investment analysis organized. Bring company research,", "valuation models, and educational resources together in one place."], chips: ["Company research workflows", "Watchlists", "Analysis history", "Investment concepts"] },
]

const PERSONAS = [
  {
    tag: "Self-Led Operator", color: "#38bdf8", accent: "#00e5ff", Art: PersonaOneArt,
    title: "Growing DIY Investor", tagline: "Learn what makes a company valuable.",
    body: ["Build your investing knowledge by understanding how companies are analyzed and how valuation concepts work.", "Move beyond headlines and opinions toward a more structured way of researching investments."],
  },
  {
    tag: "Analytical Allocator", color: "#22d3ee", accent: "#22d3ee", Art: PersonaTwoArt,
    title: "Serious Self-Directed Investor", tagline: "Go beyond ratings and summaries.",
    body: ["Explore valuation models, test assumptions, and develop a deeper understanding of the companies you research.", "See the analysis behind the numbers and build a stronger investment process."],
  },
  {
    tag: "Institutional Practice", color: "#34d399", accent: "#34d399", Art: PersonaThreeArt,
    title: "Independent Financial Advisor", tagline: "Bring clearer analysis into client conversations.",
    body: ["Explore valuation models, test assumptions, and develop a deeper understanding of the companies you research.", "See the analysis behind the numbers and build a stronger investment process."],
  },
]

const RESOURCES = [
  { href: "/academy", icon: "icon-graduation.svg", w: 20.167, h: 16.5, rgb: TINT.cyan, color: "#38bdf8", title: "ClearGuidance Academy", tagline: ["Build your investment knowledge step", "by step."], body: ["Learn the concepts behind investing, valuation,", "and portfolio construction through structured", "educational content."] },
  { href: "/encyclopedia", icon: "icon-book.svg", w: 20.167, h: 14.667, rgb: TINT.teal, color: "#22d3ee", title: "The Encyclopedia", tagline: ["Keep financial concepts within reach."], body: ["Quickly revisit important definitions, formulas, and", "frameworks whenever you need to refresh your", "understanding."] },
  { href: "/blog", icon: "icon-bulb.svg", w: 13.75, h: 18.333, rgb: TINT.emerald, color: "#34d399", title: "Insights", tagline: ["Explore practical perspectives on", "investing."], body: ["Read deeper explanations of valuation, portfolio", "strategy, and advanced financial concepts. Learn", "how experienced investors approach complex", "ideas."] },
]

const TRANSPARENCY = [
  { icon: "icon-eye.svg", w: 22, h: 15, rgb: TINT.cyan, color: "#38bdf8", bullet: "#00d2ff", title: "See The Reasoning", intro: "Most platforms provide conclusions.", listTitle: "ClearGuidance helps you explore:", items: ["The assumptions behind valuations", "The inputs behind calculations", "The frameworks used to analyze companies"] },
  { icon: "icon-learn.svg", w: 19.012, h: 20, rgb: TINT.emerald, color: "#34d399", bullet: "#34d399", title: "Learn, Don’t Follow", intro: "ClearGuidance Studio is built for understanding, not predictions.", listTitle: "The platform helps you:", items: ["Analyze companies", "Explore investment concepts", "Build your own research process"] },
  { icon: "icon-bolt.svg", w: 11, h: 18, rgb: TINT.cyanLight, title: "Professional Frameworks, Made Accessible", paragraphs: ["Access deeper investment analysis without needing to become a financial analyst.", "Understand how professional approaches work and apply them to your own investment research."] },
]

/* -------------------------------------------------------------------------- */
/*                                Persona art                                 */
/* -------------------------------------------------------------------------- */
// Compositions are positioned in percentages of the 392.66 × 224 Figma image box,
// so they scale with the card width.

function PersonaOneArt() {
  return (
    <>
      <div className="absolute left-0 top-[-60.49%] h-[221.88%] w-[101.36%] overflow-hidden">
        <img src={`${A}/persona1-person.webp`} alt="" className="absolute left-0 top-[5.94%] h-[107.19%] w-full max-w-none" />
      </div>
      <div className="absolute left-[28.01%] top-[30.18%] flex h-[25.59%] w-[14.73%] items-center justify-center mix-blend-plus-lighter">
        <img src={`${A}/persona1-orb.webp`} alt="" className="h-[78.06%] w-[78.83%] max-w-none rotate-[-19.35deg] object-cover object-bottom" />
      </div>
      <img src={`${A}/persona1-sphere.webp`} alt="" className="absolute left-[43.61%] top-[47.1%] h-[10.71%] w-[6.37%] max-w-none object-cover object-bottom mix-blend-hard-light" />
    </>
  )
}

function PersonaTwoArt() {
  return (
    <>
      <img src={`${A}/hero-bg.webp`} alt="" className="absolute left-[0.09%] top-[-27.63%] h-[602.68%] w-[275.05%] max-w-none object-cover opacity-50" />
      <img src={`${A}/persona2-person.webp`} alt="" className="absolute left-[14.6%] top-[-27.63%] h-[177.9%] w-[81.22%] max-w-none object-cover" />
      <div className="absolute left-[4.5%] top-[67.27%] h-[25.73%] w-[57.92%]">
        <img src={`${A}/persona2-wave.svg`} alt="" className="absolute block max-w-none" style={{ top: "-44.25%", left: "-11.21%", width: "122.42%", height: "188.5%" }} />
      </div>
      <div
        className="absolute left-[25.88%] top-[62.86%] h-[18.13%] w-[15.54%] mix-blend-overlay"
        style={{
          maskImage: `url(${A}/persona2-glow-mask.svg)`,
          WebkitMaskImage: `url(${A}/persona2-glow-mask.svg)`,
          maskSize: "474.27% 294.57%",
          WebkitMaskSize: "474.27% 294.57%",
          maskPosition: "50.32% 26.74%",
          WebkitMaskPosition: "50.32% 26.74%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <img src={`${A}/persona2-glow.svg`} alt="" className="absolute block max-w-none" style={{ top: "-182.21%", left: "-121.25%", width: "342.5%", height: "464.42%" }} />
      </div>
      <div className="absolute left-[32.74%] top-[66.2%] h-[2.07%] w-[1.82%]">
        <img src={`${A}/persona2-dot-glow.svg`} alt="" className="absolute block max-w-none" style={{ top: "-215.92%", left: "-139.91%", width: "379.82%", height: "531.84%" }} />
      </div>
      <img src={`${A}/persona2-dot.svg`} alt="" className="absolute left-[32.74%] top-[65.71%] h-[3.12%] w-[1.78%] max-w-none" />
    </>
  )
}

function PersonaThreeArt() {
  return (
    <div className="absolute left-[-2.38%] top-[-33.44%] h-[228.13%] w-[104.16%]">
      <img src={`${A}/persona3-person.webp`} alt="" className="absolute inset-0 size-full max-w-none object-cover" />
      <img src={`${A}/persona3-overlay.webp`} alt="" className="absolute inset-0 size-full max-w-none object-cover" />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

export default function LandingPage() {
  return (
    <div id="top" className="relative isolate overflow-x-clip bg-[#080b12] font-sans text-white antialiased">
      {/* Indigo ambient glow behind the frameworks section */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 left-[-458px] top-[3187px] h-[798px] w-[1967px] opacity-50 blur-[130px] xl:left-[calc(50%-1077px)]"
      >
        <img src={`${A}/glow-indigo.webp`} alt="" className="size-full max-w-none object-cover" />
      </div>

      {/* Header */}
      <header className="relative z-10 py-4">
        <div className="mx-auto flex w-full max-w-[1328px] items-center gap-3 px-4 min-[430px]:gap-5 min-[430px]:px-6 lg:justify-between">
          <Link href="#top" aria-label="ClearGuidance Studio home" className="shrink-0">
            <img src={`${A}/logo.svg`} alt="ClearGuidance Studio, Inc." width={188} height={40} className="h-7 w-[132px] min-[430px]:h-10 min-[430px]:w-[188px]" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
            <Link href="#top" aria-current="page" className="text-[14px] font-medium leading-[21px] text-[#38bdf8]">
              Home
            </Link>
            {NAV.map((item) => (
              <Link key={item.label} href={item.href} className="text-[13px] font-medium leading-4 text-[#94a3b8] transition-colors hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3 min-[430px]:gap-4">
            <a href={STUDIO_URL} className="text-[13px] font-medium leading-4 text-[#94a3b8] transition-colors hover:text-white">
              Sign In
            </a>
            <a
              href={OFFERING_URL}
              className="rounded-full bg-[linear-gradient(to_right,#00d2ff,#0088ff)] px-4 py-1.5 font-mono text-[10px] font-bold uppercase leading-4 text-[#031422] shadow-[0_2px_8px_rgba(0,119,255,0.35),0_0_20px_rgba(0,210,255,0.2),inset_0_1px_0_rgba(255,255,255,0.35)] transition duration-300 hover:brightness-110 hover:shadow-[0_6px_16px_rgba(0,119,255,0.45),0_0_28px_rgba(0,210,255,0.35),inset_0_1px_0_rgba(255,255,255,0.35)] motion-safe:hover:-translate-y-0.5"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-[1] flex flex-col items-center gap-[50px] px-6 pb-[50px] lg:gap-[100px] lg:pb-[72px]">
        {/* Teal ambient glow behind the upper sections */}
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 left-[-349px] top-[722px] h-[1106px] w-[2232px] -scale-x-100 opacity-90 blur-[75px] xl:left-[calc(50%-1149px)]"
        >
          <img src={`${A}/glow-teal.webp`} alt="" className="size-full max-w-none object-cover" />
        </div>

        {/* Hero */}
        <section className={cn(SECTION, "relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-black shadow-[0_1px_3px_rgba(0,0,0,0.4)] xl:flex xl:h-[593px] xl:items-center")}>
          <img src={`${A}/hero-bg.webp`} alt="" aria-hidden className="pointer-events-none absolute inset-0 size-full max-w-none object-cover opacity-30" />

          <div className="relative flex flex-col items-start gap-4 p-[30px] xl:w-[590px] xl:shrink-0 xl:px-[50px] xl:py-0">
            <p
              className={cn("flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 shadow-[0_1px_2px_rgba(0,0,0,0.05)] xl:w-auto", ENTER)}
              style={enterDelay(0)}
            >
              <span aria-hidden className="relative flex size-1.5 shrink-0">
                <span className="absolute inset-0 rounded-full bg-[#00e89b] motion-safe:animate-ping motion-safe:opacity-60" />
                <span className="relative size-1.5 rounded-full bg-[#00e89b] shadow-[0_0_8px_#00d2ff]" />
              </span>
              <span className="font-mono text-[11px] uppercase leading-[16.5px] tracking-[1.1px] text-[#00e89b]">
                Professional investment analysis, made accessible
              </span>
            </p>
            <div className="flex w-full flex-col items-start gap-3">
              <h1
                className={cn(GRADIENT_TEXT, "text-[48px] font-light leading-[0.98] tracking-[-1.44px] xl:text-[72px] xl:tracking-[-2.16px]", ENTER)}
                style={enterDelay(120)}
              >
                Understand The Companies You Invest In
              </h1>
              <div className={cn("text-[18px] leading-[1.38] tracking-[-0.36px] text-white/80", ENTER)} style={enterDelay(240)}>
                <p>Explore company valuations, financial models, and the reasoning behind investment decisions.</p>
                <p className="mt-[1.38em]">Go beyond opinions and ratings. Understand the assumptions, frameworks, and analysis behind the numbers.</p>
              </div>
              <div className={ENTER} style={enterDelay(360)}>
                <PrimaryCta href={OFFERING_URL}>Start Your Free Trial</PrimaryCta>
              </div>
            </div>
            <p className={cn("text-[14px] font-medium leading-[1.18] tracking-[-0.28px] text-white/70", ENTER)} style={enterDelay(460)}>
              Build a stronger investment process through understanding.
            </p>
          </div>

          {/* Product shot: stacked below the copy on small screens, beside it on desktop */}
          <div className={cn("relative mx-auto aspect-[432/383] w-full max-w-[560px] xl:hidden", HERO_ART_ENTER)} style={enterDelay(300)}>
            <img
              src={`${A}/hero-ipad.webp`}
              alt="ClearGuidance Studio portfolio workspace on a tablet"
              className="absolute left-[-6.48%] top-0 h-auto w-[112.27%] max-w-none motion-safe:animate-float"
            />
          </div>
          <div aria-hidden className={cn("absolute left-[583px] top-[47px] hidden h-[569px] w-[702px] xl:block", HERO_ART_ENTER)} style={enterDelay(300)}>
            <img src={`${A}/hero-ipad.webp`} alt="" className="size-full max-w-none object-cover motion-safe:animate-float" />
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />
        </section>

        {/* The information paradox */}
        <section className={cn(SECTION, "relative flex flex-col gap-10 overflow-hidden rounded-[28px] border border-white/[0.08] px-3 py-6 shadow-[0_1px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] lg:p-[50px]")}>
          <img src={`${A}/paradox-bg.webp`} alt="" aria-hidden className="pointer-events-none absolute inset-0 size-full max-w-none object-cover opacity-20" />

          <Reveal className="relative flex flex-col items-center gap-4">
            <p className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1">
              <Icon src="icon-warning.svg" w={12.833} h={11.083} />
              <span className="font-mono text-[12px] leading-[16.5px] tracking-[0.55px] text-white">THE INFORMATION PARADOX</span>
            </p>
            <h2 className={cn(GRADIENT_TEXT, "w-fit text-center text-[32px] font-light leading-[0.98] tracking-[-0.96px] lg:text-[54px] lg:tracking-[-1.62px]")}>
              Everyone Has Investment Data. <Br />
              Few Understand What It Means.
            </h2>
            <p className="text-center text-[16px] leading-[1.38] tracking-[-0.32px] text-white/80 lg:text-[18px] lg:tracking-[-0.36px]">
              Investors today have access to more information than ever. Stock ratings. Analyst opinions. Market updates.
              Financial reports. But more information doesn’t always create more clarity.
            </p>
          </Reveal>

          <div className="relative flex flex-col items-center gap-3 lg:gap-4">
            <h3 className="text-[18px] font-semibold leading-6 tracking-[-0.27px]">You should understand:</h3>
            <div className="grid w-full gap-3 md:grid-cols-2 xl:grid-cols-4 xl:gap-4">
              {PROBLEMS.map((p, i) => (
                <Reveal key={p.n} delay={i * 90} className="h-full">
                <article className={cn(SOLID_CARD, CARD_HOVER, "p-6")}>
                  <div>
                    <span className={cn("flex size-8 items-center justify-center rounded-[12px] border pb-[2.5px] pt-[1.5px]", TILE_HOVER)} style={tileStyle(p.rgb)}>
                      <span className="font-mono text-[24px] font-semibold leading-7 tracking-[-0.72px]" style={{ color: p.color }}>
                        {p.n}
                      </span>
                    </span>
                    <h4 className="mt-[14.875px] text-[18px] font-medium leading-[24.75px] tracking-[-0.27px]">
                      <Lines lines={p.title} />
                    </h4>
                  </div>
                  <p className="mt-[15.25px] text-[14px] leading-[1.3] tracking-[-0.14px] text-white/70">
                    <Lines lines={p.body} />
                  </p>
                </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Most platforms show the answer */}
        <section className={cn(SECTION, "flex flex-col gap-6 border-t border-white/[0.07]")}>
          <SectionHeader
            title={
              <>
                Most Platforms Show The Answer. <Br />
                We Show The Work Behind It.
              </>
            }
          >
            <p className={LEAD}>Explore the assumptions, models, and frameworks behind investment analysis.</p>
          </SectionHeader>

          <div className="grid gap-6 lg:grid-cols-3">
            {PILLARS.map((c, i) => (
              <Reveal key={c.icon} delay={i * 100} className="h-full">
              <article className={cn(GLASS_CARD, CARD_HOVER, "p-10")}>
                <IconTile src={c.icon} w={c.w} h={c.h} rgb={c.rgb} />
                <h3 className={cn(CARD_TITLE, "mt-6")}>
                  <Lines lines={c.title} />
                </h3>
                <p className="mt-[7.4px] text-[16px] leading-[1.4] tracking-[-0.14px] text-white/70">
                  <Lines lines={c.body} />
                </p>
              </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
          <div className="relative flex flex-col items-center gap-3 overflow-hidden rounded-[20px] border border-white/[0.08] bg-[linear-gradient(to_right,#0c1220,#10182c,#0c1220)] p-8 text-center shadow-[0_1px_3px_rgba(0,0,0,0.4),inset_0_1px_0_1px_rgba(255,255,255,0.06)]">
            <div aria-hidden className="absolute -bottom-10 -right-10 size-60 rounded-full bg-[rgba(6,182,212,0.1)] blur-[32px]" />
            <p className="relative text-[22px] font-bold leading-7 tracking-[-0.55px]">Conclusion:</p>
            <p className="relative text-[22px] leading-7 tracking-[-0.55px]">
              “ClearGuidance doesn’t tell you what to buy. It helps you understand the decisions behind your investments.”
            </p>
          </div>
          </Reveal>
        </section>

        {/* How it works */}
        <section className={cn(SECTION, "flex flex-col gap-10")}>
          <SectionHeader eyebrow="How It Works" eyebrowClass="text-[14px] text-[#00e89b]" title="From Company Research To Investment Understanding">
            <p className={LEAD}>Bring investment analysis into one clear workflow.</p>
          </SectionHeader>

          <ol className="relative grid gap-3 lg:grid-cols-3 lg:gap-6 lg:px-6">
            <li aria-hidden className="absolute left-[15%] right-[15%] top-10 hidden h-px bg-[linear-gradient(to_right,rgba(0,210,255,0.4),rgba(34,211,238,0.3),rgba(52,211,153,0.4))] lg:block" />
            {STEPS.map((s, i) => (
              <li key={s.n}>
              <Reveal delay={i * 120} className="h-full">
              <div className={cn(GLASS_CARD, CARD_HOVER, "p-10")}>
                <span
                  className={cn("flex size-12 items-center justify-center rounded-full border bg-[#101828] shadow-[0_0_0_4px_#080b12,0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]", TILE_HOVER)}
                  style={{ borderColor: s.ring }}
                >
                  <span className="font-mono text-[24px] font-semibold leading-7 tracking-[-0.72px]" style={{ color: s.color }}>
                    {s.n}
                  </span>
                </span>
                <h3 className={cn(CARD_TITLE, "mt-4")}>{s.title}</h3>
                <p className="mt-2 text-[14px] leading-[22.75px] tracking-[-0.14px] text-[#94a3b8]">
                  <Lines lines={s.body} />
                </p>
                <p className="mt-6 flex items-center gap-2">
                  <Icon src={s.icon} w={s.iw} h={s.ih} />
                  <span className="font-mono text-[11px] leading-[16.5px] text-[#94a3b8]">{s.meta}</span>
                </p>
              </div>
              </Reveal>
              </li>
            ))}
          </ol>
        </section>

        {/* Frameworks */}
        <section className={cn(SECTION, "flex flex-col gap-10 border-t border-white/[0.07]")}>
          <SectionHeader
            title={
              <>
                Explore The Frameworks Behind <br />
                Better Investment Decisions
              </>
            }
          >
            <p className={LEAD}>
              ClearGuidance Studio combines professional investment frameworks with an intuitive workspace designed <Br />
              to help investors analyze companies, understand valuations, and explore different scenarios.
            </p>
          </SectionHeader>

          <div className="grid gap-3 rounded-[20px] drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.4)] lg:grid-cols-2">
            {FRAMEWORKS.map((f, i) => (
              <Reveal key={f.title} delay={(i % 2) * 100} className="h-full">
              <article
                className={cn(
                  "relative flex flex-col justify-between rounded-[20px] border border-transparent bg-[#0a0f1a] p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
                  CARD_HOVER,
                  i < 2 ? "xl:min-h-[304.5px]" : "xl:min-h-[330.5px]",
                )}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-3">
                      <Icon src={f.icon} w={f.w} h={f.h} />
                      <h3 className={CARD_TITLE}>{f.title}</h3>
                    </div>
                    <span className="order-first font-mono text-[10px] leading-[15px] tracking-[1px] text-[#00e89b] lg:order-none lg:shrink-0">{f.tag}</span>
                  </div>
                  <p className="text-[16px] leading-[1.38] tracking-[-0.32px] text-white/80">
                    <Lines lines={f.body} />
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-2.5 border-t border-white/[0.06] pt-4">
                  <p className="font-mono text-[11px] font-medium uppercase leading-[16.5px] tracking-[0.55px] text-[#94a3b8]">Explore frameworks:</p>
                  <div className="flex flex-wrap gap-2">
                    {f.chips.map((c) => (
                      <Chip key={c}>{c}</Chip>
                    ))}
                  </div>
                </div>
              </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Personas */}
        <section className={cn(SECTION, "flex flex-col items-center gap-10")}>
          <SectionHeader title="Built For Investors Who Want More Clarity">
            <p className={LEAD}>Understand companies, valuations, and the reasoning behind investment decisions.</p>
          </SectionHeader>

          <div className="mx-auto grid w-full max-w-[440px] gap-6 lg:max-w-none lg:grid-cols-3 lg:px-6">
            {PERSONAS.map(({ Art, ...p }, i) => (
              <Reveal key={p.title} delay={i * 120} className="h-full">
              <article className={cn(GLASS_CARD, "flex flex-col overflow-hidden p-px lg:min-h-[513px] shadow-[0_1px_3px_rgba(0,0,0,0.4),inset_0_1px_0_1px_rgba(255,255,255,0.06)]", CARD_HOVER)}>
                <div className="relative aspect-[392.66/224] w-full overflow-hidden">
                  <div className="absolute inset-0 transition-transform duration-700 ease-out motion-safe:group-hover:scale-105">
                    <Art />
                  </div>
                  <span
                    className="absolute left-4 top-[17px] rounded-full border border-white/10 bg-[rgba(6,9,15,0.8)] px-3 py-[2.5px] font-mono text-[11px] font-medium leading-[16.5px] backdrop-blur-[6px]"
                    style={{ color: p.color }}
                  >
                    {p.tag}
                  </span>
                </div>
                <div className="flex flex-col gap-1 p-6">
                  <h3 className={CARD_TITLE}>{p.title}</h3>
                  <p className="text-[18px] font-medium leading-6 tracking-[-0.27px]" style={{ color: p.accent }}>
                    {p.tagline}
                  </p>
                  <div className="pt-2 text-[14px] leading-[1.38] tracking-[-0.28px] text-white/80">
                    <p>{p.body[0]}</p>
                    <p className="mt-[1.38em]">{p.body[1]}</p>
                  </div>
                </div>
              </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Learning resources */}
        <section className={cn(SECTION, "flex flex-col gap-10")}>
          <SectionHeader title="See The Reasoning Behind The Numbers">
            <p className="text-center text-[16px] leading-[1.38] tracking-[-0.32px] text-white/80 lg:text-[18px] lg:tracking-[-0.36px]">
              Investment analysis becomes more powerful when you understand the ideas behind it. ClearGuidance <Br />
              Studio combines research tools with educational resources that help you learn valuation, portfolio concepts, <Br />
              and financial analysis while exploring real companies.
            </p>
          </SectionHeader>

          <div className="grid gap-6 lg:grid-cols-3">
            {RESOURCES.map((r, i) => (
              <Reveal key={r.title} delay={i * 100} className="h-full">
              <Link href={r.href} className={cn(SOLID_CARD, CARD_HOVER, "block p-6")}>
                <IconTile src={r.icon} w={r.w} h={r.h} rgb={r.rgb} size={40} radius={12} />
                <h3 className={cn(CARD_TITLE, "mt-4")}>{r.title}</h3>
                <p className="mt-1 text-[18px] font-medium leading-6 tracking-[-0.27px]" style={{ color: r.color }}>
                  <Lines lines={r.tagline} />
                </p>
                <p className="mt-[7px] text-[14px] leading-[1.3] tracking-[-0.14px] text-[#94a3b8] lg:leading-[22.75px]">
                  <Lines lines={r.body} />
                </p>
              </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Transparency — this section only exists in the mobile design */}
        <section className={cn(SECTION, "flex flex-col items-center gap-10 px-6 lg:hidden")}>
          <SectionHeader eyebrow="Built Around Transparency" eyebrowClass="text-[11px] text-[#00d2ff]" title="Understand The Process Behind The Analysis">
            <p className={cn(LEAD, "pt-1")}>
              Investing involves uncertainty. ClearGuidance Studio is designed to help you understand the information,
              assumptions, and frameworks behind investment analysis.
            </p>
          </SectionHeader>

          <div className="flex w-full max-w-[440px] flex-col gap-6">
            {TRANSPARENCY.map((t) => (
              <Reveal key={t.title}>
              <article className={cn(GLASS_CARD, CARD_HOVER, "flex flex-col gap-2 p-6")}>
                <IconTile src={t.icon} w={t.w} h={t.h} rgb={t.rgb} />
                <h3 className={cn(CARD_TITLE, "pt-2")}>{t.title}</h3>
                {"items" in t && t.items ? (
                  <>
                    <p className="text-[14px] leading-[1.38] tracking-[-0.28px] text-white/80">{t.intro}</p>
                    <div className="flex flex-col gap-3 pt-1">
                      <p className="text-[13px] font-bold leading-4" style={{ color: t.color }}>
                        {t.listTitle}
                      </p>
                      <ul className="flex flex-col gap-1 text-[14px]">
                        {t.items.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span aria-hidden className="font-mono leading-[22px] tracking-[-0.14px]" style={{ color: t.bullet }}>
                              •
                            </span>
                            <span className="leading-[22px] tracking-[-0.28px] text-white/80">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <div className="text-[14px] leading-[1.38] tracking-[-0.28px] text-white/80">
                    <p>{t.paragraphs?.[0]}</p>
                    <p className="mt-[1.38em]">{t.paragraphs?.[1]}</p>
                  </div>
                )}
              </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Plans — monthly / yearly paywall */}
        <section id="plans" className={cn(SECTION, "flex flex-col items-center gap-10")}>
          <SectionHeader eyebrow="Plans & Workspaces" eyebrowClass="text-[15px] text-[#00d2ff]" title="Choose The Workspace That Fits Your Needs" className="gap-2">
            <p className="max-w-[768px] text-center text-[16px] leading-[1.38] tracking-[-0.32px] text-white/80 lg:text-[18px] lg:tracking-[-0.36px]">
              We have different levels of analysis depending on how you research investments, manage portfolios, or support clients.
            </p>
          </SectionHeader>
          <Reveal className="w-full">
            <PricingPlans />
          </Reveal>
        </section>

        {/* Closing CTA */}
        <Reveal className={cn(SECTION, "border-t border-white/[0.07]")}>
          <section className="relative flex flex-col items-center overflow-hidden rounded-[28px] border border-white/[0.08] bg-[linear-gradient(to_bottom,#0f1626,#0a0e1a)] p-5 text-center shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-[20px] lg:px-20 lg:pb-20 lg:pt-[79px]">
            <div aria-hidden className="absolute -top-32 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[rgba(6,182,212,0.15)] blur-[50px]" />
            <div aria-hidden className="absolute -bottom-32 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-[rgba(16,185,129,0.1)] blur-[50px]" />
            <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,rgba(0,210,255,0),rgba(0,210,255,0.4),rgba(0,210,255,0))]" />

            <div className="relative flex max-w-[896px] flex-col items-center gap-3">
              <h2 className={H2}>
                Understand Your Investments <br />
                With More Clarity
              </h2>
              <p className="text-[16px] leading-[26px] tracking-[-0.16px] text-[#cbd5e1] lg:text-[18px]">
                Investing isn’t just about having more information. It is about understanding the companies, assumptions, and
                analysis behind the decisions you make. ClearGuidance Studio helps you explore investment concepts and research
                companies with a clearer process.
              </p>
            </div>
            <p className="relative mt-4 text-[18px] font-medium leading-6 tracking-[-0.27px] text-[#00e5ff]">
              Begin exploring professional investment analysis with the reasoning behind the numbers.
            </p>
            <div className="relative mt-6 flex flex-col items-center gap-1">
              <PrimaryCta href={OFFERING_URL}>Start Your Free Trial</PrimaryCta>
              <p className="pt-2 font-mono text-[11px] leading-[16.5px] text-white/70">Cancel anytime</p>
            </div>
          </section>
        </Reveal>
      </main>
    </div>
  )
}

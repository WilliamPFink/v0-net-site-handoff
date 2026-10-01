import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { TierMatrix } from "@/components/tier-matrix"
import { OfferingCta } from "@/components/offering-cta"

export const metadata: Metadata = {
  title: "Platform Capabilities & Feature Scaling",
  description:
    "Explore the explicit feature layers powering ClearGuidance Studio — Essential, Advisor, and Advisor Pro tiers engineered for every analytical scale and compliance requirement.",
  alternates: {
    canonical: "/product-tiers",
  },
  openGraph: {
    title: "Platform Capabilities & Feature Scaling | ClearGuidance Studio",
    description: "Explore the explicit feature layers powering ClearGuidance Studio.",
    type: "website",
    url: "https://clearguidancestudio.net/product-tiers",
  },
  twitter: {
    card: "summary_large_image",
    title: "Platform Capabilities & Feature Scaling | ClearGuidance Studio",
    description: "Explore the explicit feature layers powering ClearGuidance Studio.",
  },
}

export default async function ProductTiersDeepDive({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string; from?: string }>
}) {
  const { tier, from } = await searchParams
  const initialTier =
    tier === "essential" || tier === "advisor" || tier === "pro" ? tier : undefined
  // When the visitor deep-linked from the home page, send them back to the
  // tier section they came from instead of just collapsing the grid in place.
  const returnHref = initialTier && from === "home" ? "/#product-tiers" : undefined
  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#E4E4E7] font-sans antialiased relative selection:bg-zinc-800 selection:text-white">
      {/* Structural Terminal Background Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
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
          {/* Company Branding */}
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

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wide uppercase text-[#A1A1AA] font-mono">
            <Link href="/#top" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/product-tiers" className="text-white border-b border-white pb-1 transition-colors">
              Product Tiers
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
            <Link href="/#contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          {/* Sales Portal Loop CTA */}
          <OfferingCta />
        </div>
      </header>

      {/* Page Header */}
      <div className="border-b border-[#1F1F23] bg-[#0E0E11]/60 backdrop-blur-md py-16 px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="text-center space-y-4">
            <span className="text-xs font-mono tracking-widest text-blue-400 uppercase bg-[#141B2B] px-3 py-1 rounded border border-[#1E293B] inline-block">
              {"SYSTEM ARCHITECTURE CAPABILITIES // MATRIX"}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight text-balance">
              Platform Capabilities & Feature Scaling
            </h1>
            <p className="text-sm text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed text-pretty">
              Explore the explicit feature layers powering ClearGuidance Studio, Inc. Choose the precise tier engineered
              to match your analytical scale and compliance requirements.
            </p>
          </div>
        </div>
      </div>

      {/* Main Feature Exploration Section */}
      <main className="max-w-7xl mx-auto px-6 py-16 relative z-10 space-y-20">
        {/* Tier Matrix Grid Layout — interactive split-view */}
        <TierMatrix initialTier={initialTier} returnHref={returnHref} />

        {/* Deep-Dive Architectural Contrast Checklist */}
        <section className="bg-[#121214] border border-[#27272A] rounded-xl overflow-hidden hidden md:block">
          <div className="bg-[#141416] p-4 border-b border-[#1F1F23] text-xs font-mono tracking-wider font-bold text-white uppercase">
            Cross-Tier Technical Specification Matrix
          </div>
          <table className="w-full text-left font-mono text-xs text-zinc-400">
            <thead>
              <tr className="border-b border-[#1F1F23] bg-[#0E0E11]">
                <th className="p-4 text-white">Analytical Engine</th>
                <th className="p-4 text-blue-400">Essential</th>
                <th className="p-4 text-emerald-400">Advisor</th>
                <th className="p-4 text-purple-400">Advisor Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F1F23]">
              <tr>
                <td className="p-4 text-white font-sans">Valuation Modeling Architecture</td>
                <td className="p-4">Manual Sliders</td>
                <td className="p-4">Manual Sliders</td>
                <td className="p-4 font-bold text-white">Full Custom WACC Overrides</td>
              </tr>
              <tr>
                <td className="p-4 text-white font-sans">Multi-Asset Tracking Canvas</td>
                <td className="p-4 text-zinc-600">Excluded</td>
                <td className="p-4">Integrated Builder</td>
                <td className="p-4 font-bold text-white">Unlimited Model Saves</td>
              </tr>
              <tr>
                <td className="p-4 text-white font-sans">1,000-Trial Simulation Models</td>
                <td className="p-4 text-zinc-600">Excluded</td>
                <td className="p-4 text-zinc-600">Excluded</td>
                <td className="p-4 font-bold text-emerald-400">Monte Carlo Enabled</td>
              </tr>
              <tr>
                <td className="p-4 text-white font-sans">Firm Licensing Seats Capacity</td>
                <td className="p-4">1 User Access</td>
                <td className="p-4">1 User Access</td>
                <td className="p-4 font-bold text-purple-400">Multi-User Pool Matrix</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  )
}

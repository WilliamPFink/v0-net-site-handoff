import type { Metadata } from "next"
import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { BlogDirectory } from "@/components/blog-directory"
import { OfferingCta } from "@/components/offering-cta"

export const metadata: Metadata = {
  title: "Insights & Education | ClearGuidance Studio",
  description:
    "Institutional-grade perspectives on valuation, corporate finance, and advanced portfolio strategy — built to sharpen your conviction and bring clients along with clarity.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Insights & Education | ClearGuidance Studio",
    description: "Perspectives on valuation, corporate finance, and advanced portfolio strategy.",
    type: "website",
    url: "https://clearguidancestudio.net/blog",
  },
}

export default function BlogDirectoryPage() {
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
            <Link href="/encyclopedia" className="hover:text-white transition-colors">
              Encyclopedia
            </Link>
            <Link href="/blog" className="text-white border-b border-white pb-1 transition-colors">
              Insights
            </Link>
            <Link href="/corporate" className="hover:text-white transition-colors">
              Corporate
            </Link>
            <Link href="/#contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          <OfferingCta />
        </div>
      </header>

      {/* Page Header */}
      <div className="border-b border-[#1F1F23] bg-[#0E0E11]/60 backdrop-blur-md py-16 px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase bg-[#18181B] px-3 py-1 rounded-md border border-[#27272A] inline-block">
            Insights &amp; Education
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.15] text-balance">
            Build investment clarity, one idea at a time.
          </h1>
          <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-2xl text-pretty">
            Plain-spoken, institutional-grade perspectives on valuation, corporate finance, and advanced portfolio
            strategy. Each piece is written to sharpen your own conviction and make it effortless to bring clients along
            with confidence.
          </p>
        </div>
      </div>

      {/* Directory */}
      <main className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <Suspense fallback={<div className="h-64" aria-hidden="true" />}>
          <BlogDirectory />
        </Suspense>
      </main>
    </div>
  )
}

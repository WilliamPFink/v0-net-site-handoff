import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { OfferingCta } from "@/components/offering-cta"

export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string
  lastUpdated: string
  children: ReactNode
}) {
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

          <OfferingCta className="hidden sm:inline-flex" />
        </div>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-6 py-16 md:py-20 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight text-balance">{title}</h1>
          <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">Last updated: {lastUpdated}</p>
        </div>

        <div className="legal-body flex flex-col gap-8">{children}</div>
      </main>
    </div>
  )
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-bold text-white">{heading}</h2>
      <div className="flex flex-col gap-3 text-sm text-zinc-400 leading-relaxed">{children}</div>
    </section>
  )
}

import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { MapPin } from "lucide-react"
import { FirmIntakeForm } from "@/components/firm-intake-form"
import { OfferingCta } from "@/components/offering-cta"

export const metadata: Metadata = {
  title: "Corporate Integrity & Infrastructure",
  description:
    "The structural foundation, calculation logic integrity, headquarters registry, and firm onboarding pathway of ClearGuidance Studio, Inc.",
  alternates: {
    canonical: "/corporate",
  },
  openGraph: {
    title: "Corporate Integrity & Infrastructure | ClearGuidance Studio",
    description:
      "Calculation logic integrity, headquarters registry, and firm onboarding for ClearGuidance Studio, Inc.",
    type: "website",
    url: "https://clearguidancestudio.net/corporate",
  },
  twitter: {
    card: "summary_large_image",
    title: "Corporate Integrity & Infrastructure | ClearGuidance Studio",
    description:
      "Calculation logic integrity, headquarters registry, and firm onboarding for ClearGuidance Studio, Inc.",
  },
}

export default function CorporatePage() {
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
            <Link href="/corporate" className="text-white border-b border-white pb-1 transition-colors">
              Corporate
            </Link>
          </nav>

          <OfferingCta className="hidden sm:inline-flex" />
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-20 flex flex-col gap-10">
        {/* Page Heading */}
        <div className="flex flex-col items-center text-center gap-4">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight text-balance">
            Corporate Integrity &amp; Infrastructure
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl text-pretty">
            The foundation of our calculations. We hold our software to the highest standards of accuracy and
            performance. Explore the structural roots of our platform, verify our physical corporate footprint, and see
            how we keep your workspace perfectly secure and operational.
          </p>
        </div>

        {/* Hero Card: Calculation Logic Integrity */}
        <section className="group bg-[#0B0F19] border border-blue-500/20 rounded-2xl overflow-hidden shadow-[0_0_35px_rgba(59,130,246,0.06)]">
          <div className="relative w-full h-52 md:h-64 overflow-hidden">
            <Image
              src="/net/corp-prism.png"
              alt="A glass prism dispersing a beam of light into a full color spectrum"
              fill
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0B0F19]" />
          </div>
          <div className="p-6 md:p-8 flex flex-col gap-6">
            <h2 className="text-xl font-bold text-white">Calculation Logic Integrity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-bold text-white">Transparent Data Processing</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  No black boxes or hidden formulas. Our calculation engine handles your inputs completely out in the
                  open, keeping every single step clear and trackable. This ensures that whether you are analyzing a
                  growth trend or modeling an intrinsic target, you can completely trust the integrity of the math.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-bold text-white">Rock-Solid Stability</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Your customized layouts and numbers are completely protected. The terminal uses advanced, secure local
                  saving loops to ensure that if you switch apps, take a break, or lock your device, your active models,
                  toggles, and data points stay exactly where you left them.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Address + Firm Onboarding */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* HQ Registry Address — glowing panel */}
          <div className="bg-[#0B0F19] border border-blue-500/20 rounded-2xl p-6 flex flex-col gap-4 shadow-[0_0_35px_rgba(59,130,246,0.06)]">
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">HQ Physical Registry</div>
            <div className="relative flex-1 min-h-[180px] rounded-xl border border-blue-500/40 bg-gradient-to-br from-[#0E1A33] via-[#0A1222] to-[#06080F] overflow-hidden shadow-[inset_0_0_30px_rgba(59,130,246,0.15)]">
              <div
                className="absolute inset-0 opacity-[0.15] pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(96,165,250,0.4) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(96,165,250,0.4) 1px, transparent 1px)
                  `,
                  backgroundSize: "28px 28px",
                }}
                aria-hidden="true"
              />
              <div className="relative h-full flex items-center justify-between gap-4 p-6">
                <p className="text-lg font-semibold text-white leading-snug text-balance">
                  9905 S Pennsylvania Ave,
                  <br />
                  Oklahoma City
                </p>
                <MapPin className="w-10 h-10 text-blue-400 shrink-0 drop-shadow-[0_0_12px_rgba(59,130,246,0.7)]" />
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 font-mono">ClearGuidance Studio, Inc. — Suite A, OK 73159</p>
          </div>

          {/* Firm Verification & Onboarding */}
          <div className="group bg-[#0B0F19] border border-blue-500/20 rounded-2xl overflow-hidden flex flex-col shadow-[0_0_35px_rgba(59,130,246,0.06)]">
            <div className="relative w-full h-32 overflow-hidden">
              <Image
                src="/net/corp-boardroom.png"
                alt="A network switch on a polished boardroom table"
                fill
                sizes="(max-width: 768px) 100vw, 512px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B0F19]" />
            </div>
            <div className="p-6 flex flex-col gap-4">
              <h3 className="text-base font-bold text-white">Firm Verification &amp; Onboarding</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We are expanding access for independent wealth management teams. If you are coordinating a firm with
                multiple users and want to open a dedicated portal for your office, complete the firm profile below to
                securely connect with our team and request onboarding priority.
              </p>
            </div>
          </div>
        </section>

        {/* Firm Intake Form */}
        <section className="bg-[#0B0F19] border border-blue-500/20 rounded-2xl p-6 md:p-8 flex flex-col gap-5 shadow-[0_0_35px_rgba(59,130,246,0.06)]">
          <div className="flex flex-col gap-2">
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Request Access Profile</div>
            <h3 className="text-lg font-bold text-white">Firm Profile &amp; Onboarding Request</h3>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">
              Share a few details about your organization and the access you need. Our onboarding team reviews every
              request and follows up to verify your firm and provision a dedicated portal.
            </p>
          </div>
          <FirmIntakeForm />
        </section>

        {/* Legal & Compliance */}
        <section className="bg-[#0B0F19] border border-blue-500/20 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-[0_0_35px_rgba(59,130,246,0.06)]">
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Legal &amp; Compliance</div>
          <h3 className="text-base font-bold text-white">Policies &amp; Agreements</h3>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">
            Review the governing documents for our platform. These outline how we protect your data and the terms that
            apply to your use of ClearGuidance Studio.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/privacy"
              className="flex-1 text-center bg-[#0A0A0C] hover:bg-[#121214] text-blue-400 text-sm font-semibold px-4 py-3 rounded-lg border border-blue-500/30 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="flex-1 text-center bg-[#0A0A0C] hover:bg-[#121214] text-blue-400 text-sm font-semibold px-4 py-3 rounded-lg border border-blue-500/30 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

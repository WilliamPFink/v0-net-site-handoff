import Link from "next/link"
import { Building2, BookOpen, Globe, ShieldCheck } from "lucide-react"
import { AdsenseAd } from "@/components/adsense-ad"
import { OFFERING_URL } from "@/lib/links"

export function SiteFooter() {
  return (
    <footer
      id="corporate"
      className="bg-[#0A0A0C] border-t border-[#1F1F23] pt-16 pb-12 px-6 relative z-10 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="space-y-3">
          <h4 className="text-xs font-mono tracking-wider font-bold text-white uppercase flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-zinc-500" />
            <span>Corporate</span>
          </h4>
          <a
            href="https://clearguidancestudio.com"
            className="text-xs text-[#71717A] font-mono hover:text-white transition-colors block"
          >
            ClearGuidanceStudio.com
          </a>
          <a
            href={OFFERING_URL}
            className="text-xs text-[#71717A] font-mono hover:text-white transition-colors block"
          >
            Subscription Offerings
          </a>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-mono tracking-wider font-bold text-white uppercase flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
            <span>Encyclopedia</span>
          </h4>
          <Link href="/encyclopedia" className="text-xs text-[#71717A] font-mono hover:text-white transition-colors block">
            Reference Modules
          </Link>
          <Link href="/product-tiers" className="text-xs text-[#71717A] font-mono hover:text-white transition-colors block">
            Product Tiers
          </Link>
        </div>

        <div className="space-y-3" id="contact">
          <h4 className="text-xs font-mono tracking-wider font-bold text-white uppercase flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-zinc-500" />
            <span>Contact</span>
          </h4>
          <a
            href="mailto:support@clearguidancestudio.com"
            className="text-xs text-[#71717A] font-mono hover:text-white transition-colors block"
          >
            support@clearguidancestudio.com
          </a>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-mono tracking-wider font-bold text-white uppercase flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
            <span>Model Integrity</span>
          </h4>
          <p className="text-xs text-[#71717A] leading-relaxed">
            Illustrative structural models. Outputs are hypothetical and not a guarantee of policy performance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-[#1F1F23] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest md:flex-1">
          © {new Date().getFullYear()} ClearGuidance Studio
        </span>
        <div className="flex justify-center md:flex-none">
          <AdsenseAd />
        </div>
        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest md:flex-1 md:text-right">
          Where Valuation Meets Conviction
        </span>
      </div>
    </footer>
  )
}

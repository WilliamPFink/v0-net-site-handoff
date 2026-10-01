import { ArrowRight } from "lucide-react"
import { OFFERING_URL } from "@/lib/links"

// Shared, bold "Start Your Free Trial" CTA used in page nav headers across the
// site. Single source of truth for both the label/styling and the destination
// (the offering page on clearguidancestudio.com, where Stripe/checkout lives).
export function OfferingCta({ className = "" }: { className?: string }) {
  return (
    <a
      href={OFFERING_URL}
      className={`group inline-flex items-center gap-1.5 bg-blue-500 hover:bg-blue-400 text-[#04101F] text-xs font-mono font-bold px-4 py-2 rounded-full transition-all duration-200 shadow-[0_0_20px_rgba(59,130,246,0.35)] whitespace-nowrap ${className}`}
    >
      <span>Start Your Free Trial</span>
      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </a>
  )
}

"use client"

import { useEffect, useState } from "react"
import { ArrowRight, X } from "lucide-react"
import { OFFERING_URL } from "@/lib/links"

const TRIAL_URL = OFFERING_URL
const DISMISS_KEY = "cg_trial_bubble_dismissed"

export function FreeTrialBubble() {
  // Start hidden to avoid a flash before we can read the dismiss flag, and to
  // allow a gentle entrance once mounted.
  const [dismissed, setDismissed] = useState(true)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const isDismissed = sessionStorage.getItem(DISMISS_KEY) === "1"
    setDismissed(isDismissed)
    if (!isDismissed) {
      // Small delay so the bubble animates in after first paint.
      const t = setTimeout(() => setVisible(true), 400)
      return () => clearTimeout(t)
    }
  }, [])

  if (dismissed) return null

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            sessionStorage.setItem(DISMISS_KEY, "1")
            setDismissed(true)
          }}
          aria-label="Dismiss free trial offer"
          className="absolute -top-2 -right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-[#27272A] bg-[#121214] text-[#A1A1AA] shadow-md transition-colors hover:bg-[#1C1C21] hover:text-white"
        >
          <X className="h-3 w-3" aria-hidden="true" />
        </button>

        <a
          href={TRIAL_URL}
          className="group relative flex items-center gap-2.5 rounded-full bg-blue-500 py-3.5 pl-5 pr-6 font-mono text-sm font-bold text-[#04101F] shadow-[0_8px_30px_rgba(59,130,246,0.35)] transition-all duration-200 hover:bg-blue-400 hover:shadow-[0_10px_38px_rgba(59,130,246,0.5)]"
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#04101F]/70 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#04101F]" />
          </span>
          <span className="relative uppercase tracking-wide">Start Your Free Trial</span>
          <ArrowRight
            className="relative h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </a>
      </div>
    </div>
  )
}

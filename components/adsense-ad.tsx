"use client"

import { useEffect } from "react"

// The AdSense loader script is included site-wide in app/layout.tsx <head>.
// TODO: Replace FOOTER_AD_SLOT with the real slot ID from your AdSense dashboard.
// Ads will NOT serve until the slot is valid.
export const ADSENSE_PUBLISHER_ID = "ca-pub-3142566459530506"
const FOOTER_AD_SLOT = "0000000000"

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

export function AdsenseAd() {
  const isPlaceholder =
    ADSENSE_PUBLISHER_ID === "ca-pub-0000000000000000" || FOOTER_AD_SLOT === "0000000000"

  useEffect(() => {
    if (isPlaceholder) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // adsbygoogle not yet ready; will retry on next mount
    }
  }, [isPlaceholder])

  // While placeholders are in use, render a clearly-marked stand-in so the
  // layout is correct and you can see exactly where the live ad will appear.
  if (isPlaceholder) {
    return (
      <div
        aria-hidden="true"
        className="flex h-[60px] w-[320px] shrink-0 items-center justify-center rounded-md border border-dashed border-[#27272A] bg-[#0F0F12]"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600">
          Advertisement
        </span>
      </div>
    )
  }

  return (
    <ins
      className="adsbygoogle block h-[60px] w-[320px] shrink-0"
      style={{ display: "inline-block", width: 320, height: 60 }}
      data-ad-client={ADSENSE_PUBLISHER_ID}
      data-ad-slot={FOOTER_AD_SLOT}
    />
  )
}

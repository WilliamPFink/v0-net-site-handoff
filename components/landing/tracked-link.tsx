"use client"

import type { ComponentProps } from "react"
import { trackCta, type CtaTrack } from "@/lib/analytics"

/** An <a> that reports a CTA click to GA4 and the Meta Pixel. Usable from server components. */
export function TrackedLink({ track, onClick, ...props }: ComponentProps<"a"> & { track: CtaTrack }) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackCta(track)
        onClick?.(e)
      }}
    />
  )
}

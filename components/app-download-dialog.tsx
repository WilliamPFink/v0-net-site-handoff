"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/links"
import { trackCta } from "@/lib/analytics"

// Any element with `data-trial-cta` opens this dialog instead of navigating.
// Its href stays in place as a no-JS fallback.
export const TRIAL_CTA_ATTR = "data-trial-cta"

export function AppDownloadDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return
      const trigger = (event.target as Element | null)?.closest?.(`[${TRIAL_CTA_ATTR}]`)
      if (!trigger) return
      event.preventDefault()
      dialogRef.current?.showModal()
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  const close = () => dialogRef.current?.close()

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="app-download-title"
      aria-describedby="app-download-desc"
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-[#27272A] bg-[#0B0B0E] p-0 text-white shadow-[0_24px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(59,130,246,0.15)] backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="relative flex flex-col items-center gap-6 px-6 pb-8 pt-10 text-center sm:px-10">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#27272A] text-[#A1A1AA] transition-colors hover:bg-[#1C1C21] hover:text-white"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <Image
          src="/apple-icon.png"
          alt=""
          width={64}
          height={64}
          className="h-16 w-16 rounded-2xl shadow-[0_0_24px_rgba(59,130,246,0.35)]"
        />

        <div className="flex flex-col gap-2">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400">7-Day Free Trial</p>
          <h2 id="app-download-title" className="text-balance text-2xl font-bold">
            Start your free trial in the app
          </h2>
          <p id="app-download-desc" className="text-pretty text-sm leading-relaxed text-[#A1A1AA]">
            Download ClearGuidance Studio, create your account, and choose Foundation, Analyst, or Advisor Pro. Cancel
            anytime.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCta({ event: "sign_up", location: "app_download_dialog", label: "App Store" })}
            className="rounded-lg transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            <Image
              src="/badges/app-store.svg"
              alt="Download on the App Store"
              width={144}
              height={48}
              className="h-12 w-auto"
            />
          </a>
          <a
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCta({ event: "sign_up", location: "app_download_dialog", label: "Google Play" })}
            className="rounded-lg transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            <Image
              src="/badges/google-play.svg"
              alt="Get it on Google Play"
              width={162}
              height={48}
              className="h-12 w-auto"
            />
          </a>
        </div>

        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#71717A]">Available on iPhone, iPad &amp; Android</p>
      </div>
    </dialog>
  )
}

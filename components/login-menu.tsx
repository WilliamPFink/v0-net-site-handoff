"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown, GraduationCap, LineChart } from "lucide-react"
import { STUDIO_URL, ACADEMY_URL } from "@/lib/links"

/**
 * Header "Login" control. Opens a small dropdown with the two authenticated
 * destinations on the ClearGuidance Studio app (.com):
 *   - Studio  → the valuation app sign-in
 *   - Academy → the training modules (app resumes current progress, or starts
 *     new learners at the first lesson)
 *
 * Lightweight, hand-rolled to match the site's existing component style
 * (see return-to-app.tsx). Closes on Escape, outside click, or selection.
 */
export function LoginMenu({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const firstItemRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return

    function onPointerDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }

    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    // Move focus into the menu for keyboard users.
    firstItemRef.current?.focus()

    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  const items = [
    {
      href: STUDIO_URL,
      label: "Studio",
      description: "Log in to the valuation app",
      Icon: LineChart,
    },
    {
      href: ACADEMY_URL,
      label: "Academy",
      description: "Resume your training modules",
      Icon: GraduationCap,
    },
  ]

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-1 text-xs font-mono font-semibold tracking-wide uppercase text-[#A1A1AA] hover:text-white transition-colors"
      >
        Login
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Login destinations"
          className="absolute right-0 top-full mt-2 w-60 overflow-hidden rounded-xl border border-[#1F1F27] bg-[#0E0E12] p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.55)] z-50"
        >
          {items.map(({ href, label, description, Icon }, i) => (
            <a
              key={label}
              ref={i === 0 ? firstItemRef : undefined}
              href={href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-[#17171D] focus:bg-[#17171D] focus:outline-none"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-blue-500/30 bg-blue-500/10 text-blue-400 transition-colors group-hover:border-blue-500/50">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-semibold text-white">{label}</span>
                <span className="text-xs text-[#A1A1AA]">{description}</span>
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

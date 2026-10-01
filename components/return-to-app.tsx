"use client"

import { useState } from "react"
import { LogIn } from "lucide-react"

const APP_URL = "https://clearguidancestudio.com"

/**
 * "Return to ClearGuidance Studio" control.
 *
 * When the blog was opened from the app via window.open(url, "cgs_blog"),
 * the cleanest exit is to close this tab — the browser refocuses the still-alive
 * app tab exactly where the user left off (no reload, no re-auth, no duplicate tabs).
 *
 * If the tab was NOT script-opened (shared link, direct visit, etc.), window.close()
 * is a no-op, so we fall back to navigating to the app entry URL.
 */
export function ReturnToApp({ className = "" }: { className?: string }) {
  const [returning, setReturning] = useState(false)

  function handleReturn() {
    setReturning(true)
    // Attempt to close the tab. Allowed cross-origin only when this tab was
    // opened by a script (window.open), which is how the app launches the blog.
    window.close()
    // If still here shortly after, the tab couldn't be closed — navigate instead.
    window.setTimeout(() => {
      window.location.href = APP_URL
    }, 150)
  }

  return (
    <button
      type="button"
      onClick={handleReturn}
      aria-label="Return to the ClearGuidance Studio app"
      className={`group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-[#A1A1AA] hover:text-white transition-colors disabled:opacity-60 ${className}`}
      disabled={returning}
    >
      <LogIn className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
      {returning ? "Returning…" : "Return to App"}
    </button>
  )
}

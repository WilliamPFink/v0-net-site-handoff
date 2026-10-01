"use client"

import { useState, useTransition } from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { submitReaction, type ReactionState, type Vote } from "@/app/blog/[slug]/reactions"

export function ArticleReactions({
  slug,
  initial,
}: {
  slug: string
  initial: ReactionState
}) {
  const [state, setState] = useState<ReactionState>(initial)
  const [isPending, startTransition] = useTransition()

  function vote(next: Vote) {
    // Optimistic update so the UI responds instantly.
    setState((prev) => {
      const up = prev.up - (prev.userVote === "up" ? 1 : 0)
      const down = prev.down - (prev.userVote === "down" ? 1 : 0)
      const undo = prev.userVote === next
      return {
        up: up + (!undo && next === "up" ? 1 : 0),
        down: down + (!undo && next === "down" ? 1 : 0),
        userVote: undo ? null : next,
      }
    })

    startTransition(async () => {
      try {
        const fresh = await submitReaction(slug, next)
        setState(fresh)
      } catch {
        // On failure, re-sync from the server-provided initial as a fallback.
        setState(initial)
      }
    })
  }

  return (
    <section
      aria-label="Article feedback"
      className="mt-14 border-t border-[#1F1F23] pt-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#27272A] bg-[#121214] p-4 md:p-5">
        <p className="text-[11px] font-mono uppercase tracking-widest text-[#A1A1AA]">
          Was this structural insight valuable?
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => vote("up")}
            disabled={isPending}
            aria-pressed={state.userVote === "up"}
            aria-label="Mark this article as valuable"
            className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-mono transition-all disabled:opacity-60 ${
              state.userVote === "up"
                ? "border-blue-500 bg-blue-500/10 text-blue-400"
                : "border-[#27272A] bg-[#0E0E11] text-[#A1A1AA] hover:text-white hover:border-[#3F3F46]"
            }`}
          >
            <ThumbsUp className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="tabular-nums">{state.up}</span>
          </button>

          <button
            type="button"
            onClick={() => vote("down")}
            disabled={isPending}
            aria-pressed={state.userVote === "down"}
            aria-label="Mark this article as not valuable"
            className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-mono transition-all disabled:opacity-60 ${
              state.userVote === "down"
                ? "border-red-500/70 bg-red-500/10 text-red-400"
                : "border-[#27272A] bg-[#0E0E11] text-[#A1A1AA] hover:text-white hover:border-[#3F3F46]"
            }`}
          >
            <ThumbsDown className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="tabular-nums">{state.down}</span>
          </button>
        </div>
      </div>
    </section>
  )
}

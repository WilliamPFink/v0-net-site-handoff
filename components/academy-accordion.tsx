"use client"

import { useId, useState, type ReactNode } from "react"
import { ChevronDown, Brain, Terminal, Star, ClipboardCheck, TriangleAlert } from "lucide-react"

// Serializable icon keys (a string is passed across the RSC boundary, then
// resolved to a lucide icon here in the client component).
const ICONS = {
  brain: Brain,
  terminal: Terminal,
  star: Star,
  checklist: ClipboardCheck,
  alert: TriangleAlert,
} as const

export type AccordionIconKey = keyof typeof ICONS

export type AccordionItem = {
  id: string
  title: string
  /** Optional short label shown to the right of the title (e.g. lesson count). */
  meta?: string
  /** Optional leading icon key (rendered in the cobalt accent color). */
  icon?: AccordionIconKey
  body: ReactNode
}

export function AccordionList({
  items,
  defaultOpenId,
  ariaLabel,
}: {
  items: AccordionItem[]
  defaultOpenId?: string
  ariaLabel?: string
}) {
  const groupId = useId()
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null)

  return (
    <div className="space-y-3" aria-label={ariaLabel}>
      {items.map((item) => {
        const isOpen = openId === item.id
        const btnId = `${groupId}-${item.id}-btn`
        const panelId = `${groupId}-${item.id}-panel`
        const Icon = item.icon ? ICONS[item.icon] : null
        return (
          <div
            key={item.id}
            className={`bg-[#121214] border rounded-xl overflow-hidden transition-colors ${
              isOpen ? "border-blue-500/30" : "border-[#27272A]"
            }`}
          >
            <h3 className="m-0">
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 group"
              >
                <span className="flex items-center gap-3 min-w-0">
                  {Icon ? (
                    <span className="inline-flex items-center justify-center w-7 h-7 shrink-0 rounded-lg bg-blue-500/10 border border-blue-500/25">
                      <Icon className="w-3.5 h-3.5 text-blue-400" aria-hidden={true} />
                    </span>
                  ) : null}
                  <span className="text-sm font-bold text-white group-hover:text-blue-100 transition-colors text-pretty">
                    {item.title}
                  </span>
                  {item.meta ? (
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#71717A] shrink-0">
                      {item.meta}
                    </span>
                  ) : null}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-blue-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="px-5 pb-5 pt-0 text-sm text-[#A1A1AA] leading-relaxed"
            >
              {item.body}
            </div>
          </div>
        )
      })}
    </div>
  )
}

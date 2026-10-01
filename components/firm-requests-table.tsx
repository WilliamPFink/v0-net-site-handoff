"use client"

import { useState, useTransition } from "react"
import { Mail, Phone, Globe, ChevronDown, ChevronRight } from "lucide-react"
import type { FirmIntake } from "@/lib/db/schema"
import { updateSubmissionStatus, type SubmissionStatus } from "@/app/corporate/requests/actions"

const STATUSES: SubmissionStatus[] = ["new", "contacted", "onboarded", "archived"]

const STATUS_STYLES: Record<SubmissionStatus, string> = {
  new: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  contacted: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  onboarded: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  archived: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
}

function formatDate(value: Date): string {
  return new Date(value).toLocaleString("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "medium",
    timeStyle: "short",
  })
}

function StatusSelect({ row }: { row: FirmIntake }) {
  const [isPending, startTransition] = useTransition()
  const status = (row.status as SubmissionStatus) ?? "new"

  return (
    <select
      value={status}
      disabled={isPending}
      onChange={(e) => {
        const next = e.target.value as SubmissionStatus
        startTransition(() => updateSubmissionStatus(row.id, next))
      }}
      className={`text-[11px] font-mono uppercase tracking-wide rounded-md border px-2 py-1 bg-transparent focus:outline-none disabled:opacity-50 ${STATUS_STYLES[status]}`}
      aria-label={`Status for ${row.firmName}`}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s} className="bg-[#0A0A0C] text-white">
          {s}
        </option>
      ))}
    </select>
  )
}

function Row({ row }: { row: FirmIntake }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <tr className="border-t border-zinc-800/80 hover:bg-white/[0.02] transition-colors">
        <td className="px-3 py-3 align-top">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-start gap-1.5 text-left"
            aria-expanded={open}
          >
            {open ? (
              <ChevronDown className="w-4 h-4 mt-0.5 text-zinc-500 shrink-0" aria-hidden="true" />
            ) : (
              <ChevronRight className="w-4 h-4 mt-0.5 text-zinc-500 shrink-0" aria-hidden="true" />
            )}
            <span className="font-semibold text-white">{row.firmName}</span>
          </button>
        </td>
        <td className="px-3 py-3 align-top text-zinc-300">
          <div>{row.contactName}</div>
          <a href={`mailto:${row.contactEmail}`} className="text-blue-400 hover:underline inline-flex items-center gap-1">
            <Mail className="w-3 h-3" aria-hidden="true" />
            {row.contactEmail}
          </a>
        </td>
        <td className="px-3 py-3 align-top text-zinc-400 whitespace-nowrap">{row.advisorCount ?? "—"}</td>
        <td className="px-3 py-3 align-top text-zinc-400">{row.tiers ?? "—"}</td>
        <td className="px-3 py-3 align-top text-zinc-500 whitespace-nowrap">{formatDate(row.createdAt)}</td>
        <td className="px-3 py-3 align-top">
          <StatusSelect row={row} />
        </td>
      </tr>
      {open && (
        <tr className="border-t border-zinc-800/40 bg-white/[0.015]">
          <td colSpan={6} className="px-3 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-xs text-zinc-300 pl-5">
              {row.contactPhone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" />
                  <a href={`tel:${row.contactPhone}`} className="hover:underline">
                    {row.contactPhone}
                  </a>
                </div>
              )}
              {row.firmWebsite && (
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" />
                  <a
                    href={row.firmWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline break-all"
                  >
                    {row.firmWebsite}
                  </a>
                </div>
              )}
              {row.comments && (
                <div className="sm:col-span-2 mt-1">
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono mb-1">Comments</div>
                  <p className="text-zinc-300 whitespace-pre-wrap leading-relaxed">{row.comments}</p>
                </div>
              )}
              {!row.contactPhone && !row.firmWebsite && !row.comments && (
                <div className="text-zinc-600 italic">No additional details provided.</div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

export function FirmRequestsTable({ rows }: { rows: FirmIntake[] }) {
  if (rows.length === 0) {
    return (
      <div className="text-center py-16 text-zinc-500 text-sm border border-dashed border-zinc-800 rounded-xl">
        No firm requests yet. Submissions from the Corporate page will appear here.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto border border-zinc-800 rounded-xl">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
            <th className="px-3 py-3 font-medium">Firm</th>
            <th className="px-3 py-3 font-medium">Contact</th>
            <th className="px-3 py-3 font-medium">Seats</th>
            <th className="px-3 py-3 font-medium">Tiers</th>
            <th className="px-3 py-3 font-medium">Submitted</th>
            <th className="px-3 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

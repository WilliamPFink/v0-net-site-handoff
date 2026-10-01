"use client"

import { useTransition } from "react"
import { Mail, Phone, TrendingUp, Briefcase } from "lucide-react"
import type { SubscriberLead } from "@/lib/db/schema"
import { updateLeadStatus, type LeadStatus } from "@/app/leads/actions"

const STATUSES: LeadStatus[] = ["new", "contacted", "converted", "archived"]

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  contacted: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  converted: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  archived: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
}

function formatDate(value: Date): string {
  return new Date(value).toLocaleString("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "medium",
    timeStyle: "short",
  })
}

function StatusSelect({ row }: { row: SubscriberLead }) {
  const [isPending, startTransition] = useTransition()
  const status = (row.status as LeadStatus) ?? "new"

  return (
    <select
      value={status}
      disabled={isPending}
      onChange={(e) => {
        const next = e.target.value as LeadStatus
        startTransition(() => updateLeadStatus(row.id, next))
      }}
      className={`text-[11px] font-mono uppercase tracking-wide rounded-md border px-2 py-1 bg-transparent focus:outline-none disabled:opacity-50 ${STATUS_STYLES[status]}`}
      aria-label={`Status for ${row.name}`}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s} className="bg-[#0A0A0C] text-white">
          {s}
        </option>
      ))}
    </select>
  )
}

function AudienceBadge({ audience }: { audience: string }) {
  const isAdvisor = audience === "advisor"
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wide rounded-md border px-2 py-1 ${
        isAdvisor
          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/25"
          : "bg-blue-500/10 text-blue-300 border-blue-500/25"
      }`}
    >
      {isAdvisor ? (
        <Briefcase className="w-3 h-3" aria-hidden="true" />
      ) : (
        <TrendingUp className="w-3 h-3" aria-hidden="true" />
      )}
      {isAdvisor ? "Advisor" : "Investor"}
    </span>
  )
}

export function LeadsTable({ rows }: { rows: SubscriberLead[] }) {
  if (rows.length === 0) {
    return (
      <div className="text-center py-16 text-zinc-500 text-sm border border-dashed border-zinc-800 rounded-xl">
        No leads yet. Submissions from the on-site agent funnel will appear here.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto border border-zinc-800 rounded-xl">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
            <th className="px-3 py-3 font-medium">Name</th>
            <th className="px-3 py-3 font-medium">Contact</th>
            <th className="px-3 py-3 font-medium">Audience</th>
            <th className="px-3 py-3 font-medium">SMS</th>
            <th className="px-3 py-3 font-medium">Submitted</th>
            <th className="px-3 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-zinc-800/80 hover:bg-white/[0.02] transition-colors">
              <td className="px-3 py-3 align-top font-semibold text-white">{row.name}</td>
              <td className="px-3 py-3 align-top text-zinc-300">
                <a
                  href={`mailto:${row.email}`}
                  className="text-blue-400 hover:underline inline-flex items-center gap-1"
                >
                  <Mail className="w-3 h-3" aria-hidden="true" />
                  {row.email}
                </a>
                {row.phone && (
                  <a
                    href={`tel:${row.phone}`}
                    className="mt-1 flex items-center gap-1 text-zinc-400 hover:underline"
                  >
                    <Phone className="w-3 h-3 text-zinc-500" aria-hidden="true" />
                    {row.phone}
                  </a>
                )}
              </td>
              <td className="px-3 py-3 align-top">
                <AudienceBadge audience={row.audienceType} />
              </td>
              <td className="px-3 py-3 align-top whitespace-nowrap">
                {row.smsConsent ? (
                  <span className="text-emerald-400 text-xs font-mono">opted in</span>
                ) : (
                  <span className="text-zinc-600 text-xs font-mono">—</span>
                )}
              </td>
              <td className="px-3 py-3 align-top text-zinc-500 whitespace-nowrap">{formatDate(row.createdAt)}</td>
              <td className="px-3 py-3 align-top">
                <StatusSelect row={row} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

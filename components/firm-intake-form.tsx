"use client"

import { useActionState } from "react"
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { submitFirmIntake, type FirmIntakeState } from "@/app/corporate/actions"

const TIERS = ["Essential", "Advisor", "Advisor Pro"] as const

const initialState: FirmIntakeState = { status: "idle", message: "" }

const inputClass =
  "w-full bg-[#0A0A0C] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors"
const labelClass = "text-xs font-semibold text-zinc-300"

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <span className="text-[11px] text-red-400">{message}</span>
}

export function FirmIntakeForm() {
  const [state, formAction, isPending] = useActionState(submitFirmIntake, initialState)
  const errors = state.fieldErrors ?? {}

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center text-center gap-3 py-10">
        <CheckCircle2 className="w-10 h-10 text-emerald-400" aria-hidden="true" />
        <h4 className="text-base font-bold text-white">Request received</h4>
        <p className="text-sm text-zinc-400 max-w-md leading-relaxed">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      {/* Honeypot — visually hidden, off-screen, not focusable */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company_website_hp">Do not fill this field</label>
        <input id="company_website_hp" name="company_website_hp" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Firm name */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label htmlFor="firmName" className={labelClass}>
            Firm / Organization Name <span className="text-red-400">*</span>
          </label>
          <input id="firmName" name="firmName" type="text" required placeholder="Your firm or organization" className={inputClass} />
          <FieldError message={errors.firmName} />
        </div>

        {/* Contact name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contactName" className={labelClass}>
            Contact Name <span className="text-red-400">*</span>
          </label>
          <input id="contactName" name="contactName" type="text" required placeholder="Full name" className={inputClass} />
          <FieldError message={errors.contactName} />
        </div>

        {/* Contact email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contactEmail" className={labelClass}>
            Contact Email <span className="text-red-400">*</span>
          </label>
          <input id="contactEmail" name="contactEmail" type="email" required placeholder="name@firm.com" className={inputClass} />
          <FieldError message={errors.contactEmail} />
        </div>

        {/* Contact phone */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contactPhone" className={labelClass}>
            Contact Phone
          </label>
          <input id="contactPhone" name="contactPhone" type="tel" placeholder="(555) 555-5555" className={inputClass} />
        </div>

        {/* Website */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="website" className={labelClass}>
            Firm Website
          </label>
          <input id="website" name="website" type="url" placeholder="https://yourfirm.com" className={inputClass} />
        </div>

        {/* Advisor count */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label htmlFor="advisorCount" className={labelClass}>
            Number of Advisors / Seats
          </label>
          <select id="advisorCount" name="advisorCount" defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select a range
            </option>
            <option value="1–5">1–5</option>
            <option value="6–15">6–15</option>
            <option value="16–50">16–50</option>
            <option value="51–100">51–100</option>
            <option value="100+">100+</option>
          </select>
        </div>
      </div>

      {/* Tiers requested */}
      <fieldset className="flex flex-col gap-2">
        <legend className={labelClass}>Tier(s) Requested</legend>
        <div className="flex flex-col sm:flex-row gap-2 mt-1">
          {TIERS.map((tier) => (
            <label
              key={tier}
              className="flex items-center gap-2 flex-1 bg-[#0A0A0C] border border-zinc-800 rounded-lg px-3 py-2 cursor-pointer hover:border-blue-500/40 transition-colors"
            >
              <input
                type="checkbox"
                name="tiers"
                value={tier}
                className="h-4 w-4 rounded border-zinc-600 bg-transparent accent-blue-500"
              />
              <span className="text-sm text-zinc-200">{tier}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Notes */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="notes" className={labelClass}>
          Additional Comments
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Tell us about your firm, timeline, or any specific needs."
          className={`${inputClass} resize-y`}
        />
      </div>

      {state.status === "error" && (
        <div className="flex items-start gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
          <span>{state.message}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-[0_0_15px_rgba(59,130,246,0.25)] self-start"
      >
        {isPending && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
        {isPending ? "Sending…" : "Request Access Profile"}
      </button>

      <p className="text-[11px] text-zinc-500 leading-relaxed">
        Your details are submitted securely to our onboarding team. We&apos;ll follow up to verify your firm and open a
        dedicated portal.
      </p>
    </form>
  )
}

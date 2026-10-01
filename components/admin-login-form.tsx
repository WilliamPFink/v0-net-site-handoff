"use client"

import { useActionState } from "react"
import { AlertCircle, Loader2, Lock } from "lucide-react"
import { loginAdmin, type LoginState } from "@/app/corporate/requests/actions"

const initialState: LoginState = { error: null }

export function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(loginAdmin, initialState)

  return (
    <div className="mx-auto w-full max-w-sm bg-[#0B0F19] border border-blue-500/20 rounded-2xl p-6 md:p-8 flex flex-col gap-5 shadow-[0_0_35px_rgba(59,130,246,0.06)]">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/30">
          <Lock className="h-5 w-5 text-blue-400" aria-hidden="true" />
        </div>
        <h1 className="text-lg font-bold text-white">Firm Requests</h1>
        <p className="text-xs text-zinc-400 leading-relaxed">
          This dashboard is restricted. Enter the admin passcode to continue.
        </p>
      </div>

      <form action={formAction} className="flex flex-col gap-3">
        <label htmlFor="passcode" className="text-xs font-semibold text-zinc-300">
          Admin Passcode
        </label>
        <input
          id="passcode"
          name="passcode"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          className="w-full bg-[#0A0A0C] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors"
        />

        {state.error && (
          <div className="flex items-start gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
            <span>{state.error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-[0_0_15px_rgba(59,130,246,0.25)]"
        >
          {isPending && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
          {isPending ? "Verifying…" : "Unlock Dashboard"}
        </button>
      </form>
    </div>
  )
}

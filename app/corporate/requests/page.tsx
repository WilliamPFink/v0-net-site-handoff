import Link from "next/link"
import { LogOut, ShieldAlert, Users } from "lucide-react"
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth"
import { AdminLoginForm } from "@/components/admin-login-form"
import { FirmRequestsTable } from "@/components/firm-requests-table"
import { getSubmissions, logoutAdmin } from "./actions"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Firm Requests — ClearGuidance Studio",
  robots: { index: false, follow: false },
}

export default async function FirmRequestsPage() {
  // Guard: no passcode configured at all.
  if (!isAdminConfigured()) {
    return (
      <main className="min-h-screen bg-[#0A0A0C] text-[#E4E4E7] font-sans antialiased flex items-center justify-center p-6">
        <div className="mx-auto w-full max-w-md bg-[#0B0F19] border border-amber-500/20 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center gap-3">
          <ShieldAlert className="h-8 w-8 text-amber-400" aria-hidden="true" />
          <h1 className="text-lg font-bold text-white">Admin not configured</h1>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Set an <code className="text-amber-300">ADMIN_PASSWORD</code> environment variable in your project settings
            to enable the firm requests dashboard.
          </p>
        </div>
      </main>
    )
  }

  const authed = await isAdminAuthenticated()

  if (!authed) {
    return (
      <main className="min-h-screen bg-[#0A0A0C] text-[#E4E4E7] font-sans antialiased flex items-center justify-center p-6">
        <AdminLoginForm />
      </main>
    )
  }

  const rows = await getSubmissions()
  const counts = rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.status] = (acc[r.status] ?? 0) + 1
    return acc
  }, {})

  return (
    <main className="min-h-screen bg-[#0A0A0C] text-[#E4E4E7] font-sans antialiased px-4 py-10 md:px-8">
      <div className="mx-auto max-w-5xl flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex flex-col gap-1">
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Internal · Onboarding</div>
            <h1 className="text-2xl font-bold text-white">Firm Verification Requests</h1>
            <p className="text-sm text-zinc-400">
              {rows.length} total · {counts.new ?? 0} new · {counts.contacted ?? 0} contacted ·{" "}
              {counts.onboarded ?? 0} onboarded
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/leads"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 rounded-lg px-3 py-2 transition-colors"
            >
              <Users className="w-3.5 h-3.5" aria-hidden="true" />
              Agent leads
            </Link>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 rounded-lg px-3 py-2 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                Sign out
              </button>
            </form>
          </div>
        </div>

        <FirmRequestsTable rows={rows} />
      </div>
    </main>
  )
}

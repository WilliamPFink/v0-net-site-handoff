import type { Metadata } from "next"
import { FileText, Download } from "lucide-react"

export const metadata: Metadata = {
  title: "Sample Dossiers",
  robots: { index: false, follow: false },
}

const SAMPLES = [
  {
    href: "/sample-dossier-investor.pdf",
    title: "Investor Edition",
    subtitle: "Asset Value & Opportunity Evaluation Edition",
    description:
      "The individual-investor dossier: explicit valuation mathematics, historical stress-testing, and a friction diagnostic to run against your own holdings.",
  },
  {
    href: "/sample-dossier-advisor.pdf",
    title: "Advisor Edition",
    subtitle: "Institutional Workflow & Asset Insulation Edition",
    description:
      "The wealth-manager dossier: the same transparent formulas, framed for institutional workflows and practice-level friction diagnostics.",
  },
] as const

export default function DossierSamplesPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-8 px-6 py-16">
      <header className="flex flex-col gap-3">
        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
          <FileText className="h-4 w-4" aria-hidden="true" />
          ClearGuidance Studio
        </span>
        <h1 className="text-pretty text-3xl font-bold tracking-tight">Sample Technical Dossiers</h1>
        <p className="text-pretty leading-relaxed text-muted-foreground">
          These are the exact PDFs attached to the lead confirmation email. Click to open or download either edition
          for review.
        </p>
      </header>

      <ul className="flex flex-col gap-4">
        {SAMPLES.map((sample) => (
          <li key={sample.href}>
            <a
              href={sample.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/50 hover:bg-accent"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <FileText className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="flex flex-1 flex-col gap-1">
                <span className="font-semibold text-card-foreground">{sample.title}</span>
                <span className="text-xs font-mono uppercase tracking-wide text-muted-foreground">
                  {sample.subtitle}
                </span>
                <span className="mt-1 text-sm leading-relaxed text-muted-foreground">{sample.description}</span>
              </span>
              <Download
                className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}

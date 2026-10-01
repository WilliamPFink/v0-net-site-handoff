import { generateDossierPdf, dossierFilename } from "@/lib/report/generate-dossier"

const VALID_AUDIENCES = ["investor", "advisor"] as const
type Audience = (typeof VALID_AUDIENCES)[number]

// On-demand Technical Dossier download. The dossier is static, audience-templated
// content (no sensitive data), so this route is safe to serve publicly. The
// optional `name` only personalizes the cover's "Prepared for" line.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const audienceRaw = (searchParams.get("audience") ?? "").trim()
  const audience: Audience = VALID_AUDIENCES.includes(audienceRaw as Audience)
    ? (audienceRaw as Audience)
    : "investor"

  const recipientName = (searchParams.get("name") ?? "").trim().slice(0, 80)

  // Preview mode renders the PDF inline (in the browser's viewer) instead of
  // forcing a download — handy for reviewing the dossier without saving it.
  const inline = searchParams.get("inline") === "1"

  try {
    const pdf = await generateDossierPdf({ audience, recipientName })

    return new Response(new Uint8Array(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${dossierFilename(audience)}"`,
        "Cache-Control": "no-store",
      },
    })
  } catch (err) {
    console.log("[v0] Failed to generate dossier for download:", err)
    return new Response("Unable to generate dossier. Please try again.", { status: 500 })
  }
}

import { renderToBuffer } from "@react-pdf/renderer"
import { createElement } from "react"
import { getDossierContent, type Audience } from "./dossier-content"
import { DossierDocument } from "./dossier-document"

// Compiles the audience-specific Technical Dossier to a PDF Buffer suitable
// for attaching to an email. Pure server-side; no network dependency.
export async function generateDossierPdf({
  audience,
  recipientName,
}: {
  audience: Audience
  recipientName: string
}): Promise<Buffer> {
  const content = getDossierContent(audience)
  const generatedOn = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const element = createElement(DossierDocument, {
    content,
    recipientName: recipientName || "Prospective Member",
    generatedOn,
    audience,
  })

  // @react-pdf types renderToBuffer's arg as ReactElement<DocumentProps>; a
  // custom wrapper component renders correctly at runtime but does not match
  // that prop shape, so cast to the function's expected parameter type.
  return renderToBuffer(element as Parameters<typeof renderToBuffer>[0])
}

export function dossierFilename(audience: Audience): string {
  const edition = audience === "advisor" ? "Institutional-Workflow" : "Asset-Value-Evaluation"
  return `ClearGuidance-Technical-Dossier_${edition}.pdf`
}

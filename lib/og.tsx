import { ImageResponse } from "next/og"

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = "image/png"

// Brand accent used across cards; individual cards may override (e.g. blog
// category colors) to mirror the on-site accent for that content.
export const OG_DEFAULT_ACCENT = "#60A5FA"

// Fetch a full Google Font weight as a TTF ArrayBuffer. Omitting a modern
// User-Agent makes Google return TrueType, which Satori can parse. We load the
// full weight (rather than a &text= subset) so every glyph renders at the
// correct weight — subsetting can cause Satori to fall back to a bolder weight.
async function loadGoogleFont(font: string, weight: number) {
  const family = font.replace(/ /g, "+")
  const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`
  const css = await (await fetch(url)).text()
  const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
  if (!src) throw new Error(`Failed to load font: ${font} ${weight}`)
  return await (await fetch(src)).arrayBuffer()
}

export type OgCardOptions = {
  /** Muted section label shown top-right (e.g. "ACADEMY", "THE INSIGHTS"). */
  section: string
  /** Accent-colored pill text (e.g. a category or page label). */
  pill: string
  /** Optional muted label rendered next to the pill. */
  pillSub?: string
  /** Serif headline. */
  title: string
  /** Supporting paragraph beneath the title. */
  description: string
  /** Accent hex color. Defaults to brand cobalt. */
  accent?: string
  /** Optional bottom-left note (e.g. "JUNE 2, 2026 · 5 MIN READ"). */
  footerNote?: string
}

/**
 * Renders a branded 1200×630 Open Graph card that mirrors the on-site design:
 * obsidian background, top accent rule, corner glow, wordmark + section header,
 * an accent pill, a serif title, a description, and a footer with the domain.
 * Shared by every route's opengraph-image / twitter-image so social shares are
 * consistent across the whole site.
 */
export async function renderOgCard(opts: OgCardOptions): Promise<ImageResponse> {
  const { section, pill, pillSub, title, description, footerNote } = opts
  const accent = opts.accent ?? OG_DEFAULT_ACCENT

  const excerpt = description.length > 155 ? `${description.slice(0, 155).trimEnd()}…` : description
  const titleSize = title.length > 52 ? 58 : title.length > 34 ? 66 : 74

  const [serif, sans, sansBold] = await Promise.all([
    loadGoogleFont("Playfair Display", 700),
    loadGoogleFont("Geist", 400),
    loadGoogleFont("Geist", 600),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A0A0C",
          padding: "64px 72px",
          position: "relative",
        }}
      >
        {/* Soft brand glow in the top-right corner */}
        <div
          style={{
            position: "absolute",
            top: -240,
            right: -160,
            width: 640,
            height: 640,
            backgroundImage: `radial-gradient(circle at center, ${accent}22 0%, ${accent}00 68%)`,
            display: "flex",
          }}
        />
        {/* Thin accent rule pinned to the top edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 5,
            backgroundColor: accent,
            display: "flex",
          }}
        />

        {/* Header: wordmark + section label */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 24, fontWeight: 600, letterSpacing: 2 }}>
            <span style={{ color: "#FFFFFF" }}>CLEARGUIDANCE</span>
            <span style={{ color: accent, marginLeft: 8 }}>STUDIO</span>
          </div>
          <div style={{ display: "flex", fontSize: 18, fontWeight: 600, letterSpacing: 4, color: "#71717A" }}>
            {section.toUpperCase()}
          </div>
        </div>

        {/* Body: pill, title, description */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: `1px solid ${accent}55`,
                color: accent,
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: 2,
                padding: "8px 16px",
                borderRadius: 8,
              }}
            >
              {pill.toUpperCase()}
            </div>
            {pillSub ? (
              <div
                style={{
                  display: "flex",
                  fontSize: 18,
                  fontWeight: 600,
                  letterSpacing: 2,
                  color: "#52525B",
                  marginLeft: 20,
                }}
              >
                {pillSub.toUpperCase()}
              </div>
            ) : null}
          </div>

          <div
            style={{
              display: "flex",
              fontFamily: "Playfair Display",
              fontWeight: 700,
              fontSize: titleSize,
              lineHeight: 1.08,
              color: "#FFFFFF",
              letterSpacing: -1,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 400,
              lineHeight: 1.45,
              color: "#A1A1AA",
              marginTop: 28,
              maxWidth: 940,
            }}
          >
            {excerpt}
          </div>
        </div>

        {/* Footer: optional note + domain */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 20, fontWeight: 600, letterSpacing: 2, color: "#71717A" }}>
            {footerNote ?? ""}
          </div>
          <div style={{ display: "flex", fontSize: 20, fontWeight: 600, letterSpacing: 1, color: accent }}>
            clearguidancestudio.net
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Playfair Display", data: serif, weight: 700, style: "normal" },
        { name: "Geist", data: sans, weight: 400, style: "normal" },
        { name: "Geist", data: sansBold, weight: 600, style: "normal" },
      ],
    },
  )
}

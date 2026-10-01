// The ClearGuidance Studio Technical Dossier, rendered as a PDF document via
// @react-pdf/renderer. Uses only built-in fonts (Courier / Helvetica) so there
// is no network font dependency at render time. Consumed by generate-dossier.ts.

import { Fragment } from "react"
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import type { Audience, DossierBlock, DossierContent } from "./dossier-content"

const COLORS = {
  ink: "#0B0B0E",
  paper: "#FFFFFF",
  body: "#27272A",
  muted: "#52525B",
  faint: "#A1A1AA",
  line: "#D4D4D8",
  accent: "#1D4ED8",
  dark: "#0B0B0E",
  darkText: "#E4E4E7",
  darkFaint: "#71717A",
  green: "#15803D",
  warn: "#B45309",
  critical: "#B91C1C",
}

// Subtle blue heatmap tints, coolest (0) to warmest (4).
const HEAT_TINTS = ["#EFF4FF", "#DBE7FF", "#BFD5FF", "#9DBBFF", "#7AA0F5"]

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.paper,
    paddingTop: 54,
    paddingBottom: 64,
    paddingHorizontal: 54,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: COLORS.body,
    lineHeight: 1.5,
  },
  // Cover
  coverPage: {
    backgroundColor: COLORS.ink,
    padding: 54,
    color: COLORS.darkText,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  coverTag: {
    fontFamily: "Courier",
    fontSize: 9,
    letterSpacing: 2,
    color: COLORS.accent,
    textTransform: "uppercase",
  },
  coverTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 30,
    color: COLORS.paper,
    lineHeight: 1.15,
    marginBottom: 16,
  },
  coverEdition: {
    fontFamily: "Courier",
    fontSize: 12,
    color: COLORS.darkText,
    marginBottom: 20,
  },
  coverStandfirst: {
    fontSize: 11,
    color: COLORS.faint,
    lineHeight: 1.6,
    maxWidth: 380,
  },
  coverMetaRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#27272A",
    paddingTop: 16,
  },
  coverMetaCol: { flexDirection: "column", marginRight: 40 },
  coverMetaLabel: {
    fontFamily: "Courier",
    fontSize: 7,
    letterSpacing: 1.5,
    color: COLORS.darkFaint,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  coverMetaValue: { fontFamily: "Courier", fontSize: 9, color: COLORS.darkText },
  // Running header
  runningHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
    paddingBottom: 6,
    marginBottom: 18,
  },
  runningHeaderText: {
    fontFamily: "Courier",
    fontSize: 7,
    letterSpacing: 1.2,
    color: COLORS.faint,
    textTransform: "uppercase",
  },
  // Section
  sectionHead: { flexDirection: "row", alignItems: "flex-start", marginBottom: 10 },
  sectionIndex: {
    fontFamily: "Courier",
    fontSize: 26,
    color: COLORS.accent,
    marginRight: 12,
    lineHeight: 1,
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 17,
    color: COLORS.ink,
    flex: 1,
    lineHeight: 1.1,
  },
  standfirst: {
    fontSize: 10,
    color: COLORS.muted,
    fontStyle: "italic",
    lineHeight: 1.6,
    marginBottom: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },
  subheading: {
    fontFamily: "Courier",
    fontSize: 11,
    color: COLORS.ink,
    letterSpacing: 0.5,
    marginTop: 14,
    marginBottom: 6,
  },
  paragraph: { fontSize: 10, color: COLORS.body, lineHeight: 1.55, marginBottom: 8 },
  // Formula block (dark)
  formulaBlock: {
    backgroundColor: COLORS.dark,
    borderRadius: 3,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginVertical: 8,
  },
  formulaExpr: { fontFamily: "Courier", fontSize: 11, color: COLORS.darkText, lineHeight: 1.4 },
  formulaCaption: { fontFamily: "Courier", fontSize: 7, color: COLORS.darkFaint, marginTop: 6, lineHeight: 1.4 },
  // List
  listItem: { flexDirection: "row", marginBottom: 5 },
  listMarker: { fontFamily: "Courier", fontSize: 9, color: COLORS.accent, marginRight: 8, width: 10 },
  listText: { fontSize: 10, color: COLORS.body, flex: 1, lineHeight: 1.5 },
  // Callout
  callout: {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
    backgroundColor: "#F4F4F5",
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 10,
  },
  calloutTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: COLORS.ink,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  calloutText: { fontSize: 9.5, color: COLORS.muted, lineHeight: 1.55 },
  // Studio Automation Insight — a narrative "proof" blockquote
  insight: {
    backgroundColor: "#EEF3FF",
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
    paddingVertical: 11,
    paddingHorizontal: 13,
    marginVertical: 12,
  },
  insightLabel: {
    fontFamily: "Courier",
    fontSize: 8,
    color: COLORS.accent,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    marginBottom: 5,
  },
  insightText: { fontSize: 10, color: COLORS.ink, lineHeight: 1.55 },
  // Conversion bridge — full-width dark CTA
  cta: {
    backgroundColor: COLORS.ink,
    borderRadius: 4,
    padding: 20,
    marginTop: 18,
  },
  ctaHeading: {
    fontFamily: "Helvetica-Bold",
    fontSize: 15,
    color: COLORS.paper,
    lineHeight: 1.2,
    marginBottom: 10,
  },
  ctaBody: { fontSize: 9.5, color: COLORS.faint, lineHeight: 1.6, marginBottom: 8 },
  ctaButton: {
    marginTop: 8,
    backgroundColor: COLORS.accent,
    borderRadius: 3,
    paddingVertical: 11,
    paddingHorizontal: 14,
  },
  ctaButtonText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    color: COLORS.paper,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  // Pull quote — editorial pacing device
  pullquote: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.line,
    paddingVertical: 14,
    marginVertical: 14,
  },
  pullquoteText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 14,
    color: COLORS.ink,
    lineHeight: 1.35,
  },
  pullquoteAttr: {
    fontFamily: "Courier",
    fontSize: 7.5,
    color: COLORS.muted,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginTop: 8,
  },
  // Process-flow diagram
  flowRow: { flexDirection: "row", alignItems: "stretch", marginVertical: 4 },
  flowStage: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderTopWidth: 2,
    borderTopColor: COLORS.accent,
    borderRadius: 3,
    backgroundColor: "#FAFBFF",
    padding: 9,
  },
  flowStageLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    color: COLORS.ink,
    marginBottom: 4,
    lineHeight: 1.2,
  },
  flowStageDetail: { fontFamily: "Courier", fontSize: 6.8, color: COLORS.muted, lineHeight: 1.4 },
  flowArrow: {
    width: 16,
    fontFamily: "Helvetica-Bold",
    fontSize: 13,
    color: COLORS.accent,
    textAlign: "center",
    alignSelf: "center",
  },
  // Comparison card (two panes)
  compareRow: { flexDirection: "row", marginVertical: 4 },
  comparePane: { flex: 1, borderWidth: 1, borderColor: COLORS.line, borderRadius: 3, padding: 11 },
  comparePaneTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },
  comparePoint: { flexDirection: "row", marginBottom: 5 },
  comparePointMark: { fontFamily: "Courier", fontSize: 9, marginRight: 6, width: 8 },
  comparePointText: { fontSize: 8.5, color: COLORS.body, flex: 1, lineHeight: 1.45 },
  // Heatmap grid
  heatRow: { flexDirection: "row" },
  heatCornerCell: {
    width: 54,
    backgroundColor: COLORS.dark,
    padding: 6,
    fontFamily: "Courier",
    fontSize: 7.5,
    color: COLORS.darkText,
  },
  heatColHeader: {
    flex: 1,
    backgroundColor: COLORS.dark,
    padding: 6,
    fontFamily: "Courier",
    fontSize: 7.5,
    color: COLORS.darkText,
    textAlign: "center",
  },
  heatRowHeader: {
    width: 54,
    backgroundColor: "#F4F4F5",
    padding: 6,
    fontFamily: "Courier",
    fontSize: 7.5,
    color: COLORS.ink,
    borderTopWidth: 1,
    borderTopColor: COLORS.paper,
  },
  heatCell: {
    flex: 1,
    padding: 6,
    fontFamily: "Courier",
    fontSize: 8,
    color: COLORS.ink,
    textAlign: "center",
    borderWidth: 0.5,
    borderColor: COLORS.paper,
  },
  // Scorecard worksheet (three verdict cards)
  scorecardRow: { flexDirection: "row", marginVertical: 4 },
  scoreCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderTopWidth: 3,
    borderRadius: 3,
    padding: 10,
  },
  scoreRange: { fontFamily: "Courier", fontSize: 14, marginBottom: 3 },
  scoreVerdict: { fontFamily: "Helvetica-Bold", fontSize: 9, color: COLORS.ink, marginBottom: 5 },
  scoreDetail: { fontSize: 7.5, color: COLORS.muted, lineHeight: 1.45 },
  // Table
  tableCaption: { fontFamily: "Courier", fontSize: 7, color: COLORS.muted, marginBottom: 5, lineHeight: 1.4 },
  table: { borderWidth: 1, borderColor: COLORS.line, marginBottom: 10 },
  tableHeaderRow: { flexDirection: "row", backgroundColor: COLORS.dark },
  tableRow: { flexDirection: "row", borderTopWidth: 1, borderTopColor: COLORS.line },
  tableHeaderCell: {
    flex: 1,
    fontFamily: "Courier",
    fontSize: 7.5,
    color: COLORS.darkText,
    padding: 6,
    letterSpacing: 0.4,
  },
  tableCell: { flex: 1, fontFamily: "Courier", fontSize: 8, color: COLORS.body, padding: 6 },
  // Footer
  footer: {
    position: "absolute",
    bottom: 28,
    left: 54,
    right: 54,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
    paddingTop: 6,
  },
  footerText: { fontFamily: "Courier", fontSize: 7, color: COLORS.faint, letterSpacing: 0.8 },
})

function Block({ block }: { block: DossierBlock }) {
  switch (block.type) {
    case "subheading":
      return <Text style={styles.subheading}>{block.text}</Text>
    case "paragraph":
      return <Text style={styles.paragraph}>{block.text}</Text>
    case "formula":
      return (
        <View style={styles.formulaBlock} wrap={false}>
          <Text style={styles.formulaExpr}>{block.expr}</Text>
          {block.caption ? <Text style={styles.formulaCaption}>{block.caption}</Text> : null}
        </View>
      )
    case "list":
      return (
        <View style={{ marginVertical: 4 }}>
          {block.items.map((item, i) => (
            <View key={i} style={styles.listItem}>
              <Text style={styles.listMarker}>{">"}</Text>
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}
        </View>
      )
    case "callout":
      return (
        <View style={styles.callout} wrap={false}>
          <Text style={styles.calloutTitle}>{block.title}</Text>
          <Text style={styles.calloutText}>{block.text}</Text>
        </View>
      )
    case "insight":
      return (
        <View style={styles.insight} wrap={false}>
          <Text style={styles.insightLabel}>{block.label}</Text>
          <Text style={styles.insightText}>{block.text}</Text>
        </View>
      )
    case "cta":
      return (
        <View style={styles.cta} wrap={false}>
          <Text style={styles.ctaHeading}>{block.heading}</Text>
          {block.body.map((paragraph, i) => (
            <Text key={i} style={styles.ctaBody}>
              {paragraph}
            </Text>
          ))}
          <View style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>{block.action}</Text>
          </View>
        </View>
      )
    case "pullquote":
      return (
        <View style={styles.pullquote} wrap={false}>
          <Text style={styles.pullquoteText}>{`\u201C${block.text}\u201D`}</Text>
          {block.attribution ? <Text style={styles.pullquoteAttr}>{block.attribution}</Text> : null}
        </View>
      )
    case "flow":
      return (
        <View wrap={false} style={{ marginVertical: 6 }}>
          {block.caption ? <Text style={styles.tableCaption}>{block.caption}</Text> : null}
          <View style={styles.flowRow}>
            {block.stages.map((stage, i) => (
              <Fragment key={i}>
                <View style={styles.flowStage}>
                  <Text style={styles.flowStageLabel}>{stage.label}</Text>
                  <Text style={styles.flowStageDetail}>{stage.detail}</Text>
                </View>
                {i < block.stages.length - 1 ? <Text style={styles.flowArrow}>{"\u203A"}</Text> : null}
              </Fragment>
            ))}
          </View>
        </View>
      )
    case "compare": {
      const paneColor = (tone: "negative" | "positive") =>
        tone === "positive" ? COLORS.green : COLORS.critical
      const paneMark = (tone: "negative" | "positive") => (tone === "positive" ? "+" : "\u2212")
      return (
        <View wrap={false} style={{ marginVertical: 6 }}>
          {block.caption ? <Text style={styles.tableCaption}>{block.caption}</Text> : null}
          <View style={styles.compareRow}>
            {[block.left, block.right].map((pane, p) => (
              <View
                key={p}
                style={[
                  styles.comparePane,
                  { marginRight: p === 0 ? 8 : 0, borderTopWidth: 2, borderTopColor: paneColor(pane.tone) },
                ]}
              >
                <Text style={[styles.comparePaneTitle, { color: paneColor(pane.tone) }]}>{pane.title}</Text>
                {pane.points.map((point, i) => (
                  <View key={i} style={styles.comparePoint}>
                    <Text style={[styles.comparePointMark, { color: paneColor(pane.tone) }]}>
                      {paneMark(pane.tone)}
                    </Text>
                    <Text style={styles.comparePointText}>{point}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      )
    }
    case "heatmap":
      return (
        <View wrap={false} style={{ marginVertical: 6 }}>
          {block.caption ? <Text style={styles.tableCaption}>{block.caption}</Text> : null}
          <View style={styles.table}>
            <View style={styles.heatRow}>
              <Text style={styles.heatCornerCell}>{block.corner}</Text>
              {block.columns.map((col, i) => (
                <Text key={i} style={styles.heatColHeader}>
                  {col}
                </Text>
              ))}
            </View>
            {block.rows.map((row, r) => (
              <View key={r} style={styles.heatRow}>
                <Text style={styles.heatRowHeader}>{row.header}</Text>
                {row.cells.map((cell, c) => (
                  <Text
                    key={c}
                    style={[
                      styles.heatCell,
                      { backgroundColor: HEAT_TINTS[Math.max(0, Math.min(4, cell.level))] },
                    ]}
                  >
                    {cell.value}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </View>
      )
    case "scorecard": {
      const toneColor = (tone: "good" | "warn" | "critical") =>
        tone === "good" ? COLORS.green : tone === "warn" ? COLORS.warn : COLORS.critical
      return (
        <View wrap={false} style={{ marginVertical: 6 }}>
          {block.caption ? <Text style={styles.tableCaption}>{block.caption}</Text> : null}
          <View style={styles.scorecardRow}>
            {block.cards.map((card, i) => (
              <View
                key={i}
                style={[
                  styles.scoreCard,
                  { marginRight: i < block.cards.length - 1 ? 8 : 0, borderTopColor: toneColor(card.tone) },
                ]}
              >
                <Text style={[styles.scoreRange, { color: toneColor(card.tone) }]}>{card.range}</Text>
                <Text style={styles.scoreVerdict}>{card.verdict}</Text>
                <Text style={styles.scoreDetail}>{card.detail}</Text>
              </View>
            ))}
          </View>
        </View>
      )
    }
    case "table":
      return (
        <View wrap={false} style={{ marginVertical: 6 }}>
          {block.caption ? <Text style={styles.tableCaption}>{block.caption}</Text> : null}
          <View style={styles.table}>
            <View style={styles.tableHeaderRow}>
              {block.columns.map((col, i) => (
                <Text key={i} style={styles.tableHeaderCell}>
                  {col}
                </Text>
              ))}
            </View>
            {block.rows.map((row, r) => (
              <View key={r} style={styles.tableRow}>
                {row.map((cell, c) => (
                  <Text key={c} style={styles.tableCell}>
                    {cell}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </View>
      )
    default:
      return null
  }
}

export function DossierDocument({
  content,
  recipientName,
  generatedOn,
}: {
  content: DossierContent
  recipientName: string
  generatedOn: string
  audience?: Audience
}) {
  return (
    <Document
      title="ClearGuidance Studio — Technical Dossier"
      author="ClearGuidance Studio, Inc."
      subject={content.editionLabel}
    >
      {/* Cover */}
      <Page size="A4" style={styles.coverPage}>
        <View>
          <Text style={styles.coverTag}>:: ClearGuidance Studio — Technical Dossier</Text>
        </View>
        <View>
          <Text style={styles.coverTitle}>The Transparent{"\n"}Valuation Briefing</Text>
          <Text style={styles.coverEdition}>{content.editionLabel}</Text>
          <Text style={styles.coverStandfirst}>{content.coverStandfirst}</Text>
        </View>
        <View style={styles.coverMetaRow}>
          <View style={styles.coverMetaCol}>
            <Text style={styles.coverMetaLabel}>Prepared for</Text>
            <Text style={styles.coverMetaValue}>{recipientName}</Text>
          </View>
          <View style={styles.coverMetaCol}>
            <Text style={styles.coverMetaLabel}>Profile</Text>
            <Text style={styles.coverMetaValue}>{content.audienceLabel}</Text>
          </View>
          <View style={styles.coverMetaCol}>
            <Text style={styles.coverMetaLabel}>Compiled</Text>
            <Text style={styles.coverMetaValue}>{generatedOn}</Text>
          </View>
        </View>
      </Page>

      {/* Section pages */}
      {content.sections.map((section) => (
        <Page key={section.index} size="A4" style={styles.page}>
          <View style={styles.runningHeader} fixed>
            <Text style={styles.runningHeaderText}>ClearGuidance Studio — Technical Dossier</Text>
            <Text style={styles.runningHeaderText}>{content.audienceLabel}</Text>
          </View>

          <View style={styles.sectionHead}>
            <Text style={styles.sectionIndex}>{section.index}</Text>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
          <Text style={styles.standfirst}>{section.standfirst}</Text>

          {section.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}

          <View style={styles.footer} fixed>
            <Text style={styles.footerText}>{content.editionLabel}</Text>
            <Text
              style={styles.footerText}
              render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
            />
          </View>
        </Page>
      ))}
    </Document>
  )
}

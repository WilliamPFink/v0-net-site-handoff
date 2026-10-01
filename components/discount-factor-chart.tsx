// Quantitative-finance visualization for the flagship course card.
// Renders a glowing cobalt discount-factor decay curve — DF(t) = 1 / (1 + r)^t —
// on a faint, muted slate-green coordinate grid, with a neon drop-shadow gradient
// for depth against the obsidian card. Pure, deterministic SVG (no client JS).

type Pt = { x: number; y: number }

// Chart geometry (16:9 viewBox to match the card's aspect-[16/9] container).
const W = 400
const H = 225
const X0 = 46 // left plot edge
const X1 = 380 // right plot edge
const Y_TOP = 28 // maps to DF = 1.0
const Y_BOT = 188 // maps to DF = 0

const RATE = 0.15 // discount rate driving the decay
const STEPS = 10 // years plotted

// Discount-factor points across the time axis.
const POINTS: Pt[] = Array.from({ length: STEPS + 1 }, (_, t) => {
  const df = 1 / Math.pow(1 + RATE, t)
  return {
    x: X0 + (X1 - X0) * (t / STEPS),
    y: Y_TOP + (Y_BOT - Y_TOP) * (1 - df),
  }
})

// Catmull-Rom -> cubic Bézier for a smooth, premium curve.
function smoothPath(pts: Pt[]): string {
  if (pts.length < 2) return ""
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d
}

const LINE_PATH = smoothPath(POINTS)
const AREA_PATH = `${LINE_PATH} L ${X1} ${Y_BOT} L ${X0} ${Y_BOT} Z`

// Horizontal grid values (DF = 1.0, 0.75, 0.5, 0.25) and vertical time ticks.
const H_LINES = [1, 0.75, 0.5, 0.25].map((df) => ({
  df,
  y: Y_TOP + (Y_BOT - Y_TOP) * (1 - df),
}))
const V_LINES = [0, 2, 4, 6, 8, 10].map((t) => ({
  t,
  x: X0 + (X1 - X0) * (t / STEPS),
}))

export function DiscountFactorChart({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role="img"
      aria-label="A glowing cobalt curve plotting an asset's declining discount factor over time on a slate-green coordinate grid."
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Area fill fading from cobalt into transparency */}
        <linearGradient id="dfc-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.30" />
          <stop offset="55%" stopColor="#3B82F6" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </linearGradient>
        {/* Cobalt stroke gradient */}
        <linearGradient id="dfc-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="55%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        {/* Obsidian backdrop for depth inside the plot */}
        <radialGradient id="dfc-bg" cx="32%" cy="22%" r="90%">
          <stop offset="0%" stopColor="#0F1522" />
          <stop offset="100%" stopColor="#0A0A0C" />
        </radialGradient>
        {/* Neon glow / drop-shadow */}
        <filter id="dfc-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor="#3B82F6" floodOpacity="0.55" />
          <feGaussianBlur stdDeviation="0.4" />
        </filter>
        <filter id="dfc-node-glow" x="-120%" y="-120%" width="340%" height="340%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#60A5FA" floodOpacity="0.9" />
        </filter>
      </defs>

      {/* Backdrop */}
      <rect x="0" y="0" width={W} height={H} fill="url(#dfc-bg)" />

      {/* Muted slate-green coordinate grid */}
      <g stroke="#3C5A51" strokeWidth="0.75">
        {H_LINES.map((l) => (
          <line key={`h-${l.df}`} x1={X0} y1={l.y} x2={X1} y2={l.y} strokeOpacity={l.df === 1 ? 0.4 : 0.22} />
        ))}
        {V_LINES.map((l) => (
          <line key={`v-${l.t}`} x1={l.x} y1={Y_TOP} x2={l.x} y2={Y_BOT} strokeOpacity="0.18" />
        ))}
      </g>

      {/* Axes */}
      <g stroke="#4B6B62" strokeWidth="1" strokeOpacity="0.55">
        <line x1={X0} y1={Y_TOP} x2={X0} y2={Y_BOT} />
        <line x1={X0} y1={Y_BOT} x2={X1} y2={Y_BOT} />
      </g>

      {/* Area under the curve */}
      <path d={AREA_PATH} fill="url(#dfc-area)" />

      {/* Glowing discount-factor curve */}
      <path
        d={LINE_PATH}
        fill="none"
        stroke="url(#dfc-line)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#dfc-glow)"
      />

      {/* Endpoint node */}
      <circle cx={POINTS[0].x} cy={POINTS[0].y} r="3" fill="#DBEAFE" filter="url(#dfc-node-glow)" />
      <circle
        cx={POINTS[POINTS.length - 1].x}
        cy={POINTS[POINTS.length - 1].y}
        r="2.6"
        fill="#93C5FD"
        filter="url(#dfc-node-glow)"
      />

      {/* Axis labels + formula (mono, muted) */}
      <g fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#5E8579">
        <text x={X0 - 6} y={Y_TOP + 3} fontSize="8" textAnchor="end">
          1.0
        </text>
        <text x={X0 - 6} y={Y_BOT} fontSize="8" textAnchor="end">
          0
        </text>
        <text x={(X0 + X1) / 2} y={H - 8} fontSize="8" textAnchor="middle" letterSpacing="1.5">
          TIME (YEARS)
        </text>
      </g>
      {/* Discount-factor formula, typeset as a true vertical fraction in a
          textbook-grade math serif: DF(t) = 1 over (1 + r) raised to t.
          The exponent t applies to the whole (1 + r) base, so the parentheses
          are mathematically required and sit around 1 + r with t superscripted
          outside the closing parenthesis. Variables are italic, digits and
          operators upright, per standard LaTeX/KaTeX typesetting. */}
      <g
        fontFamily="'Georgia', 'Cambria', 'Times New Roman', 'Nimbus Roman', serif"
        fill="#A9C0E4"
        letterSpacing="0.2"
      >
        {/* Left-hand side: DF(t) = , vertically centered on the fraction bar */}
        <text x={X1 - 54} y={17.6} fontSize="9.5" textAnchor="end">
          DF(
          <tspan fontStyle="italic">t</tspan>
          ) =
        </text>

        {/* Numerator: 1 (centered over the bar) */}
        <text x={X1 - 23} y={12} fontSize="9.5" textAnchor="middle">
          1
        </text>

        {/* Fraction bar (spans the full width of the denominator) */}
        <line
          x1={X1 - 46}
          y1={15}
          x2={X1}
          y2={15}
          stroke="#A9C0E4"
          strokeWidth="0.9"
          strokeLinecap="round"
        />

        {/* Denominator: (1 + r) with superscript t applied to the whole base */}
        <text x={X1 - 23} y={25.4} fontSize="9.5" textAnchor="middle">
          (1 + <tspan fontStyle="italic">r</tspan>)
          <tspan fontStyle="italic" fontSize="6.5" dy="-3.6">
            t
          </tspan>
        </text>
      </g>
    </svg>
  )
}

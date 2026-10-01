import Image from "next/image"
import type { CourseLevel } from "@/lib/academy-catalog"
import { DiscountFactorChart } from "@/components/discount-factor-chart"

// Bespoke, generated header image per course, keyed by slug. Each is a
// cohesive dark obsidian / cobalt+emerald data-visualization matching the
// Academy page. Courses without a dedicated image fall back to the level-keyed
// SVG visuals below, so the catalog can keep growing without code changes.
const COURSE_IMAGES: Record<string, { src: string; alt: string }> = {
  "investing-foundations": {
    src: "/net/academy-investing-foundations.png",
    alt: "A glowing emerald path rising toward a bright horizon with a sprouting seedling and stacked coins, representing the foundations of investing.",
  },
  "fair-value-dcf": {
    src: "/net/academy-fair-value-dcf.png",
    alt: "A luminous balance scale weighing two orbs beside a decaying discount curve and receding value bars, representing discounted cash flow valuation.",
  },
  "reading-the-chart": {
    src: "/net/academy-reading-the-chart.png",
    alt: "A glowing candlestick price chart with a smooth trend line sweeping upward, representing reading market charts.",
  },
}

// Deterministic header visual for a course card. Prefers a bespoke per-course
// image; otherwise falls back to a level-keyed pure-SVG motif:
// - foundational → a calm rising horizon (approachable on-ramp)
// - intermediate → the glowing DCF discount-factor curve (valuation)
// - advanced     → a candlestick / price-action motif
export function CourseCardVisual({
  level,
  free,
  slug,
}: {
  level: CourseLevel
  free: boolean
  slug?: string
}) {
  const image = slug ? COURSE_IMAGES[slug] : undefined
  if (image) {
    return (
      <Image
        src={image.src || "/placeholder.svg"}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover"
      />
    )
  }

  if (level === "intermediate") {
    return <DiscountFactorChart className="absolute inset-0 w-full h-full" />
  }
  if (level === "advanced") {
    return <CandlestickVisual />
  }
  return <HorizonVisual muted={free} />
}

// Foundational: a soft, rising horizon line on a faint grid — a calm "start here".
function HorizonVisual({ muted }: { muted: boolean }) {
  const stroke = muted ? "#34D399" : "#60A5FA"
  const glow = muted ? "rgba(52,211,153,0.35)" : "rgba(96,165,250,0.35)"
  return (
    <svg
      viewBox="0 0 400 225"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="A calm rising horizon line, representing an approachable starting point."
    >
      <defs>
        <radialGradient id="horizon-bg" cx="50%" cy="18%" r="90%">
          <stop offset="0%" stopColor="#10231C" />
          <stop offset="100%" stopColor="#0A0A0C" />
        </radialGradient>
        <linearGradient id="horizon-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={glow} />
          <stop offset="100%" stopColor="rgba(10,10,12,0)" />
        </linearGradient>
        <filter id="horizon-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="400" height="225" fill="url(#horizon-bg)" />

      {/* faint slate grid */}
      {[56, 113, 169].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="#1E3A34" strokeWidth="0.6" opacity="0.5" />
      ))}
      {[100, 200, 300].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="225" stroke="#1E3A34" strokeWidth="0.6" opacity="0.5" />
      ))}

      {/* rising horizon */}
      <path d="M 0 175 C 110 165, 170 120, 260 95 S 360 55, 400 44 L 400 225 L 0 225 Z" fill="url(#horizon-fill)" />
      <path
        d="M 0 175 C 110 165, 170 120, 260 95 S 360 55, 400 44"
        fill="none"
        stroke={stroke}
        strokeWidth="2.4"
        strokeLinecap="round"
        filter="url(#horizon-glow)"
      />
      <circle cx="400" cy="44" r="3.2" fill={stroke} filter="url(#horizon-glow)" />
    </svg>
  )
}

// Advanced: a compact candlestick sequence — the price-action / market motif.
function CandlestickVisual() {
  const up = "#34D399"
  const down = "#60A5FA"
  // [x, wickTop, bodyTop, bodyBottom, wickBottom, direction]
  const candles: [number, number, number, number, number, "up" | "down"][] = [
    [46, 70, 92, 140, 158, "down"],
    [90, 78, 96, 128, 150, "up"],
    [134, 60, 82, 120, 138, "down"],
    [178, 66, 90, 118, 140, "up"],
    [222, 48, 70, 104, 126, "up"],
    [266, 58, 74, 110, 132, "down"],
    [310, 40, 58, 92, 116, "up"],
    [354, 34, 50, 84, 108, "up"],
  ]
  return (
    <svg
      viewBox="0 0 400 225"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="A sequence of candlesticks representing market price action."
    >
      <defs>
        <radialGradient id="candle-bg" cx="50%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#0E1726" />
          <stop offset="100%" stopColor="#0A0A0C" />
        </radialGradient>
        <filter id="candle-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="400" height="225" fill="url(#candle-bg)" />

      {[56, 113, 169].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="#1E293B" strokeWidth="0.6" opacity="0.5" />
      ))}

      <g filter="url(#candle-glow)">
        {candles.map(([x, wt, bt, bb, wb, dir]) => {
          const color = dir === "up" ? up : down
          return (
            <g key={x}>
              <line x1={x} y1={wt} x2={x} y2={wb} stroke={color} strokeWidth="1.4" />
              <rect
                x={x - 9}
                y={bt}
                width="18"
                height={Math.max(bb - bt, 2)}
                rx="1.5"
                fill={dir === "up" ? color : "#0A0A0C"}
                stroke={color}
                strokeWidth="1.4"
              />
            </g>
          )
        })}
      </g>
    </svg>
  )
}

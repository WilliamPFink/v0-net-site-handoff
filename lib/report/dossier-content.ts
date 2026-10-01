// Content model for the ClearGuidance Studio Technical Dossier.
//
// The dossier is a human-first, narrative-driven institutional briefing whose
// framing is compiled on the fly from the lead's audience profile. Sections are
// numbered 1..5 (no "Section 0"). The mathematical frameworks are identical
// across editions (transparency is the point); the narrative, emphasis, and the
// Section 5 audit differ by edition. Rendered to PDF by dossier-document.tsx.

export type Audience = "investor" | "advisor"

// A single pane of a side-by-side comparison card.
export type ComparePane = {
  title: string
  tone: "negative" | "positive"
  points: string[]
}

// One row of the sensitivity heatmap. Each cell carries a shading `level`
// (0 = coolest / lowest value, 4 = warmest / highest value).
export type HeatRow = { header: string; cells: { value: string; level: number }[] }

// One verdict card in the friction scorecard worksheet.
export type ScoreCard = {
  range: string
  verdict: string
  detail: string
  tone: "good" | "warn" | "critical"
}

export type DossierBlock =
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "formula"; expr: string; caption?: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; title: string; text: string }
  | { type: "table"; caption?: string; columns: string[]; rows: string[][] }
  // A narrative-supporting "proof" blockquote that reframes manual labor as
  // friction the platform removes.
  | { type: "insight"; label: string; text: string }
  // A large editorial pull quote used to pace the long-form narrative.
  | { type: "pullquote"; text: string; attribution?: string }
  // A minimalist left-to-right process-flow diagram (e.g. the multi-stage DCF).
  | { type: "flow"; caption?: string; stages: { label: string; detail: string }[] }
  // A side-by-side two-pane comparison card.
  | { type: "compare"; caption?: string; left: ComparePane; right: ComparePane }
  // A 2D sensitivity grid with subtle heatmap shading.
  | { type: "heatmap"; caption?: string; corner: string; columns: string[]; rows: HeatRow[] }
  // The three-card verdict worksheet for the friction audit.
  | { type: "scorecard"; caption?: string; cards: ScoreCard[] }
  // A full-width, high-impact conversion bridge — Section 5 only.
  | { type: "cta"; heading: string; body: string[]; action: string }

export type DossierSection = {
  index: string
  title: string
  standfirst: string
  blocks: DossierBlock[]
}

export type DossierContent = {
  editionLabel: string
  audienceLabel: string
  coverStandfirst: string
  sections: DossierSection[]
}

const EDITION_LABEL: Record<Audience, string> = {
  investor: "Asset Value & Opportunity Evaluation Edition",
  advisor: "Institutional Workflow & Asset Insulation Edition",
}

const AUDIENCE_LABEL: Record<Audience, string> = {
  investor: "Individual Investor",
  advisor: "Wealth Manager / Advisor",
}

const COVER_STANDFIRST: Record<Audience, string> = {
  investor:
    "A transparent, mathematics-first briefing for the independent investor who intends to value assets directly, quantify downside, and evaluate opportunities without deferring to an opaque black box.",
  advisor:
    "An institutional briefing for the wealth manager evaluating a transparent, native alternative to restrictive legacy TAMPs — engineered for defensible methodology, workflow efficiency, and asset insulation.",
}

// ---- Section 1: Executive Briefing ----------------------------------------

function section1(audience: Audience): DossierSection {
  return {
    index: "01",
    title: "Executive Briefing & The Institutional Contrast",
    standfirst:
      "A synthesis of the thesis, the philosophy, and the proof framework that follows — the case for auditable, first-principles valuation over the un-auditable score.",
    blocks: [
      { type: "subheading", text: "1.1  Executive Summary" },
      {
        type: "paragraph",
        text:
          audience === "advisor"
            ? "Modern wealth management runs on numbers that cannot be defended. Ratings arrive without derivations, model portfolios shift without explanation, and the moment a client asks why, the advisor is left defending a figure they did not build. The un-auditable score is not a convenience; it is a structural liability sitting quietly at the center of the practice."
            : "Modern investing runs on the black-box score: a red arrow, a green arrow, a proprietary 'strength' rating out of ten — delivered with total authority and zero explanation of how it was produced. It is asked to be trusted, funded, and believed, all without ever being shown. A number you cannot reconstruct is not analysis. It is a rumor with a decimal point.",
      },
      {
        type: "paragraph",
        text: "This briefing exists to synthesize a single thesis: that the opaque score fails not because its authors are careless, but because opacity itself is the failure. A valuation that cannot be reconstructed cannot be stress-tested, cannot be defended when the regime turns, and cannot teach its holder anything. Explicit logic is not a stylistic preference — it is the only form of analysis that survives contact with a crisis.",
      },
      {
        type: "paragraph",
        text: "The remedy is democratization of the genuine machinery. The same first-principles valuation engines that institutions have kept behind five-figure licenses — multi-stage discounted cash flow, capital-asset pricing, probability-weighted scenario resolution — are rendered here in full, with every input exposed and adjustable. What follows moves in four deliberate movements: the genesis and mechanics of control, the explicit valuation ledger, the macro-resilience and psychological framework, and finally a portfolio audit you can run against your own holdings. Read it with a calculator open; every figure is designed to be reproduced.",
      },
      { type: "subheading", text: "1.2  The Institutional Contrast" },
      {
        type: "paragraph",
        text: "Before a single formula, understand the choice in front of you. The matrix below is the entire thesis compressed into two columns — the world being sold, against the framework this briefing describes.",
      },
      {
        type: "table",
        caption: "Figure 1.1: Contrast Matrix — the opaque industry standard versus the transparent framework.",
        columns: ["The Opaque Industry Standard", "The ClearGuidance Framework"],
        rows: [
          ["Fragile, hidden assumptions", "Explicit, auditable ledgers"],
          ["Blind trust in a black-box score", "First-principles math you reconstruct"],
          ["Fragmented, multi-vendor tools", "A single, unified modeling surface"],
          ["One optimistic forward scenario", "Macro-stress-tested resilience"],
          ["Opacity defended as proprietary", "Transparency offered as proof"],
        ],
      },
      {
        type: "callout",
        title: "Reproducibility standard",
        text: "Every formula in this dossier uses only inputs that are visible and adjustable inside the platform. If a figure cannot be reconstructed from disclosed inputs, it does not ship. That is the standard this document is written to.",
      },
    ],
  }
}

// ---- Section 2: The Genesis & The Mechanics of Control --------------------

function section2(audience: Audience): DossierSection {
  return {
    index: "02",
    title: "The Genesis & The Mechanics of Control",
    standfirst:
      "Why the platform was built, and the labor trap it was built to destroy — from the institutional moat to the fragile spreadsheet that fails precisely where you cannot see it.",
    blocks: [
      { type: "subheading", text: "2.1  The Genesis — Confronting the Institutional Moat" },
      {
        type: "paragraph",
        text: "This platform was not born from a product roadmap. It was born from an irritation that hardened into a conviction: the most powerful tools in finance — the first-principles valuation engines that actually resolve what an asset is worth — have been deliberately walled off from the people with the most at stake. The wall is not accidental. It is a moat, dug and maintained, and for decades it has done exactly what it was designed to do.",
      },
      {
        type: "paragraph",
        text: "On one side of that moat sits the institution: discounted-cash-flow models, capital-asset pricing, multi-stage growth fades, probability-weighted scenario analysis — the genuine machinery of valuation, running quietly inside terminals that cost more per year than most families spend on a car. On the other side sits everyone else, handed a consolation prize dressed up as insight: the star rating, the color-coded arrow, the proprietary score that compresses a company's entire future into a single digit and refuses, on principle, to explain itself. One side is given mathematics. The other is given a mood ring.",
      },
      {
        type: "pullquote",
        text:
          audience === "advisor"
            ? "If the methodology is sound, it can survive being shown. Everything here proceeds from that single, defiant idea."
            : "You were never incapable of handling the real math. You were simply never allowed near it.",
      },
      {
        type: "paragraph",
        text:
          audience === "advisor"
            ? "ClearGuidance Studio was engineered to fill that moat and level the ground — to place the institution's own analytical rigor into the hands of the independent advisor without the gatekeeping, the licensing theater, or the opacity that legacy platforms rely on to justify their fees. True analytical parity, delivered natively, is the entire premise."
            : "ClearGuidance Studio was engineered to fill that moat and level the ground — to place the institution's own analytical rigor directly into the hands of the individual investor, with nothing withheld and nothing dumbed down. True analytical parity, delivered natively, is the entire premise. This platform ends the arrangement that kept you out.",
      },
      { type: "subheading", text: "2.2  The Spreadsheet Trap and the Unified Surface" },
      {
        type: "paragraph",
        text: "There is a second wall, quieter than the first, and it traps even the investors determined enough to do the work themselves. It is the spreadsheet. Anyone who has tried to build a real valuation by hand knows the ritual: the sprawling grid of cells, the hand-keyed cash-flow assumptions, the discount-rate block wired into a dozen dependent formulas, the terminal-value calculation balanced precariously at the end of a ten-year fade. It works — until it doesn't.",
      },
      {
        type: "paragraph",
        text: "Because the spreadsheet is a trap disguised as a tool. A single mis-referenced cell, one dragged formula that silently shifts its anchor, one transposed digit in a growth rate, and the entire valuation is quietly, invisibly wrong. There is no error message. There is only a confident number that happens to be false — the most dangerous output in all of finance. Hours of labor produce not conviction but fragility, and the fragility hides precisely where you are least equipped to see it.",
      },
      {
        type: "compare",
        caption: "Figure 2.1: The architecture of control — fragility replaced by a unified surface.",
        left: {
          title: "Fragile Spreadsheet Architecture",
          tone: "negative",
          points: [
            "One mis-referenced cell silently corrupts the entire valuation.",
            "Hours of manual assembly before a single decision is made.",
            "Formula logic buried across hundreds of opaque cells.",
            "Breaks the moment a new ticker or assumption is introduced.",
          ],
        },
        right: {
          title: "Unified Terminal Surface",
          tone: "positive",
          points: [
            "Data sourcing and calculus resolve instantly, for any ticker.",
            "Every assumption stays exposed, labeled, and adjustable.",
            "The full model recalculates the moment an input moves.",
            "Attention returns to strategy — not spreadsheet maintenance.",
          ],
        },
      },
      {
        type: "insight",
        label: "Studio Automation Insight",
        text: "The spreadsheet forces you to spend ninety percent of your effort keeping fragile plumbing from leaking, and ten percent actually thinking. The unified surface inverts that ratio. Data sourcing and calculus are instantaneous and reliable, so your entire attention returns to the strategic toggles and stress tests that determine whether you win — not whether cell F47 still points where it should.",
      },
    ],
  }
}

// ---- Section 3: The Explicit Valuation Ledger -----------------------------

function section3(audience: Audience): DossierSection {
  return {
    index: "03",
    title: "The Explicit Valuation Ledger",
    standfirst:
      "A price target handed down without its derivation is a rumor with a decimal point. This section replaces the rumor with an engine you can audit line by line.",
    blocks: [
      { type: "subheading", text: "3.1  The DCF & CAPM Framework" },
      {
        type: "paragraph",
        text: "Retail investing runs on the target price: a single, confident number pinned to an asset by someone who will never show their work. It feels like precision; it is anything but. That number rests on a stack of buried assumptions — a growth rate, a discount rate, a terminal multiple — and the instant a macro regime shifts beneath it, the target collapses without warning and without accountability.",
      },
      {
        type: "paragraph",
        text:
          audience === "advisor"
            ? "For a fiduciary, that fragility is a liability. Defensibility does not begin with a conclusion; it begins with the explicit logic that produces one. The engines below are published in full so that every client-facing figure can be traced to a first-principles derivation rather than a proprietary score."
            : "The alternative is not a better guru with a better guess. It is explicit logic you own. When you can see exactly which assumptions produce a valuation, a sudden move in rates or growth stops being a catastrophe and becomes a variable you can test. The engines below are published in full — nothing proprietary is withheld.",
      },
      {
        type: "paragraph",
        text: "Intrinsic value is resolved through a multi-stage Discounted Cash Flow framework. Explicit-period free cash flows are discounted to present value, then supplemented by a terminal value capturing all cash flows beyond the forecast horizon.",
      },
      {
        type: "formula",
        expr: "PV = Σ [ FCF_t / (1 + r)^t ]   for t = 1 … N",
        caption: "Present value of explicit-period free cash flows.",
      },
      {
        type: "formula",
        expr: "TV_N = ( FCF_N × (1 + g) ) / ( r − g )",
        caption: "Gordon-growth terminal value at the end of the explicit horizon.",
      },
      {
        type: "formula",
        expr: "Intrinsic Value = PV(explicit FCF) + TV_N / (1 + r)^N",
        caption: "Total intrinsic value: discounted explicit flows plus discounted terminal value.",
      },
      {
        type: "paragraph",
        text: "The discount rate r is assembled transparently from a capital-asset framework rather than assumed. Each input is user-visible and adjustable, so sensitivity to any single assumption can be isolated instantly.",
      },
      {
        type: "formula",
        expr: "r = R_f + β × ( E[R_m] − R_f )",
        caption: "Cost of equity via the Capital Asset Pricing Model.",
      },
      {
        type: "flow",
        caption: "Figure 3.1: The multi-stage DCF architecture, resolved end to end inside the terminal.",
        stages: [
          { label: "Stage I — High Growth", detail: "Years 1–5 · company-specific g₁ · full CAPM discount r" },
          { label: "Stage II — Linear Fade", detail: "Years 6–10 · g₁ fades linearly to g∞ · full CAPM discount r" },
          { label: "Terminal — Gordon Growth", detail: "Year 10+ · perpetual g∞ · capitalized, then discounted to PV" },
        ],
      },
      {
        type: "insight",
        label: "Studio Automation Insight",
        text: "Sourcing the data and calculating a multi-stage linear fade by hand means building and maintaining a fragile spreadsheet for hours — one broken cell from a wrong answer. The ClearGuidance Terminal automates this entire calculus instantly, for any equity ticker, with every assumption still exposed and adjustable.",
      },
      { type: "subheading", text: "3.2  The Margin of Safety" },
      {
        type: "paragraph",
        text: "Intrinsic value is necessary but insufficient. The platform quantifies the buffer between price and value through an explicit Margin of Safety (MoS) factor, isolating downside vulnerability and flagging over-valued premium risk before capital is committed.",
      },
      {
        type: "formula",
        expr: "MoS = ( Intrinsic Value − Market Price ) / Intrinsic Value",
        caption: "Margin of Safety expressed as a proportion of intrinsic value.",
      },
      {
        type: "list",
        items: [
          "MoS ≥ +0.30 — meaningful discount to derived value; downside buffer present.",
          "MoS between −0.10 and +0.30 — fairly valued band; conviction depends on assumption stability.",
          "MoS ≤ −0.10 — premium-risk zone; the platform flags elevated sensitivity to growth and rate inputs.",
        ],
      },
      { type: "subheading", text: "3.3  A Worked Valuation Walk" },
      {
        type: "paragraph",
        text: "The table below traces a single hypothetical asset through the full ledger — explicit free cash flows discounted year by year, a terminal value appended at the horizon, and a resulting intrinsic value compared to price. All figures are illustrative and exist only to demonstrate the mechanics; they are not a recommendation.",
      },
      {
        type: "table",
        caption: "Figure 3.2: Illustrative DCF walk — r = 9.0%, terminal g = 3.0%. Values indexed, not currency.",
        columns: ["Year", "FCF", "Discount factor", "PV of FCF"],
        rows: [
          ["1", "100.0", "0.917", "091.7"],
          ["2", "108.0", "0.842", "090.9"],
          ["3", "116.6", "0.772", "090.0"],
          ["4", "125.9", "0.708", "089.2"],
          ["5", "136.0", "0.650", "088.4"],
          ["TV", "2335.0", "0.650", "1517.8"],
        ],
      },
      {
        type: "callout",
        title: "Narrative Takeaway",
        text: "Summing the discounted explicit flows (≈450.2) with the discounted terminal value (≈1517.8) yields an intrinsic value near 1968 — against an illustrative price of 1500, a Margin of Safety of roughly +0.24. Note that the terminal row alone contributes the majority of that value. This is the structural signature of every long-horizon DCF: the distant future dominates the present verdict, which is exactly why Section 4 stress-tests the terminal assumptions rather than the near-term flows. That is where valuation fragility concentrates.",
      },
    ],
  }
}

// ---- Section 4: Macro Resilience & Downside Psychology --------------------

function section4(audience: Audience): DossierSection {
  return {
    index: "04",
    title: "Defending Capital Against Macro Fragility",
    standfirst:
      "True resilience is not a hopeful forward scenario. It is knowing exactly where an asset breaks — before history, or your own psychology, forces the lesson on you.",
    blocks: [
      { type: "subheading", text: "4.1  Multi-Variable Stress Testing" },
      {
        type: "paragraph",
        text: "Every valuation is a bet on a regime. A number that looks bulletproof in a decade of cheap money can be quietly hollow the moment rates rise, liquidity contracts, or inflation returns. So the platform refuses the single forward estimate. Instead of one confident line, it builds a surface: it sweeps free-cash-flow growth rates against a vector of discount rates, exposing exactly how fragile or robust a valuation is to the two assumptions that dominate every DCF.",
      },
      {
        type: "heatmap",
        caption:
          "Figure 4.1: Sensitivity surface — intrinsic value index by growth (rows) and discount rate (columns). Warmer shading marks higher resolved value.",
        corner: "g \\ r",
        columns: ["6.0%", "7.5%", "9.0%", "10.5%"],
        rows: [
          { header: "2.0%", cells: [{ value: "128", level: 2 }, { value: "108", level: 1 }, { value: "094", level: 1 }, { value: "083", level: 0 }] },
          { header: "3.0%", cells: [{ value: "146", level: 2 }, { value: "121", level: 1 }, { value: "103", level: 1 }, { value: "090", level: 0 }] },
          { header: "4.0%", cells: [{ value: "171", level: 3 }, { value: "138", level: 2 }, { value: "115", level: 1 }, { value: "099", level: 1 }] },
          { header: "5.0%", cells: [{ value: "209", level: 4 }, { value: "162", level: 3 }, { value: "132", level: 2 }, { value: "111", level: 1 }] },
        ],
      },
      {
        type: "paragraph",
        text: "Reading the grid diagonally reveals the offset structure of the valuation: where a small upward drift in the discount rate can be absorbed by modest growth, the asset is structurally resilient; where it cannot, the platform flags convexity risk.",
      },
      { type: "subheading", text: "4.2  Historical Lookback & Scenario Resolution" },
      {
        type: "paragraph",
        text: "The lookback module replays how comparable allocation structures behaved through documented macro regimes — interest-rate hiking cycles, liquidity contractions, and pre-2000 inflationary shocks — so that resilience is evaluated against real history rather than a smooth forward assumption.",
      },
      {
        type: "table",
        caption: "Figure 4.2: Historical regime lookback — qualitative stress mapping across documented inflection points.",
        columns: ["Regime", "Dominant pressure", "Structure tested"],
        rows: [
          ["Rate hiking cycle", "Rising discount rate r", "Terminal-value sensitivity"],
          ["Liquidity contraction", "Multiple compression", "Cash-flow durability"],
          ["Pre-2000 inflation shock", "Real-return erosion", "Growth-vs-discount offset"],
        ],
      },
      {
        type: "paragraph",
        text: "The sensitivity surface and the historical lookback converge in a single probability-weighted expected value. Rather than committing to one forecast, the platform assigns explicit probabilities to a discrete set of scenarios and resolves an expected intrinsic value the user can interrogate scenario by scenario.",
      },
      {
        type: "formula",
        expr: "E[V] = Σ [ p_i × V_i ]   with   Σ p_i = 1",
        caption: "Probability-weighted expected intrinsic value across scenarios i.",
      },
      {
        type: "table",
        caption: "Figure 4.3: Scenario Resolution Matrix — expected value contribution by regime.",
        columns: ["Scenario", "Prob. p", "Value V", "p × V"],
        rows: [
          ["Base", "0.50", "1968", "0984"],
          ["Rate shock", "0.25", "1520", "0380"],
          ["Liquidity stress", "0.15", "1290", "0194"],
          ["Expansion", "0.10", "2410", "0241"],
        ],
      },
      {
        type: "callout",
        title: "Narrative Takeaway",
        text: "The weighted sum (≈1799) sits below the base-case 1968, quantifying the drag that downside scenarios exert on expected value. Making that drag explicit — rather than burying it in a single point estimate — is what separates a stress-aware valuation from an optimistic one. You are no longer holding a hope; you are holding a distribution you can defend.",
      },
      { type: "subheading", text: "4.3  The Psychological Deficit — Achieving Downside Command" },
      {
        type: "paragraph",
        text: "Everything to this point has been mathematics. But the deepest failure in investing is rarely mathematical — it is psychological, and it detonates at the worst possible moment. The market falls twelve percent in a week. The headlines turn apocalyptic. A position researched carefully in calm daylight is suddenly a red number bleeding on the screen at midnight, and the animal part of the brain — older and louder than any spreadsheet — begins to scream a single instruction: sell, now, before it gets worse. This is the psychological deficit. It is where fortunes are quietly surrendered, not to bad analysis, but to good analysis abandoned under pressure.",
      },
      {
        type: "paragraph",
        text: "The deficit exists because uncertainty is intolerable to the human nervous system. When you do not know what an asset is worth, every downward tick feels like confirmation of catastrophe, and panic rushes in to fill the vacuum where conviction should be. You cannot reason your way out of that state in the moment; the moment is precisely when reasoning goes offline. The only defense is one you must build beforehand — a floor established in advance, mathematically, so that when the storm arrives you are reading a map instead of inventing one.",
      },
      {
        type: "pullquote",
        text: "The decline stops being an abyss and becomes a coordinate. You already priced this.",
      },
      {
        type: "paragraph",
        text: "This is the quiet, and perhaps the most important, function of the multi-variable surfaces in this section. They are not merely analytical instruments; they are instruments of emotional insulation. When a position falls, you do not face a void — you face a stress matrix you already built, a probability-weighted expected value you already resolved, and an intrinsic-value floor you can see beneath the price. You know, before the market opens, exactly which scenarios you priced, exactly where your margin of safety absorbs the shock, and exactly at what level the mathematics says fear has overshot value.",
      },
      {
        type: "paragraph",
        text:
          audience === "advisor"
            ? "For the advisor, this is the difference between a client who calls in a panic demanding liquidation and a client you can walk calmly through a surface you prepared together in advance. Downside command is not stoicism; it is infrastructure. A transparent floor value, shown and understood before volatility strikes, converts the client's fear into a conversation — and converts your practice from a hostage of sentiment into a steward of process. Panic is expensive. A mathematical floor, established in daylight, is the cheapest insurance a fiduciary can hold."
            : "This is what it means to achieve downside command. Not the absence of fear — fear is human and permanent — but the presence of something stronger than fear at the exact moment you need it: a transparent, mathematical floor you established yourself, in daylight, with a clear head. When the panic comes, and it will come, you are no longer improvising. You are executing a decision you already made, against numbers you already trust. That is how a transparent process converts the market's worst days from moments of surrender into moments of calculated, deliberate execution.",
      },
      {
        type: "callout",
        title: "Insulation, not prediction",
        text: "The platform cannot tell you the future, and it never pretends to. What it does is remove the vacuum that panic exploits — replacing 'I don't know how bad this is' with 'I priced this scenario, and here is the floor.' Certainty about your own framework is the only certainty that survives a crisis.",
      },
    ],
  }
}

// ---- Section 5: Strategic Portfolio Audit & Action ------------------------

function section5(audience: Audience): DossierSection {
  const investorIntro: DossierBlock[] = [
    {
      type: "paragraph",
      text: "During your session, we highlighted the invisible tax, fee, and opacity drags quietly eroding your compounding returns. Now that you are reviewing this brief away from the platform, take five minutes to contrast your current primary holdings against the standard below. The distance is the danger.",
    },
    {
      type: "list",
      items: [
        "Fee drag: total expense ratios, advisory fees, and platform fees expressed as a single annual friction percentage.",
        "Tax exposure: unrealized-gain concentration and turnover-driven taxable events across the portfolio.",
        "Opacity risk: positions whose valuation basis you cannot personally reconstruct from first principles.",
        "Concentration: single-name and single-factor exposure relative to your stated risk tolerance.",
        "Un-stress-tested holdings: positions never mapped against the Section 4 inflection matrix.",
      ],
    },
  ]

  const advisorIntro: DossierBlock[] = [
    {
      type: "paragraph",
      text: "During your session, we highlighted the invisible platform, methodology, and workflow drags quietly eroding both your margins and your defensibility. Now that you are reviewing this brief away from the platform, take five minutes to contrast your current practice infrastructure against the standard below. The gaps are where fiduciary risk hides.",
    },
    {
      type: "list",
      items: [
        "Platform friction: layered TAMP, custodial, and program fees expressed as a single client-facing friction percentage.",
        "Methodology defensibility: proportion of client-facing figures you can trace to a disclosed formula on demand.",
        "Workflow disruption: number of disconnected systems required to move from research to a client-ready allocation.",
        "Data integration: manual re-keying steps between your research surface and your reporting surface.",
        "Insulation gaps: client allocations never mapped against the Section 4 historical inflection matrix.",
      ],
    },
  ]

  const cta: DossierBlock = {
    type: "cta",
    heading:
      audience === "advisor"
        ? "Your Terminal Instance Is Provisioned and Waiting"
        : "Your Terminal Instance Is Provisioned and Waiting",
    body:
      audience === "advisor"
        ? [
            "Because you verified your advisor profile during your session, your dedicated ClearGuidance Studio terminal instance is already provisioned — configured to the Institutional Workflow edition and held for your return.",
            "This dossier proved the methodology on paper. The terminal turns that verification into a fluid, single-surface daily discipline — the transparent valuation ledgers, the historical inflection matrix, and the workflow that retires the disconnected stack. Nothing further is required to begin; simply reengage the session you already started.",
          ]
        : [
            "Because you verified your profile during your session, your dedicated ClearGuidance Studio terminal instance is already provisioned — configured to your edition and held for your return.",
            "This dossier proved the methodology on paper. The terminal turns that verification into live, daily practice — the transparent valuation ledgers, the sensitivity surfaces, and the Academy training that turns diagnosis into discipline. Nothing further is required to begin; simply reengage the session you already started.",
          ],
    action: "Reengage Your Session — Open Your ClearGuidance Terminal",
  }

  return {
    index: "05",
    title: "Strategic Portfolio Audit & Action",
    standfirst:
      "An actionable audit you can run immediately — designed for this exact moment, away from the platform, with your real holdings in front of you — and the single step that follows.",
    blocks: [
      { type: "subheading", text: "5.1  Friction Discovery" },
      ...(audience === "advisor" ? advisorIntro : investorIntro),
      {
        type: "callout",
        title: audience === "advisor" ? "The operational risk of opacity" : "The cost of an opaque process",
        text:
          audience === "advisor"
            ? "A practice built on un-stress-tested, black-box programs carries a fiduciary tail risk that only becomes visible during an inflection point — precisely when it is most expensive. Transparent, native modeling converts that latent risk into a defensible, repeatable process."
            : "Every position you cannot value yourself is a position you are trusting someone else to have valued correctly — and to keep valuing correctly through the next inflection point. This audit makes that dependency explicit so you can decide whether it is one you want to keep.",
      },
      { type: "subheading", text: "5.2  The Friction Scorecard Worksheet" },
      {
        type: "paragraph",
        text: "Score each dimension from 0 (fully transparent, negligible drag) to 3 (opaque, material drag), then sum the column and locate your structure in the verdict cards below.",
      },
      {
        type: "table",
        caption: "Figure 5.1: Friction scoring rubric — apply to your current position and sum the column.",
        columns: ["Dimension", "0 — clean", "3 — material drag"],
        rows: [
          ["Fee / platform drag", "< 0.25% all-in", "> 1.00% all-in"],
          ["Methodology opacity", "Fully reconstructable", "Black-box score"],
          ["Workflow fragmentation", "Single surface", "4+ disconnected systems"],
          ["Stress-test coverage", "All positions mapped", "None mapped"],
        ],
      },
      {
        type: "scorecard",
        caption: "Figure 5.2: Locate your summed score. The verdict is the honest reading of your structural exposure.",
        cards: [
          {
            range: "0 – 3",
            verdict: "Optimally Insulated",
            detail: "Capital is structurally defended and every position is auditable. Maintain the discipline.",
            tone: "good",
          },
          {
            range: "4 – 7",
            verdict: "Moderate Vulnerability",
            detail: "You are quietly leaking yield to opacity and layered fees. The drag compounds silently.",
            tone: "warn",
          },
          {
            range: "8 +",
            verdict: "Critical Exposure",
            detail: "Structurally unprotected against the next macro regime shift. The exposure will not announce itself until the regime turns.",
            tone: "critical",
          },
        ],
      },
      { type: "subheading", text: "5.3  Strategic Conclusion & Session Re-Engagement" },
      {
        type: "paragraph",
        text: "Step back from the figures and see the whole shape of the argument. The opaque score fails because it cannot be reconstructed. Explicit logic succeeds because it can be audited, stress-tested, and — when the regime turns and the screen bleeds red — trusted. Every section of this dossier has been a single claim viewed from a different angle: that transparency is not a feature of good analysis, it is the definition of it.",
      },
      {
        type: "paragraph",
        text:
          audience === "advisor"
            ? "You now hold the methodology in full. The scorecard you just completed is the distance between the practice you have and the defensible, single-surface discipline you could operate tomorrow. That distance is not permanent — it is one decision wide."
            : "You now hold the methodology in full. The scorecard you just completed is the distance between the portfolio you have and the transparent, defended one you could hold tomorrow. That distance is not permanent — it is one decision wide.",
      },
      cta,
    ],
  }
}

export function getDossierContent(audience: Audience): DossierContent {
  return {
    editionLabel: EDITION_LABEL[audience],
    audienceLabel: AUDIENCE_LABEL[audience],
    coverStandfirst: COVER_STANDFIRST[audience],
    sections: [section1(audience), section2(audience), section3(audience), section4(audience), section5(audience)],
  }
}

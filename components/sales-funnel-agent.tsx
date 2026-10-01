"use client"

import { useActionState, useEffect, useMemo, useRef, useState, type FormEvent } from "react"
import Image from "next/image"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import {
  CornerDownLeft,
  TrendingUp,
  Terminal,
  ArrowRight,
  X,
  MessageSquare,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Download,
} from "lucide-react"
import { OFFERING_URL } from "@/lib/links"
import { submitSubscriberLead, type SubscribeState } from "@/app/actions/subscribe"

type Audience = "investor" | "advisor"

const INITIAL_SUBSCRIBE_STATE: SubscribeState = { status: "idle", message: "" }

// Sarah's headshot. Swap this file (public/sarah-avatar.png) with a new
// headshot image to update her avatar everywhere it appears.
const SARAH_AVATAR = "/sarah-avatar.png"
const SARAH_GREETING =
  "Hi, I'm Annett, your personal ClearGuidance specialist. I'm here to help."

type AudienceConfig = {
  label: string
  welcome: string
  // A curated pool of on-brand starter questions. Three are shown per session
  // (see pickChips) and rotated so repeat visitors don't see the same trio.
  chipPool: string[]
  cta: string
}

const AUDIENCE_CONFIG: Record<Audience, AudienceConfig> = {
  investor: {
    label: "For Investors",
    welcome:
      "ClearGuidance terminal online. Select an inquiry below or type a command to evaluate a position.",
    chipPool: [
      "Evaluate a business",
      "What are the three pillars?",
      "Which tier fits me?",
      "How do you calculate intrinsic value?",
      "Show me the Margin of Safety",
      "Is this a black box?",
      "What's inside the free dossier?",
      "How is this different from a stock screener?",
      "Can I stress-test a position?",
      "Does it run on my iPad?",
    ],
    cta: "Start Investor Trial",
  },
  advisor: {
    label: "For Advisors",
    welcome:
      "Advisor console ready. Choose a workflow below or type a command to model a client scenario.",
    chipPool: [
      "Advisor workflow",
      "Replacing legacy TAMPs",
      "Advisor Pro tier",
      "How does client onboarding work?",
      "Is it compliant for my practice?",
      "Can I model a client scenario?",
      "What's in the advisor dossier?",
      "How does data integration work?",
      "Show me portfolio insulation",
      "Does it scale across my book?",
    ],
    cta: "Get Advisor Beta Access",
  },
}

// Pick three starter questions from a pool, avoiding the trio shown to this
// visitor last time (stored per-audience in localStorage). Falls back to a
// plain shuffle when storage is unavailable (e.g. during SSR).
function pickChips(pool: string[], audience: Audience): string[] {
  const shuffle = (items: string[]) => {
    const copy = [...items]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
  }

  if (typeof window === "undefined") return pool.slice(0, 3)

  const storageKey = `cg_chips_last_${audience}`
  let lastShown: string[] = []
  try {
    lastShown = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]")
  } catch {
    lastShown = []
  }

  // Prefer questions not shown last time; top up from the rest if needed.
  const fresh = shuffle(pool.filter((q) => !lastShown.includes(q)))
  const backfill = shuffle(pool.filter((q) => lastShown.includes(q)))
  const picked = [...fresh, ...backfill].slice(0, 3)

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(picked))
  } catch {
    // Storage may be unavailable (private mode); rotation still works per load.
  }
  return picked
}

function messageText(parts: { type: string; text?: string }[]): string {
  return parts
    .filter((part) => part.type === "text")
    .map((part) => part.text ?? "")
    .join("")
}

// Annett may end a message with a machine-readable tag listing discrete reply
// choices, e.g. "[[OPTIONS: The Practical Pillar | The Academic Pillar]]". We
// strip that tag out of the visible bubble and surface the choices as
// clickable quick-reply pills. A partial (still-streaming) tag is also removed
// so the raw brackets never flash on screen mid-stream.
function parseReply(text: string): { text: string; options: string[] } {
  let cleaned = text
  let options: string[] = []

  const complete = cleaned.match(/\[\[OPTIONS:\s*([\s\S]+?)\]\]/i)
  if (complete) {
    options = complete[1]
      .split("|")
      .map((option) => option.trim())
      .filter(Boolean)
      .slice(0, 3)
    cleaned = cleaned.replace(complete[0], "")
  }

  // Remove any dangling, not-yet-closed tag while the response is streaming.
  cleaned = cleaned.replace(/\[\[OPTIONS:[\s\S]*$/i, "").trimEnd()

  return { text: cleaned, options }
}

// Sarah's messages render as light bubbles with her avatar to stand out
// against the dark terminal shell. `lead` shows the larger opening avatar.
function SarahMessage({ text, lead = false }: { text: string; lead?: boolean }) {
  const avatarSize = lead ? 44 : 28
  return (
    <div className="flex items-start gap-2.5">
      <span
        className="relative mt-0.5 flex shrink-0 overflow-hidden rounded-full ring-1 ring-blue-500/40"
        style={{ height: avatarSize, width: avatarSize }}
      >
        <Image
          src={SARAH_AVATAR}
          alt="Annett, ClearGuidance specialist"
          width={avatarSize}
          height={avatarSize}
          className="h-full w-full object-cover"
        />
      </span>
      <span
        className={`whitespace-pre-wrap rounded-lg rounded-tl-none bg-zinc-100 px-3 py-2 font-sans leading-relaxed text-[#27272A] ${
          lead ? "text-sm font-medium" : "text-[13px]"
        }`}
      >
        {text}
      </span>
    </div>
  )
}

// Inline lead-capture funnel. Replaces the console region (Phase 2 inline
// transition — no popup) and persists to Neon via the submitSubscriberLead
// server action (Phase 3). Styled with the existing terminal tokens.
function LeadCaptureForm({
  audience,
  ctaLabel,
  onBack,
  onDownloaded,
}: {
  audience: Audience
  ctaLabel: string
  onBack: () => void
  onDownloaded: () => void
}) {
  const [state, formAction, isPending] = useActionState(submitSubscriberLead, INITIAL_SUBSCRIBE_STATE)

  // Success screen — honest confirmation, an instant dossier download, then
  // a real link to the offering.
  if (state.status === "success") {
    const dossierHref = state.dossier
      ? `/api/dossier?audience=${state.dossier.audience}&name=${encodeURIComponent(state.dossier.name)}`
      : null
    return (
      <div className="flex min-h-[16rem] flex-1 flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#0B0B0E] to-[#050506] p-6 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-400/10 ring-1 ring-green-400/40">
          <CheckCircle2 className="h-6 w-6 text-green-400" aria-hidden="true" />
        </span>
        <p className="font-sans text-sm leading-relaxed text-[#E4E4E7]">{state.message}</p>

        {dossierHref && (
          <div className="w-full space-y-1.5">
            <a
              href={dossierHref}
              download
              onClick={() => onDownloaded()}
              className="group flex w-full items-center justify-center gap-2 rounded-sm border border-blue-500/50 bg-blue-500/10 py-3 text-xs font-bold uppercase tracking-[0.15em] text-blue-200 transition-colors hover:border-blue-400 hover:bg-blue-500/20 hover:text-white"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Your Dossier (PDF)
            </a>
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#8A8A93]">
              Your copy is ready — yours to keep
            </p>
          </div>
        )}

        <a
          href={OFFERING_URL}
          className="group flex w-full items-center justify-center gap-2 rounded-sm bg-blue-500 py-3 text-xs font-bold uppercase tracking-[0.15em] text-[#04101F] transition-colors hover:bg-blue-400"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </a>
      </div>
    )
  }

  const fieldErrors = state.fieldErrors ?? {}

  return (
    <form
      action={formAction}
      className="min-h-[16rem] flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-[#0B0B0E] to-[#050506] p-4"
    >
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-[#A1A1AA] transition-colors hover:text-white"
      >
        <ArrowLeft className="h-3 w-3" aria-hidden="true" />
        Back to Annett
      </button>

      <p className="font-sans text-sm leading-relaxed text-[#E4E4E7]">
        {audience === "advisor"
          ? "Request Advisor beta access. Share your details and our team will follow up."
          : "Start your investor trial. Share your details and we'll get you set up."}
      </p>

      {/* Honeypot — hidden from real users. */}
      <input
        type="text"
        name="company_website_hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <input type="hidden" name="audienceType" value={audience} />

      <div className="space-y-1">
        <label htmlFor="lead-name" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A8A93]">
          Full Name
        </label>
        <input
          id="lead-name"
          name="name"
          type="text"
          autoComplete="name"
          className="w-full rounded-md border border-[#3F3F46] bg-[#1C1C21] px-3 py-2 text-[13px] text-[#F4F4F5] placeholder:text-[#8A8A93] focus:border-blue-500/70 focus:outline-none"
          placeholder="Jane Analyst"
        />
        {fieldErrors.name && <p className="text-[11px] text-red-400/90">{fieldErrors.name}</p>}
      </div>

      <div className="space-y-1">
        <label htmlFor="lead-email" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A8A93]">
          Email
        </label>
        <input
          id="lead-email"
          name="email"
          type="email"
          autoComplete="email"
          className="w-full rounded-md border border-[#3F3F46] bg-[#1C1C21] px-3 py-2 text-[13px] text-[#F4F4F5] placeholder:text-[#8A8A93] focus:border-blue-500/70 focus:outline-none"
          placeholder="jane@firm.com"
        />
        {fieldErrors.email && <p className="text-[11px] text-red-400/90">{fieldErrors.email}</p>}
      </div>

      <div className="space-y-1">
        <label htmlFor="lead-phone" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A8A93]">
          Mobile Phone <span className="font-normal text-[#6B6B73]">(optional)</span>
        </label>
        <input
          id="lead-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="w-full rounded-md border border-[#3F3F46] bg-[#1C1C21] px-3 py-2 text-[13px] text-[#F4F4F5] placeholder:text-[#8A8A93] focus:border-blue-500/70 focus:outline-none"
          placeholder="+1 (555) 000-0000"
        />
      </div>

      <label className="flex items-start gap-2 text-[11px] leading-relaxed text-[#A1A1AA]">
        <input
          type="checkbox"
          name="smsConsent"
          className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-blue-500"
        />
        <span>
          I agree to receive occasional texts about my trial. Message and data rates may apply; reply STOP to opt out.
        </span>
      </label>

      {state.status === "error" && !Object.keys(fieldErrors).length && (
        <p className="text-[11px] text-red-400/90">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="group flex w-full items-center justify-center gap-2 rounded-sm bg-blue-500 py-3 text-xs font-bold uppercase tracking-[0.15em] text-[#04101F] transition-colors hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Submitting…" : ctaLabel}
        {!isPending && (
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        )}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-[#8A8A93]">
        <ShieldCheck className="h-3 w-3" aria-hidden="true" />
        Your details are kept private
      </p>
    </form>
  )
}

export function SalesFunnelAgent() {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<"chat" | "capture">("chat")
  const [activeAudience, setActiveAudience] = useState<Audience>("investor")
  const [visitorInput, setVisitorInput] = useState("")

  // The transport is created once; the body function reads the latest audience
  // from a ref so every request carries the current audience without
  // re-instantiating the transport (which would reset the conversation).
  const audienceRef = useRef<Audience>(activeAudience)
  useEffect(() => {
    audienceRef.current = activeAudience
  }, [activeAudience])

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/sales-agent",
        body: () => ({ audience: audienceRef.current }),
      }),
    [],
  )

  const { messages, sendMessage, setMessages, status, error, addToolOutput } = useChat({
    transport,
    // Annett drives the funnel: when she decides the visitor is ready, she
    // calls the openLeadCaptureForm tool. This client-side handler reacts by
    // opening the secure capture form, then fulfils the tool call.
    async onToolCall({ toolCall }) {
      if (toolCall.dynamic) return
      if (toolCall.toolName === "openLeadCaptureForm") {
        setMode("capture")
        // No await — avoids potential deadlocks per AI SDK guidance.
        addToolOutput({
          tool: "openLeadCaptureForm",
          toolCallId: toolCall.toolCallId,
          output: "The secure capture form is now open for the visitor.",
        })
      }
    },
  })

  const config = AUDIENCE_CONFIG[activeAudience]
  const isBusy = status === "submitted" || status === "streaming"

  // Rotating starter questions. Initialize deterministically (first three) to
  // keep SSR and the first client render identical, then swap in a rotated,
  // no-immediate-repeat trio after mount and whenever the audience changes.
  const [displayChips, setDisplayChips] = useState<string[]>(() =>
    config.chipPool.slice(0, 3),
  )
  useEffect(() => {
    setDisplayChips(pickChips(AUDIENCE_CONFIG[activeAudience].chipPool, activeAudience))
  }, [activeAudience])

  const logRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, status])

  function handleAudienceChange(audience: Audience) {
    if (audience === activeAudience) return
    setActiveAudience(audience)
    // Reset the console so the welcome state matches the new audience.
    setMessages([])
    // Return to the conversation if the capture form was open.
    setMode("chat")
  }

  function submitQuery(query: string) {
    const trimmed = query.trim()
    if (!trimmed || isBusy) return
    void sendMessage({ text: trimmed })
    setVisitorInput("")
  }

  // After the visitor downloads their dossier, return them to Annett and let
  // her continue the funnel toward a paid subscription. The brief delay lets
  // the browser begin the native file download before the view swaps to chat.
  function handleDossierDownloaded() {
    setTimeout(() => {
      setMode("chat")
      void sendMessage({ text: "I've downloaded the dossier." })
    }, 150)
  }

  function handleInputSubmit(event: FormEvent) {
    event.preventDefault()
    submitQuery(visitorInput)
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open the ClearGuidance sales agent"
        className="group fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full bg-blue-500 py-3.5 pl-5 pr-6 font-mono text-sm font-bold uppercase tracking-wide text-[#04101F] shadow-[0_8px_30px_rgba(59,130,246,0.35)] transition-all duration-200 hover:bg-blue-400 hover:shadow-[0_10px_38px_rgba(59,130,246,0.5)]"
      >
        <MessageSquare className="h-4 w-4" aria-hidden="true" />
        Talk to an Analyst
      </button>
    )
  }

  return (
    <section
      aria-label="ClearGuidance Studio sales agent"
      className="fixed bottom-5 right-5 z-50 flex max-h-[calc(100vh-2.5rem)] w-[calc(100vw-2.5rem)] max-w-[420px] flex-col overflow-hidden rounded-md border border-[#27272A] bg-zinc-950 font-mono text-sm text-[#E4E4E7] shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
    >
      {/* Segmented audience control */}
      <div className="relative flex border-b border-[#27272A]" role="tablist" aria-label="Choose your audience">
        {(Object.keys(AUDIENCE_CONFIG) as Audience[]).map((audience) => {
          const isActive = audience === activeAudience
          return (
            <button
              key={audience}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleAudienceChange(audience)}
              className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-[0.15em] transition-colors ${
                isActive
                  ? "bg-blue-500/15 text-blue-200 shadow-[inset_0_-2px_0_0_rgb(59,130,246)]"
                  : "bg-zinc-950 text-[#A1A1AA] hover:bg-white/5 hover:text-white"
              } ${audience === "investor" ? "border-r border-[#27272A]" : ""}`}
            >
              {audience === "investor" ? (
                <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              {AUDIENCE_CONFIG[audience].label}
            </button>
          )
        })}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close the sales agent"
          className="flex h-6 w-6 items-center justify-center self-center rounded-full border border-[#27272A] bg-[#121214] text-[#A1A1AA] transition-colors hover:bg-[#1C1C21] hover:text-white mr-2"
        >
          <X className="h-3 w-3" aria-hidden="true" />
        </button>
      </div>

      {/* Persistent Sarah identity bar */}
      <div className="flex items-center gap-2.5 border-b border-[#27272A] bg-[#0A0A0C] px-4 py-2.5">
        <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-blue-500/40">
          <Image src={SARAH_AVATAR} alt="" width={32} height={32} className="h-full w-full object-cover" />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[13px] font-bold text-[#F4F4F5]">Annett</span>
          <span className="text-[10px] uppercase tracking-[0.15em] text-[#A1A1AA]">
            ClearGuidance Specialist
          </span>
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-green-400">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 motion-safe:animate-pulse" aria-hidden="true" />
          Online
        </span>
      </div>

      {mode === "capture" ? (
        <LeadCaptureForm
          audience={activeAudience}
          ctaLabel={config.cta}
          onBack={() => setMode("chat")}
          onDownloaded={handleDossierDownloaded}
        />
      ) : (
        <>
      {/* Conversational console */}
      <div
        ref={logRef}
        aria-live="polite"
        className="min-h-[16rem] flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-[#0B0B0E] to-[#050506] p-4"
      >
        {/* System welcome line — stays terminal-native */}
        <p className="flex items-start gap-2 text-[#A1A1AA]">
          <span className="select-none text-blue-500">::</span>
          <span className="leading-relaxed">{config.welcome}</span>
        </p>

        {/* Sarah's opening greeting — large avatar + light bubble */}
        {messages.length === 0 && (
          <SarahMessage text={SARAH_GREETING} lead />
        )}

        {messages.map((message) => {
          const isUser = message.role === "user"
          const text = messageText(message.parts)
          if (isUser) {
            return (
              <p
                key={message.id}
                className="flex items-start justify-end gap-2 pl-8 leading-relaxed text-[#E4E4E7]"
              >
                <span className="whitespace-pre-wrap text-right">{text}</span>
                <span className="select-none text-green-400">&lt;</span>
              </p>
            )
          }
          // Skip assistant messages that carry only a tool call (no text),
          // so opening the capture form never leaves an empty bubble behind.
          if (!text.trim()) return null
          const { text: cleanText, options } = parseReply(text)
          if (!cleanText.trim()) return null
          // Only the newest message shows pills, and only once Annett has
          // finished answering (so pills don't appear mid-stream or linger on
          // older messages after the visitor has already replied).
          const isNewest = message.id === messages[messages.length - 1]?.id
          const showPills = isNewest && options.length > 0 && !isBusy
          return (
            <div key={message.id} className="space-y-2">
              <SarahMessage text={cleanText} />
              {showPills && (
                <div className="flex flex-wrap gap-2 pl-[38px]">
                  {options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => submitQuery(option)}
                      className="rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1.5 text-xs text-blue-200 transition-colors hover:border-blue-400/70 hover:bg-blue-500/20 hover:text-white"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}

        {status === "submitted" && (
          <div className="flex items-start gap-2.5">
            <span className="relative mt-0.5 flex h-7 w-7 shrink-0 overflow-hidden rounded-full ring-1 ring-blue-500/40">
              <Image src={SARAH_AVATAR} alt="" width={28} height={28} className="h-full w-full object-cover" />
            </span>
            <span className="rounded-lg rounded-tl-none bg-zinc-100 px-3 py-2 text-[13px] text-[#3F3F46] motion-safe:animate-pulse">
              Analyzing…
            </span>
          </div>
        )}

        {error && (
          <p className="flex items-start gap-2 text-red-400/80">
            <span className="select-none">!!</span>
            <span className="leading-relaxed">Connection interrupted. Please try again.</span>
          </p>
        )}
      </div>

      {/* Quick inquiry chips */}
      <div className="border-t border-[#27272A] bg-[#0A0A0C] p-3">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A8A93]">
          Quick Inquiry
        </p>
        <div className="flex flex-wrap gap-2">
          {displayChips.map((chip) => (
            <button
              key={chip}
              type="button"
              disabled={isBusy}
              onClick={() => submitQuery(chip)}
              className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs text-blue-200 transition-colors hover:border-blue-400/70 hover:bg-blue-500/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Visitor input bar */}
      <form
        onSubmit={handleInputSubmit}
        className="border-t border-[#27272A] bg-[#0A0A0C] px-3 py-2.5"
      >
        <div className="flex items-center gap-2 rounded-md border border-[#3F3F46] bg-[#1C1C21] px-3 py-2 transition-colors focus-within:border-blue-500/70">
          <span className="select-none font-bold text-blue-400" aria-hidden="true">
            &gt;
          </span>
          <input
            type="text"
            value={visitorInput}
            onChange={(event) => setVisitorInput(event.target.value)}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                (event.nativeEvent.isComposing || event.keyCode === 229)
              ) {
                event.preventDefault()
              }
            }}
            placeholder="Type a command..."
            aria-label="Send a message to the agent"
            className="flex-1 bg-transparent text-[#F4F4F5] placeholder:text-[#8A8A93] focus:outline-none"
          />
          <button
            type="submit"
            disabled={isBusy}
            aria-label="Send message"
            className="flex h-7 w-7 items-center justify-center rounded-sm text-[#A1A1AA] transition-colors hover:bg-blue-500/20 hover:text-blue-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <CornerDownLeft className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </form>
        </>
      )}

      {/* Persistent CTA — opens the inline capture form (Phase 1). */}
      {mode === "chat" && (
        <div className="border-t border-[#27272A] bg-[#0A0A0C] p-3">
          <button
            type="button"
            onClick={() => setMode("capture")}
            className="group flex w-full items-center justify-center gap-2 rounded-sm bg-blue-500 py-3 text-xs font-bold uppercase tracking-[0.15em] text-[#04101F] transition-colors hover:bg-blue-400"
          >
            {config.cta}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </div>
      )}
    </section>
  )
}

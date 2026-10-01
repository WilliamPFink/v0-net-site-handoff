import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "The Knowledge Foundation",
  description:
    "A shared space for absolute financial clarity. Explore the Layman, Practical, and Academic pillars behind ClearGuidance Studio — from simple analogies to the core math driving the engine.",
  alternates: {
    canonical: "/encyclopedia",
  },
  openGraph: {
    title: "The Knowledge Foundation | ClearGuidance Studio",
    description:
      "Explore the Layman, Practical, and Academic pillars behind ClearGuidance Studio — from simple analogies to the core math driving the engine.",
    type: "website",
    url: "https://clearguidancestudio.net/encyclopedia",
    images: [{ url: "/net/og-image.png", width: 1200, height: 630, alt: "ClearGuidance Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Knowledge Foundation | ClearGuidance Studio",
    description:
      "Explore the Layman, Practical, and Academic pillars behind ClearGuidance Studio.",
    images: ["/net/og-image.png"],
  },
}

export default function EncyclopediaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

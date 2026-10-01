import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from "next"
import Script from "next/script"
import { Geist, JetBrains_Mono } from "next/font/google"
import { SiteFooter } from "@/components/site-footer"
import { SalesFunnelAgent } from "@/components/sales-funnel-agent"
import "./globals.css"

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

const SITE_URL = "https://clearguidancestudio.net"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ClearGuidance Studio | Where Valuation Meets Conviction",
    template: "%s | ClearGuidance Studio",
  },
  description:
    "Streamlined financial modeling with uncompromised analytical depth. Institutional-grade equity valuation, portfolio theory, and real-world probability simulation for advisors and serious investors.",
  applicationName: "ClearGuidance Studio",
  generator: 'v0.app',
  authors: [{ name: "ClearGuidance Studio, Inc.", url: SITE_URL }],
  publisher: "ClearGuidance Studio, Inc.",
  keywords: [
    "financial modeling",
    "intrinsic value",
    "equity valuation",
    "modern portfolio theory",
    "Monte Carlo simulation",
    "wealth management software",
    "investment analysis",
    "ClearGuidance Studio",
  ],
  alternates: {
    canonical: "/",
  },
  verification: {
    google: [
      "OQIzD3AzewsRivzWe71YIrYHGSUh3f9iBgDe8",
      "EQs46Eq12t-cMEq-cQE376ZWxFRXVxn2HYNabmGN0Io",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "ClearGuidance Studio",
    locale: "en_US",
    url: SITE_URL,
    title: "ClearGuidance Studio | Where Valuation Meets Conviction",
    description:
      "Institutional-grade equity valuation, portfolio theory, and real-world probability simulation for advisors and serious investors.",
    // og:image is generated per-route via each segment's opengraph-image.tsx
    // (the root app/opengraph-image.tsx acts as the site-wide default).
  },
  twitter: {
    card: "summary_large_image",
    title: "ClearGuidance Studio | Where Valuation Meets Conviction",
    description:
      "Institutional-grade equity valuation, portfolio theory, and real-world probability simulation for advisors and serious investors.",
    // twitter:image is generated per-route via each segment's twitter-image.tsx.
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: '/apple-icon.png',
  },
}

export const viewport = {
  themeColor: "#0A0A0C",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "ClearGuidance Studio, Inc.",
        url: SITE_URL,
        logo: `${SITE_URL}/net/og-image.png`,
        description:
          "Institutional-grade financial modeling software for equity valuation, portfolio theory, and real-world probability simulation.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "9905 S Pennsylvania Ave",
          addressLocality: "Oklahoma City",
          addressRegion: "OK",
          addressCountry: "US",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "ClearGuidance Studio",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-US",
      },
    ],
  }

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-[#0A0A0C]`}>
      <body className="bg-[#0A0A0C] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <SiteFooter />
        <SalesFunnelAgent />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {/* Google tag (gtag.js) — site-wide GA4 */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-H12NR9H5Z4"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-H12NR9H5Z4');
              `}
            </Script>
            {/* Meta (Facebook) Pixel — site-wide */}
            <Script id="facebook-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '1736840154219443');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src="https://www.facebook.com/tr?id=1736840154219443&ev=PageView&noscript=1"
                alt=""
              />
            </noscript>
          </>
        )}
      </body>
    </html>
  )
}

import type { MetadataRoute } from "next"

const SITE_URL = "https://clearguidancestudio.net"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/product-tiers`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/encyclopedia`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/corporate`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]
}

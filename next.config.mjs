/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // The landing page was promoted to the homepage; keep old /landing links working.
      { source: "/landing", destination: "/", permanent: true },
    ]
  },
}

export default nextConfig

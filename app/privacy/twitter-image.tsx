// Reuse the Open Graph image generator for Twitter/X cards.
export { default, alt, size, contentType } from "./opengraph-image"

// Route config isn't inherited through re-export, so declare it here too:
// render on demand to avoid the build-time Google Fonts fetch (blocked in the
// deploy sandbox). CDN-cached after first hit.
export const dynamic = "force-dynamic"

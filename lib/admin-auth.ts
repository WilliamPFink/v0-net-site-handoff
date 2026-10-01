import "server-only"
import { createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"

const COOKIE_NAME = "cgs_admin"
const SESSION_DURATION_SECONDS = 60 * 60 * 8 // 8 hours

// A single shared passcode protects the internal leads dashboard.
// Set ADMIN_PASSWORD in the project env. The session cookie stores an HMAC of
// the passcode (never the passcode itself), so a leaked cookie can't reveal it.
function getPassword(): string | null {
  return process.env.ADMIN_PASSWORD?.trim() || null
}

function expectedToken(password: string): string {
  // The password doubles as the HMAC key, so the token is only reproducible
  // by someone who knows the passcode — no separate secret env var required.
  return createHmac("sha256", password).update("cgs-admin-session-v1").digest("hex")
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ab.length !== bb.length) return false
  return timingSafeEqual(ab, bb)
}

/** True when the request carries a valid admin session cookie. */
export async function isAdminAuthenticated(): Promise<boolean> {
  const password = getPassword()
  if (!password) return false
  const token = (await cookies()).get(COOKIE_NAME)?.value
  if (!token) return false
  return safeEqual(token, expectedToken(password))
}

/** Whether an ADMIN_PASSWORD has been configured at all. */
export function isAdminConfigured(): boolean {
  return getPassword() !== null
}

/**
 * Validates a submitted passcode and, on success, sets the session cookie.
 * Returns true on success, false on a bad/missing passcode.
 */
export async function signInAdmin(submitted: string): Promise<boolean> {
  const password = getPassword()
  if (!password) return false
  if (!safeEqual(submitted, password)) return false

  const isDev = process.env.NODE_ENV === "development"
  ;(await cookies()).set(COOKIE_NAME, expectedToken(password), {
    httpOnly: true,
    // The v0 preview renders inside a cross-site iframe; "none"+secure keeps the cookie.
    sameSite: isDev ? "none" : "lax",
    secure: true,
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  })
  return true
}

/** Clears the admin session cookie. */
export async function signOutAdmin(): Promise<void> {
  ;(await cookies()).delete(COOKIE_NAME)
}

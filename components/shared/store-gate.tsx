/**
 * StoreGate — Server Component
 *
 * Wraps every page in the root layout. When the store is marked as closed
 * it redirects all public routes to /coming-soon.
 *
 * This is a React Server Component running in the Node.js runtime, so it
 * can use `fs` through readStoreStatus(). It cannot run in Edge Middleware.
 *
 * The middleware (middleware.ts) injects the current URL path as the
 * "x-pathname" request header so we can check it here.
 */

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { readStoreStatus } from "@/lib/store-status"

/** Paths that are always accessible even when the store is closed */
const ALWAYS_ALLOWED_PREFIXES = [
  "/coming-soon",
  "/admin",
  "/api",
]

export async function StoreGate({ children }: { children: React.ReactNode }) {
  let closed = false
  try {
    const status = await readStoreStatus()
    closed = status.closed
  } catch {
    // Fail open — if we can't read the status, let the request through
  }

  if (closed) {
    const headersList = await headers()
    const pathname = headersList.get("x-pathname") ?? "/"

    const isAllowed = ALWAYS_ALLOWED_PREFIXES.some((prefix) =>
      pathname.startsWith(prefix)
    )

    if (!isAllowed) {
      redirect("/coming-soon")
    }
  }

  return <>{children}</>
}

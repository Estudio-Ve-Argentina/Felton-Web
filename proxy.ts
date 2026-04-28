import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Admin auth gate ──────────────────────────────────────────────
  if (pathname.startsWith("/admin/login")) {
    // Still inject the pathname header for consistency
    const res = NextResponse.next({
      request: { headers: new Headers({ ...Object.fromEntries(request.headers), "x-pathname": pathname }) },
    })
    return res
  }

  if (pathname.startsWith("/admin")) {
    const session = request.cookies.get("felton-admin-session")
    if (!session?.value) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  // ── Inject pathname header for server components ─────────────────
  // This lets StoreGate (a RSC) know the current route without
  // relying on unreliable request headers — middleware has the URL.
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-pathname", pathname)

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: [
    // Match everything except static files and _next internals
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}

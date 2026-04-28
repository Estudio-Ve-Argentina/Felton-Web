import { NextRequest, NextResponse } from "next/server"
import { readStoreStatus, writeStoreStatus } from "@/lib/store-status"
import type { StoreStatus } from "@/lib/store-status"

function isAuthenticated(request: NextRequest): boolean {
  const session = request.cookies.get("felton-admin-session")
  console.log("Auth Check - Cookie present:", Boolean(session), "Value:", session?.value?.substring(0, 5) + "...")
  return Boolean(session?.value)
}

export async function GET(request: NextRequest) {
  console.log("API: GET /api/admin/store-status called")
  if (!isAuthenticated(request)) {
    console.log("API: GET /api/admin/store-status - Unauthorized")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const status = await readStoreStatus()
  return NextResponse.json(status)
}

export async function POST(request: NextRequest) {
  console.log("API: POST /api/admin/store-status called")
  if (!isAuthenticated(request)) {
    console.log("API: POST /api/admin/store-status - Unauthorized")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const body = await request.json()
    console.log("Store-status POST body:", body)
    const current = await readStoreStatus()
    const updated: StoreStatus = {
      ...current,
      ...body,
      // Sanitize booleans
      closed: body.closed !== undefined ? Boolean(body.closed) : current.closed,
      showNewsletter: body.showNewsletter !== undefined ? Boolean(body.showNewsletter) : current.showNewsletter,
      showBadge: body.showBadge !== undefined ? Boolean(body.showBadge) : current.showBadge,
    }
    await writeStoreStatus(updated)
    return NextResponse.json({ success: true, status: updated })
  } catch (err: any) {
    console.error("store-status POST error:", err)
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from "next/server"
import { readStoreStatus, writeStoreStatus } from "@/lib/store-status"
import type { StoreStatus } from "@/lib/store-status"

function isAuthenticated(request: NextRequest): boolean {
  const session = request.cookies.get("felton-admin-session")
  return Boolean(session?.value)
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const status = readStoreStatus()
  return NextResponse.json(status)
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const body: Partial<StoreStatus> = await request.json()
    const current = readStoreStatus()
    const updated: StoreStatus = {
      ...current,
      ...body,
      // Sanitize booleans
      closed: Boolean(body.closed ?? current.closed),
      showNewsletter: Boolean(body.showNewsletter ?? current.showNewsletter),
    }
    writeStoreStatus(updated)
    return NextResponse.json({ success: true, status: updated })
  } catch (err) {
    console.error("store-status POST error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

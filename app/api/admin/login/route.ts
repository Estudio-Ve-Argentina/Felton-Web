import { NextRequest, NextResponse } from "next/server"

function getSessionToken() {
  const user = process.env.ADMIN_USERNAME ?? ""
  const pass = process.env.ADMIN_PASSWORD ?? ""
  return btoa(`${user}:${pass}:felton-admin`)
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json(
        { error: "Usuario o contraseña incorrectos" },
        { status: 401 }
      )
    }

    const res = NextResponse.json({ ok: true })
    res.cookies.set("felton-admin-session", getSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })
    return res
  } catch {
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 })
  }
}

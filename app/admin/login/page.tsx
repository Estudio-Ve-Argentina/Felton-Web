"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react"
import { FeltonLogo } from "@/components/shared"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Credenciales incorrectas")
        return
      }

      router.push("/admin")
      router.refresh()
    } catch {
      setError("Error de conexión. Intente nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--navy)] flex">
      {/* Sidebar — solo visible en desktop */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-white/8 px-6 py-5">
        <div className="flex items-center gap-3">
          <FeltonLogo textClassName="text-2xl" />
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em]">
            Admin
          </span>
        </div>
        <div className="flex-1" />
        <Link
          href="/"
          className="flex items-center gap-3 text-sm text-white/35 hover:text-white/65 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          Volver al sitio
        </Link>
      </aside>

      {/* Formulario */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo mobile */}
        <div className="lg:hidden mb-10 flex items-center justify-center gap-3">
          <FeltonLogo textClassName="text-2xl" />
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em]">
            Admin
          </span>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="font-serif text-2xl font-light text-white">Acceso</h1>
            <p className="text-sm text-white/35 mt-1">
              Ingresá tus credenciales para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-2">
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[var(--gold)]/50 focus:outline-none transition-colors"
                placeholder="Tu usuario"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 pr-11 text-sm text-white placeholder-white/20 focus:border-[var(--gold)]/50 focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/55 transition-colors"
                >
                  {showPassword
                    ? <EyeOff className="h-4 w-4" />
                    : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--gold)] text-[var(--navy)] py-3 rounded text-sm font-bold tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>

          {/* Volver al sitio en mobile */}
          <Link
            href="/"
            className="lg:hidden flex items-center justify-center gap-3 mt-8 text-sm text-white/30 hover:text-white/60 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al sitio
          </Link>
        </div>
      </div>
    </div>
  )
}

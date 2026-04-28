"use client"

import { useState, useEffect } from "react"
import {
  Lock,
  Unlock,
  Clock,
  Mail,
  Save,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  ExternalLink,
  Palette,
} from "lucide-react"
import type { StoreStatus } from "@/lib/store-status"

const DEFAULT: StoreStatus = {
  closed: false,
  title: "Estamos preparando algo grande",
  subtitle:
    "Muy pronto, algo extraordinario llega a Felton. Suscribite para ser el primero en enterarte.",
  countdownTo: null,
  showNewsletter: true,
  newsletterCta: "Notificarme",
  bgStyle: "dark",
}

function toLocalDatetimeValue(isoString: string | null): string {
  if (!isoString) return ""
  // Convert ISO → local datetime-local input format
  const d = new Date(isoString)
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function fromLocalDatetimeValue(val: string): string | null {
  if (!val) return null
  try {
    const d = new Date(val)
    if (isNaN(d.getTime())) return null
    return d.toISOString()
  } catch {
    return null
  }
}

export default function StoreStatusPage() {
  const [form, setForm] = useState<StoreStatus>(DEFAULT)
  const [localCountdown, setLocalCountdown] = useState<string>("")
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    fetch("/api/admin/store-status")
      .then((r) => r.json())
      .then((data: StoreStatus) => {
        setForm(data)
        setLocalCountdown(toLocalDatetimeValue(data.countdownTo))
      })
      .catch(() => setForm(DEFAULT))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaveState("saving")
    setErrorMsg("")
    const payload: StoreStatus = {
      ...form,
      countdownTo: fromLocalDatetimeValue(localCountdown),
    }
    try {
      const res = await fetch("/api/admin/store-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        const { status } = await res.json()
        setForm(status)
        setLocalCountdown(toLocalDatetimeValue(status.countdownTo))
        setSaveState("saved")
        setTimeout(() => setSaveState("idle"), 3000)
      } else {
        throw new Error("Error al guardar")
      }
    } catch (e: any) {
      setErrorMsg(e.message || "Error desconocido")
      setSaveState("error")
      setTimeout(() => setSaveState("idle"), 5000)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-3xl font-light text-foreground">Estado de la Tienda</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Controlá el acceso público a felton.ar y la página de cierre temporal.
          </p>
        </div>
        <a
          href="/coming-soon"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium border border-border rounded hover:border-primary/40 transition-colors text-muted-foreground hover:text-foreground"
        >
          <Eye className="h-3.5 w-3.5" />
          Previsualizar
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Status toggle — big prominent card */}
      <div
        className={`p-6 rounded border-2 transition-colors ${
          form.closed
            ? "border-amber-500/40 bg-amber-500/5"
            : "border-green-500/30 bg-green-500/5"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-full ${
                form.closed ? "bg-amber-500/15" : "bg-green-500/15"
              }`}
            >
              {form.closed ? (
                <Lock className="h-5 w-5 text-amber-500" />
              ) : (
                <Unlock className="h-5 w-5 text-green-500" />
              )}
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">
                {form.closed ? "Tienda CERRADA" : "Tienda ABIERTA"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {form.closed
                  ? "Todo acceso público redirige a /coming-soon"
                  : "El sitio es accesible para todos los usuarios"}
              </p>
            </div>
          </div>

          {/* Toggle switch */}
          <button
            onClick={() => setForm((f) => ({ ...f, closed: !f.closed }))}
            className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors focus:outline-none ${
              form.closed ? "bg-amber-500" : "bg-muted"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform ${
                form.closed ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {form.closed && (
          <div className="mt-4 p-3 rounded bg-amber-500/10 border border-amber-500/20 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-200/80">
              Al guardar, <strong>cualquier visita a felton.ar</strong> verá la página de cierre.
              El panel de admin (/admin) sigue accesible.
            </p>
          </div>
        )}
      </div>

      {/* Message customization */}
      <section className="bg-card border border-border rounded overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Mensaje
          </h2>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Título principal
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full px-4 py-3 bg-background border border-border rounded text-sm text-foreground focus:border-primary/60 focus:outline-none transition-colors"
              placeholder="Ej: Estamos preparando algo grande"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Descripción / subtítulo
            </label>
            <textarea
              value={form.subtitle}
              onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 bg-background border border-border rounded text-sm text-foreground focus:border-primary/60 focus:outline-none transition-colors resize-none"
              placeholder="Mensaje secundario que aparece debajo del título..."
            />
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="bg-card border border-border rounded overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Countdown
            </h2>
          </div>
          <span className="text-xs text-muted-foreground">
            {localCountdown ? "Activo" : "Desactivado"}
          </span>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-xs text-muted-foreground">
            Elegí la fecha y hora de apertura. El contador en tiempo real aparecerá en la página pública.
            Dejalo vacío para no mostrar countdown.
          </p>
          <div className="flex items-center gap-4">
            <input
              type="datetime-local"
              value={localCountdown}
              onChange={(e) => setLocalCountdown(e.target.value)}
              className="flex-1 px-4 py-3 bg-background border border-border rounded text-sm text-foreground focus:border-primary/60 focus:outline-none transition-colors"
            />
            {localCountdown && (
              <button
                onClick={() => setLocalCountdown("")}
                className="px-4 py-3 text-xs text-muted-foreground border border-border rounded hover:border-red-500/40 hover:text-red-400 transition-colors"
              >
                Quitar
              </button>
            )}
          </div>
          {localCountdown && (
            <p className="text-xs text-primary/70">
              El countdown mostrará días, horas, minutos y segundos en tiempo real.
            </p>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-card border border-border rounded overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Suscripción
            </h2>
          </div>
          <button
            onClick={() => setForm((f) => ({ ...f, showNewsletter: !f.showNewsletter }))}
            className={`relative inline-flex h-6 w-10 shrink-0 items-center rounded-full transition-colors ${
              form.showNewsletter ? "bg-primary" : "bg-muted"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform ${
                form.showNewsletter ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        {form.showNewsletter && (
          <div className="p-6 space-y-5">
            <div className="p-3 bg-primary/5 border border-primary/20 rounded text-xs text-muted-foreground">
              <strong className="text-foreground">✓ Conectado a Tienda Nube:</strong> Los emails
              se guardan como clientes con <code>accepts_marketing: true</code> en tu tienda.
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Texto del botón CTA
              </label>
              <input
                type="text"
                value={form.newsletterCta}
                onChange={(e) => setForm((f) => ({ ...f, newsletterCta: e.target.value }))}
                className="w-full px-4 py-3 bg-background border border-border rounded text-sm text-foreground focus:border-primary/60 focus:outline-none transition-colors"
                placeholder="Ej: Notificarme, Avisarme, Quiero saber..."
              />
            </div>
          </div>
        )}
        {!form.showNewsletter && (
          <div className="px-6 py-5">
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <EyeOff className="h-3.5 w-3.5" />
              El formulario de suscripción está oculto en la página pública.
            </p>
          </div>
        )}
      </section>

      {/* Background style */}
      <section className="bg-card border border-border rounded overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center gap-2">
          <Palette className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Estilo visual
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-3">
            {(["dark", "gradient"] as const).map((style) => (
              <button
                key={style}
                onClick={() => setForm((f) => ({ ...f, bgStyle: style }))}
                className={`relative p-4 rounded border-2 transition-all text-left ${
                  form.bgStyle === style
                    ? "border-primary/60 bg-primary/5"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <div
                  className="h-10 rounded mb-3"
                  style={{
                    background:
                      style === "dark"
                        ? "oklch(0.10 0.015 260)"
                        : "radial-gradient(ellipse at 30% 20%, oklch(0.22 0.04 260), oklch(0.10 0.02 260))",
                  }}
                />
                <p className="text-xs font-medium text-foreground capitalize">
                  {style === "dark" ? "Oscuro sólido" : "Gradiente Navy"}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Save */}
      <div className="flex items-center gap-4 pb-8">
        <button
          onClick={handleSave}
          disabled={saveState === "saving"}
          className="flex items-center gap-2.5 px-8 py-3.5 text-sm font-semibold tracking-wide bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          {saveState === "saving" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saveState === "saving" ? "Guardando…" : "Guardar cambios"}
        </button>

        {saveState === "saved" && (
          <div className="flex items-center gap-2 text-sm text-green-500">
            <CheckCircle2 className="h-4 w-4" />
            Cambios guardados
          </div>
        )}

        {saveState === "error" && (
          <div className="flex items-center gap-2 text-sm text-red-400">
            <AlertTriangle className="h-4 w-4" />
            {errorMsg}
          </div>
        )}
      </div>
    </div>
  )
}

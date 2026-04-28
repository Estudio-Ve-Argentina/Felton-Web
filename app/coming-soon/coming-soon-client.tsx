"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, ArrowRight, Check, Clock, Instagram } from "lucide-react"
import { FeltonLogo } from "@/components/shared"

// ─── Countdown helpers ───────────────────────────────────────────────────────
interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calcTimeLeft(target: string): TimeLeft | null {
  const diff = new Date(target).getTime() - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}

// ─── Props from SSR ──────────────────────────────────────────────────────────
interface Props {
  title: string
  subtitle: string
  countdownTo: string | null
  showNewsletter: boolean
  newsletterCta: string
  bgStyle: "dark" | "gradient"
}

export default function ComingSoonClient(props: Props) {
  const {
    title,
    subtitle,
    countdownTo,
    showNewsletter,
    newsletterCta,
    bgStyle,
  } = props

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(
    countdownTo ? calcTimeLeft(countdownTo) : null
  )
  const [email, setEmail] = useState("")
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Live countdown
  useEffect(() => {
    if (!countdownTo) return
    intervalRef.current = setInterval(() => {
      setTimeLeft(calcTimeLeft(countdownTo))
    }, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [countdownTo])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setState("loading")
    setErrorMsg("")
    try {
      const res = await fetch("/api/tiendanube/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setState("success")
        setEmail("")
      } else {
        const data = await res.json().catch(() => ({}))
        setErrorMsg(data?.error || "Algo salió mal, intentá de nuevo.")
        setState("error")
      }
    } catch {
      setErrorMsg("Error de conexión. Intentá de nuevo.")
      setState("error")
    }
  }

  const isGradient = bgStyle === "gradient"

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: isGradient
          ? "radial-gradient(ellipse at 30% 20%, oklch(0.22 0.04 260) 0%, oklch(0.10 0.02 260) 60%, oklch(0.08 0.01 260) 100%)"
          : "oklch(0.10 0.015 260)",
      }}
    >
      {/* Leather Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage: "url('/images/leather-texture.png')",
          backgroundSize: "400px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Animated Soft Lights / Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main "Flashlight" Glows */}
        <motion.div
          animate={{
            x: ["-20vw", "40vw", "10vw", "-20vw"],
            y: ["-10vh", "30vh", "-20vh", "-10vh"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-[70vw] h-[70vw] rounded-full blur-[140px] opacity-[0.06] mix-blend-screen"
          style={{
            background: "oklch(0.72 0.12 85)",
            left: "10%",
            top: "10%",
          }}
        />
        
        <motion.div
          animate={{
            x: ["30vw", "-10vw", "50vw", "30vw"],
            y: ["40vh", "0vh", "20vh", "40vh"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-[80vw] h-[80vw] rounded-full blur-[160px] opacity-[0.05] mix-blend-screen"
          style={{
            background: "oklch(0.35 0.08 260)",
            right: "10%",
            bottom: "10%",
          }}
        />

        {/* Floating Dust Particles */}
        {[...Array(25)].map((_, i) => {
          // Deterministic "randomness" for hydration safety
          const startX = (i * 23) % 100
          const startY = (i * 37) % 100
          const durationX = 20 + (i % 15)
          const durationY = 25 + (i % 10)
          const delay = (i * 2) % 10
          const size = (i % 3) === 0 ? 3 : 2

          return (
            <motion.div
              key={`dust-${i}`}
              className="absolute rounded-full mix-blend-screen"
              style={{
                width: size,
                height: size,
                left: `${startX}%`,
                top: `${startY}%`,
                background: "oklch(0.85 0.05 85 / 0.6)",
                boxShadow: "0 0 10px 2px oklch(0.72 0.12 85 / 0.4)",
              }}
              animate={{
                x: ["0vw", `${15 + (i % 10)}vw`, `-${10 + (i % 5)}vw`, "0vw"],
                y: ["0vh", `-${15 + (i % 8)}vh`, `${10 + (i % 12)}vh`, "0vh"],
                opacity: [0, 0.8, 0.2, 0.6, 0],
                scale: [0.5, 1.5, 0.8, 1.2, 0.5]
              }}
              transition={{
                x: { duration: durationX, repeat: Infinity, ease: "easeInOut", delay },
                y: { duration: durationY, repeat: Infinity, ease: "easeInOut", delay },
                opacity: { duration: durationX * 0.8, repeat: Infinity, ease: "easeInOut", delay },
                scale: { duration: durationY * 0.9, repeat: Infinity, ease: "easeInOut", delay }
              }}
            />
          )
        })}
      </div>

      {/* Gold top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{ background: "oklch(0.72 0.12 85)" }}
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-8 left-1/2 -translate-x-1/2"
      >
        <FeltonLogo textClassName="text-3xl" />
      </motion.div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        className="relative z-10 max-w-2xl w-full mx-auto px-6 text-center mt-20"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border rounded-full text-xs font-semibold tracking-widest uppercase"
          style={{
            borderColor: "oklch(0.72 0.12 85 / 0.4)",
            color: "oklch(0.72 0.12 85)",
            background: "oklch(0.72 0.12 85 / 0.06)",
          }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
              style={{ background: "oklch(0.72 0.12 85)" }}
            />
            <span
              className="relative inline-flex rounded-full h-1.5 w-1.5"
              style={{ background: "oklch(0.72 0.12 85)" }}
            />
          </span>
          Próximamente
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="font-serif font-light leading-tight mb-4"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.75rem)",
            color: "oklch(0.95 0.01 90)",
          }}
        >
          {title}
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mx-auto h-px w-16 mb-6 origin-center"
          style={{ background: "oklch(0.72 0.12 85 / 0.6)" }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-base lg:text-lg leading-relaxed mb-10 max-w-xl mx-auto"
          style={{ color: "oklch(0.65 0.015 260)" }}
        >
          {subtitle}
        </motion.p>

        {/* Countdown */}
        <AnimatePresence>
          {countdownTo && timeLeft && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="flex justify-center gap-3 sm:gap-6 mb-12"
            >
              {(
                [
                  { label: "Días", value: timeLeft.days },
                  { label: "Horas", value: timeLeft.hours },
                  { label: "Min", value: timeLeft.minutes },
                  { label: "Seg", value: timeLeft.seconds },
                ] as const
              ).map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center">
                  <div
                    className="relative w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center border rounded"
                    style={{
                      borderColor: "oklch(0.72 0.12 85 / 0.25)",
                      background: "oklch(0.14 0.02 260)",
                    }}
                  >
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={value}
                        initial={{ y: -12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 12, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="font-mono text-xl sm:text-2xl font-light tabular-nums"
                        style={{ color: "oklch(0.72 0.12 85)" }}
                      >
                        {pad(value)}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <span
                    className="mt-2 text-[10px] font-semibold tracking-widest uppercase"
                    style={{ color: "oklch(0.50 0.015 260)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Newsletter form */}
        {showNewsletter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            {state === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-3 px-6 py-4 border rounded"
                style={{
                  borderColor: "oklch(0.72 0.12 85 / 0.4)",
                  background: "oklch(0.72 0.12 85 / 0.08)",
                  color: "oklch(0.72 0.12 85)",
                }}
              >
                <Check className="h-5 w-5" />
                <span className="text-sm font-medium tracking-wide">
                  ¡Te anotamos! Te avisamos cuando abramos.
                </span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
                      style={{ color: "oklch(0.50 0.015 260)" }}
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      disabled={state === "loading"}
                      className="w-full pl-11 pr-4 py-4 text-sm bg-transparent outline-none placeholder:text-muted-foreground/40 transition-colors"
                      style={{
                        border: "1px solid oklch(0.72 0.12 85 / 0.25)",
                        borderRadius: "2px",
                        color: "oklch(0.95 0.01 90)",
                      }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "oklch(0.72 0.12 85 / 0.6)")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "oklch(0.72 0.12 85 / 0.25)")
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="px-8 py-4 text-sm font-semibold tracking-wide transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-60"
                    style={{
                      background: "oklch(0.72 0.12 85)",
                      color: "oklch(0.10 0.015 260)",
                      borderRadius: "2px",
                    }}
                  >
                    {state === "loading" ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-4 w-4 border-2 border-current/30 border-t-current rounded-full"
                      />
                    ) : (
                      <>
                        <span>{newsletterCta}</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>

                {state === "error" && (
                  <p className="mt-3 text-xs text-red-400 text-center">{errorMsg}</p>
                )}

                <p
                  className="mt-4 text-xs text-center"
                  style={{ color: "oklch(0.45 0.01 260)" }}
                >
                  Sin spam. Solo te avisamos cuando estemos listos.
                </p>
              </form>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Bottom footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-6"
        style={{ color: "oklch(0.40 0.01 260)" }}
      >
        <span className="text-xs tracking-widest uppercase font-medium">
          Felton © {new Date().getFullYear()}
        </span>
        <span className="h-3 w-px" style={{ background: "oklch(0.30 0.01 260)" }} />
        <a
          href="https://www.instagram.com/felton.ar"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs hover:opacity-80 transition-opacity"
        >
          <Instagram className="h-3.5 w-3.5" />
          @felton.ar
        </a>
      </motion.div>
    </div>
  )
}

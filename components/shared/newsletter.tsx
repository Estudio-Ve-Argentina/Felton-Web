"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Check, Loader2 } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { fadeInUp, luxuryTransition } from "@/lib/animations"
import { cn } from "@/lib/utils"

interface NewsletterProps {
  variant?: "default" | "compact" | "inline"
  className?: string
}

export function Newsletter({ variant = "default", className }: NewsletterProps) {
  const { t } = useTranslation()
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === "loading") return

    setStatus("loading")
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setStatus("success")
    setEmail("")
    
    // Reset after 3 seconds
    setTimeout(() => setStatus("idle"), 3000)
  }

  if (variant === "compact") {
    return (
      <div className={cn("w-full", className)}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("newsletter.placeholder")}
              className="w-full bg-secondary/50 border border-border/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              disabled={status === "loading" || status === "success"}
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="flex items-center justify-center border border-primary bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
          >
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : status === "success" ? (
              <Check className="h-4 w-4" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
          </button>
        </form>
        <p className="mt-2 text-xs text-muted-foreground/60">
          {t("newsletter.privacy")}
        </p>
      </div>
    )
  }

  if (variant === "inline") {
    return (
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        transition={luxuryTransition}
        className={cn(
          "border border-border/30 bg-secondary/20 p-6 md:p-8",
          className
        )}
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <h3 className="font-serif text-xl font-light text-foreground md:text-2xl">
              {t("newsletter.title")}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("newsletter.description")}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 md:w-96">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("newsletter.placeholder")}
              className="flex-1 bg-secondary/50 border border-border/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              disabled={status === "loading" || status === "success"}
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="flex items-center gap-2 border border-primary bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
            >
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : status === "success" ? (
                <>
                  <Check className="h-4 w-4" />
                </>
              ) : (
                <>
                  {t("newsletter.button")}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.section
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      transition={luxuryTransition}
      className={cn(
        "relative overflow-hidden border-y border-border/30 bg-secondary/10",
        className
      )}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0" />
      <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0" />

      <div className="mx-auto max-w-4xl px-6 py-16 text-center lg:px-8 lg:py-24">
        {/* Eyebrow */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mx-auto mb-6 h-px w-16 bg-primary/60 origin-left"
        />

        <h2 className="font-serif text-3xl font-light tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {t("newsletter.title")}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground lg:text-lg">
          {t("newsletter.description")}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:gap-2"
        >
          <div className="relative flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("newsletter.placeholder")}
              className="w-full bg-secondary/30 border border-border/50 px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              disabled={status === "loading" || status === "success"}
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="group flex items-center justify-center gap-2 border border-primary bg-primary px-6 py-4 text-sm font-medium tracking-wide text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
          >
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : status === "success" ? (
              <>
                <Check className="h-4 w-4" />
                <span>{t("newsletter.success")}</span>
              </>
            ) : (
              <>
                <span>{t("newsletter.button")}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        <p className="mt-4 text-xs text-muted-foreground/60">
          {t("newsletter.privacy")}
        </p>
      </div>
    </motion.section>
  )
}

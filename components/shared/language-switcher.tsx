"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Globe } from "lucide-react"
import { useI18n, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface LanguageSwitcherProps {
  variant?: "default" | "minimal"
  className?: string
}

export function LanguageSwitcher({ variant = "default", className }: LanguageSwitcherProps) {
  const { locale, setLocale } = useI18n()
  const [isOpen, setIsOpen] = useState(false)

  const languages: { code: Locale; label: string; short: string }[] = [
    { code: "es", label: "Espanol", short: "ES" },
    { code: "en", label: "English", short: "EN" },
  ]

  if (variant === "minimal") {
    return (
      <button
        onClick={() => setLocale(locale === "es" ? "en" : "es")}
        className={cn(
          "flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary",
          className
        )}
      >
        <Globe className="h-3.5 w-3.5" />
        {locale === "es" ? "EN" : "ES"}
      </button>
    )
  }

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase tracking-wider">{locale}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 z-50 min-w-32 border border-border/50 bg-card p-1 shadow-lg"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLocale(lang.code)
                    setIsOpen(false)
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors",
                    locale === lang.code
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <span className="font-medium uppercase tracking-wider">
                    {lang.short}
                  </span>
                  <span className="text-xs">{lang.label}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

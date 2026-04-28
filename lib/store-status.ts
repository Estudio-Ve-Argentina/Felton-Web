/**
 * Store Status — persisted as a JSON file in /data/store-status.json
 * No database required: we read from disk on each middleware check and
 * write from the admin panel. The file is small and reads are fast.
 */

import path from "path"
import fs from "fs"

export interface StoreStatus {
  /** Whether the store is currently closed */
  closed: boolean
  /** Heading shown on the coming-soon page */
  title: string
  /** Subtitle / description shown below the title */
  subtitle: string
  /** Optional: ISO datetime string for the countdown target */
  countdownTo: string | null
  /** Whether to show the newsletter subscription form */
  showNewsletter: boolean
  /** Label for the newsletter CTA button */
  newsletterCta: string
  /** Background style: "dark" | "gradient" */
  bgStyle: "dark" | "gradient"
}

const STATUS_FILE = path.join(process.cwd(), "data", "store-status.json")

export const DEFAULT_STATUS: StoreStatus = {
  closed: false,
  title: "Estamos preparando algo grande",
  subtitle: "Muy pronto, algo extraordinario llega a Felton. Suscribite para ser el primero en enterarte.",
  countdownTo: "2026-05-09T19:00:00-03:00",
  showNewsletter: true,
  newsletterCta: "Notificarme",
  bgStyle: "dark",
}

export function readStoreStatus(): StoreStatus {
  try {
    if (fs.existsSync(STATUS_FILE)) {
      const raw = fs.readFileSync(STATUS_FILE, "utf-8")
      return { ...DEFAULT_STATUS, ...JSON.parse(raw) }
    }
  } catch {
    // fall through
  }
  return { ...DEFAULT_STATUS }
}

export function writeStoreStatus(status: StoreStatus): void {
  const dir = path.dirname(STATUS_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(STATUS_FILE, JSON.stringify(status, null, 2), "utf-8")
}

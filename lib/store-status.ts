/**
 * Store Status — persisted in Vercel KV for production, or local JSON for dev.
 */

import path from "path"
import fs from "fs"
import { createClient } from "@vercel/kv"

export interface StoreStatus {
  closed: boolean
  title: string
  subtitle: string
  countdownTo: string | null
  showNewsletter: boolean
  newsletterCta: string
  bgStyle: "dark" | "gradient" | "video"
  showBadge: boolean
  badgeStyle: "gold" | "outline" | "ghost" | "dark"
}

const STATUS_FILE = path.join(process.cwd(), "data", "store-status.json")
const KV_KEY = "felton_store_status"

export const DEFAULT_STATUS: StoreStatus = {
  closed: false,
  title: "Estamos preparando algo grande",
  subtitle: "Muy pronto, algo extraordinario llega a Felton. Suscribite para ser el primero en enterarte.",
  countdownTo: "2026-05-09T19:00:00-03:00",
  showNewsletter: true,
  newsletterCta: "Notificarme",
  bgStyle: "dark",
  showBadge: true,
  badgeStyle: "outline",
}

// Function to get the KV client (supporting both legacy Vercel KV and new Upstash Redis)
function getKVClient() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  
  if (!url || !token) return null
  
  return createClient({ url, token })
}

export async function readStoreStatus(): Promise<StoreStatus> {
  try {
    // Si estamos en producción (Vercel)
    if (process.env.VERCEL === "1") {
      const kv = getKVClient()
      if (!kv) {
        console.warn("Vercel KV / Upstash no está configurado (faltan variables de entorno). Usando default.")
        return DEFAULT_STATUS
      }
      const data = await kv.get<StoreStatus>(KV_KEY)
      if (data) return { ...DEFAULT_STATUS, ...data }
      return DEFAULT_STATUS
    }

    // Fallback local (desarrollo)
    if (fs.existsSync(STATUS_FILE)) {
      const raw = fs.readFileSync(STATUS_FILE, "utf-8")
      return { ...DEFAULT_STATUS, ...JSON.parse(raw) }
    }
  } catch (err) {
    console.error("Error reading store status:", err)
  }
  return { ...DEFAULT_STATUS }
}

export async function writeStoreStatus(status: StoreStatus): Promise<void> {
  try {
    // Si estamos en producción (Vercel)
    if (process.env.VERCEL === "1") {
      const kv = getKVClient()
      if (!kv) {
        throw new Error("Vercel KV / Upstash no está enlazado correctamente. Faltan variables de entorno (KV_REST_API_URL o UPSTASH_REDIS_REST_URL). Por favor, revisá tu panel de Vercel > Settings > Environment Variables, y hacé un REDEPLOY manual.")
      }
      await kv.set(KV_KEY, status)
      return
    }

    // Fallback local (desarrollo)
    const dir = path.dirname(STATUS_FILE)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(STATUS_FILE, JSON.stringify(status, null, 2), "utf-8")
  } catch (err) {
    console.error("Error writing store status:", err)
    throw err
  }
}

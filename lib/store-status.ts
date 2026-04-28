/**
 * Store Status — persisted in Vercel KV for production, or local JSON for dev.
 */

import path from "path"
import fs from "fs"
import Redis from "ioredis"

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

// Function to get the Redis client
function getRedisClient() {
  const url = process.env.storage_REDIS_URL || process.env.KV_REST_API_URL || process.env.REDIS_URL
  if (!url) return null
  return new Redis(url)
}

export async function readStoreStatus(): Promise<StoreStatus> {
  try {
    // Si estamos en producción (Vercel)
    if (process.env.VERCEL === "1") {
      const redis = getRedisClient()
      if (!redis) {
        console.warn("Redis no está configurado (falta storage_REDIS_URL). Usando default.")
        return DEFAULT_STATUS
      }
      const rawData = await redis.get(KV_KEY)
      if (rawData) {
        const data = JSON.parse(rawData)
        return { ...DEFAULT_STATUS, ...data }
      }
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
      const redis = getRedisClient()
      if (!redis) {
        throw new Error("Redis no está enlazado correctamente. Faltan variables de entorno (storage_REDIS_URL). Por favor, revisá tu panel de Vercel > Settings > Environment Variables, y hacé un REDEPLOY manual.")
      }
      await redis.set(KV_KEY, JSON.stringify(status))
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

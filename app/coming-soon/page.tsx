import type { Metadata } from "next"
import { readStoreStatus } from "@/lib/store-status"
import ComingSoonClient from "./coming-soon-client"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Próximamente — Felton",
  description: "Estamos preparando algo extraordinario. Suscribite para ser el primero en enterarte.",
  robots: "noindex, nofollow",
}

export default async function ComingSoonPage() {
  const status = await readStoreStatus()

  return (
    <ComingSoonClient
      title={status.title}
      subtitle={status.subtitle}
      countdownTo={status.countdownTo}
      showNewsletter={status.showNewsletter}
      newsletterCta={status.newsletterCta}
      bgStyle={status.bgStyle}
      showBadge={status.showBadge}
      badgeStyle={status.badgeStyle}
    />
  )
}

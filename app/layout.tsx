import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Cormorant_Garamond } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { I18nProvider } from "@/lib/i18n"
import { CartProvider } from "@/lib/cart"
import { CartDrawer } from "@/components/layout/cart-drawer"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Felton | No Es Para Cualquiera",
    template: "%s | Felton",
  },
  description:
    "Accesorios premium para quienes entienden que lo mejor no es para cualquiera. Descubrí las mejores marcas del mundo.",
  keywords: [
    "accesorios premium",
    "marcas de lujo",
    "accesorios exclusivos",
    "diseño atemporal",
    "elegancia",
  ],
  authors: [{ name: "Felton" }],
  creator: "Felton",
  publisher: "Felton",
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Felton",
    title: "Felton | No Es Para Cualquiera",
    description:
      "Accesorios premium para quienes entienden que lo mejor no es para cualquiera.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Felton | No Es Para Cualquiera",
    description:
      "Accesorios premium para quienes entienden que lo mejor no es para cualquiera.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#1a1a2e",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        <CartProvider>
          <I18nProvider>
            {children}
            <CartDrawer />
            <Toaster position="bottom-right" />
          </I18nProvider>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}

"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Header, Footer, SectionHeader } from "@/components/layout"
import { Newsletter } from "@/components/shared"
import { useTranslation } from "@/lib/i18n"

const PARTICLES = [
  { left: 7.2,  top: 8.1,  duration: 4.2, delay: 0.3 },
  { left: 91.1, top: 12.4, duration: 3.8, delay: 1.1 },
  { left: 22.5, top: 28.2, duration: 4.7, delay: 0.7 },
  { left: 66.8, top: 5.8,  duration: 3.5, delay: 1.5 },
  { left: 44.2, top: 45.1, duration: 4.1, delay: 0.1 },
  { left: 77.9, top: 58.6, duration: 3.9, delay: 1.8 },
  { left: 13.4, top: 68.0, duration: 4.8, delay: 0.9 },
  { left: 54.7, top: 78.3, duration: 3.7, delay: 1.4 },
  { left: 84.3, top: 88.1, duration: 4.3, delay: 0.5 },
  { left: 32.1, top: 95.4, duration: 3.6, delay: 2.0 },
]

const brands = [
  {
    id: "1",
    name: "Louis Vuitton",
    slug: "louis-vuitton",
    logo: "/brands/Louis_Vuitton_LV_logo.png",
    category: "moda",
    description: "Icónico lujo francés desde 1854. Reconocido mundialmente por su artesanía excepcional.",
    descriptionEn: "Iconic French luxury since 1854. Globally recognized for its exceptional craftsmanship.",
    productCount: 24,
  },
  {
    id: "2",
    name: "Gucci",
    slug: "gucci",
    logo: "/brands/Gucci_logo.svg",
    category: "moda",
    description: "Elegancia italiana contemporánea. Fusión perfecta entre tradición e innovación.",
    descriptionEn: "Contemporary Italian elegance. Perfect fusion of tradition and innovation.",
    productCount: 18,
  },
  {
    id: "3",
    name: "Prada",
    slug: "prada",
    logo: "/brands/Prada-Logo.svg",
    category: "moda",
    description: "Vanguardia milanesa. Donde el minimalismo se encuentra con el lujo.",
    descriptionEn: "Milanese avant-garde. Where minimalism meets luxury.",
    productCount: 21,
  },
  {
    id: "4",
    name: "Cartier",
    slug: "cartier",
    logo: "/brands/Cartier_logo.svg",
    category: "joyeria",
    description: "Joyero de reyes, rey de joyeros. Lujo atemporal desde 1847.",
    descriptionEn: "Jeweler of kings, king of jewelers. Timeless luxury since 1847.",
    productCount: 8,
  },
  {
    id: "5",
    name: "Diesel",
    slug: "diesel",
    logo: "/brands/diesel-logo.png",
    category: "urban",
    description: "Estilo urbano sin concesiones. Diseño audaz para los que marcan tendencia.",
    descriptionEn: "Uncompromising urban style. Bold design for those who set the trend.",
    productCount: 15,
  },
  {
    id: "6",
    name: "Supreme",
    slug: "supreme",
    logo: "/brands/supreme-logo.png",
    category: "urban",
    description: "Cultura de la calle elevada al máximo nivel. El símbolo de lo exclusivo.",
    descriptionEn: "Street culture elevated to the highest level. The symbol of the exclusive.",
    productCount: 11,
  },
]

export default function BrandsPage() {
  const { t, locale } = useTranslation()

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">

        {/* ── Full page background wrapper ─────────────────── */}
        <div
          className="relative overflow-hidden"
          style={{
            backgroundImage: 'url("/images/leather-texture.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "multiply",
            backgroundColor: "rgba(11,17,32,0.96)",
          }}
        >
          {/* Gold grid */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(212,175,55,0.4) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(212,175,55,0.4) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />

          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 25%, rgba(212,175,55,0.09) 0%, transparent 60%)",
            }}
          />

          {/* Particles */}
          {PARTICLES.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/40 rounded-full pointer-events-none"
              style={{ left: `${p.left}%`, top: `${p.top}%` }}
              animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
            />
          ))}

          {/* ── Header ──────────────────────────────────────── */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-14">
            <SectionHeader
              eyebrow={t("brands.eyebrow")}
              title={t("brands.title")}
              description={t("brands.description")}
            />

          </div>

          {/* ── Brands Grid ─────────────────────────────────── */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-20">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {brands.map((brand, index) => (
                  <motion.div
                    key={brand.id}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                  >
                    <Link
                      href="/products"
                      className="group relative flex flex-col overflow-hidden border border-primary/15 hover:border-primary/45 transition-all duration-300"
                      style={{
                        backgroundImage: 'url("/images/leather-texture.png")',
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundBlendMode: "multiply",
                        backgroundColor: "rgba(8,13,26,0.90)",
                      }}
                    >
                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.10) 0%, transparent 65%)",
                        }}
                      />

                      {/* Corner accents */}
                      <div className="absolute top-0 left-0 w-7 h-7 border-t border-l border-primary/25 transition-all duration-500 group-hover:border-primary/70 group-hover:w-10 group-hover:h-10" />
                      <div className="absolute bottom-0 right-0 w-7 h-7 border-b border-r border-primary/25 transition-all duration-500 group-hover:border-primary/70 group-hover:w-10 group-hover:h-10" />

                      {/* Logo area */}
                      <div className="relative flex items-center justify-center h-32 sm:h-52 px-6 sm:px-12 py-6 sm:py-10">
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          width={200}
                          height={100}
                          className="object-contain max-h-16 sm:max-h-24 w-auto transition-all duration-500 group-hover:scale-105"
                          style={{ filter: "brightness(0) invert(1)", opacity: 0.8 }}
                        />
                      </div>

                      {/* Divider */}
                      <div className="mx-4 sm:mx-8 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                      {/* Info */}
                      <div className="px-4 sm:px-8 py-4 sm:py-7 flex flex-col flex-1">
                        <h3 className="font-serif text-base sm:text-xl font-light tracking-wide text-white/90 mb-1 sm:mb-2 group-hover:text-primary transition-colors duration-300">
                          {brand.name}
                        </h3>
                        <p className="text-xs font-light text-white/40 leading-relaxed flex-1 hidden sm:block">
                          {locale === "es" ? brand.description : brand.descriptionEn}
                        </p>
                        <div className="flex items-center justify-between mt-3 sm:mt-6 pt-3 sm:pt-4 border-t border-primary/10">
                          <span className="text-[10px] sm:text-xs text-white/25 tracking-wide">
                            {brand.productCount} {locale === "es" ? "prod." : "prod."}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-primary/60 group-hover:text-primary transition-all duration-300">
                            {locale === "es" ? "Ver" : "View"}
                            <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Bottom fade into newsletter */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: "80px",
              background: "linear-gradient(to bottom, transparent 0%, var(--background) 100%)",
            }}
          />
        </div>

        {/* Newsletter */}
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}

"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { Section, SectionHeader } from "@/components/layout"
import { fadeInUp, staggerContainer, luxuryTransition } from "@/lib/animations"

// Sample brands data
const brands = [
  { id: "1", name: "Louis Vuitton", slug: "louis-vuitton" },
  { id: "2", name: "Gucci", slug: "gucci" },
  { id: "3", name: "Hermes", slug: "hermes" },
  { id: "4", name: "Prada", slug: "prada" },
  { id: "5", name: "Montblanc", slug: "montblanc" },
  { id: "6", name: "Bottega Veneta", slug: "bottega-veneta" },
  { id: "7", name: "Cartier", slug: "cartier" },
  { id: "8", name: "Chanel", slug: "chanel" },
]

export function BrandsPreview() {
  const { t } = useTranslation()

  return (
    <Section variant="light" size="large" className="light-section">
      <SectionHeader
        eyebrow={t("brands.eyebrow")}
        title={t("brands.title")}
        description={t("brands.description")}
      />

      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6"
      >
        {brands.map((brand) => (
          <motion.div key={brand.id} variants={fadeInUp}>
            <Link
              href={`/brands/${brand.slug}`}
              className="group flex items-center justify-center h-24 lg:h-32 border-2 border-border/30 bg-card transition-all hover:border-primary/50 hover:bg-secondary/50"
            >
              <span className="font-serif text-lg lg:text-xl font-light text-foreground tracking-wide transition-colors group-hover:text-primary">
                {brand.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* View All CTA */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={luxuryTransition}
        className="mt-12 text-center"
      >
        <Link
          href="/brands"
          className="group inline-flex items-center gap-2 border-2 border-primary bg-primary px-8 py-3 text-sm font-medium tracking-wide text-primary-foreground transition-all hover:bg-primary/90"
        >
          {t("brands.viewProducts")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </Section>
  )
}

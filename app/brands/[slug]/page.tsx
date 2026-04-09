"use client"

import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
import { Header, Footer, Section, SectionHeader } from "@/components/layout"
import { Newsletter } from "@/components/shared"
import { useTranslation } from "@/lib/i18n"
import { fadeInUp, staggerContainer, luxuryTransition } from "@/lib/animations"
import { cn } from "@/lib/utils"

// Sample data - in production this would come from a database
const brandsData: Record<string, {
  name: string
  descriptionEs: string
  descriptionEn: string
  products: Array<{
    id: string
    name: string
    price: string
    image: string
    href: string
    badge?: string
  }>
}> = {
  "louis-vuitton": {
    name: "Louis Vuitton",
    descriptionEs: "Desde 1854, Louis Vuitton ha sido sinonimo de lujo y artesania excepcional. Cada pieza representa la culminacion de tradiciones centenarias y vision contemporanea.",
    descriptionEn: "Since 1854, Louis Vuitton has been synonymous with luxury and exceptional craftsmanship. Each piece represents the culmination of centuries-old traditions and contemporary vision.",
    products: [
      { id: "1", name: "Pocket Organizer", price: "$420", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=600&fit=crop", href: "#" },
      { id: "2", name: "Multiple Wallet", price: "$680", image: "https://images.unsplash.com/photo-1606503825008-909a67e63c3d?w=600&h=600&fit=crop", href: "#", badge: "new" },
      { id: "3", name: "Card Holder", price: "$340", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop", href: "#" },
      { id: "4", name: "Key Pouch", price: "$290", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop", href: "#" },
      { id: "5", name: "Belt Monogram", price: "$520", image: "https://images.unsplash.com/photo-1531190260877-c8d11eb5afaf?w=600&h=600&fit=crop", href: "#", badge: "limited" },
      { id: "6", name: "Passport Cover", price: "$380", image: "https://images.unsplash.com/photo-1585916420730-d7f95e942d43?w=600&h=600&fit=crop", href: "#" },
    ],
  },
  gucci: {
    name: "Gucci",
    descriptionEs: "La casa italiana que redefine el lujo contemporaneo. Gucci combina herencia artesanal con una vision audaz y moderna.",
    descriptionEn: "The Italian house that redefines contemporary luxury. Gucci combines artisanal heritage with a bold and modern vision.",
    products: [
      { id: "1", name: "GG Wallet", price: "$450", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=600&fit=crop", href: "#", badge: "new" },
      { id: "2", name: "Marmont Card Case", price: "$320", image: "https://images.unsplash.com/photo-1606503825008-909a67e63c3d?w=600&h=600&fit=crop", href: "#" },
      { id: "3", name: "Signature Belt", price: "$480", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop", href: "#" },
    ],
  },
}

// Default data for brands not in the database
const defaultBrand = {
  name: "Marca Premium",
  descriptionEs: "Descubri nuestra seleccion curada de productos de esta prestigiosa marca.",
  descriptionEn: "Discover our curated selection of products from this prestigious brand.",
  products: [
    { id: "1", name: "Premium Product", price: "$399", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=600&fit=crop", href: "#" },
  ],
}

export default function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { t, locale } = useTranslation()
  const brand = brandsData[slug] || { ...defaultBrand, name: slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") }

  const getBadgeText = (badge: string) => {
    if (badge === "new") return t("products.new")
    if (badge === "limited") return t("products.limited")
    return badge
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-4 sm:pt-20">
        {/* Hero Section */}
        <Section variant="dark" size="large" className="py-4 sm:py-8">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={luxuryTransition}
          >
            <Link
              href="/brands"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("common.back")}
            </Link>
          </motion.div>

          <SectionHeader
            eyebrow={t("brands.eyebrow")}
            title={brand.name}
            description={locale === "es" ? brand.descriptionEs : brand.descriptionEn}
            align="left"
          />
        </Section>

        {/* Products Grid */}
        <Section variant="default" size="large">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl font-light text-foreground">
              {locale === "es" ? "Productos Disponibles" : "Available Products"}
            </h2>
            <span className="text-sm text-muted-foreground">
              {brand.products.length} {locale === "es" ? "productos" : "products"}
            </span>
          </div>

          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {brand.products.map((product, index) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                transition={{ ...luxuryTransition, delay: index * 0.1 }}
                className="py-2 sm:py-0"
              >
                <Link href={product.href} className="group block">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-secondary/30 border-2 border-border/30 transition-all group-hover:border-primary/40">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-4 left-4">
                        <span
                          className={cn(
                            "px-3 py-1 text-xs font-medium uppercase tracking-wider",
                            product.badge === "new"
                              ? "bg-primary text-primary-foreground"
                              : "bg-foreground text-background"
                          )}
                        >
                          {getBadgeText(product.badge)}
                        </span>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="flex items-center gap-2 text-sm font-medium text-primary">
                        {t("products.viewProduct")}
                        <ExternalLink className="h-4 w-4" />
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mt-1 sm:mt-4">
                    <h3 className="font-serif text-base sm:text-lg font-light text-foreground group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground">{product.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* CTA Section */}
        <Section variant="dark" size="default">
          <div className="text-center">
            <h3 className="font-serif text-2xl font-light text-foreground mb-4">
              {locale === "es" ? "No encontras lo que buscas?" : "Can't find what you're looking for?"}
            </h3>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              {locale === "es"
                ? "Contactanos y te ayudamos a encontrar exactamente lo que necesitas."
                : "Contact us and we'll help you find exactly what you need."}
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 border-2 border-primary bg-primary px-8 py-3 text-sm font-medium tracking-wide text-primary-foreground transition-all hover:bg-primary/90"
            >
              {t("nav.contact")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Section>

        {/* Newsletter */}
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react"
import { Header, Footer, Section, SectionHeader } from "@/components/layout"
import { Newsletter } from "@/components/shared"
import { useTranslation } from "@/lib/i18n"
import { fadeInUp, staggerContainer, luxuryTransition } from "@/lib/animations"
import { cn } from "@/lib/utils"

// Sample blog posts - in production this would come from a database
const blogPosts = [
  {
    id: "1",
    slug: "como-reconocer-cuero-genuino",
    titleEs: "Como Reconocer Cuero Genuino de Alta Calidad",
    titleEn: "How to Recognize High-Quality Genuine Leather",
    excerptEs: "Aprende a distinguir el cuero autentico de las imitaciones con estos consejos de expertos.",
    excerptEn: "Learn to distinguish authentic leather from imitations with these expert tips.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=500&fit=crop",
    category: "guias",
    categoryEn: "guides",
    date: "2026-01-15",
    readTime: "5 min",
    featured: true,
  },
  {
    id: "2",
    slug: "tendencias-accesorios-2026",
    titleEs: "Tendencias en Accesorios Premium para 2026",
    titleEn: "Premium Accessories Trends for 2026",
    excerptEs: "Las marcas de lujo definen el rumbo de los accesorios este ano. Descubri que esperar.",
    excerptEn: "Luxury brands set the course for accessories this year. Discover what to expect.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=500&fit=crop",
    category: "tendencias",
    categoryEn: "trends",
    date: "2026-01-10",
    readTime: "4 min",
    featured: true,
  },
  {
    id: "3",
    slug: "cuidado-billeteras-cuero",
    titleEs: "Guia Completa: Cuidado de Billeteras de Cuero",
    titleEn: "Complete Guide: Leather Wallet Care",
    excerptEs: "Mantene tus accesorios de cuero como nuevos con estos consejos profesionales.",
    excerptEn: "Keep your leather accessories looking new with these professional tips.",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&h=500&fit=crop",
    category: "cuidado",
    categoryEn: "care",
    date: "2026-01-05",
    readTime: "6 min",
    featured: false,
  },
  {
    id: "4",
    slug: "historia-louis-vuitton",
    titleEs: "La Historia de Louis Vuitton: De Baules a Imperio",
    titleEn: "The History of Louis Vuitton: From Trunks to Empire",
    excerptEs: "Explora los origenes y la evolucion de una de las marcas mas iconicas del mundo.",
    excerptEn: "Explore the origins and evolution of one of the world's most iconic brands.",
    image: "https://images.unsplash.com/photo-1606503825008-909a67e63c3d?w=800&h=500&fit=crop",
    category: "marcas",
    categoryEn: "brands",
    date: "2025-12-28",
    readTime: "8 min",
    featured: false,
  },
  {
    id: "5",
    slug: "mejores-regalos-ejecutivos",
    titleEs: "Los Mejores Regalos para Ejecutivos en 2026",
    titleEn: "The Best Gifts for Executives in 2026",
    excerptEs: "Seleccion curada de accesorios premium perfectos para impresionar.",
    excerptEn: "Curated selection of premium accessories perfect for impressing.",
    image: "https://images.unsplash.com/photo-1531190260877-c8d11eb5afaf?w=800&h=500&fit=crop",
    category: "guias",
    categoryEn: "guides",
    date: "2025-12-20",
    readTime: "5 min",
    featured: false,
  },
]

const categories = [
  { id: "all", labelEs: "Todos", labelEn: "All" },
  { id: "guias", labelEs: "Guias", labelEn: "Guides" },
  { id: "tendencias", labelEs: "Tendencias", labelEn: "Trends" },
  { id: "cuidado", labelEs: "Cuidado", labelEn: "Care" },
  { id: "marcas", labelEs: "Marcas", labelEn: "Brands" },
]

export default function BlogPage() {
  const { t, locale } = useTranslation()
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredPosts = blogPosts.filter(
    (post) => activeCategory === "all" || post.category === activeCategory
  )

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale === "es" ? "es-AR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <Section variant="dark" size="large">
          <SectionHeader
            eyebrow={t("blog.eyebrow")}
            title={t("blog.title")}
            description={t("blog.description")}
          />

          {/* Category Filter */}
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "px-4 py-2 text-sm font-medium tracking-wide border-2 transition-all",
                  activeCategory === category.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/30 text-muted-foreground hover:border-primary/50 hover:text-primary"
                )}
              >
                {locale === "es" ? category.labelEs : category.labelEn}
              </button>
            ))}
          </div>
        </Section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <Section variant="default" size="default">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="grid gap-8 lg:grid-cols-2"
            >
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  variants={fadeInUp}
                  transition={{ ...luxuryTransition, delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block">
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden border-2 border-border/30 transition-all group-hover:border-primary/40">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={locale === "es" ? post.titleEs : post.titleEn}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-primary text-primary-foreground">
                          {locale === "es" ? post.category : post.categoryEn}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mt-6">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>

                      <h2 className="mt-3 font-serif text-2xl font-light text-foreground group-hover:text-primary transition-colors lg:text-3xl">
                        {locale === "es" ? post.titleEs : post.titleEn}
                      </h2>

                      <p className="mt-3 text-sm font-light text-muted-foreground line-clamp-2">
                        {locale === "es" ? post.excerptEs : post.excerptEn}
                      </p>

                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition-all group-hover:gap-3">
                        {t("blog.readMore")}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </Section>
        )}

        {/* Regular Posts */}
        <Section variant="dark" size="large">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                variants={fadeInUp}
                transition={{ ...luxuryTransition, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden border-2 border-border/30 transition-all group-hover:border-primary/40">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={locale === "es" ? post.titleEs : post.titleEn}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="mt-4">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {locale === "es" ? post.category : post.categoryEn}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="mt-2 font-serif text-lg font-light text-foreground group-hover:text-primary transition-colors">
                      {locale === "es" ? post.titleEs : post.titleEn}
                    </h3>

                    <p className="mt-2 text-sm font-light text-muted-foreground line-clamp-2">
                      {locale === "es" ? post.excerptEs : post.excerptEn}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>

          {/* No results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                {locale === "es"
                  ? "No se encontraron articulos en esta categoria."
                  : "No articles found in this category."}
              </p>
            </div>
          )}
        </Section>

        {/* Newsletter */}
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}

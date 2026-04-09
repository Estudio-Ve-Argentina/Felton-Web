"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, Clock, Loader2 } from "lucide-react"
import { Header, Footer, Section, SectionHeader } from "@/components/layout"
import { Newsletter } from "@/components/shared"
import { useTranslation } from "@/lib/i18n"
import { fadeInUp, staggerContainer, luxuryTransition } from "@/lib/animations"
import type { TiendaNubeBlogPostScraped } from "@/lib/tiendanube-blog"

export default function BlogPage() {
  const { t, locale } = useTranslation()
  const [posts, setPosts] = useState<TiendaNubeBlogPostScraped[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/tiendanube/blog")
        if (!res.ok) throw new Error("Error")
        const data = await res.json()
        setPosts(Array.isArray(data) ? data : [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const categories = [
    "All",
    ...Array.from(new Set(posts.flatMap((post) => post.categories || []))),
  ]

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.categories?.includes(selectedCategory))

  const getReadTime = (content: string) => {
    const words = content.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length
    return `${Math.max(1, Math.ceil(words / 200))} min`
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === "es" ? "es-AR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero */}
        <div className="bg-secondary/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-14">
            <SectionHeader
              eyebrow={t("blog.eyebrow")}
              title={t("blog.title")}
              description={t("blog.description")}
            />
          </div>
        </div>

        {/* Categories */}
        {!loading && posts.length > 0 && (
          <div className="border-b border-border/40">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2.5 text-xs font-medium tracking-widest uppercase transition-all duration-300 border ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-transparent text-muted-foreground border-border/60 hover:border-primary/40 hover:text-primary"
                    }`}
                  >
                    {category === "All" ? (locale === "es" ? "Todos" : "All") : category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Posts */}
        <Section variant="default" size="large">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                {locale === "es" ? "Cargando artículos..." : "Loading articles..."}
              </p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-muted-foreground">
                {locale === "es" 
                  ? "No se encontraron artículos en esta categoría." 
                  : "No articles found in this category."}
              </p>
              {selectedCategory !== "All" && (
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="mt-6 text-sm text-primary hover:underline"
                >
                  {locale === "es" ? "Ver todos" : "View all"}
                </button>
              )}
            </div>
          ) : (
            <motion.div
              key={selectedCategory}
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={`${post.id}-${selectedCategory}`}
                  variants={fadeInUp}
                  transition={{ ...luxuryTransition, delay: index * 0.08 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block">
                    {/* Image */}
                    <div className="relative aspect-16/10 overflow-hidden border-2 border-border/30 transition-all group-hover:border-primary/40 bg-secondary/20">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-xs text-muted-foreground uppercase tracking-widest">Felton</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="mt-5">
                      <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.published_at)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />
                          {getReadTime(post.content)}
                        </span>
                      </div>

                      <h2 className="mt-4 font-serif text-xl font-light text-foreground group-hover:text-primary transition-colors lg:text-2xl line-clamp-2 leading-snug">
                        {post.title}
                      </h2>

                      {post.description && (
                        <p className="mt-3 text-sm font-light text-muted-foreground line-clamp-2 leading-relaxed">
                          {post.description}
                        </p>
                      )}

                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary transition-all group-hover:gap-3">
                        {locale === "es" ? "Leer más" : "Read more"}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          )}
        </Section>

        <Newsletter />
      </main>
      <Footer />
    </>
  )
}

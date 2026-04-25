"use client"

import { use, useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Share2, Loader2 } from "lucide-react"
import { Header, Footer } from "@/components/layout"
import { Newsletter } from "@/components/shared"
import { useTranslation } from "@/lib/i18n"
import { luxuryTransition } from "@/lib/animations"
import type { TiendaNubeBlogPostScraped } from "@/lib/tiendanube-blog"

// ── TOC helpers ───────────────────────────────────────────────────────────────

type TocItem = { id: string; text: string; level: 2 | 3 }

function extractToc(html: string): TocItem[] {
  return [...html.matchAll(/<h([23])\b[^>]*>([\s\S]*?)<\/h[23]>/gi)].map((m, i) => ({
    id: `s-${i}`,
    text: m[2].replace(/<[^>]*>/g, "").trim(),
    level: parseInt(m[1]) as 2 | 3,
  }))
}

function injectHeadingIds(html: string, toc: TocItem[]): string {
  let i = 0
  return html.replace(/<h([23])(\b[^>]*)>/gi, (_, level, attrs) => {
    const item = toc[i++]
    return item ? `<h${level} id="${item.id}"${attrs}>` : `<h${level}${attrs}>`
  })
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const router = useRouter()
  const { locale } = useTranslation()

  const [post, setPost] = useState<TiendaNubeBlogPostScraped | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeId, setActiveId] = useState<string>("")
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/tiendanube/blog/${slug}`)
        if (!res.ok) { router.push("/blog"); return }
        setPost(await res.json())
      } catch {
        router.push("/blog")
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [slug, router])

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === "es" ? "es-AR" : "en-US", {
      year: "numeric", month: "long", day: "numeric",
    })

  const getReadTime = (content: string) => {
    const words = content.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length
    return `${Math.max(1, Math.ceil(words / 200))} min`
  }

  const handleShare = () => {
    if (navigator.share && post) navigator.share({ title: post.title, url: window.location.href })
    else navigator.clipboard?.writeText(window.location.href)
  }

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: "smooth" })
  }, [])

  // Active TOC item via IntersectionObserver
  useEffect(() => {
    if (!post) return
    const toc = extractToc(post.content)
    if (toc.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: "-15% 0% -75% 0%", threshold: 0 }
    )

    toc.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [post])

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
        <Footer />
      </>
    )
  }

  if (!post) return null

  const toc = extractToc(post.content)
  const contentHtml = injectHeadingIds(post.content, toc)
  const hasContent = post.content.replace(/<[^>]*>/g, "").trim().length > 80

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">

        {/* ── Hero ── */}
        <div className="bg-secondary/10 border-b border-border/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-0">

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={luxuryTransition}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {locale === "es" ? "Volver al Blog" : "Back to Blog"}
              </Link>
            </motion.div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center pb-12">

              {/* Left: meta + title + description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...luxuryTransition, delay: 0.1 }}
                className="flex flex-col gap-6"
              >
                {post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((cat) => (
                      <span key={cat} className="text-[10px] uppercase tracking-widest text-primary border border-primary/30 px-3 py-1">
                        {cat}
                      </span>
                    ))}
                  </div>
                )}

                <h1 className="font-serif text-4xl font-light text-foreground leading-tight md:text-5xl lg:text-6xl">
                  {post.title}
                </h1>

                {post.description && (
                  <p className="text-xl font-light text-muted-foreground leading-relaxed md:text-2xl">
                    {post.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground pt-3 border-t border-border/30">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {formatDate(post.published_at)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {getReadTime(post.content)}
                  </span>
                  <span className="uppercase tracking-wider text-xs">
                    {locale === "es" ? "Por" : "By"}{" "}
                    <span className="text-foreground font-medium">{post.author}</span>
                  </span>
                </div>
              </motion.div>

              {/* Right: image (full, no crop) */}
              {post.image ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ...luxuryTransition, delay: 0.2 }}
                  className="relative w-full overflow-hidden border border-border/30 bg-secondary/20"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={900}
                    height={600}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </motion.div>
              ) : (
                <div className="hidden lg:block" />
              )}
            </div>
          </div>
        </div>

        {/* ── Article + TOC ── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-16">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...luxuryTransition, delay: 0.3 }}
          >

            {/* Article */}
            <article ref={contentRef}>
              {hasContent ? (
                <div
                  className="
                    blog-content leading-relaxed
                    [&_p]:mb-5 [&_p]:text-lg [&_p]:leading-[1.8] [&_p]:text-muted-foreground
                    [&_h2]:font-serif [&_h2]:text-4xl [&_h2]:font-light [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:pb-3 [&_h2]:border-b [&_h2]:border-primary/20 [&_h2]:scroll-mt-28
                    [&_h3]:font-serif [&_h3]:text-3xl [&_h3]:font-light [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:scroll-mt-28
                    [&_h4]:font-serif [&_h4]:text-2xl [&_h4]:font-light [&_h4]:text-foreground [&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:scroll-mt-28
                    [&_ul]:list-none [&_ul]:pl-0 [&_ul]:mb-5 [&_ul]:space-y-2
                    [&_ul_li]:flex [&_ul_li]:items-start [&_ul_li]:gap-3 [&_ul_li]:text-lg [&_ul_li]:text-muted-foreground [&_ul_li]:leading-relaxed
                    [&_ul_li::before]:content-['—'] [&_ul_li::before]:text-primary [&_ul_li::before]:shrink-0 [&_ul_li::before]:mt-0.5
                    [&_ol]:list-decimal [&_ol]:pl-7 [&_ol]:mb-5 [&_ol]:space-y-2
                    [&_ol_li]:text-lg [&_ol_li]:text-muted-foreground [&_ol_li]:leading-relaxed
                    [&_strong]:text-foreground [&_strong]:font-semibold
                    [&_em]:italic [&_em]:text-muted-foreground/80
                    [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-primary/40 [&_a:hover]:decoration-primary [&_a]:transition-all
                    [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-6 [&_blockquote]:py-2 [&_blockquote]:my-7 [&_blockquote]:italic [&_blockquote]:text-xl [&_blockquote]:text-muted-foreground/80
                    [&_hr]:border-border/20 [&_hr]:my-8
                    [&_img]:max-w-full [&_img]:h-auto [&_img]:block [&_img]:mx-auto [&_img]:my-8 [&_img]:rounded-sm [&_img]:border [&_img]:border-border/20
                    [&_figure]:my-8 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-muted-foreground/60 [&_figcaption]:mt-3 [&_figcaption]:italic
                  "
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              ) : (
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {post.description}
                </p>
              )}

              {/* Footer */}
              <div className="mt-16 pt-8 border-t border-border/30 flex items-center justify-between">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {locale === "es" ? "Volver al Blog" : "Back to Blog"}
                </Link>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  {locale === "es" ? "Compartir" : "Share"}
                </button>
              </div>
            </article>

            {/* Sticky TOC */}
            {toc.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary mb-5 pb-3 border-b border-primary/20">
                    {locale === "es" ? "En este artículo" : "In this article"}
                  </p>

                  <nav className="flex flex-col">
                    {toc.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className={`
                          text-left leading-snug py-2 transition-all duration-200 border-l-2
                          ${item.level === 3 ? "pl-5 text-sm" : "pl-4 text-sm font-medium"}
                          ${activeId === item.id
                            ? "border-primary text-primary"
                            : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                          }
                        `}
                      >
                        {item.text}
                      </button>
                    ))}
                  </nav>

                  {/* Decorative bottom */}
                  <div className="mt-8 pt-6 border-t border-border/20">
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                      {locale === "es" ? "Compartir" : "Share"}
                    </button>
                  </div>
                </div>
              </aside>
            )}

          </motion.div>
        </div>

        <Newsletter />
      </main>
      <Footer />
    </>
  )
}

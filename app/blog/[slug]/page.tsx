"use client"

import { use, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Share2, Loader2 } from "lucide-react"
import { Header, Footer, Section } from "@/components/layout"
import { Newsletter } from "@/components/shared"
import { useTranslation } from "@/lib/i18n"
import { luxuryTransition } from "@/lib/animations"
import type { TiendaNubeBlogPostScraped } from "@/lib/tiendanube-blog"

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const router = useRouter()
  const { locale } = useTranslation()

  const [post, setPost] = useState<TiendaNubeBlogPostScraped | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/tiendanube/blog/${slug}`)
        if (!res.ok) { router.push("/blog"); return }
        const data = await res.json()
        setPost(data)
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
    if (navigator.share && post) {
      navigator.share({ title: post.title, url: window.location.href })
    } else {
      navigator.clipboard?.writeText(window.location.href)
    }
  }

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

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero */}
        <Section variant="dark" size="default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={luxuryTransition}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              {locale === "es" ? "Volver al Blog" : "Back to Blog"}
            </Link>

            <h1 className="font-serif text-3xl font-light text-foreground md:text-4xl lg:text-5xl max-w-4xl">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(post.published_at)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getReadTime(post.content)}
              </span>
              <span>{locale === "es" ? "Por" : "By"} {post.author}</span>
            </div>
          </motion.div>
        </Section>

        {/* Featured Image */}
        {post.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...luxuryTransition, delay: 0.2 }}
            className="relative aspect-21/9 w-full overflow-hidden"
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        )}

        {/* Content */}
        <Section variant="default" size="large">
          <div className="mx-auto max-w-3xl">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...luxuryTransition, delay: 0.3 }}
            >
              {/* If content is just a description, show it as plain text; otherwise render HTML */}
              {post.content.startsWith("<") ? (
                <div
                  className="blog-content text-muted-foreground leading-relaxed [&>p]:mb-6 [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:font-light [&>h2]:text-foreground [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:font-serif [&>h3]:text-xl [&>h3]:font-light [&>h3]:text-foreground [&>h3]:mt-8 [&>h3]:mb-3 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>li]:mb-2 [&>img]:w-full [&>img]:rounded [&>img]:my-6"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <p className="text-muted-foreground leading-relaxed">{post.content}</p>
              )}
            </motion.article>

            {/* Footer actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...luxuryTransition, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-border/30 flex items-center justify-between"
            >
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
            </motion.div>
          </div>
        </Section>

        <Newsletter />
      </main>
      <Footer />
    </>
  )
}

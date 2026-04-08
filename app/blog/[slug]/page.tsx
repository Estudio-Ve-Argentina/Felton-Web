"use client"

import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Share2, Tag } from "lucide-react"
import { Header, Footer, Section } from "@/components/layout"
import { Newsletter } from "@/components/shared"
import { useTranslation } from "@/lib/i18n"
import { fadeInUp, luxuryTransition } from "@/lib/animations"

// Sample blog post content
const blogPostData: Record<string, {
  titleEs: string
  titleEn: string
  excerptEs: string
  excerptEn: string
  contentEs: string
  contentEn: string
  image: string
  category: string
  categoryEn: string
  date: string
  readTime: string
  author: string
}> = {
  "como-reconocer-cuero-genuino": {
    titleEs: "Como Reconocer Cuero Genuino de Alta Calidad",
    titleEn: "How to Recognize High-Quality Genuine Leather",
    excerptEs: "Aprende a distinguir el cuero autentico de las imitaciones con estos consejos de expertos.",
    excerptEn: "Learn to distinguish authentic leather from imitations with these expert tips.",
    contentEs: `
      <p>El cuero genuino de alta calidad es un material que ha sido apreciado durante siglos por su durabilidad, belleza y capacidad de envejecer con gracia. Sin embargo, en un mercado saturado de imitaciones, puede ser dificil distinguir el cuero autentico de las alternativas sinteticas.</p>
      
      <h2>La Prueba del Tacto</h2>
      <p>El cuero genuino tiene una textura unica que es dificil de replicar. Al tocarlo, deberias sentir una superficie ligeramente irregular con variaciones naturales. Las imitaciones suelen tener una textura demasiado uniforme y plastica.</p>
      
      <h2>El Olor Caracteristico</h2>
      <p>El cuero autentico tiene un aroma distintivo, terroso y natural. Las imitaciones de cuero suelen oler a plastico o quimicos. Si no estas seguro, acerca el producto a tu nariz y confia en tu instinto.</p>
      
      <h2>La Prueba del Agua</h2>
      <p>Coloca una pequena gota de agua en la superficie. El cuero genuino absorbe la humedad gradualmente, mientras que los materiales sinteticos la repelan. Esta es una de las pruebas mas confiables.</p>
      
      <h2>Examina los Bordes</h2>
      <p>Los bordes del cuero real muestran fibras naturales y una textura rugosa. Las imitaciones tendran bordes limpios y plasticos, a menudo con capas visibles de material sintetico.</p>
      
      <h2>El Factor Precio</h2>
      <p>Si el precio parece demasiado bueno para ser verdad, probablemente lo sea. El cuero de calidad requiere un proceso de curtido meticuloso y materias primas costosas. Desconfia de productos que prometen "cuero italiano" a precios muy bajos.</p>
      
      <h2>Conclusion</h2>
      <p>Invertir en cuero genuino es invertir en calidad duradera. Con estos consejos, estaras mejor equipado para tomar decisiones informadas y reconocer productos de verdadera calidad.</p>
    `,
    contentEn: `
      <p>High-quality genuine leather is a material that has been prized for centuries for its durability, beauty, and ability to age gracefully. However, in a market saturated with imitations, it can be difficult to distinguish authentic leather from synthetic alternatives.</p>
      
      <h2>The Touch Test</h2>
      <p>Genuine leather has a unique texture that is difficult to replicate. When you touch it, you should feel a slightly irregular surface with natural variations. Imitations usually have an overly uniform and plastic texture.</p>
      
      <h2>The Characteristic Smell</h2>
      <p>Authentic leather has a distinctive, earthy, natural aroma. Leather imitations often smell like plastic or chemicals. If you're not sure, bring the product close to your nose and trust your instinct.</p>
      
      <h2>The Water Test</h2>
      <p>Place a small drop of water on the surface. Genuine leather absorbs moisture gradually, while synthetic materials repel it. This is one of the most reliable tests.</p>
      
      <h2>Examine the Edges</h2>
      <p>The edges of real leather show natural fibers and a rough texture. Imitations will have clean, plastic edges, often with visible layers of synthetic material.</p>
      
      <h2>The Price Factor</h2>
      <p>If the price seems too good to be true, it probably is. Quality leather requires a meticulous tanning process and expensive raw materials. Be wary of products that promise "Italian leather" at very low prices.</p>
      
      <h2>Conclusion</h2>
      <p>Investing in genuine leather is investing in lasting quality. With these tips, you'll be better equipped to make informed decisions and recognize products of true quality.</p>
    `,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&h=600&fit=crop",
    category: "guias",
    categoryEn: "guides",
    date: "2026-01-15",
    readTime: "5 min",
    author: "Equipo Felton",
  },
}

const defaultPost = {
  titleEs: "Articulo del Blog",
  titleEn: "Blog Article",
  excerptEs: "Contenido proximo...",
  excerptEn: "Content coming soon...",
  contentEs: "<p>Este articulo esta siendo preparado. Vuelve pronto para leer el contenido completo.</p>",
  contentEn: "<p>This article is being prepared. Come back soon to read the full content.</p>",
  image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=1200&h=600&fit=crop",
  category: "general",
  categoryEn: "general",
  date: "2026-01-01",
  readTime: "3 min",
  author: "Equipo Felton",
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { t, locale } = useTranslation()
  const post = blogPostData[slug] || defaultPost

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
        <Section variant="dark" size="default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={luxuryTransition}
          >
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("common.back")}
            </Link>

            {/* Category */}
            <div className="mb-4">
              <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-primary/20 text-primary">
                {locale === "es" ? post.category : post.categoryEn}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl font-light text-foreground md:text-4xl lg:text-5xl max-w-4xl">
              {locale === "es" ? post.titleEs : post.titleEn}
            </h1>

            {/* Meta */}
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
              <span>
                {locale === "es" ? "Por" : "By"} {post.author}
              </span>
            </div>
          </motion.div>
        </Section>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...luxuryTransition, delay: 0.2 }}
          className="relative aspect-[21/9] w-full overflow-hidden"
        >
          <Image
            src={post.image || "/placeholder.svg"}
            alt={locale === "es" ? post.titleEs : post.titleEn}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Content */}
        <Section variant="default" size="large">
          <div className="mx-auto max-w-3xl">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...luxuryTransition, delay: 0.3 }}
              className="prose prose-lg prose-invert max-w-none"
              style={{
                // Custom prose styling
              }}
            >
              <div
                className="blog-content text-muted-foreground leading-relaxed [&>p]:mb-6 [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:font-light [&>h2]:text-foreground [&>h2]:mt-10 [&>h2]:mb-4"
                dangerouslySetInnerHTML={{
                  __html: locale === "es" ? post.contentEs : post.contentEn,
                }}
              />
            </motion.article>

            {/* Share */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...luxuryTransition, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-border/30"
            >
              <div className="flex items-center justify-between">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {locale === "es" ? "Volver al Blog" : "Back to Blog"}
                </Link>
                <button className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Share2 className="h-4 w-4" />
                  {locale === "es" ? "Compartir" : "Share"}
                </button>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Newsletter */}
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}

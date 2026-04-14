"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Mail, Check, Loader2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { fadeInUp, staggerContainer, luxuryTransition } from "@/lib/animations";
import type { TiendaNubeBlogPostScraped } from "@/lib/tiendanube-blog";

function BlogCard({ post, index }: { post: TiendaNubeBlogPostScraped; index: number }) {
  const { locale } = useTranslation();

  const getReadTime = (content: string) => {
    const words = content.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.ceil(words / 200))} min`;
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === "es" ? "es-AR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <motion.article
      variants={fadeInUp}
      transition={{ ...luxuryTransition, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-16/10 overflow-hidden border-2 border-border/30 transition-all duration-500 group-hover:border-primary/40 bg-secondary/10">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-xs text-muted-foreground uppercase tracking-widest opacity-30">Felton</span>
            </div>
          )}
          
          {/* Subtle Overlay on Hover */}
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content Below */}
        <div className="mt-6">
          <div className="flex items-center gap-5 text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3 text-primary/60" />
              <span>{formatDate(post.published_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3 text-primary/60" />
              <span>{getReadTime(post.content)}</span>
            </div>
          </div>

          <h3 className="font-serif text-xl lg:text-2xl font-light text-foreground mb-4 leading-snug group-hover:text-primary transition-colors duration-500 line-clamp-2">
            {post.title}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-6 font-light">
            {post.description}
          </p>

          <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-500">
            <span className="tracking-tight">{locale === "es" ? "Leer más" : "Read more"}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function NewsletterForm() {
  const { locale } = useTranslation();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    try {
      const res = await fetch("/api/tiendanube/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setIsSubmitted(true);
        setEmail("");
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        console.error("Gotta handle error");
        // We'll still show success from UX perspective or provide a little toast error natively
      }
    } catch(err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-background border border-border/30 p-12 lg:p-16 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-8"
      >
        <Mail className="w-7 h-7 text-primary" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-4"
      >
        {locale === "es" ? "Únete a Nuestra Comunidad Exclusiva" : "Join Our Exclusive Community"}
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mx-auto h-px w-24 bg-primary/50 origin-center mb-6"
      />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-light"
      >
        {locale === "es" 
          ? "Recibe acceso anticipado a productos exclusivos, ofertas especiales y contenido premium directamente en tu bandeja de entrada."
          : "Receive early access to exclusive products, special offers and premium content directly in your inbox."}
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50 pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              disabled={isSubmitted}
              className="w-full pl-13 pr-4 py-4 bg-transparent border-2 border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/70 focus:outline-none transition-colors text-base"
            />
          </div>

          <motion.button
            type="submit"
            disabled={isLoading || isSubmitted}
            whileHover={{ scale: isSubmitted ? 1 : 1.03 }}
            whileTap={{ scale: isSubmitted ? 1 : 0.97 }}
            className={`px-10 py-4 text-sm font-medium tracking-wide transition-all ${
              isSubmitted
                ? "bg-green-600/90 text-white border-2 border-green-600/90"
                : "bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90"
            } disabled:opacity-70 flex items-center justify-center gap-2 whitespace-nowrap`}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
              />
            ) : isSubmitted ? (
              <>
                <Check className="w-5 h-5" />
                <span>{locale === "es" ? "¡Listo!" : "Done!"}</span>
              </>
            ) : (
              <>
                <span>{locale === "es" ? "Suscribirse" : "Subscribe"}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>

        <p className="text-xs text-muted-foreground/60 mt-5 font-light">
          {locale === "es" 
            ? "Al suscribirte, aceptas recibir correos de marketing. Cancela en cualquier momento."
            : "By subscribing, you agree to receive marketing emails. Cancel at any time."}
        </p>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1 }}
        className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mt-10 text-xs text-muted-foreground font-light"
      >
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-primary/70" />
          <span>{locale === "es" ? "Sin spam" : "No spam"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-primary/70" />
          <span>{locale === "es" ? "Cancela cuando quieras" : "Cancel anytime"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-primary/70" />
          <span>{locale === "es" ? "100% privado" : "100% private"}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function BlogNewsletterSection({ initialPosts }: { initialPosts?: TiendaNubeBlogPostScraped[] }) {
  const { locale } = useTranslation();
  const [posts] = useState<TiendaNubeBlogPostScraped[]>(initialPosts ?? []);
  const loading = false;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        backgroundImage: 'url("/images/leather-texture.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="absolute inset-0 bg-background/95" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center mb-16 lg:mb-20">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs tracking-[0.4em] text-primary/60 uppercase mb-4"
            >
              {locale === "es" ? "Inspiración & Conocimiento" : "Inspiration & Knowledge"}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6"
            >
              {locale === "es" ? "Nuestro Blog" : "Our Blog"}
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto h-px w-32 bg-primary/50 origin-center mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light"
            >
              {locale === "es" 
                ? "Explora historias, consejos y tendencias del mundo del lujo"
                : "Explore stories, tips and trends from the world of luxury"}
            </motion.p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 mb-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary/40" />
              <p className="text-xs tracking-widest text-muted-foreground uppercase">
                {locale === "es" ? "Cargando artículos..." : "Loading articles..."}
              </p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 mb-20 border border-dashed border-border/30">
              <p className="text-sm text-muted-foreground italic font-light">
                {locale === "es" ? "Próximamente más historias..." : "More stories coming soon..."}
              </p>
            </div>
          ) : (
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-24"
            >
              {posts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-20"
          >
            <Link
              href="/blog"
              className="group inline-flex items-center gap-3 border border-primary/40 bg-transparent px-10 py-4 text-xs font-medium tracking-[0.2em] uppercase text-primary transition-all hover:bg-primary hover:text-white hover:border-primary"
            >
              <span>{locale === "es" ? "Ver Todos los Artículos" : "View All Articles"}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}

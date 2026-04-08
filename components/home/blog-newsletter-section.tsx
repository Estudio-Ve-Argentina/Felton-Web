"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Mail, Check } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  href: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "El Arte de la Elegancia Atemporal",
    excerpt:
      "Descubre cómo las piezas clásicas de lujo trascienden las tendencias pasajeras y se convierten en inversiones para toda la vida.",
    image: "/images/blog-1.jpg",
    category: "Estilo de Vida",
    date: "15 Ene 2026",
    readTime: "5 min",
    href: "/blog/arte-elegancia-atemporal",
  },
  {
    id: "2",
    title: "Guía de Cuidado para Artículos de Lujo",
    excerpt:
      "Aprende las mejores prácticas para mantener tus piezas de diseñador en perfecto estado durante décadas.",
    image: "/images/blog-2.jpg",
    category: "Cuidado",
    date: "10 Ene 2026",
    readTime: "7 min",
    href: "/blog/guia-cuidado-lujo",
  },
  {
    id: "3",
    title: "Tendencias de Lujo 2026",
    excerpt:
      "Un vistazo exclusivo a las tendencias que definirán el mundo del lujo este año, desde sostenibilidad hasta innovación.",
    image: "/images/blog-3.jpg",
    category: "Tendencias",
    date: "5 Ene 2026",
    readTime: "6 min",
    href: "/blog/tendencias-lujo-2026",
  },
];

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="group relative"
    >
      <Link href={post.href} className="block">
        <div className="relative overflow-hidden bg-background/40 border border-border/30 transition-all duration-700 hover:border-primary/40">
          <div className="relative h-80 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="relative h-full w-full"
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-all duration-700 group-hover:brightness-110"
              />
            </motion.div>

            <div className="absolute top-6 left-6 z-20">
              <span className="inline-block px-4 py-2 text-[10px] font-medium tracking-[0.3em] uppercase bg-primary/90 text-primary-foreground backdrop-blur-sm">
                {post.category}
              </span>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary to-transparent origin-left"
            />
          </div>

          <div className="p-8 lg:p-10">
            <div className="flex items-center gap-6 mb-5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-primary/70" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-primary/70" />
                <span>{post.readTime} lectura</span>
              </div>
            </div>

            <h3 className="font-serif text-2xl lg:text-3xl font-light text-foreground mb-4 leading-tight group-hover:text-primary transition-colors duration-500">
              {post.title}
            </h3>

            <p className="text-sm lg:text-base text-muted-foreground leading-relaxed mb-6 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-4 transition-all duration-500">
              <span className="tracking-wide">Leer más</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
    setEmail("");
    setTimeout(() => setIsSubmitted(false), 5000);
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
        Únete a Nuestra Comunidad Exclusiva
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
        className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
      >
        Recibe acceso anticipado a productos exclusivos, ofertas especiales y contenido premium directamente en tu bandeja de entrada.
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
                <span>¡Listo!</span>
              </>
            ) : (
              <>
                <span>Suscribirse</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>

        <p className="text-xs text-muted-foreground/60 mt-5">
          Al suscribirte, aceptas recibir correos de marketing. Cancela en cualquier momento.
        </p>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1 }}
        className="flex items-center justify-center gap-8 mt-10 text-sm text-muted-foreground"
      >
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-primary/70" />
          <span>Sin spam</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-primary/70" />
          <span>Cancela cuando quieras</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-primary/70" />
          <span>100% privado</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function BlogNewsletterSection() {
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
              Inspiración & Conocimiento
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6"
            >
              Nuestro Blog
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
              className="text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Explora historias, consejos y tendencias del mundo del lujo
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-20">
            {blogPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-20"
          >
            <Link
              href="/blog"
              className="group inline-flex items-center gap-3 border-2 border-primary bg-transparent px-10 py-4 text-sm font-medium tracking-wide text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:scale-105"
            >
              <span>Ver Todos los Artículos</span>
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

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

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

export function BlogSection() {
  return (
    <section className="relative w-full bg-background/95 py-24 lg:py-32 border-t border-border/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-12">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-3 border-2 border-primary bg-transparent px-10 py-4 text-sm font-medium tracking-wide text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:scale-105"
          >
            <span>Ver Todos los Artículos</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

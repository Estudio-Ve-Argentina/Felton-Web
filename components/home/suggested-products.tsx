"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const PARTICLES = [
  { left: 5.2,  top: 15.4, duration: 4.2, delay: 0.3  },
  { left: 91.8, top: 42.1, duration: 3.8, delay: 1.1  },
  { left: 23.5, top: 78.2, duration: 4.7, delay: 0.7  },
  { left: 67.9, top: 8.6,  duration: 3.5, delay: 1.5  },
  { left: 44.1, top: 55.3, duration: 4.1, delay: 0.1  },
  { left: 78.4, top: 31.7, duration: 3.9, delay: 1.8  },
  { left: 12.7, top: 63.0, duration: 4.8, delay: 0.9  },
  { left: 56.3, top: 22.4, duration: 3.7, delay: 1.4  },
  { left: 33.1, top: 5.8,  duration: 4.4, delay: 0.5  },
  { left: 84.6, top: 72.3, duration: 3.6, delay: 2.1  },
  { left: 18.9, top: 38.5, duration: 5.0, delay: 0.4  },
  { left: 72.2, top: 91.4, duration: 3.3, delay: 1.7  },
  { left: 49.7, top: 26.1, duration: 4.6, delay: 0.8  },
  { left: 8.3,  top: 84.7, duration: 3.4, delay: 2.3  },
  { left: 62.5, top: 48.9, duration: 4.0, delay: 1.2  },
  { left: 38.0, top: 12.6, duration: 5.1, delay: 0.6  },
  { left: 95.4, top: 60.3, duration: 3.8, delay: 1.9  },
  { left: 27.8, top: 33.7, duration: 4.3, delay: 0.2  },
  { left: 54.2, top: 88.1, duration: 3.6, delay: 2.5  },
  { left: 16.4, top: 50.2, duration: 4.7, delay: 1.0  },
  { left: 88.1, top: 19.5, duration: 3.9, delay: 1.6  },
  { left: 41.6, top: 68.4, duration: 4.5, delay: 0.3  },
  { left: 3.9,  top: 44.8, duration: 3.7, delay: 2.0  },
  { left: 70.7, top: 76.2, duration: 4.2, delay: 1.3  },
  { left: 29.3, top: 93.5, duration: 4.3, delay: 0.6  },
  { left: 60.8, top: 36.4, duration: 3.9, delay: 2.2  },
  { left: 47.1, top: 4.7,  duration: 4.6, delay: 1.0  },
  { left: 82.5, top: 56.8, duration: 3.4, delay: 0.4  },
  { left: 11.0, top: 21.9, duration: 5.0, delay: 1.7  },
  { left: 75.3, top: 47.3, duration: 3.5, delay: 0.9  },
  { left: 35.7, top: 82.6, duration: 4.8, delay: 1.4  },
  { left: 58.9, top: 14.1, duration: 3.6, delay: 2.8  },
  { left: 22.1, top: 59.7, duration: 4.4, delay: 0.2  },
  { left: 94.3, top: 28.4, duration: 3.8, delay: 1.6  },
];

const CATEGORIES = [
  { name: "Bolsos",     slug: "Bolsos",     image: "/products/Bolso.jpg"      },
  { name: "Carteras",   slug: "Carteras",   image: "/products/Cartera.jpg"    },
  { name: "Cinturones", slug: "Cinturones", image: "/products/Cinturones.jpg" },
  { name: "Morrales",   slug: "Morrales",   image: "/products/Morrales.jpg"   },
];

function CategoryCard({ name, slug, image, index }: { name: string; slug: string; image: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={`/products?category=${encodeURIComponent(slug)}`} className="group block">
        {/* Imagen */}
        <div
          className="relative overflow-hidden border border-primary/20 group-hover:border-primary/45 transition-all duration-500"
          style={{ aspectRatio: "1 / 1" }}
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay permanente */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Hover glow desktop — sutil */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none hidden sm:block"
            style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.12) 0%, transparent 55%)" }}
          />

          {/* Botón centrado siempre visible */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex items-center gap-2 border border-primary/70 bg-black/55 backdrop-blur-sm px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.25em] text-primary group-hover:bg-black/75 group-hover:border-primary transition-all duration-300">
              {name}
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

      </Link>
    </motion.div>
  );
}

export function CategoriesSection() {
  return (
    <section className="relative w-full py-24 lg:py-32 bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              background: "rgba(212,175,55,0.75)",
              animation: `particleFloat ${p.duration}s ease-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[10px] tracking-[0.45em] text-primary/60 uppercase mb-4">Explorar</p>
          <div className="mx-auto mb-6 h-px w-12 bg-primary/50" />
          <h2 className="font-serif text-4xl md:text-5xl font-light text-white">
            Nuestras Categorías
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.slug} name={cat.name} slug={cat.slug} image={cat.image} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

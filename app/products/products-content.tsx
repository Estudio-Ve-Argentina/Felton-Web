"use client";

import { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import type { TiendaNubeProduct } from "@/lib/tiendanube";
import { getProductMainImage, formatPrice, getProductStock } from "@/lib/tiendanube";

const PARTICLES = [
  { left:  8.2, top:  4.1, duration: 4.2, delay: 0.3 },
  { left: 92.1, top:  9.4, duration: 3.8, delay: 1.1 },
  { left: 23.5, top: 14.2, duration: 4.7, delay: 0.7 },
  { left: 67.8, top:  3.8, duration: 3.5, delay: 1.5 },
  { left: 45.2, top: 22.1, duration: 4.1, delay: 0.1 },
  { left: 78.9, top: 18.6, duration: 3.9, delay: 1.8 },
  { left: 12.4, top: 38.0, duration: 4.8, delay: 0.9 },
  { left: 55.7, top: 45.3, duration: 3.7, delay: 1.4 },
  { left: 85.3, top: 58.1, duration: 4.3, delay: 0.5 },
  { left: 33.1, top: 70.4, duration: 3.6, delay: 2.0 },
  { left: 71.4, top: 78.8, duration: 4.5, delay: 0.8 },
  { left: 18.9, top: 85.3, duration: 3.4, delay: 1.6 },
  { left: 38.6, top:  7.2, duration: 4.0, delay: 0.4 },
  { left: 61.3, top: 13.5, duration: 3.7, delay: 1.2 },
  { left:  5.1, top: 25.8, duration: 4.6, delay: 0.6 },
  { left: 82.7, top: 31.4, duration: 3.5, delay: 2.2 },
  { left: 50.0, top: 41.9, duration: 4.3, delay: 0.2 },
  { left: 27.3, top: 52.6, duration: 3.8, delay: 1.7 },
  { left: 90.4, top: 63.2, duration: 4.1, delay: 0.8 },
  { left: 15.8, top: 72.1, duration: 3.6, delay: 1.3 },
  { left: 64.5, top: 89.7, duration: 4.4, delay: 0.5 },
  { left: 42.9, top: 94.3, duration: 3.9, delay: 1.9 },
  { left: 76.2, top: 47.8, duration: 4.7, delay: 0.1 },
  { left:  3.7, top: 61.5, duration: 3.4, delay: 2.3 },
  { left: 58.4, top:  1.9, duration: 4.2, delay: 0.9 },
  { left: 31.0, top: 33.7, duration: 3.8, delay: 1.5 },
  { left: 88.1, top: 76.4, duration: 4.5, delay: 0.3 },
  { left: 47.6, top: 56.2, duration: 3.7, delay: 2.1 },
  { left: 21.4, top: 17.9, duration: 4.0, delay: 0.7 },
  { left: 73.8, top: 92.5, duration: 3.5, delay: 1.4 },
  { left: 10.3, top: 48.6, duration: 4.8, delay: 0.2 },
  { left: 95.2, top: 36.1, duration: 3.6, delay: 1.8 },
  { left: 54.7, top: 67.3, duration: 4.3, delay: 0.6 },
  { left: 37.2, top: 81.0, duration: 3.9, delay: 2.4 },
  { left: 69.5, top: 28.4, duration: 4.1, delay: 1.0 },
  { left: 25.8, top: 98.2, duration: 3.7, delay: 0.4 },
  { left: 14.6, top: 10.3, duration: 4.4, delay: 1.6 },
  { left: 83.9, top: 20.7, duration: 3.6, delay: 0.5 },
  { left: 40.1, top: 30.5, duration: 4.9, delay: 2.0 },
  { left:  6.8, top: 44.2, duration: 3.5, delay: 1.1 },
  { left: 60.0, top: 50.8, duration: 4.2, delay: 0.8 },
  { left: 29.4, top: 59.6, duration: 3.8, delay: 1.9 },
  { left: 97.1, top: 68.0, duration: 4.6, delay: 0.3 },
  { left: 52.3, top: 75.5, duration: 3.4, delay: 2.2 },
  { left: 16.7, top: 88.1, duration: 4.1, delay: 0.6 },
  { left: 79.5, top: 95.7, duration: 3.9, delay: 1.3 },
  { left: 44.8, top:  6.4, duration: 4.5, delay: 0.9 },
  { left: 35.3, top: 19.1, duration: 3.7, delay: 2.5 },
  { left: 87.6, top: 42.3, duration: 4.0, delay: 0.2 },
  { left:  1.9, top: 55.9, duration: 3.6, delay: 1.7 },
  { left: 63.2, top: 83.4, duration: 4.8, delay: 0.4 },
  { left: 20.5, top: 97.0, duration: 3.5, delay: 2.1 },
  { left: 75.0, top: 11.8, duration: 4.3, delay: 1.0 },
  { left: 48.7, top: 35.6, duration: 3.8, delay: 1.6 },
  { left:  9.4, top: 66.2, duration: 4.6, delay: 0.7 },
  { left: 93.8, top: 82.9, duration: 3.4, delay: 2.3 },
  { left: 57.1, top: 26.7, duration: 4.1, delay: 0.1 },
  { left: 30.6, top: 73.8, duration: 3.9, delay: 1.4 },
  { left: 66.4, top: 90.3, duration: 4.4, delay: 0.8 },
  { left: 43.5, top: 16.0, duration: 3.7, delay: 2.0 },
  { left: 80.2, top: 53.4, duration: 4.2, delay: 0.5 },
  { left: 11.8, top: 79.1, duration: 3.5, delay: 1.2 },
  { left: 59.9, top: 37.8, duration: 4.7, delay: 2.6 },
  { left: 22.7, top:  2.5, duration: 3.6, delay: 0.6 },
  { left: 96.3, top: 49.7, duration: 4.0, delay: 1.8 },
  { left: 34.9, top: 62.4, duration: 3.8, delay: 0.3 },
  { left: 72.6, top: 86.5, duration: 4.5, delay: 1.5 },
  { left:  7.3, top: 32.0, duration: 3.3, delay: 2.4 },
  { left: 51.4, top: 77.3, duration: 4.1, delay: 0.9 },
  { left: 84.7, top:  5.6, duration: 3.9, delay: 1.7 },
  { left: 17.2, top: 43.1, duration: 4.6, delay: 0.2 },
  { left: 62.8, top: 60.9, duration: 3.5, delay: 2.2 },
  { left: 39.0, top: 22.8, duration: 4.3, delay: 0.6 },
];

function ProductCard({ product, index }: { product: TiendaNubeProduct; index: number }) {
  const image = getProductMainImage(product);
  const variant = product.variants[0];
  const price = variant ? formatPrice(variant.price) : "";
  const category = product.categories[0]?.name.es ?? "";
  const slug = product.handle.es;
  const stock = getProductStock(product);
  const inStock = stock === null || stock > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative flex flex-col border border-primary/15 hover:border-primary/40 transition-all duration-300 overflow-hidden"
      style={{
        backgroundImage: 'url("/images/leather-texture.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
        backgroundColor: "rgba(11,17,32,0.92)",
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 20%, rgba(212,175,55,0.08) 0%, transparent 65%)",
        }}
      />

      <Link href={`/products/${slug}`} className="flex flex-col flex-1">
        <div className="relative flex items-center justify-center h-56 p-8 overflow-hidden">
          <span
            className="felton-text absolute text-[9rem] leading-none font-semibold select-none pointer-events-none"
            style={{ opacity: 0.04 }}
          >
            F
          </span>
          {image ? (
            <Image
              src={image}
              alt={product.name.es}
              width={180}
              height={180}
              className="relative z-10 object-contain transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="relative z-10 w-32 h-32 bg-primary/5 flex items-center justify-center text-primary/20 text-4xl font-serif">
              F
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 px-6 pt-4 pb-4 border-t border-primary/10">
          {category && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/60 mb-1">
              {category}
            </p>
          )}
          <h3 className="font-serif text-lg font-light text-foreground mb-2 leading-snug">
            {product.name.es}
          </h3>
          {product.description?.es && (
            <p
              className="text-xs font-light text-muted-foreground leading-relaxed flex-1 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: product.description.es }}
            />
          )}
        </div>
      </Link>

      <div className="px-6 pb-5 pt-3 border-t border-primary/5 flex items-center justify-between gap-4">
        <div>
          <span className="text-xl font-semibold text-primary tracking-tight">{price}</span>
          {!inStock && (
            <span className="ml-2 text-xs text-red-400/70">Sin stock</span>
          )}
        </div>
        <Link
          href={`/products/${slug}`}
          className="inline-flex items-center gap-2 border border-primary/30 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-foreground/70 hover:border-primary hover:text-primary transition-colors duration-200"
        >
          Ver detalle
        </Link>
      </div>
    </motion.div>
  );
}

function ProductsInner({ products }: { products: TiendaNubeProduct[] }) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "Todos";
  const initialSearch = searchParams.get("q") ?? "";

  const [search, setSearch] = useState(initialSearch);

  const allCategories = useMemo(() => {
    const cats = products.flatMap((p) => p.categories.map((c) => c.name.es));
    return ["Todos", ...Array.from(new Set(cats))];
  }, [products]);

  const [activeCategory, setActiveCategory] = useState(
    allCategories.includes(initialCategory) ? initialCategory : "Todos"
  );

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.es.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "Todos" ||
        p.categories.some((c) => c.name.es === activeCategory);
      return matchesSearch && matchesCategory;
    });
  }, [products, search, activeCategory]);

  return (
    <>
      {/* Hero + Filters */}
      <div
        className="relative pt-16 pb-10 overflow-hidden"
        style={{
          backgroundImage: 'url("/images/leather-texture.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
          backgroundColor: "rgba(0,0,0,0.96)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(212,175,55,0.4) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(212,175,55,0.4) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.10) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: "80px", background: "linear-gradient(to bottom, transparent 0%, #000 100%)" }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70 mb-4"
          >
            Catálogo
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mx-auto mb-6 h-px w-16 bg-primary/60 origin-center"
          />

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl font-light tracking-tight lg:text-6xl mb-3"
          >
            <span className="bg-gradient-to-r from-primary via-yellow-300 to-primary bg-clip-text text-transparent">
              Productos
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-light text-white/40 mb-8"
          >
            Accesorios de lujo para quienes reconocen la diferencia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative max-w-md mx-auto mb-6"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/50 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-b border-primary/30 pl-9 pr-4 py-2.5 text-sm font-light text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition-colors duration-200"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {allCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-black"
                    : "bg-transparent border border-primary/20 text-white/50 hover:border-primary/40 hover:text-white/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="relative bg-black overflow-hidden">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full pointer-events-none"
            style={{ left: `${p.left}%`, top: `${p.top}%` }}
            animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
          />
        ))}

        <div className="relative z-10 w-[85vw] mx-auto py-12">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground/50 text-sm font-light">
              No se encontraron productos.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filtered.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-primary/10 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-4">
            Contacto
          </p>
          <h3 className="font-serif text-2xl font-light tracking-tight text-foreground lg:text-3xl mb-8">
            ¿Tenés alguna consulta sobre un producto?
          </h3>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 border border-primary bg-primary px-8 py-3 text-sm font-medium tracking-wide text-primary-foreground transition-all hover:bg-primary/90"
          >
            Hablemos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </>
  );
}

export function ProductsContent({ products }: { products: TiendaNubeProduct[] }) {
  return (
    <Suspense fallback={null}>
      <ProductsInner products={products} />
    </Suspense>
  );
}

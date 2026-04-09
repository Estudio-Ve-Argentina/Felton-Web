"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, animate, useMotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import type { ProductItem } from "./featured-products";
import { formatPrice, getProductMainImage } from "@/lib/tiendanube";
import featuredIds from "@/data/featured-product-ids.json";



function tnToProductItem(p: any): ProductItem {
  const variant = p.variants?.[0];
  return {
    id: String(p.id),
    slug: p.handle?.es ?? String(p.id),
    name: p.name?.es ?? "",
    category: p.categories?.[0]?.name?.es ?? "",
    price: variant ? formatPrice(variant.price) : "",
    image: getProductMainImage(p) ?? "",
  };
}

function useSuggestedProducts(): ProductItem[] {
  const [products, setProducts] = useState<ProductItem[]>([]);
  useEffect(() => {
    fetch("/api/tiendanube/products?per_page=200&published=true")
      .then((r) => r.json())
      .then((data: any[]) => {
        const ids: number[] = featuredIds.suggested;
        const filtered =
          ids.length > 0
            ? ids.map((id) => data.find((p) => p.id === id)).filter(Boolean)
            : data.slice(0, 9);
        setProducts(filtered.map(tnToProductItem));
      })
      .catch(() => {});
  }, []);
  return products;
}

const PARTICLES = [
  { left: 5.2,  top: 15.4, duration: 4.2, delay: 0.3,  dx: 16,  dy: -24 },
  { left: 91.8, top: 42.1, duration: 3.8, delay: 1.1,  dx: -20, dy: -20 },
  { left: 23.5, top: 78.2, duration: 4.7, delay: 0.7,  dx: 14,  dy: -26 },
  { left: 67.9, top: 8.6,  duration: 3.5, delay: 1.5,  dx: -18, dy: -22 },
  { left: 44.1, top: 55.3, duration: 4.1, delay: 0.1,  dx: 22,  dy: -18 },
  { left: 78.4, top: 31.7, duration: 3.9, delay: 1.8,  dx: -14, dy: -26 },
  { left: 12.7, top: 63.0, duration: 4.8, delay: 0.9,  dx: 28,  dy: -12 },
  { left: 56.3, top: 22.4, duration: 3.7, delay: 1.4,  dx: -22, dy: -18 },
  { left: 35.8, top: 88.1, duration: 4.4, delay: 0.5,  dx: 18,  dy: -22 },
  { left: 83.2, top: 71.5, duration: 3.6, delay: 2.1,  dx: -26, dy: -14 },
  { left: 49.6, top: 4.3,  duration: 4.9, delay: 0.4,  dx: 12,  dy: -28 },
  { left: 18.4, top: 47.8, duration: 4.3, delay: 2.0,  dx: -30, dy: 0   },
  { left: 72.1, top: 93.2, duration: 3.4, delay: 0.8,  dx: 20,  dy: -20 },
  { left: 29.7, top: 36.5, duration: 4.6, delay: 1.3,  dx: -16, dy: -24 },
  { left: 95.3, top: 60.8, duration: 3.8, delay: 0.6,  dx: -24, dy: -16 },
  { left: 8.9,  top: 25.1, duration: 5.0, delay: 1.7,  dx: 26,  dy: -14 },
];

function ProductCardMinimal({ product }: { product: ProductItem }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col border border-primary/15 hover:border-primary/40 transition-all duration-300 overflow-hidden h-full bg-white/[0.03]"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 20%, rgba(212,175,55,0.08) 0%, transparent 65%)" }}
      />
      <div className="relative flex items-center justify-center h-52 p-7 overflow-hidden">
        <span className="absolute font-serif text-[7rem] leading-none font-semibold select-none pointer-events-none text-white" style={{ opacity: 0.04 }}>
          F
        </span>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={160}
            height={160}
            className="relative z-10 object-contain transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="relative z-10 w-24 h-24 flex items-center justify-center text-primary/10 text-5xl font-serif">F</div>
        )}
      </div>
      <div className="px-5 pt-3 pb-5 border-t border-primary/10">
        {product.category && (
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/60 mb-1">
            {product.category}
          </p>
        )}
        <h3 className="font-serif text-base font-light text-foreground mb-3 leading-snug line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-between gap-2">
          <span className="text-lg font-semibold text-primary tracking-tight">{product.price}</span>
          <span className="inline-flex items-center gap-1.5 border border-primary/30 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-foreground/70 group-hover:border-primary group-hover:text-primary transition-colors duration-200">
            Ver detalle
          </span>
        </div>
      </div>
    </Link>
  );
}

// Cantidad fija del JSON — no depende del fetch async
const SUGGESTED_COUNT = featuredIds.suggested.length; // 10

export function SuggestedProducts() {
  const products = useSuggestedProducts();
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const idxRef = useRef(SUGGESTED_COUNT); // arranca en la copia del medio
  const busy = useRef(false);
  const [slotW, setSlotW] = useState(0);

  const EXTENDED = products.length > 0
    ? [...products, ...products, ...products]
    : Array.from({ length: SUGGESTED_COUNT * 3 }, (_, i) => ({ id: String(i), slug: "", name: "", category: "", price: "", image: "" }));

  // Calcular ancho de slot — no depende de que lleguen los productos
  useEffect(() => {
    const calc = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const mobile = window.innerWidth < 640;
      const tablet = window.innerWidth < 1024;
      setSlotW(w / (mobile ? 1.4 : tablet ? 2.4 : 4));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Posicionar en la copia del medio apenas slotW esté listo
  useEffect(() => {
    if (slotW > 0) {
      idxRef.current = SUGGESTED_COUNT;
      x.set(-SUGGESTED_COUNT * slotW);
    }
  }, [slotW]); // solo slotW — SUGGESTED_COUNT es constante

  const go = async (dir: 1 | -1) => {
    if (busy.current || slotW === 0) return;
    busy.current = true;
    const mobile = window.innerWidth < 640;
    const tablet = window.innerWidth < 1024;
    const step = mobile ? 1 : tablet ? 2 : 4;
    const next = idxRef.current + dir * step;
    await animate(x, -next * slotW, { duration: 0.5, ease: [0.4, 0, 0.2, 1] });
    let settled = next;
    if (next >= SUGGESTED_COUNT * 2) settled = next - SUGGESTED_COUNT;
    else if (next < SUGGESTED_COUNT) settled = next + SUGGESTED_COUNT;
    idxRef.current = settled;
    if (settled !== next) x.set(-settled * slotW);
    busy.current = false;
  };

  const loaded = products.length > 0;

  return (
    <section className="relative w-full overflow-hidden py-24 lg:py-32 bg-black">
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, var(--background) 0%, transparent 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, var(--background) 0%, transparent 100%)" }} />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/60 rounded-full"
            style={{ left: `${p.left}%`, top: `${p.top}%`, willChange: "transform, opacity" }}
            animate={{ x: [0, p.dx * 0.6, p.dx, p.dx], y: [0, p.dy * 0.6, p.dy, p.dy], opacity: [0, 1, 0, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, times: [0, 0.45, 0.75, 1], ease: "easeOut" }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {loaded && (
          <div className="flex items-end justify-between mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <p className="text-[10px] tracking-[0.45em] text-primary/60 uppercase mb-3">Selección para ti</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-white">Podría interesarte</h2>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.25 }}>
              <Link href="/products" className="group hidden sm:inline-flex items-center gap-2.5 border border-primary/40 px-6 py-2.5 text-xs tracking-[0.2em] uppercase text-primary hover:bg-primary hover:text-black transition-all duration-300">
                Ver todos
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        )}

        <div className="relative">
          {loaded && (
            <button onClick={() => go(-1)} aria-label="Anterior"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20 flex items-center justify-center w-11 h-11 rounded-full border border-primary/40 bg-background/80 backdrop-blur-sm text-primary hover:bg-primary hover:text-black transition-all duration-300 hover:scale-110 shadow-lg shadow-black/30">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {/* containerRef SIEMPRE en el DOM para medir offsetWidth */}
          <div ref={containerRef} className="overflow-hidden">
            <motion.div style={{ x }} className="flex items-stretch">
              {EXTENDED.map((product, i) => (
                <div key={`${i}-${product.id}`} style={{ width: slotW || "25%", flexShrink: 0, padding: "0 8px" }}>
                  <ProductCardMinimal product={product} />
                </div>
              ))}
            </motion.div>
          </div>
          {loaded && (
            <button onClick={() => go(1)} aria-label="Siguiente"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20 flex items-center justify-center w-11 h-11 rounded-full border border-primary/40 bg-background/80 backdrop-blur-sm text-primary hover:bg-primary hover:text-black transition-all duration-300 hover:scale-110 shadow-lg shadow-black/30">
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {loaded && (
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-12 flex justify-center">
            <Link href="/products" className="group relative inline-flex items-center gap-3 px-10 py-4 bg-primary text-black font-semibold text-xs tracking-[0.25em] uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105">
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative">Ver productos</span>
              <ArrowRight className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

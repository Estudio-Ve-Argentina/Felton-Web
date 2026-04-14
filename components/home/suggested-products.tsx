"use client";

import { useAllProducts } from "@/lib/hooks/useHomeProducts";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, ShoppingCart } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCart } from "@/lib/cart";
import type { ProductItem } from "./featured-products";
import { formatPrice, getProductMainImage } from "@/lib/tiendanube";
import featuredIds from "@/data/featured-product-ids.json";

function tnToProductItem(p: any): ProductItem {
  const variant = p.variants?.[0];
  return {
    id: String(p.id),
    slug: p.handle?.es ?? String(p.id),
    name: p.name?.es ?? "",
    category: p.categories?.[0]?.name?.es || "Todos",
    price: variant ? formatPrice(variant.price) : "",
    image: getProductMainImage(p) ?? "",
    variantId: variant?.id,
    rawPrice: variant?.price ?? "",
    stock: variant?.stock_management ? (variant?.stock ?? 0) : 999,
  };
}

function useSuggestedProducts(): ProductItem[] {
  const allProducts = useAllProducts();
  const ids: number[] = featuredIds.suggested;
  if (allProducts.length === 0) return [];
  const filtered =
    ids.length > 0
      ? ids.map((id) => allProducts.find((p) => p.id === id)).filter(Boolean)
      : allProducts.slice(0, 9);
  return filtered.map(tnToProductItem);
}

const PARTICLES = [
  { left: 5.2,  top: 15.4, duration: 4.2, delay: 0.3  },
  { left: 91.8, top: 42.1, duration: 3.8, delay: 1.1  },
  { left: 23.5, top: 78.2, duration: 4.7, delay: 0.7  },
  { left: 67.9, top: 8.6,  duration: 3.5, delay: 1.5  },
  { left: 44.1, top: 55.3, duration: 4.1, delay: 0.1  },
  { left: 78.4, top: 31.7, duration: 3.9, delay: 1.8  },
  { left: 12.7, top: 63.0, duration: 4.8, delay: 0.9  },
  { left: 56.3, top: 22.4, duration: 3.7, delay: 1.4  },
  { left: 35.8, top: 88.1, duration: 4.4, delay: 0.5  },
  { left: 83.2, top: 71.5, duration: 3.6, delay: 2.1  },
  { left: 49.6, top: 4.3,  duration: 4.9, delay: 0.4  },
  { left: 18.4, top: 47.8, duration: 4.3, delay: 2.0  },
  { left: 72.1, top: 93.2, duration: 3.4, delay: 0.8  },
  { left: 29.7, top: 36.5, duration: 4.6, delay: 1.3  },
  { left: 95.3, top: 60.8, duration: 3.8, delay: 0.6  },
  { left: 8.9,  top: 25.1, duration: 5.0, delay: 1.7  },
];

function ProductCardMinimal({ product }: { product: ProductItem }) {
  const { addToCart, openCart } = useCart();
  const inStock = (product.stock ?? 999) > 0;

  return (
    <div className="group relative flex flex-col border border-primary/15 hover:border-primary/40 transition-all duration-500 overflow-hidden bg-white/[0.03]" style={{ height: 320 }}>
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.12) 0%, transparent 70%)" }}
      />

      <Link href={`/products/${product.slug}`} className="flex flex-col flex-1 relative z-10">
        <div className="relative flex items-center justify-center h-[200px] p-6 overflow-hidden">
          <span className="absolute font-serif text-[7rem] leading-none font-semibold select-none pointer-events-none text-white" style={{ opacity: 0.03 }}>
            F
          </span>
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              width={180}
              height={180}
              className="relative z-10 object-contain transition-all duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="relative z-10 w-24 h-24 flex items-center justify-center text-primary/10 text-5xl font-serif">F</div>
          )}
        </div>

        <div className="flex-shrink-0 px-4 pt-0 pb-3 text-center">
          {product.category && (
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-primary/60 mb-1">
              {product.category}
            </p>
          )}
          <h3 className="font-serif text-base font-light text-foreground mb-1 leading-tight line-clamp-1">
            {product.name}
          </h3>
          <span className="text-lg font-semibold text-primary tracking-tight block">
            {product.price}
          </span>
        </div>
      </Link>

      <div className="px-4 pb-4 mt-auto relative z-20">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!inStock || !product.variantId) return;
            addToCart({
              id: String(product.variantId),
              variantId: product.variantId,
              name: product.name,
              price: product.rawPrice ?? "",
              image: product.image,
              category: product.category,
              stock: product.stock ?? 999,
            });
            openCart();
          }}
          disabled={!inStock || !product.variantId}
          className="w-full flex items-center justify-center gap-2 py-2 border border-primary/30 text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary hover:text-black transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          {inStock ? "Agregar" : "Sin stock"}
        </button>
      </div>
    </div>
  );
}

export function SuggestedProducts() {
  const products = useSuggestedProducts();
  const loaded = products.length > 0;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });

  return (
    <section className="relative w-full overflow-hidden py-24 lg:py-32 bg-black">
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, #000 0%, transparent 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, #000 0%, transparent 100%)" }} />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              background: "rgba(212,175,55,0.6)",
              animation: `particleFloat ${p.duration}s ease-out ${p.delay}s infinite`,
            }}
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

        {loaded && (
          <div className="relative">
            <button onClick={() => emblaApi?.scrollPrev()} aria-label="Anterior"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20 hidden sm:flex items-center justify-center w-11 h-11 rounded-full border border-primary/40 bg-background/80 backdrop-blur-sm text-primary hover:bg-primary hover:text-black transition-all duration-300 hover:scale-110 shadow-lg shadow-black/30">
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex items-stretch">
                {products.map((product, i) => (
                  <div key={product.id} className="shrink-0 grow-0 basis-[40vw] sm:basis-[42vw] lg:basis-[25vw] px-2">
                    <ProductCardMinimal product={product} />
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => emblaApi?.scrollNext()} aria-label="Siguiente"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20 hidden sm:flex items-center justify-center w-11 h-11 rounded-full border border-primary/40 bg-background/80 backdrop-blur-sm text-primary hover:bg-primary hover:text-black transition-all duration-300 hover:scale-110 shadow-lg shadow-black/30">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

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

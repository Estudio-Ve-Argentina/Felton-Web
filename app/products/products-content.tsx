"use client";

import { useState, useMemo, Suspense, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowRight, ShoppingCart } from "lucide-react";
import { useSearchParams } from "next/navigation";
import type { TiendaNubeProduct } from "@/lib/tiendanube";
import { getProductMainImage, formatPrice, getProductStock } from "@/lib/tiendanube";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/products/product-card";

const PARTICLES = [
  { left: 8.2, top: 4.1, duration: 4.2, delay: 0.3 },
  { left: 92.1, top: 9.4, duration: 3.8, delay: 1.1 },
  { left: 23.5, top: 14.2, duration: 4.7, delay: 0.7 },
  { left: 67.8, top: 3.8, duration: 3.5, delay: 1.5 },
  { left: 45.2, top: 22.1, duration: 4.1, delay: 0.1 },
  { left: 78.9, top: 18.6, duration: 3.9, delay: 1.8 },
  { left: 12.4, top: 38.0, duration: 4.8, delay: 0.9 },
  { left: 55.7, top: 45.3, duration: 3.7, delay: 1.4 },
  { left: 85.3, top: 58.1, duration: 4.3, delay: 0.5 },
  { left: 33.1, top: 70.4, duration: 3.6, delay: 2.0 },
  { left: 71.4, top: 78.8, duration: 4.5, delay: 0.8 },
  { left: 18.9, top: 85.3, duration: 3.4, delay: 1.6 },
  { left: 42.9, top: 94.3, duration: 3.9, delay: 1.9 },
  { left: 76.2, top: 47.8, duration: 4.7, delay: 0.1 },
  { left: 3.7, top: 61.5, duration: 3.4, delay: 2.3 },
  { left: 58.4, top: 1.9, duration: 4.2, delay: 0.9 },
  { left: 31.0, top: 33.7, duration: 3.8, delay: 1.5 },
  { left: 88.1, top: 76.4, duration: 4.5, delay: 0.3 },
  { left: 47.6, top: 56.2, duration: 3.7, delay: 2.1 },
  { left: 21.4, top: 17.9, duration: 4.0, delay: 0.7 },
  { left: 73.8, top: 92.5, duration: 3.5, delay: 1.4 },
  { left: 10.3, top: 48.6, duration: 4.8, delay: 0.2 },
  { left: 95.2, top: 36.1, duration: 3.6, delay: 1.8 },
  { left: 54.7, top: 67.3, duration: 4.3, delay: 0.6 },
  { left: 37.2, top: 81.0, duration: 3.9, delay: 2.4 },
  { left: 75.0, top: 11.8, duration: 4.3, delay: 1.0 },
  { left: 48.7, top: 35.6, duration: 3.8, delay: 1.6 },
  { left: 9.4, top: 66.2, duration: 4.6, delay: 0.7 },
  { left: 93.8, top: 82.9, duration: 3.4, delay: 2.3 },
  { left: 57.1, top: 26.7, duration: 4.1, delay: 0.1 },
  { left: 30.6, top: 73.8, duration: 3.9, delay: 1.4 },
  { left: 66.4, top: 90.3, duration: 4.4, delay: 0.8 },
  { left: 43.5, top: 16.0, duration: 3.7, delay: 2.0 },
  { left: 80.2, top: 53.4, duration: 4.2, delay: 0.5 },
  { left: 11.8, top: 79.1, duration: 3.5, delay: 1.2 },
  { left: 59.9, top: 37.8, duration: 4.7, delay: 2.6 },
  { left: 22.7, top: 2.5, duration: 3.6, delay: 0.6 },
  { left: 96.3, top: 49.7, duration: 4.0, delay: 1.8 },
  { left: 34.9, top: 62.4, duration: 3.8, delay: 0.3 },
  { left: 72.6, top: 86.5, duration: 4.5, delay: 1.5 },
  { left: 7.3, top: 32.0, duration: 3.3, delay: 2.4 },
  { left: 51.4, top: 77.3, duration: 4.1, delay: 0.9 },
  { left: 84.7, top: 5.6, duration: 3.9, delay: 1.7 },
  { left: 17.2, top: 43.1, duration: 4.6, delay: 0.2 },
  { left: 62.8, top: 60.9, duration: 3.5, delay: 2.2 },
  { left: 39.0, top: 22.8, duration: 4.3, delay: 0.6 },
];

// ProductCard is now imported from @/components/products/product-card


function CategoryFilter({
  categories,
  active,
  onChange,
}: {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const idx = categories.indexOf(active);
    const btn = btnRefs.current[idx];
    if (btn && scrollRef.current) {
      btn.scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior: "smooth",
      });
    }
  }, [active, categories]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="relative"
    >
      {/* fade derecho — solo mobile */}
      <div
        className="sm:hidden absolute right-0 top-0 bottom-0 w-8 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(0,0,0,0.85))",
        }}
      />

      {/* Contenedor con scroll horizontal en mobile, centrado en desktop */}
      <div
        ref={scrollRef}
        className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible pb-4 sm:pb-0 px-2 sm:px-0"
        style={
          {
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          } as React.CSSProperties
        }
      >
        {categories.map((cat, i) => (
          <button
            key={cat}
            ref={(el) => {
              btnRefs.current[i] = el;
            }}
            type="button"
            onClick={() => onChange(cat)}
            className={`whitespace-nowrap px-6 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 border ${
              active === cat
                ? "bg-primary border-primary text-black"
                : "bg-transparent border-primary/10 text-white/30 hover:border-primary/40 hover:text-white/60"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function BrandFilter({
  brands,
  active,
  onChange,
}: {
  brands: string[];
  active: string;
  onChange: (brand: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  if (brands.length <= 1) return null;

  return (
    <div className="mt-8 flex flex-col items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-6 py-2 border border-primary/20 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary/70 hover:border-primary hover:text-primary transition-all duration-300"
      >
        <span>Filtrar por Marca</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-xs"
        >
          ↓
        </motion.span>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex flex-wrap justify-center gap-2 max-w-2xl"
        >
          {brands.map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() => onChange(brand === "Todas" ? "" : brand)}
              className={`whitespace-nowrap px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border rounded-full ${
                (brand === "Todas" && !active) || active === brand
                  ? "bg-primary border-primary text-black"
                  : "bg-transparent border-primary/10 text-white/30 hover:border-primary/40 hover:text-white/60"
              }`}
            >
              {brand}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

function ProductsInner({ products }: { products: TiendaNubeProduct[] }) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "Todos";
  const initialSearch = searchParams.get("q") ?? "";
  const initialBrand = searchParams.get("brand") ?? "";

  const [search, setSearch] = useState(initialSearch);
  const [activeBrand, setActiveBrand] = useState(initialBrand);

  const allCategories = useMemo(() => {
    const cats = products.flatMap((p) => p.categories.map((c) => c.name.es));
    return ["Todos", ...Array.from(new Set(cats))];
  }, [products]);

  const allBrands = useMemo(() => {
    const brandsFromField = products.map(p => p.brand).filter(Boolean) as string[];
    // We can also extract common luxury brands from tags if needed
    // For now, let's use the unique brands found in the products
    return ["Todas", ...Array.from(new Set(brandsFromField))];
  }, [products]);

  const [activeCategory, setActiveCategory] = useState(
    allCategories.includes(initialCategory) ? initialCategory : "Todos",
  );

  // Clear brand filter if category is changed manually
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setActiveBrand("");
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.es
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "Todos" ||
        p.categories.some((c) => c.name.es === activeCategory);
      
      const productBrand = p.brand?.toLowerCase().trim() || "";
      const productTags = p.tags?.toLowerCase().split(",").map(t => t.trim()) ?? [];
      const matchesBrand = !activeBrand || 
                           productBrand === activeBrand.toLowerCase() || 
                           productTags.includes(activeBrand.toLowerCase());

      return matchesSearch && matchesCategory && matchesBrand;
    });
  }, [products, search, activeCategory, activeBrand]);

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
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.10) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "80px",
            background: "linear-gradient(to bottom, transparent 0%, #000 100%)",
          }}
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
            <span className="bg-linear-to-r from-primary via-yellow-300 to-primary bg-clip-text text-transparent">
              {activeBrand ? activeBrand : "Productos"}
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

          {activeBrand && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 flex justify-center"
            >
              <button
                onClick={() => setActiveBrand("")}
                className="group flex items-center gap-2 px-4 py-1.5 border border-primary/40 bg-primary/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary hover:text-black transition-all"
              >
                Marca: {activeBrand}
                <span className="ml-1 opacity-60 group-hover:opacity-100">✕</span>
              </button>
            </motion.div>
          )}

          <CategoryFilter
            categories={allCategories}
            active={activeCategory}
            onChange={handleCategoryChange}
          />

          <BrandFilter
            brands={allBrands}
            active={activeBrand}
            onChange={setActiveBrand}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: 'url("/images/leather-texture.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
          backgroundColor: "rgba(0,0,0,0.96)",
        }}
      >
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full pointer-events-none"
            style={{ left: `${p.left}%`, top: `${p.top}%` }}
            animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
          />
        ))}

        <div className="relative z-10 w-[85vw] mx-auto py-12">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground/50 text-sm font-light">
              No se encontraron productos.
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {filtered.map((product, index) => (
                <ProductCard key={product.id} product={product} idx={index} />
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

export function ProductsContent({
  products,
}: {
  products: TiendaNubeProduct[];
}) {
  return (
    <Suspense fallback={null}>
      <ProductsInner products={products} />
    </Suspense>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, animate, useMotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { Section, SectionHeader } from "@/components/layout";
import { formatPrice, getProductMainImage } from "@/lib/tiendanube";
import featuredIds from "@/data/featured-product-ids.json";

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: string;
  image: string;
}

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

function useFeaturedProducts(): ProductItem[] {
  const [products, setProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    fetch("/api/tiendanube/products?per_page=200&published=true")
      .then((r) => r.json())
      .then((data: any[]) => {
        const ids: number[] = featuredIds.featured;
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

interface ProductCardProps {
  product: ProductItem;
}

function ProductCard({ product }: ProductCardProps) {
  const [particles, setParticles] = useState<
    Array<{ id: number; style: React.CSSProperties }>
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 120 }).map((_, i) => {
      const size = 0.3 + Math.random() * 0.8;
      const startX = 180 + Math.random() * 240;
      const startY = 340 + Math.random() * 170;
      const drift = (Math.random() - 0.5) * 60;
      const rise = -100 - Math.random() * 150;
      return {
        id: i,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          left: `${startX}px`,
          top: `${startY}px`,
          animationDelay: `${Math.random() * 4}s`,
          animationDuration: `${4 + Math.random() * 3}s`,
          "--x-drift": `${drift}px`,
          "--y-rise": `${rise}px`,
        } as React.CSSProperties & { "--x-drift": string; "--y-rise": string },
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="product-card-wrapper"
    >
      <style jsx>{`
        .product-card-wrapper { position: relative; width: 100%; }

        .product-container {
          position: relative; cursor: pointer; width: 100%; height: 552px;
          display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
          background-image: url("/images/leather-texture.png");
          background-size: cover; background-position: center;
          background-blend-mode: multiply; background-color: rgba(11, 17, 32, 0.85);
          border: 1px solid rgba(212, 175, 55, 0.12);
          transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1);
          overflow: hidden; padding: 34px 26px 26px 26px;
        }
        @media (max-width: 768px) {
          .product-container { height: 468px; padding: 26px 17px 17px 17px; }
        }
        .product-container:hover {
          border-color: rgba(212, 175, 55, 0.35);
          box-shadow: 0 0 40px rgba(212, 175, 55, 0.08), inset 0 0 80px rgba(212, 175, 55, 0.02);
        }
        .lighting-container {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          overflow: hidden; pointer-events: none;
        }
        .main-light-cone {
          position: absolute; top: -5%; left: 50%; transform: translateX(-50%);
          width: 50%; height: 25%;
          background: linear-gradient(180deg, rgba(255,245,180,0.45) 0%, rgba(212,175,55,0.14) 30%, rgba(212,175,55,0.02) 48%, transparent 60%);
          opacity: 0; transition: opacity 2s cubic-bezier(0.23,1,0.32,1);
          filter: blur(60px); clip-path: polygon(28% 0%, 72% 0%, 88% 100%, 12% 100%); z-index: 999;
        }
        .product-container:hover .main-light-cone { opacity: 0.5; }
        .product-spotlight {
          position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%);
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(255,250,220,0.45) 0%, rgba(212,175,55,0.1) 55%, transparent 80%);
          opacity: 0; transition: opacity 2.2s cubic-bezier(0.23,1,0.32,1) 0.4s;
          filter: blur(65px); z-index: 2;
        }
        .product-container:hover .product-spotlight { opacity: 0.6; }
        .top-accent-light {
          position: absolute; top: 5%; left: 50%; transform: translateX(-50%);
          width: 65%; height: 65%;
          background: radial-gradient(ellipse at top, rgba(255,245,200,0.35) 0%, rgba(212,175,55,0.09) 52%, transparent 94%);
          opacity: 0; transition: opacity 2s cubic-bezier(0.23,1,0.32,1) 0.2s;
          filter: blur(70px); z-index: 1;
        }
        .product-container:hover .top-accent-light { opacity: 0.35; }
        .product-rim-light {
          position: absolute; top: 32%; left: 50%; transform: translate(-50%, -50%);
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(255,250,220,0.25) 0%, rgba(212,175,55,0.03) 65%, transparent 75%);
          opacity: 0; transition: opacity 1.5s cubic-bezier(0.25,0.46,0.45,0.94) 0.4s;
          filter: blur(40px); z-index: 4;
        }
        .product-container:hover .product-rim-light { opacity: 0.3; }
        .product {
          position: relative; width: 204px; height: 204px; margin-top: 102px; z-index: 5;
          transform: translateY(34px);
          transition: transform 3.5s cubic-bezier(0.19,1,0.22,1), scale 3.5s cubic-bezier(0.19,1,0.22,1);
        }
        @media (max-width: 768px) { .product { width: 170px; height: 170px; margin-top: 77px; transform: translateY(26px); } }
        .product-img {
          filter: brightness(0.6) contrast(1.1) saturate(0.85);
          transition: filter 3.5s cubic-bezier(0.19,1,0.22,1);
        }
        .product-container:hover .product { transform: translateY(-10px); scale: 1.04; }
        .product-container:hover .product-img {
          filter: brightness(1.45) contrast(1.3) saturate(1.2)
            drop-shadow(0 25px 50px rgba(212,175,55,0.45))
            drop-shadow(0 10px 25px rgba(255,235,150,0.3));
        }
        .product-shadow-main {
          position: absolute; bottom: 204px; left: 50%; transform: translateX(-50%);
          width: 238px; height: 60px;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 90%);
          opacity: 0.9; transition: all 1.5s cubic-bezier(0.25,0.46,0.45,0.94) 0.4s;
          filter: blur(20px); z-index: 3;
        }
        .product-container:hover .product-shadow-main { opacity: 0.45; width: 204px; height: 47px; bottom: 208px; filter: blur(28px); }
        .product-shadow-soft {
          position: absolute; bottom: 196px; left: 50%; transform: translateX(-50%);
          width: 323px; height: 77px;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.12) 60%, transparent 85%);
          opacity: 0.7; transition: all 1.5s cubic-bezier(0.25,0.46,0.45,0.94) 0.35s;
          filter: blur(35px); z-index: 2;
        }
        .product-container:hover .product-shadow-soft { opacity: 0.35; width: 289px; bottom: 200px; filter: blur(42px); }
        .floor-reflection {
          position: absolute; bottom: 179px; left: 50%; transform: translateX(-50%);
          width: 75%; height: 102px;
          background: radial-gradient(ellipse at center, rgba(212,175,55,0.42) 0%, rgba(212,175,55,0.04) 65%, transparent 80%);
          opacity: 0; transition: opacity 1.6s cubic-bezier(0.25,0.46,0.45,0.94) 0.5s;
          filter: blur(35px); z-index: 1;
        }
        .product-container:hover .floor-reflection { opacity: 1; }
        .particles-container {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none; z-index: 3; opacity: 0; transition: opacity 1.5s ease;
        }
        .product-container:hover .particles-container { opacity: 1; }
        .particle {
          position: absolute;
          background: radial-gradient(circle, rgba(255,245,200,0.6) 0%, rgba(255,230,150,0.3) 40%, transparent 100%);
          border-radius: 50%; opacity: 0; animation: particleRise infinite ease-out;
        }
        @keyframes particleRise {
          0%   { opacity: 0; transform: translate(0,0) scale(0.3); }
          20%  { opacity: 0.3; }
          50%  { opacity: 0.15; transform: translate(var(--x-drift), var(--y-rise)) scale(1); }
          80%  { opacity: 0.08; }
          100% { opacity: 0; transform: translate(calc(var(--x-drift)*1.6), calc(var(--y-rise)*1.8)) scale(0.2); }
        }
        .ambient-glow {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(ellipse at 50% 35%, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.03) 40%, transparent 70%);
          opacity: 0; transition: opacity 1.4s cubic-bezier(0.25,0.46,0.45,0.94) 0.2s;
          pointer-events: none; z-index: 1;
        }
        .product-container:hover .ambient-glow { opacity: 1; }
        .product-info {
          position: absolute; bottom: 17px; left: 0; right: 0;
          text-align: center; padding: 0 26px; z-index: 10;
          transition: all 2.2s cubic-bezier(0.23,1,0.32,1);
        }
        .product-container:hover .product-info { transform: translateY(-46px); }
        .product-brand {
          font-size: 10px; font-weight: 600; letter-spacing: 0.25em;
          text-transform: uppercase; color: rgba(212,175,55,0.65); margin-bottom: 14px;
          transition: all 2s cubic-bezier(0.23,1,0.32,1);
        }
        .product-container:hover .product-brand { color: rgba(255,215,100,1); letter-spacing: 0.3em; text-shadow: 0 0 15px rgba(212,175,55,0.4); }
        .product-name {
          font-family: var(--font-serif, serif); font-size: 20px; font-weight: 300;
          color: rgba(255,255,255,0.88); margin-bottom: 10px; line-height: 1.3;
          transition: all 2s cubic-bezier(0.23,1,0.32,1); padding: 0 16px;
        }
        .product-container:hover .product-name { color: rgba(255,255,255,1); text-shadow: 0 2px 20px rgba(0,0,0,0.3); }
        .product-price {
          font-size: 27px; font-weight: 600; color: rgba(212,175,55,0.92);
          letter-spacing: 0.03em; transition: all 2s cubic-bezier(0.23,1,0.32,1);
        }
        @media (max-width: 768px) { .product-price { font-size: 24px; } }
        .product-container:hover .product-price {
          color: rgba(255,225,120,1);
          text-shadow: 0 0 25px rgba(212,175,55,0.35), 0 0 10px rgba(255,235,150,0.2);
          transform: scale(1.05);
        }
        .add-to-cart-btn {
          position: absolute; bottom: -60px; left: 50%; transform: translateX(-50%);
          padding: 11px 28px;
          background: linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.08) 100%);
          border: 1px solid rgba(212,175,55,0.3); color: rgba(255,255,255,0.9);
          font-size: 10px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase;
          cursor: pointer; opacity: 0; transition: all 0.6s cubic-bezier(0.23,1,0.32,1);
          z-index: 15; backdrop-filter: blur(10px); white-space: nowrap;
        }
        .product-container:hover .add-to-cart-btn { opacity: 1; bottom: 13px; }
        .add-to-cart-btn:hover {
          background: linear-gradient(135deg, rgba(212,175,55,0.25) 0%, rgba(212,175,55,0.15) 100%);
          border-color: rgba(212,175,55,0.6); color: rgba(255,255,255,1);
          transform: translateX(-50%) translateY(-2px);
        }
        .add-to-cart-btn:active { transform: translateX(-50%) translateY(0px); }
      `}</style>

      <Link href={`/products/${product.slug}`} className="block">
        <div className="product-container group">
          <div className="lighting-container">
            <div className="ambient-glow" />
            <div className="main-light-cone" />
            <div className="top-accent-light" />
            <div className="product-spotlight" />
            <div className="product-rim-light" />
            <div className="floor-reflection" />
            <div className="particles-container">
              {particles.map((p) => (
                <div key={p.id} className="particle" style={p.style} />
              ))}
            </div>
          </div>
          <div className="product-shadow-soft" />
          <div className="product-shadow-main" />
          <div className="product">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                width={204}
                height={204}
                className="product-img"
              />
            ) : (
              <div style={{ width: 204, height: 204, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.1, fontSize: 80, fontFamily: "serif" }}>F</div>
            )}
          </div>
          <div className="product-info">
            <p className="product-brand">{product.category}</p>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price}</p>
          </div>
          <span className="add-to-cart-btn">Ver detalle</span>
        </div>
      </Link>
    </motion.div>
  );
}

// Cantidad fija del JSON — no depende del fetch async
const FEATURED_COUNT = featuredIds.featured.length; // 6

export function FeaturedProducts() {
  const { t } = useTranslation();
  const products = useFeaturedProducts();
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const idxRef = useRef(FEATURED_COUNT); // arranca en la copia del medio
  const busy = useRef(false);
  const [slotW, setSlotW] = useState(0);

  // Triplicar productos (o placeholders vacíos) para el loop infinito
  const EXTENDED = products.length > 0
    ? [...products, ...products, ...products]
    : Array.from({ length: FEATURED_COUNT * 3 }, (_, i) => ({ id: String(i), slug: "", name: "", category: "", price: "", image: "" }));

  // Calcular ancho de slot — no depende de que lleguen los productos
  useEffect(() => {
    const calc = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      setSlotW(window.innerWidth < 768 ? w / 1.2 : w / 3);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Posicionar en la copia del medio apenas slotW esté listo
  useEffect(() => {
    if (slotW > 0) {
      idxRef.current = FEATURED_COUNT;
      x.set(-FEATURED_COUNT * slotW);
    }
  }, [slotW]); // solo slotW — FEATURED_COUNT es constante

  const go = async (dir: 1 | -1) => {
    if (busy.current || slotW === 0) return;
    busy.current = true;
    const step = window.innerWidth < 768 ? 1 : 3;
    const next = idxRef.current + dir * step;
    await animate(x, -next * slotW, { duration: 0.5, ease: [0.4, 0, 0.2, 1] });
    let settled = next;
    if (next >= FEATURED_COUNT * 2) settled = next - FEATURED_COUNT;
    else if (next < FEATURED_COUNT) settled = next + FEATURED_COUNT;
    idxRef.current = settled;
    if (settled !== next) x.set(-settled * slotW);
    busy.current = false;
  };

  const loaded = products.length > 0;

  return (
    <Section variant="dark" size="large" className="relative !bg-transparent">
      {loaded && (
        <SectionHeader
          eyebrow={t("products.eyebrow")}
          title={t("products.title")}
          description={t("products.description")}
          align="center"
          className="mb-16"
        />
      )}
      <div className="relative">
        {loaded && (
          <button
            onClick={() => go(-1)}
            aria-label="Anterior"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20 flex items-center justify-center w-11 h-11 rounded-full border border-primary/40 bg-background/80 backdrop-blur-sm text-primary hover:bg-primary hover:text-black transition-all duration-300 hover:scale-110 shadow-lg shadow-black/30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {/* containerRef SIEMPRE en el DOM para que offsetWidth se pueda medir */}
        <div ref={containerRef} className="overflow-hidden">
          <motion.div style={{ x }} className="flex">
            {EXTENDED.map((product, i) => (
              <div
                key={`${i}-${product.id}`}
                style={{ width: slotW || "33.33%", flexShrink: 0, padding: "0 12px" }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </motion.div>
        </div>
        {loaded && (
          <button
            onClick={() => go(1)}
            aria-label="Siguiente"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20 flex items-center justify-center w-11 h-11 rounded-full border border-primary/40 bg-background/80 backdrop-blur-sm text-primary hover:bg-primary hover:text-black transition-all duration-300 hover:scale-110 shadow-lg shadow-black/30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
      {loaded && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 flex justify-center"
        >
          <Link
            href="/products"
            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-primary text-black font-semibold text-xs tracking-[0.25em] uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105"
          >
            <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative">Ver todos los productos</span>
            <ArrowRight className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      )}
    </Section>
  );
}

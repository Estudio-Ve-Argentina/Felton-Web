"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, animate, useMotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useTranslation } from "@/lib/i18n";
import { Section, SectionHeader } from "@/components/layout";
import { formatPrice, getProductMainImage } from "@/lib/tiendanube";
import featuredIds from "@/data/featured-product-ids.json";
import { useAllProducts } from "@/lib/hooks/useHomeProducts";

import { ProductCard, tnToProductItem } from "../products/product-card";
import type { ProductItem } from "../products/product-card";

function useFeaturedProducts(): ProductItem[] {
  const allProducts = useAllProducts();
  const ids: number[] = featuredIds.featured;
  if (allProducts.length === 0) return [];
  const filtered =
    ids.length > 0
      ? ids.map((id) => allProducts.find((p) => p.id === id)).filter(Boolean)
      : allProducts.slice(0, 9);
  return filtered.map((p: any) => tnToProductItem(p));
}


const FEATURED_COUNT = featuredIds.featured.length;

export function FeaturedProducts() {
  const { t } = useTranslation();
  const products = useFeaturedProducts();
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const idxRef = useRef(FEATURED_COUNT);
  const busy = useRef(false);
  const isDragging = useRef(false);
  const queuedDir = useRef<1 | -1 | null>(null);
  const [slotW, setSlotW] = useState(0);

  const EXTENDED = products.length > 0
    ? [...products, ...products, ...products]
    : Array.from({ length: FEATURED_COUNT * 3 }, (_, i) => ({ id: String(i), slug: "", name: "", category: "", price: "", image: "" }));

  useEffect(() => {
    const calc = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      setSlotW(window.innerWidth < 768 ? w / 1.6 : w / 3);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  useEffect(() => {
    if (slotW > 0) {
      idxRef.current = FEATURED_COUNT;
      x.set(-FEATURED_COUNT * slotW);
    }
  }, [slotW]);

  const go = async (dir: 1 | -1) => {
    if (slotW === 0) return;
    if (busy.current) { queuedDir.current = dir; return; }
    busy.current = true;
    queuedDir.current = null;
    const step = window.innerWidth < 768 ? 1 : 3;
    const next = idxRef.current + dir * step;
    await animate(x, -next * slotW, { duration: 0.45, ease: [0.19, 1, 0.22, 1] });
    
    let settled = next;
    if (next >= FEATURED_COUNT * 2) settled = next - FEATURED_COUNT;
    else if (next < FEATURED_COUNT) settled = next + FEATURED_COUNT;
    idxRef.current = settled;
    if (settled !== next) x.set(-settled * slotW);
    busy.current = false;
    
    if (queuedDir.current !== null) {
      const queued = queuedDir.current;
      queuedDir.current = null;
      go(queued);
    }
  };

  const dragStartX = useRef<number | null>(null);
  const dragLocked = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    if (window.matchMedia("(pointer: fine)").matches && window.innerWidth > 1024) return;
    
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragLocked.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const deltaX = e.clientX - dragStartX.current;
    const deltaY = Math.abs((e as any).movementY ?? 0);
    if (!dragLocked.current) {
      if (Math.abs(deltaX) < 10) return;
      dragLocked.current = Math.abs(deltaX) > deltaY;
      if (!dragLocked.current) { dragStartX.current = null; return; }
    }
    e.preventDefault();
    if (!busy.current) x.set(-idxRef.current * slotW + deltaX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) { isDragging.current = false; return; }
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    dragLocked.current = false;
    
    const threshold = slotW * 0.4;
    if (delta < -threshold) go(1);
    else if (delta > threshold) go(-1);
    else if (!busy.current) {
        const currentX = x.get();
        const currentIdx = -currentX / slotW;
        idxRef.current = currentIdx;
        
        if (currentIdx >= FEATURED_COUNT * 2.2) {
          idxRef.current = currentIdx - FEATURED_COUNT;
          x.set(-idxRef.current * slotW);
        } else if (currentIdx <= FEATURED_COUNT * 0.8) {
          idxRef.current = currentIdx + FEATURED_COUNT;
          x.set(-idxRef.current * slotW);
        }
    }
    setTimeout(() => { isDragging.current = false; }, 350);
  };

  const loaded = products.length > 0;

  return (
    <Section variant="dark" size="large" className="relative bg-transparent">
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
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20 hidden sm:flex items-center justify-center w-11 h-11 rounded-full border border-primary/40 bg-background/80 backdrop-blur-sm text-primary hover:bg-primary hover:text-black transition-all duration-300 hover:scale-110 shadow-lg shadow-black/30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        <div
          ref={containerRef}
          className="overflow-hidden"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{ touchAction: "pan-y" }}
        >
          <motion.div style={{ x, willChange: "transform" }} className="flex">
            {EXTENDED.map((product, i) => (
              <div
                key={`${i}-${product.id}`}
                style={{ width: slotW || "33.33%", flexShrink: 0, padding: "0 12px" }}
              >
                <ProductCard idx={i} product={product} isDragging={isDragging} />
              </div>
            ))}
          </motion.div>
        </div>
        {loaded && (
          <button
            onClick={() => go(1)}
            aria-label="Siguiente"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20 hidden sm:flex items-center justify-center w-11 h-11 rounded-full border border-primary/40 bg-background/80 backdrop-blur-sm text-primary hover:bg-primary hover:text-black transition-all duration-300 hover:scale-110 shadow-lg shadow-black/30"
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

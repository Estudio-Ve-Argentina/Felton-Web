"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
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

export function FeaturedProducts() {
  const { t } = useTranslation();
  const products = useFeaturedProducts();
  const loaded = products.length > 0;

  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });

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

      {loaded && (
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {products.map((product, i) => (
              <div
                key={product.id}
                className="shrink-0 grow-0 basis-[72vw] sm:basis-[34vw] px-2"
              >
                <ProductCard idx={i} product={product} />
              </div>
            ))}
          </div>
        </div>
      )}

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

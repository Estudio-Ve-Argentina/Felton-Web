"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/lib/cart";
import type { TiendaNubeProduct } from "@/lib/tiendanube";
import { formatPrice, getProductMainImage } from "@/lib/tiendanube";

function toCartProduct(product: TiendaNubeProduct, variantId: number) {
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const stock = variant.stock_management ? (variant.stock ?? 0) : 999;
  return {
    id: String(variant.id),
    variantId: variant.id,
    name: product.name.es,
    price: variant.price,
    image: getProductMainImage(product) ?? "",
    category: product.categories[0]?.name.es ?? "",
    stock,
  };
}

function RelatedCard({ product }: { product: TiendaNubeProduct }) {
  const { addToCart, items } = useCart();
  const variant = product.variants[0];
  const cartItem = items.find((i) => i.id === String(variant?.id));
  const stock = variant?.stock_management ? (variant.stock ?? 0) : 999;
  const atMax = cartItem ? cartItem.quantity >= stock : false;
  const image = getProductMainImage(product);

  return (
    <Link href={`/products/${product.handle.es}`} className="group block">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="border border-primary/15 group-hover:border-primary/35 transition-colors duration-300 overflow-hidden"
        style={{
          backgroundImage: 'url("/images/leather-texture.png")',
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
          backgroundColor: "rgba(11,17,32,0.92)",
        }}
      >
        <div className="relative h-44 flex items-center justify-center p-6">
          {image ? (
            <Image
              src={image}
              alt={product.name.es}
              width={130}
              height={130}
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-24 h-24 bg-primary/5 flex items-center justify-center text-primary/20 text-3xl font-serif">F</div>
          )}
        </div>
        <div className="px-5 py-4 border-t border-primary/10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/55 mb-1">
            {product.categories[0]?.name.es ?? ""}
          </p>
          <h3 className="font-serif text-sm font-light text-foreground/90 mb-2 leading-snug">
            {product.name.es}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-primary">
              {variant ? formatPrice(variant.price) : ""}
            </span>
            <button
              type="button"
              disabled={atMax || !variant}
              onClick={(e) => {
                e.preventDefault();
                if (!atMax && variant) addToCart(toCartProduct(product, variant.id));
              }}
              className="text-[10px] font-semibold uppercase tracking-widest text-foreground/50 hover:text-primary transition-colors disabled:opacity-30"
            >
              {atMax ? "Agotado" : "+ Carrito"}
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

interface Props {
  product: TiendaNubeProduct;
  related: TiendaNubeProduct[];
}

export function ProductDetail({ product, related }: Props) {
  const { addToCart, openCart, items } = useCart();
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id ?? 0
  );

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];
  const stock = selectedVariant?.stock_management ? (selectedVariant.stock ?? 0) : 999;
  const outOfStock = stock === 0;
  const cartItem = items.find((i) => i.id === String(selectedVariantId));
  const atMax = cartItem ? cartItem.quantity >= stock : false;

  const images = product.images.length > 0
    ? product.images.sort((a, b) => a.position - b.position).map((img) => img.src)
    : [];

  const hasMultipleVariants = product.variants.length > 1;

  const prevImg = () => setSelectedImg((i) => (i - 1 + images.length) % images.length);
  const nextImg = () => setSelectedImg((i) => (i + 1) % images.length);

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: 'url("/images/leather-texture.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="absolute inset-0 bg-background/95 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pt-32 pb-16">
        {/* Mobile title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:hidden mb-8"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary/60 mb-3">
            {product.categories[0]?.name.es ?? ""}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-foreground leading-tight">
            {product.name.es}
          </h1>
          <span className="text-2xl font-semibold text-primary tracking-tight mt-2 block">
            {selectedVariant ? formatPrice(selectedVariant.price) : ""}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-32">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div
              className="relative aspect-[3/4] border border-primary/15 overflow-hidden flex items-center justify-center"
              style={{
                backgroundImage: 'url("/images/leather-texture.png")',
                backgroundSize: "cover",
                backgroundBlendMode: "multiply",
                backgroundColor: "rgba(11,17,32,0.94)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.06) 0%, transparent 65%)",
                }}
              />

              {images.length > 0 ? (
                <Image
                  key={selectedImg}
                  src={images[selectedImg]}
                  alt={`${product.name.es} — foto ${selectedImg + 1}`}
                  width={560}
                  height={560}
                  className="relative z-10 object-contain p-12 w-full h-full"
                  priority
                />
              ) : (
                <div className="relative z-10 text-primary/10 text-8xl font-serif">F</div>
              )}

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImg}
                    aria-label="Foto anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 border border-primary/30 bg-background/70 backdrop-blur-sm text-primary hover:bg-primary hover:text-black transition-all duration-200"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImg}
                    aria-label="Foto siguiente"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-9 h-9 border border-primary/30 bg-background/70 backdrop-blur-sm text-primary hover:bg-primary hover:text-black transition-all duration-200"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.slice(0, 7).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    aria-label={`Ver foto ${i + 1}`}
                    className={`flex-shrink-0 border transition-all duration-200 overflow-hidden flex items-center justify-center ${
                      i === selectedImg ? "border-primary" : "border-primary/15 hover:border-primary/40"
                    }`}
                    style={{ width: 72, height: 72, backgroundColor: "rgba(11,17,32,0.9)" }}
                  >
                    <Image
                      src={img}
                      alt={`Miniatura ${i + 1}`}
                      width={64}
                      height={64}
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col space-y-7"
          >
            {/* Desktop title */}
            <div className="hidden lg:block">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/60 mb-3">
                {product.categories[0]?.name.es ?? ""}
              </p>
              <h1 className="font-serif text-4xl xl:text-5xl font-light text-foreground leading-tight">
                {product.name.es}
              </h1>
              <span className="text-3xl font-semibold text-primary tracking-tight mt-2 block">
                {selectedVariant ? formatPrice(selectedVariant.price) : ""}
              </span>
            </div>

            <div className="h-px bg-primary/15" />

            {/* Description */}
            {product.description?.es && (
              <div
                className="text-sm font-light text-white/70 leading-relaxed prose prose-invert prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description.es }}
              />
            )}

            {/* Variant selector */}
            {hasMultipleVariants && (
              <div className="space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                  Variante
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => {
                    const label = v.values.map((val) => val.es).join(" / ");
                    const vStock = v.stock_management ? (v.stock ?? 0) : 999;
                    const soldOut = vStock === 0;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        disabled={soldOut}
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-all border ${
                          selectedVariantId === v.id
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-primary/20 text-white/50 hover:border-primary/40 hover:text-white/70"
                        } disabled:opacity-30 disabled:cursor-not-allowed`}
                      >
                        {label}
                        {soldOut && " (agotado)"}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add to cart */}
            <div className="pt-3 space-y-3">
              <button
                type="button"
                disabled={atMax || outOfStock}
                onClick={() => {
                  if (!selectedVariant) return;
                  addToCart(toCartProduct(product, selectedVariant.id));
                  openCart();
                }}
                className="w-full flex items-center justify-center gap-3 border border-primary bg-primary text-black py-5 text-sm font-semibold uppercase tracking-[0.25em] hover:bg-primary/90 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="h-5 w-5" />
                {outOfStock
                  ? "Sin Stock"
                  : atMax
                  ? "Límite de stock alcanzado"
                  : "Agregar al Carrito"}
              </button>

              <Link
                href="/products"
                className="flex items-center justify-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors duration-200 py-1"
              >
                <ArrowLeft className="h-3 w-3" />
                Volver al catálogo
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-4 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-5"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary/60 mb-2">
                También te puede gustar
              </p>
              <h2 className="font-serif text-xl font-light text-foreground">
                Productos relacionados
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <RelatedCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

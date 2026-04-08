"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { useCart } from "@/lib/cart";
import productsData from "@/data/products.json";

interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: string;
  image: string;
  images: string[];
  description: string;
  longDescription: string;
  material: string;
  color: string;
  stock: number;
}

const products = productsData as Product[];

function RelatedCard({ product }: { product: Product }) {
  const { addToCart, items } = useCart();
  const cartItem = items.find((i) => i.id === product.id);
  const atMax = cartItem ? cartItem.quantity >= product.stock : false;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
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
        {/* Image */}
        <div className="relative h-44 flex items-center justify-center p-6">
          <Image
            src={product.image}
            alt={product.name}
            width={130}
            height={130}
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        {/* Info */}
        <div className="px-5 py-4 border-t border-primary/10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/55 mb-1">
            {product.category}
          </p>
          <h3 className="font-serif text-sm font-light text-foreground/90 mb-2 leading-snug">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-primary">{product.price}</span>
            <button
              type="button"
              disabled={atMax}
              onClick={(e) => {
                e.preventDefault();
                if (!atMax) addToCart(product);
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

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const product = products.find((p) => p.slug === slug);

  const { addToCart, openCart, items } = useCart();
  const [selectedImg, setSelectedImg] = useState(0);

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center space-y-4">
            <p className="text-xs uppercase tracking-widest text-primary/60">404</p>
            <h1 className="font-serif text-2xl font-light text-foreground">
              Producto no encontrado
            </h1>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Volver al catálogo
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const cartItem = items.find((i) => i.id === product.id);
  const atMax = cartItem ? cartItem.quantity >= product.stock : false;
  const outOfStock = product.stock === 0;

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const images = product.images.length > 0 ? product.images : [product.image];

  const prevImg = () =>
    setSelectedImg((i) => (i - 1 + images.length) % images.length);
  const nextImg = () =>
    setSelectedImg((i) => (i + 1) % images.length);

  return (
    <>
      <Header />
      <main
        className="relative min-h-screen overflow-hidden"
        style={{
          backgroundImage: 'url("/images/leather-texture.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
        }}
      >
        {/* Background overlay — same as blog/newsletter section */}
        <div className="absolute inset-0 bg-background/95 pointer-events-none" />

        {/* ── Product detail ──────────────────────────────── */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pt-56 pb-16">

          {/* Mobile: title above image */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:hidden mb-8"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary/60 mb-3">
              {product.category}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-foreground leading-tight">
              {product.name}
            </h1>
          </motion.div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-32">

            {/* ── Left: Gallery ───────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {/* Main image */}
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
                    background:
                      "radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.06) 0%, transparent 65%)",
                  }}
                />

                <Image
                  key={selectedImg}
                  src={images[selectedImg]}
                  alt={`${product.name} — foto ${selectedImg + 1}`}
                  width={560}
                  height={560}
                  className="relative z-10 object-contain p-12 w-full h-full"
                  priority
                />

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

              {/* Thumbnails — always visible, max 7 */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.slice(0, 7).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    aria-label={`Ver foto ${i + 1}`}
                    className={`flex-shrink-0 w-18 h-18 border transition-all duration-200 overflow-hidden flex items-center justify-center ${
                      i === selectedImg
                        ? "border-primary"
                        : "border-primary/15 hover:border-primary/40"
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
            </motion.div>

            {/* ── Right: Details ──────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col space-y-7"
            >
              {/* Desktop: category + title */}
              <div className="hidden lg:block">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/60 mb-3">
                  {product.category}
                </p>
                <h1 className="font-serif text-4xl xl:text-5xl font-light text-foreground leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Price */}
              <div>
                <span className="text-4xl font-semibold text-primary tracking-tight">
                  {product.price}
                </span>
                {product.stock > 0 && product.stock <= 3 && (
                  <p className="mt-2 text-sm font-semibold text-red-400 tracking-wide">
                    ! Solo quedan {product.stock} unidades
                  </p>
                )}
                {outOfStock && (
                  <p className="mt-2 text-sm font-semibold text-red-400 tracking-wide">
                    ! Sin stock disponible
                  </p>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-primary/15" />

              {/* Short description */}
              <p className="text-base font-light text-white/70 leading-relaxed">
                {product.description}
              </p>

              {/* Long description */}
              <p className="text-sm font-light text-white/50 leading-relaxed">
                {product.longDescription}
              </p>

              {/* Material & Color — below descriptions */}
              <div className="space-y-3 pt-1">
                <div className="flex gap-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 w-16 shrink-0 pt-0.5">
                    Material
                  </span>
                  <span className="text-sm font-light text-white/65 leading-relaxed">
                    {product.material}
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 w-16 shrink-0 pt-0.5">
                    Color
                  </span>
                  <span className="text-sm font-light text-white/65">
                    {product.color}
                  </span>
                </div>
              </div>

              {/* Add to cart button */}
              <div className="pt-3 space-y-3">
                <button
                  type="button"
                  disabled={atMax || outOfStock}
                  onClick={() => {
                    addToCart(product);
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

        {/* ── Related products ────────────────────────────── */}
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
      <Footer />
    </>
  );
}

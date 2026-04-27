"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { useCart, type CartProduct } from "@/lib/cart";
import type { TiendaNubeProduct } from "@/lib/tiendanube";
import { formatPrice, getProductMainImage } from "@/lib/tiendanube";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function toCartProduct(
  product: TiendaNubeProduct,
  variantId: number,
): CartProduct {
  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const stock = variant.stock_management ? (variant.stock ?? 0) : 999;
  return {
    id: String(variant.id),
    productId: product.id,
    variantId: variant.id,
    name: product.name.es,
    price: variant.price,
    image: getProductMainImage(product) ?? "",
    category: product.categories[0]?.name.es ?? "",
    stock,
  };
}

import { ProductCard } from "@/components/products/product-card";
import { tnToProductItem } from "@/components/products/product-card";

function RelatedCard({ product, idx }: { product: TiendaNubeProduct, idx: number }) {
  return <ProductCard product={tnToProductItem(product)} idx={idx} />;
}

interface Props {
  product: TiendaNubeProduct;
  related: TiendaNubeProduct[];
}

export function ProductDetail({ product, related }: Props) {
  const { addToCart, openCart, items } = useCart();
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id ?? 0,
  );
  const [zipcode, setZipcode] = useState("");
  const [shippingOptions, setShippingOptions] = useState<
    { name: string; price: number | "Gratis"; time: string }[] | null
  >(null);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) ??
    product.variants[0];
  const stock = selectedVariant?.stock_management
    ? (selectedVariant.stock ?? 0)
    : 999;
  const outOfStock = stock === 0;
  const cartItem = items.find((i) => i.id === String(selectedVariantId));
  const atMax = cartItem ? cartItem.quantity >= stock : false;

  const images =
    product.images.length > 0
      ? product.images
          .sort((a, b) => a.position - b.position)
          .map((img) => img.src)
      : [];

  const hasMultipleVariants = product.variants.length > 1;

  const prevImg = () =>
    setSelectedImg((i) => (i - 1 + images.length) % images.length);
  const nextImg = () => setSelectedImg((i) => (i + 1) % images.length);

  const calculateShipping = async () => {
    if (!zipcode || zipcode.length < 4) return;
    setIsCalculatingShipping(true);
    setShippingOptions(null);
    // Simulate API request to shipping provider
    await new Promise((r) => setTimeout(r, 1200));
    setShippingOptions([
      {
        name: "Envío Estándar a Domicilio",
        price: 4500,
        time: "3 a 5 días hábiles",
      },
      { name: "Envío Prioritario", price: 7800, time: "1 a 2 días hábiles" },
      {
        name: "Retiro en Sucursal",
        price: "Gratis",
        time: "A partir del próximo día hábil",
      },
    ]);
    setIsCalculatingShipping(false);
  };

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

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 pb-16">
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
          <span className="text-2xl font-semibold text-primary tracking-tight mt-2 flex items-center gap-3">
            {selectedVariant?.compare_at_price && parseFloat(selectedVariant.compare_at_price) > parseFloat(selectedVariant.price) && (
              <span className="text-sm font-normal text-white/40 line-through">
                {formatPrice(selectedVariant.compare_at_price)}
              </span>
            )}
            {selectedVariant ? formatPrice(selectedVariant.price) : ""}
          </span>

          {/* Mobile Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pt-4 pb-1">
              {images.slice(0, 7).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  aria-label={`Ver foto ${i + 1}`}
                  className={`shrink-0 border transition-all duration-200 overflow-hidden flex items-center justify-center ${
                    i === selectedImg
                      ? "border-primary"
                      : "border-primary/15 hover:border-primary/40"
                  }`}
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: "rgba(10, 10, 14, 0.95)",
                  }}
                >
                  <Image
                    src={img}
                    alt={`Miniatura ${i + 1}`}
                    width={52}
                    height={52}
                    className="object-contain p-1.5"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="text-[10px] uppercase tracking-[0.2em]"
                >
                  Inicio
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/products"
                  className="text-[10px] uppercase tracking-[0.2em]"
                >
                  Productos
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[10px] uppercase tracking-[0.3em] font-semibold text-primary">
                  {product.name.es}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 xl:gap-32">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div
              className="relative aspect-3/4 border border-primary/15 overflow-hidden flex items-center justify-center"
              style={{
                backgroundImage: 'url("/images/leather-texture.png")',
                backgroundSize: "cover",
                backgroundBlendMode: "multiply",
                backgroundColor: "rgba(10, 10, 14, 0.96)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.06) 0%, transparent 65%)",
                }}
              />

              {images.length > 0 ? (
                <Image
                  key={selectedImg}
                  src={images[selectedImg]}
                  alt={`${product.name.es} — foto ${selectedImg + 1}`}
                  width={560}
                  height={560}
                  className="relative z-10 object-contain w-full h-full transition-all duration-700"
                  priority
                />
              ) : (
                <div className="relative z-10 text-primary/10 text-8xl font-serif">
                  F
                </div>
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

            {/* Product Info Accordions Moved Below Gallery */}
            <div className="pt-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem
                  value="shipping"
                  className="border-b border-primary/10"
                >
                  <AccordionTrigger className="hover:no-underline py-6">
                    <div className="flex items-center gap-3 font-serif text-lg font-light text-foreground uppercase tracking-wider">
                      <Truck className="w-5 h-5 text-primary" />
                      Calculador de Envíos
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pt-1">
                    <div className="flex flex-col gap-4">
                      <p className="text-sm text-white/60 mb-1">
                        Ingresá tu código postal para conocer las opciones y
                        costos de envío.
                      </p>
                      <div className="flex gap-2 max-w-sm">
                        <Input
                          type="text"
                          value={zipcode}
                          onChange={(e) =>
                            setZipcode(
                              e.target.value.replace(/\D/g, "").slice(0, 8),
                            )
                          }
                          placeholder="Ej: 7600"
                          onKeyDown={(e) =>
                            e.key === "Enter" && calculateShipping()
                          }
                          className="flex-1 h-12 bg-primary/5 border-primary/20 text-sm focus:border-primary transition-colors rounded-none"
                        />
                        <Button
                          variant="outline"
                          onClick={() => calculateShipping()}
                          disabled={isCalculatingShipping || !zipcode}
                          className="h-12 border-primary/20 hover:border-primary hover:bg-primary hover:text-black uppercase tracking-wider rounded-none px-8 disabled:opacity-50 min-w-[120px]"
                        >
                          {isCalculatingShipping ? (
                            <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                          ) : (
                            "Calcular"
                          )}
                        </Button>
                      </div>

                      {/* Shipping Options Results */}
                      {shippingOptions && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 flex flex-col gap-3"
                        >
                          {shippingOptions.map((opt, i) => (
                            <div
                              key={i}
                              className="flex justify-between items-center p-3 border border-primary/10 bg-primary/5"
                            >
                              <div>
                                <p className="font-semibold text-sm text-foreground/90">
                                  {opt.name}
                                </p>
                                <p className="text-xs text-white/50 mt-1">
                                  {opt.time}
                                </p>
                              </div>
                              <div className="text-primary font-semibold">
                                {typeof opt.price === "number"
                                  ? formatPrice(opt.price)
                                  : opt.price}
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}

                      <p className="text-[10px] text-white/40 italic mt-2">
                        * Costo ilustrativo. Las tarifas exactas se confirmarán
                        en el checkout de Tienda Nube.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="care"
                  className="border-b border-primary/10"
                >
                  <AccordionTrigger className="hover:no-underline py-6">
                    <div className="flex items-center gap-3 font-serif text-lg font-light text-foreground uppercase tracking-wider">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                      Cuidados del producto
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pt-1">
                    <div className="text-sm text-white/60 leading-relaxed">
                      Nuestros productos están fabricados con materiales
                      premium. Para mantener su calidad:
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Evitar el contacto prolongado con el agua.</li>
                        <li>
                          Guardar en su funda original cuando no esté en uso.
                        </li>
                        <li>Limpiar con un paño suave y seco.</li>
                        <li>No exponer a fuentes de calor directo.</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
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
              <span className="text-3xl font-semibold text-primary tracking-tight mt-2 flex items-center gap-4">
                {selectedVariant?.compare_at_price && parseFloat(selectedVariant.compare_at_price) > parseFloat(selectedVariant.price) && (
                  <span className="text-lg font-normal text-white/40 line-through">
                    {formatPrice(selectedVariant.compare_at_price)}
                  </span>
                )}
                {selectedVariant ? formatPrice(selectedVariant.price) : ""}
              </span>

              {/* Thumbnails below price */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pt-6 pb-2">
                  {images.slice(0, 7).map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImg(i)}
                      aria-label={`Ver foto ${i + 1}`}
                      className={`shrink-0 border transition-all duration-200 overflow-hidden flex items-center justify-center ${
                        i === selectedImg
                          ? "border-primary"
                          : "border-primary/15 hover:border-primary/40"
                      }`}
                      style={{
                        width: 64,
                        height: 64,
                        backgroundColor: "rgba(10, 10, 14, 0.95)",
                      }}
                    >
                      <Image
                        src={img}
                        alt={`Miniatura ${i + 1}`}
                        width={56}
                        height={56}
                        className="object-contain p-1.5"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="h-px bg-primary/10" />

            {/* Description */}
            {product.description?.es && (
              <div
                className="text-lg font-light text-white/70 leading-relaxed prose prose-invert prose-sm max-w-none"
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
            <div className="pt-3 space-y-8">
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

              {/* Trust Icons Grid */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-primary/10">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/5 text-primary">
                    <Truck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-white/60 leading-tight">
                    Envío a todo
                    <br />
                    el país
                  </span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/5 text-primary">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-white/60 leading-tight">
                    Compra
                    <br />
                    segura
                  </span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/5 text-primary">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-white/60 leading-tight">
                    Cambios y<br />
                    devoluciones
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="relative z-10 bg-black/20 border-t border-primary/5">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-end justify-between mb-10"
            >
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-primary/60 mb-3">
                  Recomendados para vos
                </p>
                <h2 className="font-serif text-3xl xl:text-4xl font-light text-foreground">
                  También te puede interesar
                </h2>
              </div>
              <Link
                href="/products"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:text-white transition-colors pb-1 border-b border-primary/30"
              >
                Ver todo el catálogo
              </Link>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <RelatedCard key={p.id} product={p} idx={i} />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

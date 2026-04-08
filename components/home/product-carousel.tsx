"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { Section, SectionHeader } from "@/components/layout";
import { fadeInUp, luxuryTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { getProducts, TiendaNubeProduct } from "@/lib/tiendanube";

// Sample products - in production this would come from an API/database
const products = [
  {
    id: "1",
    name: "Bolso Louis Vuitton Multi Pochette",
    brand: "Louis Vuitton",
    price: "$1,850",
    image: "/images/louis-vuitton-bag-accessories.webp",
    href: "#",
    badge: "new",
  },
  {
    id: "2",
    name: "Set de Accesorios Louis Vuitton",
    brand: "Louis Vuitton",
    price: "$2,100",
    image: "/images/louis-vuitton-gift-set.webp",
    href: "#",
    badge: "limited",
  },
  {
    id: "3",
    name: "Cinturón Diesel con Cristales",
    brand: "Diesel",
    price: "$420",
    image: "/images/diesel-belt-detail.webp",
    href: "#",
  },
  {
    id: "4",
    name: "Bolso Duffle Gucci Ophidia",
    brand: "Gucci",
    price: "$2,890",
    image: "/images/gucci-duffle-bag.webp",
    href: "#",
    badge: "new",
  },
  {
    id: "5",
    name: "Bolso Crossbody Gucci",
    brand: "Gucci",
    price: "$1,650",
    image: "/images/gucci-crossbody-bag.webp",
    href: "#",
  },
  {
    id: "6",
    name: "Colección Premium Multi-Marca",
    brand: "Varios",
    price: "$3,500",
    image: "/images/luxury-brands-flatlay.webp",
    href: "#",
    badge: "limited",
  },
];

interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  href: string;
  badge?: string;
}

export function ProductCarousel() {
  const { t, locale } = useTranslation();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isInView = useInView(carouselRef, { once: true, amount: 0.2 });
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 420; // approximate width including gap

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const tiendaProducts: TiendaNubeProduct[] = await getProducts({
          published: true,
          per_page: 7,
        });
        const mappedProducts: Product[] = tiendaProducts.map((product) => ({
          id: product.id.toString(),
          name: product.name.es,
          brand: product.brand || "Felton",
          price: product.variants[0]?.price ? `$${product.variants[0].price}` : "Precio no disponible",
          image: product.images[0]?.src || "/images/placeholder.webp",
          href: `/collections`,
        }));
        setFetchedProducts(mappedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback to sample products
        setFetchedProducts(products);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const displayProducts = fetchedProducts.length > 0 ? fetchedProducts.slice(0, 7) : products.slice(0, 7);
  const infiniteProducts = [...displayProducts, ...displayProducts];

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const handleScroll = () => {
        checkScroll();
        // For infinite scroll effect
        const { scrollLeft, scrollWidth, clientWidth } = carousel;
        const itemWidth = 400; // approximate
        const totalItems = displayProducts.length * 2;
        const halfwayPoint = (totalItems / 2) * itemWidth;

        if (scrollLeft >= halfwayPoint) {
          carousel.scrollLeft = scrollLeft - halfwayPoint;
        } else if (scrollLeft <= 0) {
          carousel.scrollLeft = halfwayPoint;
        }
      };

      carousel.addEventListener("scroll", handleScroll);
      return () => carousel.removeEventListener("scroll", handleScroll);
    }
  }, [displayProducts]);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % infiniteProducts.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + infiniteProducts.length) % infiniteProducts.length);
  };

  // For infinite effect, reset when reaching duplicate
  useEffect(() => {
    if (currentIndex >= displayProducts.length) {
      setTimeout(() => setCurrentIndex(currentIndex - displayProducts.length), 300);
    } else if (currentIndex < 0) {
      setTimeout(() => setCurrentIndex(currentIndex + displayProducts.length), 300);
    }
  }, [currentIndex, displayProducts.length]);

  const getBadgeText = (badge: string) => {
    if (badge === "new") return t("products.new");
    if (badge === "limited") return t("products.limited");
    return badge;
  };

  return (
    <Section variant="dark" size="large" className="relative">
      {/* Gradient transition from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 gradient-transition-top pointer-events-none z-10" />
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
        <SectionHeader
          eyebrow={t("products.eyebrow")}
          title={t("products.title")}
          description={t("products.description")}
          align="left"
          className="lg:max-w-xl"
        />

        {/* Navigation arrows - desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={prev}
            className="flex items-center justify-center w-12 h-12 border-2 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            aria-label={locale === "es" ? "Anterior" : "Previous"}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="flex items-center justify-center w-12 h-12 border-2 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            aria-label={locale === "es" ? "Siguiente" : "Next"}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <motion.div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {loading ? (
          // Loading skeleton
          Array.from({ length: 7 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.05 }}
              className="shrink-0 w-[400px] md:w-[500px] snap-start"
            >
              <div className="block">
                <div className="relative aspect-square overflow-hidden bg-secondary/30 border-2 border-border/30 animate-pulse">
                  <div className="w-full h-full bg-muted" />
                </div>
                <div className="mt-4 space-y-1">
                  <div className="h-3 bg-muted animate-pulse rounded" />
                  <div className="h-4 bg-muted animate-pulse rounded" />
                  <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          displayProducts.map((product, index) => (
            <motion.div
              key={`${product.id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.05 }}
              className="shrink-0 w-[400px] md:w-[500px] snap-start"
            >
              <Link href={product.href} className="group block">
                {/* Image */}
                <motion.div
                  className="relative aspect-square overflow-hidden bg-secondary/30 border-2 border-border/30 transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-[0_0_30px_rgba(184,147,89,0.3)]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4">
                      <span
                        className={cn(
                          "px-3 py-1 text-xs font-medium uppercase tracking-wider",
                          product.badge === "new"
                            ? "bg-primary text-primary-foreground"
                            : "bg-foreground text-background",
                        )}
                      >
                        {getBadgeText(product.badge)}
                      </span>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="flex items-center gap-2 text-sm font-medium text-primary">
                      {t("products.viewProduct")}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </motion.div>

                {/* Info */}
                <div className="mt-4 space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-primary/60">
                    {product.brand}
                  </p>
                  <h3 className="font-serif text-lg font-light text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground">
                    {product.price}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Mobile navigation */}
      <div className="flex lg:hidden items-center justify-center gap-3 mt-6">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={cn(
            "flex items-center justify-center w-10 h-10 border-2 transition-all",
            canScrollLeft
              ? "border-primary/50 text-primary"
              : "border-border/30 text-muted-foreground/30",
          )}
          aria-label={locale === "es" ? "Anterior" : "Previous"}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={cn(
            "flex items-center justify-center w-10 h-10 border-2 transition-all",
            canScrollRight
              ? "border-primary/50 text-primary"
              : "border-border/30 text-muted-foreground/30",
          )}
          aria-label={locale === "es" ? "Siguiente" : "Next"}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* View All CTA */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <Link
          href="/collections"
          className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide text-primary transition-all hover:gap-3"
        >
          {t("collections.viewAll")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>

      {/* Gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 gradient-transition pointer-events-none z-10" />
    </Section>
  );
}

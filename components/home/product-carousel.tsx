"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { Section, SectionHeader } from "@/components/layout";
import { fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { getProducts, TiendaNubeProduct } from "@/lib/tiendanube";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  const { t } = useTranslation();
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(carouselContainerRef, { once: true, amount: 0.2 });
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const tiendaProducts: TiendaNubeProduct[] = await getProducts({
          published: true,
          per_page: 10,
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
        setFetchedProducts(products);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const displayProducts = fetchedProducts.length > 0 ? fetchedProducts : products;

  const getBadgeText = (badge: string) => {
    if (badge === "new") return t("products.new");
    if (badge === "limited") return t("products.limited");
    return badge;
  };

  return (
    <Section variant="dark" size="large" className="relative" ref={carouselContainerRef}>
      {/* Gradient transition from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 gradient-transition-top pointer-events-none z-10" />

      <Carousel
        opts={{
          align: "start",
          loop: true,
          skipSnaps: false,
          dragFree: false,
        }}
        className="w-full"
      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow={t("products.eyebrow")}
            title={t("products.title")}
            description={t("products.description")}
            align="left"
            className="lg:max-w-xl"
          />

          {/* Navigation arrows - desktop */}
          <div className="hidden lg:flex items-center gap-3 relative mr-12">
            <CarouselPrevious className="static translate-y-0 h-12 w-12 border-2 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all rounded-none" />
            <CarouselNext className="static translate-y-0 h-12 w-12 border-2 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all rounded-none" />
          </div>
        </div>

        <CarouselContent className="-ml-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <CarouselItem key={index} className="pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="relative aspect-square overflow-hidden bg-secondary/30 border-2 border-border/30 animate-pulse">
                  <div className="w-full h-full bg-muted" />
                </div>
                <div className="mt-4 space-y-1">
                  <div className="h-3 bg-muted animate-pulse rounded" />
                  <div className="h-4 bg-muted animate-pulse rounded" />
                  <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
                </div>
              </CarouselItem>
            ))
          ) : (
            displayProducts.map((product, index) => (
              <CarouselItem
                key={`${product.id}-${index}`}
                className="pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1], delay: index * 0.05 }}
                  className="h-full"
                >
                  <Link href={product.href} className="group block h-full">
                    {/* Image */}
                    <div
                      className="relative aspect-square overflow-hidden bg-secondary/30 border-2 border-border/30 transition-all duration-700 group-hover:border-primary/40 group-hover:shadow-[0_0_40px_rgba(184,147,89,0.25)]"
                      style={{ willChange: "transform, border-color, box-shadow" }}
                    >
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-1000 cubic-bezier(0.19, 1, 0.22, 1) group-hover:scale-110"
                      />

                      {/* Badge */}
                      {product.badge && (
                        <div className="absolute top-4 left-4 z-20">
                          <span
                            className={cn(
                              "px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]",
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
                      <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10">
                        <span className="flex items-center gap-2 text-sm font-medium text-primary transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 luxury-text-shadow">
                          {t("products.viewProduct")}
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="mt-6 space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/70">
                        {product.brand}
                      </p>
                      <h3 className="font-serif text-xl font-light text-foreground group-hover:text-primary transition-colors duration-500 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-sm font-medium text-muted-foreground/80 tracking-tighter">
                        {product.price}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>

        {/* Mobile controls integrated into Carousel component normally, 
            but we can add a mobile-only indicator or buttons if needed. 
            Standard Embla handling is usually enough. */}
      </Carousel>

      {/* View All CTA */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <Link
          href="/collections"
          className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-primary transition-all hover:gap-5"
        >
          <span className="relative">
            {t("collections.viewAll")}
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-primary transition-all duration-500 group-hover:w-full" />
          </span>
          <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
        </Link>
      </motion.div>

      {/* Gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 gradient-transition pointer-events-none z-10" />
    </Section>
  );
}


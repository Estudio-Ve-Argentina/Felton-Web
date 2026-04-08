"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { fadeInUp, staggerContainer, luxuryTransition } from "@/lib/animations";

const featuredBrands = [
  {
    name: "Louis Vuitton",
    logo: "/brands/Louis_Vuitton_LV_logo.png",
    description: "Iconos de lujo francés desde 1854",
    href: "/brands/louis-vuitton",
    width: 100,
    height: 100,
  },
  {
    name: "Gucci",
    logo: "/brands/Gucci_logo.svg",
    description: "Artesanía italiana y diseño vanguardista",
    href: "/brands/gucci",
    width: 140,
    height: 60,
  },
  {
    name: "Prada",
    logo: "/brands/Prada-Logo.svg",
    description: "Elegancia minimalista desde Milán",
    href: "/brands/prada",
    width: 140,
    height: 50,
  },
];

export function FeaturedBrandsSection() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full overflow-hidden py-20 lg:py-28">
      {/* Gradient transition from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 gradient-transition-top pointer-events-none" />

      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-secondary/10 to-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.p
            variants={fadeInUp}
            className="text-xs font-medium uppercase tracking-widest text-primary/60 mb-4"
          >
            {t("featured.eyebrow")}
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="font-serif text-4xl font-light tracking-tight text-foreground lg:text-5xl"
          >
            {t("featured.title")}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground lg:text-base"
          >
            {t("featured.description")}
          </motion.p>
        </motion.div>

        {/* Featured Brand Cards */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid gap-8 md:grid-cols-3 lg:gap-10"
        >
          {featuredBrands.map((brand, index) => (
            <motion.div
              key={brand.name}
              variants={fadeInUp}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: index * 0.15,
              }}
            >
              <Link href={brand.href} className="group relative block h-full">
                <div className="relative h-full border-2 border-border/30 bg-secondary/20 p-8 transition-all duration-500 hover:border-primary/60 hover:bg-secondary/40 lg:p-10">
                  {/* Decorative corners */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/0 transition-all duration-500 group-hover:border-primary/60 group-hover:w-12 group-hover:h-12" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/0 transition-all duration-500 group-hover:border-primary/60 group-hover:w-12 group-hover:h-12" />

                  {/* Logo */}
                  <div className="flex items-center justify-center h-32 mb-6">
                    <div className="relative transition-all duration-500 group-hover:scale-110">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={brand.width}
                        height={brand.height}
                        className="object-contain opacity-80 transition-opacity duration-500 group-hover:opacity-100 filter grayscale group-hover:grayscale-0"
                        style={{ maxHeight: "100px", width: "auto" }}
                      />
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-primary/20" />
                    </div>
                  </div>

                  {/* Brand Name */}
                  <h3 className="font-serif text-2xl font-light text-center text-foreground mb-3 transition-colors duration-500 group-hover:text-primary">
                    {brand.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm font-light text-center text-muted-foreground leading-relaxed mb-6">
                    {brand.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary/60 transition-all duration-500 group-hover:text-primary group-hover:gap-3">
                    {t("featured.explore")}
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </div>

                  {/* Hover overlay with golden glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(184,147,89,0.1)]" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 gradient-transition pointer-events-none" />
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Lock, HelpCircle, Bell } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { Section, SectionHeader } from "@/components/layout";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function CollectionsPreview() {
  const { t } = useTranslation();

  const unlockedCollection = {
    id: "everyday",
    subtitle: t("collections.everyday.subtitle"),
    title: t("collections.everyday.title"),
    description: t("collections.everyday.description"),
    href: "/collections/everyday",
  };

  const lockedCollections = [
    {
      id: "travel",
      subtitle: t("collections.travel.subtitle"),
      title: t("collections.travel.title"),
    },
    {
      id: "protection",
      subtitle: t("collections.protection.subtitle"),
      title: t("collections.protection.title"),
    },
    {
      id: "editions",
      subtitle: t("collections.editions.subtitle"),
      title: t("collections.editions.title"),
    },
  ];

  return (
    <Section variant="dark" size="large" className="relative">
      {/* Gradient transition from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 gradient-transition-top pointer-events-none z-10" />

      {/* Improved Section Header */}
      <div className="text-center mb-16 lg:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-3 mb-6"
        >
          <span className="h-px w-8 bg-primary/50" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/80">
            {t("collections.eyebrow")}
          </span>
          <span className="h-px w-8 bg-primary/50" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="font-serif text-4xl font-light tracking-tight text-foreground lg:text-5xl xl:text-6xl"
        >
          {t("collections.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-5 max-w-xl mx-auto text-sm font-light leading-relaxed text-muted-foreground"
        >
          {t("collections.description")}
        </motion.p>
      </div>

      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="space-y-5"
      >
        {/* --- UNLOCKED COLLECTION --- */}
        <motion.div
          variants={fadeInUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Link
              href={unlockedCollection.href}
              className="group relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 overflow-hidden border border-primary/20 bg-secondary/20 p-8 lg:p-10 transition-all hover:bg-secondary/40 hover:border-primary/40"
            >
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary/40 transition-all duration-500 group-hover:border-primary/80 group-hover:w-14 group-hover:h-14" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-primary/40 transition-all duration-500 group-hover:border-primary/80 group-hover:w-14 group-hover:h-14" />

              {/* Number */}
              <span className="absolute top-6 right-8 font-serif text-6xl font-light text-primary/10 transition-colors group-hover:text-primary/25 select-none">
                01
              </span>

              <div className="relative flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-2">
                  {unlockedCollection.subtitle}
                </p>
                <h3 className="font-serif text-2xl lg:text-3xl font-light tracking-tight text-foreground mb-3">
                  {unlockedCollection.title}
                </h3>
                <p className="max-w-lg text-sm font-light leading-relaxed text-muted-foreground">
                  {unlockedCollection.description}
                </p>
              </div>

              <div className="relative shrink-0 inline-flex items-center gap-2 text-sm font-medium text-primary transition-all group-hover:gap-3 border border-primary/30 px-5 py-3 group-hover:bg-primary/10">
                {t("collections.explore")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </motion.div>
        </motion.div>

        {/* --- LOCKED COLLECTIONS GRID --- */}
        <div className="grid gap-4 md:grid-cols-3">
          {lockedCollections.map((col, index) => (
            <motion.div
              key={col.id}
              variants={fadeInUp}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.1 * (index + 1),
              }}
              className="group relative overflow-hidden border border-border/20 bg-secondary/10 p-8 cursor-not-allowed select-none"
            >
              {/* Dark blur overlay */}
              <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-10" />

              {/* Locked icon */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-3">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full border border-border/40 bg-secondary/60 flex items-center justify-center">
                    {index === 1 ? (
                      <HelpCircle className="h-6 w-6 text-muted-foreground/60" />
                    ) : (
                      <Lock className="h-6 w-6 text-muted-foreground/60" />
                    )}
                  </div>
                </div>
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground/50">
                  {t("collections.comingSoon")}
                </span>
              </div>

              {/* Blurred-out background content */}
              <div className="relative opacity-30">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary/60 mb-2">
                  {col.subtitle}
                </p>
                <h3 className="font-serif text-xl lg:text-2xl font-light tracking-tight text-foreground mb-3">
                  {col.title}
                </h3>
                <p className="text-sm font-light text-muted-foreground">
                  ████ ████ ████████ ██ ██████ ██████ ████ ██ ██ ███████
                </p>
              </div>

              {/* Index number */}
              <span className="absolute top-5 right-6 font-serif text-5xl font-light text-foreground/5 select-none">
                {String(index + 2).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Coming soon notice */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="mt-10 flex items-center justify-center gap-2 text-xs font-light tracking-wide text-muted-foreground/60"
      >
        <Bell className="h-3.5 w-3.5" />
        <span>{t("collections.comingSoonNotice")}</span>
      </motion.div>

      {/* Gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 gradient-transition pointer-events-none z-10" />
    </Section>
  );
}

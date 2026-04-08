"use client";

import Link from "next/link";
import { ArrowRight, Lock, HelpCircle, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { Header, Footer, Section } from "@/components/layout";
import { useTranslation } from "@/lib/i18n";

const unlockedCollection = {
  id: "everyday",
  products: [
    { name: "Classic Sleeve", price: "€89" },
    { name: "Executive Folio", price: "€149" },
    { name: "Minimalist Wallet", price: "€69" },
  ],
};

const lockedCollectionIds = ["travel", "protection", "editions"];

export default function CollectionsPage() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* ── Hero / Header ─────────────────────────────── */}
        <Section
          size="large"
          variant="textured"
          className="relative text-center"
        >
          <div className="absolute inset-0 bg-background/90" />
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <span className="h-px w-8 bg-primary/50" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/80">
                {t("collections.eyebrow")}
              </span>
              <span className="h-px w-8 bg-primary/50" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-serif text-4xl font-light tracking-tight text-foreground lg:text-5xl xl:text-6xl"
            >
              {t("collections.title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="mt-5 max-w-xl mx-auto text-sm font-light leading-relaxed text-muted-foreground"
            >
              {t("collections.description")}
            </motion.p>
          </div>
        </Section>

        {/* ── Collections ───────────────────────────────── */}
        <Section size="large" className="space-y-6">
          {/* Unlocked collection */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <motion.div
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={`/collections/${unlockedCollection.id}`}
                className="group relative grid lg:grid-cols-2 gap-0 overflow-hidden border border-primary/25 bg-secondary/15 transition-all hover:bg-secondary/30 hover:border-primary/45"
              >
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary/35 transition-all duration-500 group-hover:border-primary/80 group-hover:w-14 group-hover:h-14 z-10" />
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-primary/35 transition-all duration-500 group-hover:border-primary/80 group-hover:w-14 group-hover:h-14 z-10" />

                {/* Index number */}
                <span className="absolute top-6 right-8 font-serif text-7xl font-light text-primary/8 group-hover:text-primary/20 transition-colors select-none">
                  01
                </span>

                {/* Left: content */}
                <div className="relative p-10 lg:p-14 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-2">
                      {t("collections.everyday.subtitle")}
                    </p>
                    <h2 className="font-serif text-3xl lg:text-4xl font-light tracking-tight text-foreground mb-4">
                      {t("collections.everyday.title")}
                    </h2>
                    <p className="text-sm font-light leading-relaxed text-muted-foreground max-w-md">
                      {t("collections.everyday.description")}
                    </p>
                  </div>

                  <div className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-primary border border-primary/30 px-5 py-3 self-start transition-all group-hover:gap-3 group-hover:bg-primary/10">
                    {t("collections.explore")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Right: products */}
                <div className="relative border-t lg:border-t-0 lg:border-l border-border/20 p-10 lg:p-14 bg-card/20">
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60 mb-8">
                    {t("products.eyebrow")}
                  </p>
                  <div className="space-y-5">
                    {unlockedCollection.products.map((product) => (
                      <div
                        key={product.name}
                        className="group/item flex items-center justify-between border-b border-border/20 pb-5 last:border-0 last:pb-0"
                      >
                        <span className="text-sm font-light text-foreground group-hover/item:text-primary transition-colors">
                          {product.name}
                        </span>
                        <span className="text-sm font-light text-muted-foreground">
                          {product.price}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-border/20">
                    <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-primary/70 transition-colors group-hover:text-primary">
                      {t("collections.viewAll")}
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Locked collections grid */}
          <div className="grid gap-5 md:grid-cols-3">
            {lockedCollectionIds.map((id, index) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 * (index + 1) }}
                className="group relative overflow-hidden border border-border/20 bg-secondary/10 p-10 min-h-[260px] cursor-not-allowed select-none"
              >
                {/* Blur overlay */}
                <div className="absolute inset-0 bg-background/65 backdrop-blur-[3px] z-10" />

                {/* Lock icon */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-3">
                  <div className="w-14 h-14 rounded-full border border-border/40 bg-secondary/60 flex items-center justify-center">
                    {index === 1 ? (
                      <HelpCircle className="h-6 w-6 text-muted-foreground/50" />
                    ) : (
                      <Lock className="h-6 w-6 text-muted-foreground/50" />
                    )}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50">
                    {t("collections.comingSoon")}
                  </span>
                </div>

                {/* Blurred background content */}
                <div className="relative opacity-25">
                  <span className="font-serif text-5xl font-light text-primary/15 select-none">
                    {String(index + 2).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-primary/60">
                    {t(`collections.${id}.subtitle`)}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-light text-foreground">
                    {t(`collections.${id}.title`)}
                  </h3>
                  <p className="mt-3 text-sm font-light text-muted-foreground line-clamp-2">
                    {t(`collections.${id}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Coming soon notice */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-2 py-2 text-xs font-light tracking-wide text-muted-foreground/55"
          >
            <Bell className="h-3.5 w-3.5" />
            <span>{t("collections.comingSoonNotice")}</span>
          </motion.div>
        </Section>

        {/* ── CTA ───────────────────────────────────────── */}
        <Section
          variant="dark"
          size="default"
          className="border-t border-border/20"
        >
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-4">
              {t("contact.title")}
            </p>
            <h3 className="font-serif text-2xl font-light tracking-tight text-foreground lg:text-3xl">
              {t("collections.description")}
            </h3>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <Link
                href="/guides"
                className="group inline-flex items-center gap-2 border border-primary bg-primary px-8 py-3 text-sm font-medium tracking-wide text-primary-foreground transition-all hover:bg-primary/90"
              >
                {t("nav.guides")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/comparisons"
                className="inline-flex items-center gap-2 border border-border px-8 py-3 text-sm font-medium tracking-wide text-foreground transition-all hover:border-primary hover:text-primary"
              >
                {t("nav.comparisons")}
              </Link>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

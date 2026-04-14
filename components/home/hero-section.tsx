"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { FeltonLogo } from "@/components/shared";

export function HeroSection() {
  const { t } = useTranslation();

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* ── Video background ────────────────────────── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover blur-[2px] scale-105"
        src="/brands/20260202_1643_01kgfxzrykej39g94ehkk73kw2.mp4"
      />

      {/* Neutral overlay for immersive feel */}
      <div className="absolute inset-0 bg-[#0a0a0c]/70" />
      {/* Top gradient so header items stay readable */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-black/50 to-transparent pointer-events-none" />
      {/* Bottom vignette — blends into the dark product section below */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
        style={{
          height: "75%",
          background:
            "linear-gradient(to top, #0D0D10 0%, #0D0D10 12%, rgba(13,13,16,0.97) 22%, rgba(13,13,16,0.85) 35%, rgba(13,13,16,0.60) 50%, rgba(13,13,16,0.30) 65%, rgba(13,13,16,0.10) 80%, transparent 100%)",
        } as React.CSSProperties}
      />

      {/* ── Centred stack ────────────────────────────── */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 gap-7">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <FeltonLogo
            textClassName="text-[15vw] sm:text-[12vw] lg:text-[10vw]"
            lineClassName="h-[2px]"
          />
        </motion.div>

        {/* Slogan — italic serif */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: "easeOut", delay: 0.35 }}
          className="font-serif italic text-white/60 text-base sm:text-lg lg:text-xl tracking-wide max-w-4xl"
        >
          {t("hero.description")}
        </motion.p>

        {/* Single CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        >
          <Link
            href="/products"
            className="group relative inline-flex items-center gap-3 bg-primary px-12 py-4 text-sm font-semibold tracking-[0.2em] uppercase text-black overflow-hidden transition-all duration-300 hover:scale-105"
            style={{ boxShadow: "0 0 40px rgba(212,175,55,0.5), 0 0 80px rgba(212,175,55,0.2)" }}
          >
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative">{t("hero.cta.primary")}</span>
            <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

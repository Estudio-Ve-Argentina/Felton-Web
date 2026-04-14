"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";

const TIMER_MS = 6000;

const testimonials = [
  {
    id: "1",
    image: "/Customers/Testimonio 1.jpeg",
    quote: "Muy buena calidad. Gracias por sus buenos precios.",
    quoteEn: "Very good quality. Thank you for your great prices.",
    highlight: "Muy buena calidad",
    highlightEn: "Very good quality",
    author: "Martin R.",
    authorEn: "Martin R.",
    product: "Buenos Aires",
    rating: 5,
  },
  {
    id: "2",
    image: "/Customers/Testimonio 2.jpeg",
    quote: "Me encanta su atención al cliente.",
    quoteEn: "I love their customer service.",
    highlight: "Atención al cliente",
    highlightEn: "Customer service",
    author: "Sofia L.",
    authorEn: "Sofia L.",
    product: "Cordoba",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const { t, locale } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [timerKey, setTimerKey] = useState(0);

  const advance = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
    setTimerKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const id = setTimeout(advance, TIMER_MS);
    return () => clearTimeout(id);
  }, [current, advance]);

  const goTo = (i: number) => {
    if (i === current) return;
    setCurrent(i);
    setTimerKey((k) => k + 1);
  };

  const item = testimonials[current];

  return (
    <section className="relative w-full overflow-hidden pt-32 lg:pt-40 pb-44 lg:pb-52">
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none z-20"
        style={{ background: "linear-gradient(to bottom, transparent 0%, var(--background) 100%)" }}
      />

      <div className="relative z-10 max-w-xl mx-auto px-6 lg:px-8 text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl" />
            <span className="relative text-xs tracking-[0.3em] text-primary uppercase font-semibold px-6 py-2 border border-primary/30 bg-black/50 backdrop-blur-sm inline-block">
              {t("testimonials.eyebrow")}
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-serif text-4xl md:text-5xl font-light text-white mb-14 leading-tight"
        >
          {t("testimonials.title")}
        </motion.h2>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <>
                {/* Phone screenshot frame */}
                <div className="relative w-[220px] sm:w-[260px]">
                  {/* Glow detrás */}
                  <div
                    className="absolute -inset-3 rounded-3xl opacity-20 blur-xl pointer-events-none"
                    style={{ background: "radial-gradient(ellipse, oklch(0.72 0.12 85) 0%, transparent 70%)" }}
                  />

                  {/* Frame */}
                  <div className="relative rounded-[22px] overflow-hidden border border-primary/35 shadow-2xl"
                    style={{ boxShadow: "0 0 0 1px rgba(212,175,55,0.15), 0 32px 64px rgba(0,0,0,0.6)" }}
                  >
                    {/* Notch top bar */}
                    <div className="flex items-center justify-center py-2 bg-black/80 border-b border-white/5">
                      <div className="w-16 h-1 rounded-full bg-white/20" />
                    </div>

                    {/* Screenshot — sin recorte, altura natural */}
                    <div className="relative w-full bg-black">
                      <Image
                        src={item.image!}
                        alt="Testimonio de cliente"
                        width={600}
                        height={800}
                        className="w-full h-auto block"
                      />
                    </div>

                    {/* Bottom bar */}
                    <div className="py-2 bg-black/80 border-t border-white/5" />
                  </div>
                </div>

                {/* Separator */}
                <div className="mt-8 mb-6 flex items-center gap-3 w-full max-w-[260px]">
                  <div className="flex-1 h-px bg-primary/20" />
                  <Star className="h-3 w-3 fill-primary text-primary flex-shrink-0" />
                  <div className="flex-1 h-px bg-primary/20" />
                </div>

                {/* Quote */}
                <p className="font-serif text-lg md:text-xl font-light italic text-white/80 leading-relaxed mb-5 max-w-xs">
                  &ldquo;{locale === "es" ? item.quote : item.quoteEn}&rdquo;
                </p>

                {/* Stars */}
                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                  ))}
                </div>

                {/* Author */}
                <p className="text-xs font-semibold text-white/55 tracking-[0.2em] uppercase">
                  {locale === "es" ? item.author : item.authorEn}
                </p>
                <p className="text-[10px] text-primary/45 tracking-[0.18em] uppercase mt-1">
                  {item.product}
                </p>
            </>
          </motion.div>
        </AnimatePresence>

        {/* Timer + dots */}
        <div className="mt-12 flex flex-col items-center gap-4">
          {/* Progress line */}
          <div className="relative w-48 h-px bg-white/10 overflow-hidden rounded-full">
            <motion.div
              key={timerKey}
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: "linear-gradient(90deg, oklch(0.72 0.12 85 / 0.5), oklch(0.85 0.10 85), oklch(0.72 0.12 85 / 0.5))",
              }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: TIMER_MS / 1000, ease: "linear" }}
            />
          </div>

          {/* Dots */}
          <div className="flex items-center gap-2.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Testimonio ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 h-1.5 bg-primary"
                    : "w-1.5 h-1.5 bg-primary/25 hover:bg-primary/50"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

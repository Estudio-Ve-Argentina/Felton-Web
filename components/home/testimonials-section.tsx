"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const TIMER_MS = 3600;

const testimonials = [
  {
    id: "1",
    quote: "Muy buena calidad. Gracias por sus buenos precios.",
    quoteEn: "Very good quality. Thank you for your great prices.",
    author: "Martin R.",
    role: "Buenos Aires",
    rating: 5,
  },
  {
    id: "2",
    quote: "Me encanta su atención al cliente.",
    quoteEn: "I love their customer service.",
    author: "Sofia L.",
    role: "Córdoba",
    rating: 5,
  },
  {
    id: "3",
    quote: "No es para cualquiera, y eso es lo que lo hace especial. Recomendado 100%.",
    quoteEn: "It's not for everyone, and that's what makes it special. 100% recommended.",
    author: "Diego M.",
    role: "Rosario",
    rating: 5,
  },
  {
    id: "4",
    quote: "La calidad supera con creces las expectativas. Felton entiende el lujo verdadero.",
    quoteEn: "The quality far exceeds expectations. Felton understands true luxury.",
    author: "Valentina P.",
    role: "Mendoza",
    rating: 5,
  },
  {
    id: "5",
    quote: "Encontré exactamente lo que buscaba. Atención impecable y productos de primera.",
    quoteEn: "I found exactly what I was looking for. Impeccable service and top-quality products.",
    author: "Lucas G.",
    role: "Salta",
    rating: 5,
  },
  {
    id: "6",
    quote: "Llegó rápido y en perfectas condiciones. Muy conforme con la compra.",
    quoteEn: "Arrived fast and in perfect condition. Very happy with the purchase.",
    author: "Camila F.",
    role: "La Plata",
    rating: 5,
  },
];

function TestimonialCard({ testimonial, locale }: { testimonial: typeof testimonials[0]; locale: string }) {
  return (
    <div className="group relative text-center">
      {/* Glow hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)" }}
      />

      {/* Border */}
      <div className="absolute inset-0 border border-primary/20 group-hover:border-primary/35 transition-colors duration-700" />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary/50" />
      <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-primary/50" />
      <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-primary/50" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary/50" />

      <div className="relative px-6 py-7 lg:px-8 lg:py-8">
        <div className="text-5xl leading-none text-primary/20 font-serif mb-1">"</div>

        <div className="flex justify-center gap-1 mb-4">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-primary text-primary" />
          ))}
        </div>

        <p className="font-serif text-sm font-light italic leading-relaxed text-white/80 mb-6">
          {locale === "es" ? testimonial.quote : testimonial.quoteEn}
        </p>

        <div className="flex items-center gap-3 mb-5 justify-center">
          <div className="flex-1 h-px bg-primary/20 max-w-[60px]" />
          <div className="w-1 h-1 bg-primary/60 rotate-45" />
          <div className="flex-1 h-px bg-primary/20 max-w-[60px]" />
        </div>

        <div>
          <p className="text-xs font-semibold text-white/90 tracking-[0.2em] uppercase">{testimonial.author}</p>
          <p className="text-[10px] text-primary/60 tracking-[0.25em] uppercase mt-1">{testimonial.role}</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
    </div>
  );
}

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
    <section className="relative w-full overflow-hidden pt-16 lg:pt-20 pb-24 lg:pb-28">
      <div
        className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none z-20"
        style={{ background: "linear-gradient(to bottom, transparent 0%, var(--background) 100%)" }}
      />

      <div className="relative z-10 max-w-md mx-auto px-6 lg:px-8">

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

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-serif text-4xl md:text-5xl font-light text-white mb-14 leading-tight text-center"
        >
          {t("testimonials.title")}
        </motion.h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <TestimonialCard testimonial={item} locale={locale} />
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex flex-col items-center gap-4">
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
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1 transition-all duration-300 ${i === current ? "w-6 bg-primary" : "w-2 bg-primary/30"}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";

const TIMER_MS = 3600;

const testimonials = [
  {
    id: "1",
    image: "/Customers/Testimonio 1.jpeg",
    quote: "Muy buena calidad. Gracias por sus buenos precios.",
    quoteEn: "Very good quality. Thank you for your great prices.",
    author: "Martin R.",
    role: "Buenos Aires",
    rating: 5,
  },
  {
    id: "2",
    image: "/Customers/Testimonio 2.jpeg",
    quote: "Me encanta su atención al cliente.",
    quoteEn: "I love their customer service.",
    author: "Sofia L.",
    role: "Cordoba",
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

      <div className="relative px-10 py-12 lg:px-16 lg:py-14">
        {/* Quote mark */}
        <div className="text-8xl leading-none text-primary/20 font-serif mb-2">"</div>

        {/* Stars */}
        <div className="flex justify-center gap-1 mb-8">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
          ))}
        </div>

        {/* Quote */}
        <p className="font-serif text-xl md:text-2xl font-light italic leading-relaxed text-white/80 mb-10">
          {locale === "es" ? testimonial.quote : testimonial.quoteEn}
        </p>

        {/* Diamond divider */}
        <div className="flex items-center gap-4 mb-8 justify-center">
          <div className="flex-1 h-px bg-primary/20 max-w-[80px]" />
          <div className="w-1.5 h-1.5 bg-primary/60 rotate-45" />
          <div className="flex-1 h-px bg-primary/20 max-w-[80px]" />
        </div>

        {/* Author */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/25 blur-md" />
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/40">
              <Image src={testimonial.image} alt={testimonial.author} fill className="object-cover" />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-white/90 tracking-[0.2em] uppercase">{testimonial.author}</p>
            <p className="text-xs text-primary/60 tracking-[0.25em] uppercase mt-1">{testimonial.role}</p>
          </div>
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
    <section className="relative w-full overflow-hidden pt-32 lg:pt-40 pb-44 lg:pb-52">
      <div
        className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none z-20"
        style={{ background: "linear-gradient(to bottom, transparent 0%, var(--background) 100%)" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8">

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

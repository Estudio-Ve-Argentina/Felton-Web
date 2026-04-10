"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const testimonials = [
  {
    id: "1",
    content:
      "La calidad supera con creces las expectativas. Felton entiende lo que significa el lujo verdadero.",
    contentEn:
      "The quality far exceeds expectations. Felton understands what true luxury means.",
    author: "Martin R.",
    role: "Buenos Aires",
    rating: 5,
  },
  {
    id: "2",
    content:
      "Encontre exactamente lo que buscaba. Atencion impecable y productos de primera.",
    contentEn:
      "I found exactly what I was looking for. Impeccable service and top-quality products.",
    author: "Sofia L.",
    role: "Cordoba",
    rating: 5,
  },
  {
    id: "3",
    content:
      "No es para cualquiera, y eso es lo que lo hace especial. Recomendado 100%.",
    contentEn:
      "It's not for everyone, and that's what makes it special. 100% recommended.",
    author: "Diego M.",
    role: "Rosario",
    rating: 5,
  },
];

function TestimonialCard({ testimonial, index, locale }: { testimonial: typeof testimonials[0]; index: number; locale: string }) {
  return (
    <motion.div
      key={testimonial.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className="group relative"
    >
      <div className="absolute inset-0 border border-primary/20 group-hover:border-primary/35 transition-colors duration-700" />
      <div className="absolute inset-0 bg-white/[0.02] group-hover:bg-white/[0.04] transition-colors duration-700" />

      <div className="relative p-8 lg:p-10">
        <div className="text-6xl leading-none text-primary/25 font-serif mb-4 -ml-1">"</div>

        <div className="flex gap-1 mb-6">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
          ))}
        </div>

        <p className="font-serif text-lg font-light italic leading-relaxed text-white/75 mb-8">
          {locale === "es" ? testimonial.content : testimonial.contentEn}
        </p>

        <div className="pt-6 border-t border-primary/15">
          <p className="text-sm font-medium text-white/80 tracking-wide">{testimonial.author}</p>
          <p className="text-xs text-primary/50 tracking-[0.2em] uppercase mt-1">{testimonial.role}</p>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 + index * 0.12 }}
          className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent origin-left"
        />
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const { t, locale } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const check = () => setIsNarrow(window.innerWidth < 910);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="relative w-full overflow-hidden pt-32 lg:pt-40 pb-44 lg:pb-52">
      <div className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none z-20"
        style={{ background: "linear-gradient(to bottom, transparent 0%, var(--background) 100%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl font-light text-white mb-6 leading-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="block"
            >
              {t("testimonials.title")}
            </motion.span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg lg:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed"
          >
            {t("testimonials.description")}
          </motion.p>
        </motion.div>

        {/* Carousel (< 910px) */}
        {isNarrow ? (
          <div>
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35 }}
                >
                  <TestimonialCard testimonial={testimonials[current]} index={0} locale={locale} />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex items-center justify-center gap-6 mt-8">
              <button onClick={prev} className="p-2 border border-primary/30 text-primary/70 hover:border-primary hover:text-primary transition-colors">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1 transition-all duration-300 ${i === current ? "w-6 bg-primary" : "w-2 bg-primary/30"}`}
                  />
                ))}
              </div>
              <button onClick={next} className="p-2 border border-primary/30 text-primary/70 hover:border-primary hover:text-primary transition-colors">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-10 lg:gap-14">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

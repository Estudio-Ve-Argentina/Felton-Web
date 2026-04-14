"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

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

function TestimonialCard({ testimonial, index, locale }: { testimonial: typeof testimonials[0]; index: number; locale: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative text-center"
    >
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
    </motion.div>
  );
}

export function TestimonialsSection() {
  const { t, locale } = useTranslation();

  return (
    <section className="relative w-full overflow-hidden pt-16 lg:pt-20 pb-20 lg:pb-24">
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-20"
        style={{ background: "linear-gradient(to bottom, transparent 0%, var(--background) 100%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl font-light text-white mb-12 leading-tight text-center"
        >
          {t("testimonials.title")}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} locale={locale} />
          ))}
        </div>

      </div>
    </section>
  );
}

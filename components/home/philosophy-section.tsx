"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, TrendingUp } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: Sparkles,
    label: "Primera Calidad",
    description: "Importados directamente, seleccionados a mano.",
  },
  {
    icon: TrendingUp,
    label: "Marcas Elite",
    description: "Del top 1% del mercado mundial de accesorios.",
  },
  {
    icon: Zap,
    label: "Exclusividad",
    description: "Una experiencia premium que no está al alcance de todos.",
  },
];

export function PhilosophySection() {
  return (
    <section className="relative w-full overflow-hidden py-24 lg:py-36 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-xs tracking-[0.4em] text-primary/70 uppercase mb-6">
              Por qué nos eligen
            </p>

            <h2 className="font-serif text-4xl md:text-5xl font-light text-white leading-tight mb-6">
              No vendemos productos.
              <br />
              <span className="bg-linear-to-r from-primary via-yellow-300 to-primary bg-clip-text text-transparent">
                Curamos experiencias.
              </span>
            </h2>

            <p className="text-base text-white/50 leading-relaxed max-w-md mb-14">
              Para quienes reconocen la diferencia entre lo común y lo
              extraordinario. Artistas, creadores, visionarios.
            </p>

            {/* Feature list */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.12 }}
                  className="group flex items-start gap-5 border border-primary/15 p-5 hover:border-primary/35 transition-colors duration-400"
                >
                  <div className="mt-1 flex-shrink-0 w-11 h-11 flex items-center justify-center border border-primary/30 bg-primary/8 group-hover:bg-primary/15 transition-colors duration-400">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white tracking-wide mb-1">
                      {feature.label}
                    </p>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Divider quote */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-14 pt-10 border-t border-primary/15"
            >
              <p className="text-sm text-white/40 italic leading-relaxed">
                "Cada pieza pasa por un proceso de selección exhaustivo.
                <br />
                <span className="text-primary/80 not-italic font-medium">
                  Solo lo mejor llega a nuestros clientes.
                </span>
                "
              </p>
            </motion.div>
          </motion.div>

          {/* Right — image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative">
              <Image
                src="/about/43.jpg"
                alt="Felton — selección premium"
                width={800}
                height={1067}
                className="w-full h-auto"
              />
              {/* Subtle gold overlay at bottom */}
              <div className="absolute inset-0 bg-linear-to-t from-background/50 via-transparent to-transparent" />
            </div>

            {/* Gold accent line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute -left-3 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-primary to-transparent origin-top"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Header, Footer, Section, SectionHeader } from "@/components/layout";
import { useI18n } from "@/lib/i18n";
import { fadeIn, staggerContainer } from "@/lib/animations";

const values = {
  es: [
    {
      title: "Excelencia Discreta",
      description:
        "Cada pieza Felton es una importación seleccionada. Replicamos al detalle los estándares de las casas de lujo más reconocidas del mundo—Gucci, Louis Vuitton, Balenciaga—con acabados impecables y una presencia que no necesita presentación. La calidad se siente antes de que alguien pregunte la marca.",
    },
    {
      title: "Atemporal a la Moda",
      description:
        "El estilo que vendemos no caduca con la temporada. Nuestros accesorios van de la calle al evento sin perder un gramo de identidad, porque el buen gusto no necesita contexto. Hoy en el set, mañana en la reunión—Felton se adapta a quien lo lleva, no al revés.",
    },
    {
      title: "Materiales Premium",
      description:
        "No nos conformamos con menos. Todos nuestros productos son importados y pasan por un control de calidad riguroso antes de llegar a tus manos. Cuero genuino, herrajes sólidos, costuras que duran—porque la diferencia entre lo ordinario y lo extraordinario está en los detalles que la mayoría no ve, pero todos sienten.",
    },
  ],
  en: [
    {
      title: "Discreet Excellence",
      description:
        "Every Felton piece is a curated import. We replicate the standards of the world's most recognized luxury houses—Gucci, Louis Vuitton, Balenciaga—with flawless finishes and a presence that needs no introduction. Quality is felt before anyone asks about the brand.",
    },
    {
      title: "Timeless Style",
      description:
        "The style we sell doesn't expire with the season. Our accessories move from the streets to any setting without losing an ounce of identity, because good taste needs no context. Today on the block, tomorrow in the boardroom—Felton adapts to who's wearing it, not the other way around.",
    },
    {
      title: "Premium Materials",
      description:
        "We don't settle for less. Every product we carry is imported and goes through a rigorous quality check before it reaches your hands. Genuine leather, solid hardware, stitching that holds—because the difference between ordinary and extraordinary is in the details most people don't see, but everyone feels.",
    },
  ],
};

const PARTICLES = [
  { left: 51.7, top: 50.6, duration: 4.2, delay: 0.3,  dx: 0,   dy: -30 },
  { left: 90.9, top: 54.1, duration: 3.8, delay: 1.1,  dx: -20, dy: -20 },
  { left: 11.3, top: 91.2, duration: 4.7, delay: 0.7,  dx: 15,  dy: -25 },
  { left: 56.5, top: 21.3, duration: 3.5, delay: 1.5,  dx: 0,   dy: -30 },
  { left: 93.2, top: 81.3, duration: 4.1, delay: 0.1,  dx: -25, dy: -15 },
  { left: 16.6, top: 53.0, duration: 3.9, delay: 1.8,  dx: 20,  dy: -20 },
  { left: 34.0, top: 18.0, duration: 4.8, delay: 0.9,  dx: -15, dy: -25 },
  { left: 65.4, top: 29.8, duration: 3.7, delay: 1.4,  dx: 0,   dy: -30 },
  { left: 7.2,  top: 33.5, duration: 4.4, delay: 0.5,  dx: 25,  dy: -10 },
  { left: 28.1, top: 67.9, duration: 3.6, delay: 2.1,  dx: -10, dy: -28 },
  { left: 74.8, top: 12.4, duration: 4.9, delay: 0.4,  dx: 18,  dy: -22 },
  { left: 42.3, top: 85.7, duration: 3.3, delay: 1.7,  dx: -22, dy: -18 },
  { left: 83.6, top: 40.2, duration: 4.6, delay: 0.8,  dx: 12,  dy: -28 },
  { left: 22.4, top: 75.3, duration: 3.4, delay: 2.3,  dx: 28,  dy: -12 },
  { left: 60.1, top: 62.8, duration: 4.0, delay: 1.2,  dx: -18, dy: -22 },
  { left: 48.9, top: 6.1,  duration: 5.1, delay: 0.6,  dx: 0,   dy: -30 },
  { left: 3.5,  top: 14.7, duration: 3.8, delay: 1.9,  dx: 22,  dy: -18 },
  { left: 78.3, top: 95.4, duration: 4.3, delay: 0.2,  dx: -28, dy: -12 },
  { left: 37.6, top: 44.1, duration: 3.6, delay: 2.5,  dx: 10,  dy: -28 },
  { left: 19.0, top: 28.6, duration: 4.7, delay: 1.0,  dx: -12, dy: -28 },
  { left: 68.7, top: 73.2, duration: 3.9, delay: 1.6,  dx: 20,  dy: -20 },
  { left: 87.1, top: 20.9, duration: 4.5, delay: 0.3,  dx: -20, dy: -20 },
  { left: 44.5, top: 57.4, duration: 3.7, delay: 2.0,  dx: 30,  dy: 0   },
  { left: 5.8,  top: 48.3, duration: 4.2, delay: 1.3,  dx: -30, dy: 0   },
  { left: 31.2, top: 38.7, duration: 4.3, delay: 0.6,  dx: 16,  dy: -24 },
  { left: 72.5, top: 8.3,  duration: 3.9, delay: 2.2,  dx: -14, dy: -26 },
  { left: 14.8, top: 60.1, duration: 4.6, delay: 1.0,  dx: 24,  dy: -16 },
  { left: 58.3, top: 77.4, duration: 3.4, delay: 0.4,  dx: -26, dy: -14 },
  { left: 96.1, top: 30.5, duration: 5.0, delay: 1.7,  dx: -22, dy: -18 },
  { left: 25.7, top: 5.2,  duration: 4.1, delay: 2.4,  dx: 18,  dy: -22 },
];

export default function AboutPage() {
  const { locale } = useI18n();
  const currentValues = values[locale];

  return (
    <>
      <Header />
      <main className="min-h-screen">

        {/* ── Hero ── */}
        <div className="relative h-screen overflow-hidden flex items-center justify-center">
          {/* Video background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="/FELTON SIN SONIDO 720P.mp4"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/55" />
          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
            style={{ height: "110px", background: "linear-gradient(to bottom, transparent 0%, #0a1220 100%)" }}
          />

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl"
            >
              {locale === "es" ? "La Filosofía de" : "The Philosophy of"}
              <span className="block mt-2 bg-gradient-to-r from-primary via-yellow-300 to-primary bg-clip-text text-transparent">
                {locale === "es" ? "No Es Para Cualquiera" : "Not For Everyone"}
              </span>
            </motion.h1>
          </div>
        </div>

        {/* ── Nacido de la Exigencia ── */}
        <div className="relative overflow-hidden bg-[#0a1220]">
          {/* Fade inferior hacia negro (Principio Fundador) */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
            style={{ height: "180px", background: "linear-gradient(to bottom, transparent 0%, #000000 100%)" }}
          />
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-24 lg:gap-36 items-center">

            {/* Left: full image, no crop */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Image
                src="/about/63.jpg"
                alt=""
                width={0}
                height={0}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-auto"
              />
            </motion.div>

            {/* Right: text */}
            <motion.div
              className="py-8 lg:py-16"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
            >
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary mb-6">
                {locale === "es" ? "Nuestra Historia" : "Our Story"}
              </p>
              <h2 className="font-serif text-4xl font-light tracking-tight text-foreground lg:text-5xl mb-8 leading-[1.15]">
                {locale === "es" ? "Nacido de la Exigencia" : "Born from High Standards"}
              </h2>
              <div className="w-12 h-px bg-primary/40 mb-10" />
              <div className="space-y-5 text-[1.05rem] font-light leading-[1.85] text-muted-foreground">
                <p>
                  {locale === "es"
                    ? "Felton nació de una verdad simple: el lujo no debería ser inalcanzable. El mercado ofrecía o productos mediocres o precios imposibles. Nosotros encontramos la diferencia."
                    : "Felton was born from a simple truth: luxury shouldn't be out of reach. The market offered either mediocre products or impossible prices. We found the difference."}
                </p>
                <p>
                  {locale === "es"
                    ? "Nuestro cliente no es cualquiera—entiende la cultura, vive el estilo desde adentro. Para esa persona que no está dispuesta a conformarse, creamos Felton: accesorios importados premium con el sello de las marcas más reconocidas del mundo."
                    : "Our customer isn't just anyone—they understand the culture, they live style from the inside. For the person who refuses to settle, we created Felton: premium imported accessories carrying the mark of the world's most recognized brands."}
                </p>
              </div>
            </motion.div>

          </div>
          </div>
        </div>

        {/* ── Principio Fundador ── */}
        <div className="relative overflow-hidden bg-black">
          {/* Fade hacia la sección siguiente */}
          <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
            style={{ background: "linear-gradient(to top, var(--background) 0%, transparent 100%)" }} />

          {/* Grid overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.15) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(212, 175, 55, 0.15) 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          {/* Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {PARTICLES.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/60 rounded-full"
                style={{ left: `${particle.left}%`, top: `${particle.top}%`, willChange: "transform, opacity" }}
                animate={{
                  x: [0, particle.dx * 0.6, particle.dx, particle.dx],
                  y: [0, particle.dy * 0.6, particle.dy, particle.dy],
                  opacity: [0, 1, 0, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  times: [0, 0.45, 0.75, 1],
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          <div className="relative z-20 min-h-[420px] flex items-center justify-center px-6 lg:px-8">
            <div className="w-full max-w-2xl text-center py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative border border-primary/20 px-10 py-10"
            >
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/50" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/50" />
              <p className="font-serif text-xl font-light italic text-white/85 leading-relaxed lg:text-2xl">
                {locale === "es"
                  ? '"No hacemos productos para cualquiera. Los hacemos para quienes notan los detalles que otros pasan por alto."'
                  : '"We don\'t make products for everyone. We make them for those who notice the details others miss."'}
              </p>
              <p className="mt-6 text-xs font-medium uppercase tracking-widest text-primary/60">
                {locale === "es" ? "Principio Fundador" : "Founding Principle"}
              </p>
            </motion.div>
            </div>
          </div>
        </div>

        {/* ── Lo Que Creemos ── */}
        <Section size="large" id="philosophy">
          <div className="grid gap-[4.5rem] lg:grid-cols-2 lg:gap-24 items-start">

            {/* Left: values */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeader
                eyebrow={locale === "es" ? "Nuestra Filosofía" : "Our Philosophy"}
                title={locale === "es" ? "Lo Que Creemos" : "What We Believe"}
                description={
                  locale === "es"
                    ? "Cuatro principios guían todo lo que creamos. Informan nuestras elecciones de materiales, influyen en nuestros diseños, y dan forma a la experiencia de poseer una pieza Felton."
                    : "Four principles guide everything we create. They inform our material choices, influence our designs, and shape the experience of owning a Felton piece."
                }
                align="left"
              />
              <motion.div
                className="mt-12 space-y-10"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {currentValues.map((value, index) => (
                  <motion.div key={value.title} variants={fadeIn}>
                    <div className="flex items-center gap-4">
                      <span className="font-serif text-3xl font-light text-primary/40">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="h-px flex-1 bg-primary/20" />
                    </div>
                    <h3 className="mt-5 font-serif text-xl font-light tracking-tight text-foreground lg:text-2xl">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-sm font-light leading-[1.85] text-muted-foreground">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: image — sticky al tope para quedar a la altura del 01 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
              className="lg:self-end"
            >
              <Image
                src="/about/54.jpg"
                alt=""
                width={0}
                height={0}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-auto"
              />
            </motion.div>

          </div>
        </Section>

      </main>
      <Footer />
    </>
  );
}

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
        "Creemos que el verdadero lujo no se anuncia. Nuestros productos están diseñados para ser descubiertos, no exhibidos—marcadores sutiles de gusto refinado que hablan solo a quienes entienden el lenguaje de la calidad.",
    },
    {
      title: "Atemporal sobre Tendencia",
      description:
        "La moda pasa; el estilo perdura. Cada pieza Felton se concibe con permanencia en mente, rechazando la mentalidad desechable de la moda rápida en favor de diseños que permanecen relevantes a través de temporadas y años.",
    },
    {
      title: "Materiales Considerados",
      description:
        "Seleccionamos materiales no por su novedad sino por sus características probadas. Cada cuero, cada tela, cada componente es elegido por su capacidad de funcionar bellamente hoy y desarrollar carácter con el tiempo.",
    },
    {
      title: "Confianza Silenciosa",
      description:
        "Nuestros productos no compiten por atención. Complementan. Realzan. Se convierten en extensiones invisibles de la persona que los lleva—presentes cuando se necesitan, discretos cuando no.",
    },
  ],
  en: [
    {
      title: "Discreet Excellence",
      description:
        "We believe that true luxury doesn't announce itself. Our products are designed to be discovered, not displayed—subtle markers of refined taste that speak only to those who understand the language of quality.",
    },
    {
      title: "Timeless Over Trendy",
      description:
        "Fashion fades; style endures. Every Felton piece is conceived with permanence in mind, rejecting the disposable mentality of fast fashion in favor of designs that remain relevant across seasons and years.",
    },
    {
      title: "Considered Materials",
      description:
        "We select materials not for their novelty but for their proven characteristics. Each leather, each fabric, each component is chosen for its ability to perform beautifully today and develop character over time.",
    },
    {
      title: "Quiet Confidence",
      description:
        "Our products don't compete for attention. They complement. They enhance. They become invisible extensions of the person who carries them—present when needed, unobtrusive when not.",
    },
  ],
};

const qualityPillars = {
  es: [
    {
      number: "01",
      title: "Selección de Materiales",
      points: [
        "Cueros de las mejores curtidurías del mundo",
        "Cadena de suministro ética y trazable",
        "Materiales elegidos por sus características de envejecimiento",
        "Auditorías regulares de proveedores y controles de calidad",
      ],
    },
    {
      number: "02",
      title: "Métodos de Construcción",
      points: [
        "Costura a mano donde la resistencia más importa",
        "Corte de precisión para calidad consistente",
        "Técnicas tradicionales mejoradas por herramientas modernas",
        "Múltiples inspecciones de construcción por pieza",
      ],
    },
    {
      number: "03",
      title: "Estándares de Acabado",
      points: [
        "Bordes bruñidos en todos los productos de cuero",
        "Tratamientos y recubrimientos aplicados a mano",
        "Inspección individual antes del empaque",
        "Atención a detalles invisibles",
      ],
    },
    {
      number: "04",
      title: "Calidad Continua",
      points: [
        "Programas de garantía completos",
        "Integración de feedback de clientes",
        "Pruebas continuas de materiales",
        "Estudios de durabilidad a largo plazo",
      ],
    },
  ],
  en: [
    {
      number: "01",
      title: "Material Selection",
      points: [
        "Leathers from the world's finest tanneries",
        "Ethically sourced, traceable supply chain",
        "Materials chosen for aging characteristics",
        "Regular supplier audits and quality checks",
      ],
    },
    {
      number: "02",
      title: "Construction Methods",
      points: [
        "Hand-stitching where strength matters most",
        "Precision cutting for consistent quality",
        "Traditional techniques enhanced by modern tools",
        "Multiple construction inspections per piece",
      ],
    },
    {
      number: "03",
      title: "Finishing Standards",
      points: [
        "Burnished edges on all leather products",
        "Hand-applied treatments and coatings",
        "Individual inspection before packaging",
        "Attention to invisible details",
      ],
    },
    {
      number: "04",
      title: "Ongoing Quality",
      points: [
        "Comprehensive warranty programs",
        "Customer feedback integration",
        "Continuous material testing",
        "Long-term durability studies",
      ],
    },
  ],
};

export default function AboutPage() {
  const { t, locale } = useI18n();
  const currentValues = values[locale];
  const currentPillars = qualityPillars[locale];

  return (
    <>
      <Header />
      <main className="min-h-screen">

        {/* ── Hero ── */}
        <div
          className="relative overflow-hidden pt-40 pb-24"
          style={{
            backgroundImage: 'url("/images/leather-texture.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "multiply",
            backgroundColor: "rgba(11,17,32,0.97)",
          }}
        >
          {/* Subtle radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.07) 0%, transparent 60%)",
            }}
          />
          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: "80px",
              background: "linear-gradient(to bottom, transparent 0%, var(--background) 100%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70 mb-4"
            >
              {t("about.eyebrow")}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl mb-4"
            >
              {locale === "es" ? "La Filosofía de" : "The Philosophy of"}
              <span className="block mt-2 bg-gradient-to-r from-primary via-yellow-300 to-primary bg-clip-text text-transparent">
                {locale === "es" ? "No Es Para Cualquiera" : "Not For Everyone"}
              </span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mx-auto my-7 h-px w-20 bg-primary/50 origin-center"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mx-auto max-w-2xl text-base font-light leading-relaxed text-white/50 mb-10"
            >
              {locale === "es"
                ? "En una era de consumo conspicuo, Felton representa un retorno al lujo pensado—donde la calidad habla más fuerte que los logos y la artesanía supera las tendencias."
                : "In an era of conspicuous consumption, Felton represents a return to thoughtful luxury—where quality speaks louder than logos and craftsmanship outlasts trends."}
            </motion.p>

            {/* Blockquote */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative max-w-2xl mx-auto border border-primary/20 px-8 py-7"
            >
              <div className="absolute top-0 left-0 w-7 h-7 border-t border-l border-primary/50" />
              <div className="absolute bottom-0 right-0 w-7 h-7 border-b border-r border-primary/50" />
              <p className="font-serif text-lg font-light italic text-white/80 leading-relaxed lg:text-xl">
                {locale === "es"
                  ? '"No hacemos productos para cualquiera. Los hacemos para quienes notan los detalles que otros pasan por alto."'
                  : '"We don\'t make products for everyone. We make them for those who notice the details others miss."'}
              </p>
              <p className="mt-4 text-xs font-medium uppercase tracking-widest text-primary/60">
                {locale === "es" ? "Principio Fundador" : "Founding Principle"}
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── Nuestra Historia ── */}
        <Section variant="dark" size="large">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

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
              <div className="space-y-6 text-[0.95rem] font-light leading-[1.9] text-muted-foreground">
                <p>
                  {locale === "es"
                    ? "Felton surgió de una simple frustración: la ausencia de accesorios que igualaran la calidad de los dispositivos que debían proteger. El mercado ofrecía protección desechable u ostentación—nada para quienes buscaban excelencia discreta."
                    : "Felton emerged from a simple frustration: the absence of accessories that matched the quality of the devices they were meant to protect. The market offered either disposable protection or ostentatious luxury—nothing for those who sought quiet excellence."}
                </p>
                <p>
                  {locale === "es"
                    ? "Nos propusimos crear algo diferente. Inspirándonos en las tradiciones artesanales europeas y la sensibilidad del diseño contemporáneo, desarrollamos una colección de accesorios que honran tanto la función como la forma sin anunciar ninguna."
                    : "We set out to create something different. Drawing from European craftsmanship traditions and contemporary design sensibilities, we developed a collection of accessories that honor both function and form without announcing either."}
                </p>
                <p>
                  {locale === "es"
                    ? "Hoy, Felton sirve a una comunidad creciente de individuos que entienden que el verdadero lujo no está en los logos sino en la satisfacción de poseer algo genuinamente bien hecho—piezas que se vuelven más personales con el tiempo."
                    : "Today, Felton serves a growing community of individuals who understand that true luxury lies not in logos but in the satisfaction of owning something genuinely well-made—pieces that become more personal with time."}
                </p>
              </div>
            </motion.div>

          </div>
        </Section>

        {/* ── Lo Que Creemos ── */}
        <Section size="large" id="philosophy">
          <SectionHeader
            eyebrow={locale === "es" ? "Nuestra Filosofía" : "Our Philosophy"}
            title={locale === "es" ? "Lo Que Creemos" : "What We Believe"}
            description={
              locale === "es"
                ? "Cuatro principios guían todo lo que creamos. Informan nuestras elecciones de materiales, influyen en nuestros diseños, y dan forma a la experiencia de poseer una pieza Felton."
                : "Four principles guide everything we create. They inform our material choices, influence our designs, and shape the experience of owning a Felton piece."
            }
          />
          <motion.div
            className="mt-16 grid gap-0 md:grid-cols-2 lg:mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {currentValues.map((value, index) => (
              <div
                key={value.title}
                className="border-t border-primary/15 px-0 py-10 md:px-10 first:border-l-0 md:[&:nth-child(odd)]:border-r md:[&:nth-child(odd)]:border-r-primary/15"
              >
                <span className="font-serif text-5xl font-light text-primary/15 block mb-6 leading-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-xl font-light tracking-tight text-foreground mb-4 lg:text-2xl">
                  {value.title}
                </h3>
                <p className="text-sm font-light leading-[1.85] text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </motion.div>
        </Section>

        {/* ── Cómo Construimos — texto izq, imagen 54 der ── */}
        <Section size="large" id="quality">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">

            {/* Left: all pillars */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeader
                eyebrow={locale === "es" ? "Estándares de Calidad" : "Quality Standards"}
                title={locale === "es" ? "Cómo Construimos" : "How We Build"}
                description={
                  locale === "es"
                    ? "La calidad no es un departamento en Felton—está integrada en cada decisión, desde la selección de materiales hasta la inspección final."
                    : "Quality isn't a department at Felton—it's embedded in every decision, from material sourcing to final inspection."
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
                {currentPillars.map((pillar) => (
                  <motion.div key={pillar.number} variants={fadeIn}>
                    <div className="flex items-center gap-4">
                      <span className="font-serif text-3xl font-light text-primary/40">
                        {pillar.number}
                      </span>
                      <div className="h-px flex-1 bg-primary/20" />
                    </div>
                    <h3 className="mt-5 font-serif text-xl font-light tracking-tight text-foreground lg:text-2xl">
                      {pillar.title}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {pillar.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 text-sm font-light text-muted-foreground"
                        >
                          <span className="mt-2 h-1 w-1 rounded-full bg-primary/50 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: image 54 full */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
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

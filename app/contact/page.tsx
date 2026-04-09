"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Mail, Clock, MapPin, AtSign, Send } from "lucide-react"
import { Header, Footer, SectionHeader } from "@/components/layout"
import { useI18n } from "@/lib/i18n"
import { toast } from "sonner"

export default function ContactPage() {
  const { locale } = useI18n()
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactInfo = [
    { icon: Mail,    title: "Email",                                              value: "Felton26.01@gmail.com",  href: "mailto:Felton26.01@gmail.com" },
    { icon: AtSign,  title: "Instagram",                                          value: "@felton.ar",            href: "https://www.instagram.com/felton.ar/" },
    { icon: Clock,   title: locale === "es" ? "Respuesta" : "Response",           value: locale === "es" ? "Menos de 24 hrs" : "Under 24 hrs", href: null },
    { icon: MapPin,  title: locale === "es" ? "Ubicación" : "Location",           value: "Mar del Plata, Argentina",href: null },
  ]

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
    toast.success(locale === "es" ? "Mensaje enviado correctamente" : "Message sent successfully")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 to-secondary/10" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-14">
            <SectionHeader
              eyebrow={locale === "es" ? "Contacto" : "Get in Touch"}
              title={locale === "es" ? "Hablemos" : "Let's Talk"}
              description={locale === "es"
                ? "Estamos para ayudarte. Escribinos y te respondemos."
                : "We're here to help. Reach out and we'll get back to you."
              }
            />
          </div>
        </div>

        {/* ── Content ───────────────────────────────────────── */}
        <div
          className="relative py-20"
          style={{
            backgroundImage: 'url("/images/leather-texture.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "multiply",
          }}
        >
          <div className="absolute inset-0 bg-background/95" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid gap-32 lg:grid-cols-[1.3fr_1fr]">

              {/* Left: Form */}
              <motion.div
                className="border border-primary/20 bg-background/20 backdrop-blur-sm p-8 lg:p-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="mx-auto w-14 h-14 border border-primary/30 flex items-center justify-center mb-6">
                      <Send className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-serif text-2xl font-light text-foreground">
                      {locale === "es" ? "Mensaje Recibido" : "Message Received"}
                    </h3>
                    <p className="mt-4 text-sm font-light text-muted-foreground max-w-sm mx-auto">
                      {locale === "es" ? "Te responderemos dentro de 24–48 horas." : "We'll respond within 24–48 hours."}
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary transition-all hover:gap-3"
                    >
                      {locale === "es" ? "Enviar Otro Mensaje" : "Send Another Message"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-xs font-medium uppercase tracking-widest text-primary/70">
                      {locale === "es" ? "Formulario de Contacto" : "Contact Form"}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-light text-foreground lg:text-3xl">
                      {locale === "es" ? "Envianos un Mensaje" : "Send a Message"}
                    </h3>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-xs font-medium uppercase tracking-widest text-primary/60 mb-2">
                          {locale === "es" ? "Nombre" : "Name"}
                        </label>
                        <input
                          type="text" id="name" name="name" value={formData.name}
                          onChange={handleChange} required
                          className="w-full bg-background/40 border border-primary/20 px-4 py-3 text-sm font-light text-foreground placeholder:text-muted-foreground/30 focus:border-primary focus:outline-none transition-colors"
                          placeholder={locale === "es" ? "Tu nombre" : "Your name"}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-xs font-medium uppercase tracking-widest text-primary/60 mb-2">
                          Email
                        </label>
                        <input
                          type="email" id="email" name="email" value={formData.email}
                          onChange={handleChange} required
                          className="w-full bg-background/40 border border-primary/20 px-4 py-3 text-sm font-light text-foreground placeholder:text-muted-foreground/30 focus:border-primary focus:outline-none transition-colors"
                          placeholder="tu@email.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-xs font-medium uppercase tracking-widest text-primary/60 mb-2">
                          {locale === "es" ? "Asunto" : "Subject"}
                        </label>
                        <select
                          id="subject" name="subject" value={formData.subject}
                          onChange={handleChange} required
                          className="w-full bg-background/40 border border-primary/20 px-4 py-3 text-sm font-light text-foreground focus:border-primary focus:outline-none transition-colors"
                        >
                          <option value="">{locale === "es" ? "Seleccioná un tema" : "Select a topic"}</option>
                          <option value="product">{locale === "es" ? "Consulta de Producto" : "Product Inquiry"}</option>
                          <option value="order">{locale === "es" ? "Soporte de Pedido" : "Order Support"}</option>
                          <option value="return">{locale === "es" ? "Devoluciones y Cambios" : "Returns & Exchanges"}</option>
                          <option value="wholesale">{locale === "es" ? "Consulta Mayorista" : "Wholesale Inquiry"}</option>
                          <option value="press">{locale === "es" ? "Prensa y Medios" : "Press & Media"}</option>
                          <option value="other">{locale === "es" ? "Otro" : "Other"}</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-xs font-medium uppercase tracking-widest text-primary/60 mb-2">
                          {locale === "es" ? "Mensaje" : "Message"}
                        </label>
                        <textarea
                          id="message" name="message" value={formData.message}
                          onChange={handleChange} required rows={5}
                          className="w-full bg-background/40 border border-primary/20 px-4 py-3 text-sm font-light text-foreground placeholder:text-muted-foreground/30 focus:border-primary focus:outline-none transition-colors resize-none"
                          placeholder={locale === "es" ? "¿En qué podemos ayudarte?" : "How can we help?"}
                        />
                      </div>

                      <button
                        type="submit" disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2 border border-primary bg-primary px-8 py-3 text-sm font-medium tracking-widest uppercase text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          locale === "es" ? "Enviando..." : "Sending..."
                        ) : (
                          <>
                            {locale === "es" ? "Enviar Mensaje" : "Send Message"}
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </motion.div>

              {/* Right: cards + FAQ */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col justify-center gap-8"
              >
                {/* Contact info */}
                <div className="flex flex-col">
                  {contactInfo.map((item) => {
                    const inner = (
                      <div className="flex items-center gap-4 py-4 border-b border-primary/10 group-hover:border-primary/30 transition-colors">
                        <item.icon className="h-4 w-4 shrink-0 text-primary/60" />
                        <span className="text-xs uppercase tracking-widest text-primary/50 w-24 shrink-0">
                          {item.title}
                        </span>
                        <span className="text-sm font-light text-foreground">
                          {item.value}
                        </span>
                      </div>
                    )
                    return item.href ? (
                      <a
                        key={item.title}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="group"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div key={item.title} className="group">{inner}</div>
                    )
                  })}
                </div>

                {/* FAQ card */}
                <Link href="/faqs" className="group block">
                  <motion.div
                    className="relative border border-primary/20 p-8 overflow-hidden transition-all duration-300 group-hover:border-primary/60"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 pointer-events-none" />
                    <p className="text-xs font-medium uppercase tracking-widest text-primary/70">
                      {locale === "es" ? "Preguntas Frecuentes" : "FAQ"}
                    </p>
                    <p className="mt-3 font-serif text-xl font-light text-foreground group-hover:text-primary transition-colors duration-300">
                      {locale === "es" ? "¿Tenés dudas?" : "Have questions?"}
                    </p>
                    <p className="mt-2 text-sm font-light text-muted-foreground">
                      {locale === "es"
                        ? "Encontrá respuestas a las consultas más frecuentes."
                        : "Find answers to the most common questions."
                      }
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary transition-all group-hover:gap-4 duration-300">
                      {locale === "es" ? "Ver FAQs" : "Visit FAQs"}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </motion.div>
                </Link>
              </motion.div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

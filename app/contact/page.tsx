"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Mail, Clock, MapPin, Instagram, Send } from "lucide-react"
import { Header, Footer, Section, SectionHeader } from "@/components/layout"
import { Newsletter } from "@/components/shared"
import { useI18n } from "@/lib/i18n"
import { fadeIn, staggerContainer, slideUp } from "@/lib/animations"
import { toast } from "sonner"

export default function ContactPage() {
  const { t, locale } = useI18n()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactInfo = [
    {
      icon: Mail,
      title: locale === "es" ? "Email" : "Email",
      description: locale === "es" ? "Para todas las consultas" : "For all inquiries",
      value: "hello@felton.com",
      href: "mailto:hello@felton.com",
    },
    {
      icon: Instagram,
      title: "Instagram",
      description: locale === "es" ? "Seguinos en redes" : "Follow us",
      value: "@felton.official",
      href: "https://instagram.com/felton.official",
    },
    {
      icon: Clock,
      title: locale === "es" ? "Tiempo de Respuesta" : "Response Time",
      description: locale === "es" ? "Respondemos dentro de" : "We aim to respond within",
      value: "24-48 hrs",
      href: null,
    },
    {
      icon: MapPin,
      title: locale === "es" ? "Ubicación" : "Location",
      description: locale === "es" ? "Sede principal" : "Headquarters",
      value: "Buenos Aires, Argentina",
      href: null,
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
    toast.success(locale === "es" ? "Mensaje enviado correctamente" : "Message sent successfully")
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <Section size="large" variant="textured" className="relative">
          <div className="absolute inset-0 bg-background/90" />
          <motion.div 
            className="relative z-10"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <SectionHeader
              eyebrow={locale === "es" ? "Contacto" : "Get in Touch"}
              title={locale === "es" ? "Hablemos" : "Let's Talk"}
              description={locale === "es" 
                ? "¿Preguntas, feedback, o simplemente querés saber más? Estamos acá para ayudarte. Escribinos y te responderemos con el mismo cuidado que ponemos en nuestros productos."
                : "Questions, feedback, or simply want to learn more? We're here to help. Reach out and we'll respond with the same care we put into our products."
              }
            />
          </motion.div>
        </Section>

        {/* Contact Content */}
        <Section size="large">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-2xl font-light tracking-tight text-foreground lg:text-3xl">
                {locale === "es" ? "Cómo Contactarnos" : "How to Reach Us"}
              </h2>
              <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
                {locale === "es"
                  ? "Valoramos cada consulta y nos esforzamos por brindar respuestas atentas y útiles. Ya sea que tengas preguntas sobre nuestros productos, necesites ayuda con un pedido o quieras discutir una colaboración, te escuchamos."
                  : "We value every inquiry and strive to provide thoughtful, helpful responses. Whether you have questions about our products, need assistance with an order, or want to discuss a collaboration, we're listening."
                }
              </p>

              {/* Contact Cards */}
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {contactInfo.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 p-6 border-2 border-primary/10 bg-card/30 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center justify-center w-10 h-10 border border-primary/30 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs font-light text-muted-foreground">
                        {item.description}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="mt-2 inline-block text-sm font-light text-foreground transition-colors hover:text-primary"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-2 text-sm font-light text-foreground">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ Link */}
              <div className="mt-8 p-6 border-2 border-primary/20 bg-secondary/30">
                <p className="text-sm font-light text-muted-foreground">
                  {locale === "es"
                    ? "¿Buscás respuestas rápidas? Muchas preguntas comunes ya están respondidas en nuestra sección de FAQ."
                    : "Looking for quick answers? Many common questions are already addressed in our FAQ section."
                  }
                </p>
                <Link
                  href="/faqs"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition-all hover:gap-3"
                >
                  {locale === "es" ? "Ver FAQs" : "Visit FAQs"}
                  <ArrowRight className="h-4 w-4 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              className="border-2 border-primary/20 bg-card/30 p-8 lg:p-10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 border-2 border-primary/30 flex items-center justify-center mb-6">
                    <Send className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-light tracking-tight text-foreground">
                    {locale === "es" ? "Mensaje Recibido" : "Message Received"}
                  </h3>
                  <p className="mt-4 text-sm font-light text-muted-foreground max-w-sm mx-auto">
                    {locale === "es"
                      ? "Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos dentro de 24-48 horas."
                      : "Thank you for reaching out. We've received your message and will respond within 24-48 hours."
                    }
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
                  <h3 className="font-serif text-xl font-light tracking-tight text-foreground lg:text-2xl">
                    {locale === "es" ? "Envianos un Mensaje" : "Send a Message"}
                  </h3>
                  <p className="mt-2 text-sm font-light text-muted-foreground">
                    {locale === "es"
                      ? "Completá el formulario y te responderemos pronto."
                      : "Fill out the form below and we'll get back to you shortly."
                    }
                  </p>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium uppercase tracking-widest text-muted-foreground/60 mb-2"
                      >
                        {locale === "es" ? "Nombre" : "Name"}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-background/50 border-2 border-primary/10 px-4 py-3 text-sm font-light text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none transition-colors"
                        placeholder={locale === "es" ? "Tu nombre" : "Your name"}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium uppercase tracking-widest text-muted-foreground/60 mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-background/50 border-2 border-primary/10 px-4 py-3 text-sm font-light text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none transition-colors"
                        placeholder="tu@email.com"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-xs font-medium uppercase tracking-widest text-muted-foreground/60 mb-2"
                      >
                        {locale === "es" ? "Asunto" : "Subject"}
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-background/50 border-2 border-primary/10 px-4 py-3 text-sm font-light text-foreground focus:border-primary focus:outline-none transition-colors"
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

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-medium uppercase tracking-widest text-muted-foreground/60 mb-2"
                      >
                        {locale === "es" ? "Mensaje" : "Message"}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full bg-background/50 border-2 border-primary/10 px-4 py-3 text-sm font-light text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none transition-colors resize-none"
                        placeholder={locale === "es" ? "¿En qué podemos ayudarte?" : "How can we help?"}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 border-2 border-primary bg-primary px-8 py-3 text-sm font-medium tracking-wide text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
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
          </div>
        </Section>

        {/* Newsletter */}
        <Newsletter variant="compact" />

        {/* Trust Section */}
        <Section variant="dark" size="default" className="border-t border-primary/10">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-medium uppercase tracking-widest text-primary/70 mb-4">
              {locale === "es" ? "Tu Privacidad Importa" : "Your Privacy Matters"}
            </p>
            <p className="text-sm font-light text-muted-foreground">
              {locale === "es"
                ? "Respetamos tu privacidad y manejamos todas las consultas con discreción. Tu información nunca se comparte con terceros y se usa únicamente para responder a tu mensaje. Leé nuestra "
                : "We respect your privacy and handle all inquiries with discretion. Your information is never shared with third parties and is used solely to respond to your message. Read our "
              }
              <Link href="/privacy" className="text-primary hover:underline">
                {locale === "es" ? "Política de Privacidad" : "Privacy Policy"}
              </Link>
              {locale === "es" ? " para más detalles." : " for more details."}
            </p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}

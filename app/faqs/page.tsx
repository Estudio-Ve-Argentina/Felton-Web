"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"
import { Header, Footer, Section, SectionHeader } from "@/components/layout"
import { Newsletter } from "@/components/shared"
import { useI18n } from "@/lib/i18n"
import { fadeIn, staggerContainer } from "@/lib/animations"
import { cn } from "@/lib/utils"

const faqCategories = {
  es: [
    {
      name: "Pedidos y Envíos",
      id: "shipping",
      questions: [
        {
          question: "¿Cuánto tarda el envío?",
          answer: "El envío estándar dentro de Argentina tarda 3-7 días hábiles. Envío express disponible para entrega en 1-3 días hábiles. Los pedidos internacionales generalmente llegan dentro de 10-21 días hábiles dependiendo del destino y el procesamiento aduanero.",
        },
        {
          question: "¿Hacen envíos internacionales?",
          answer: "Sí, enviamos a la mayoría de los países del mundo. Los pedidos internacionales pueden estar sujetos a impuestos de importación, que son responsabilidad del destinatario. Estos cargos son determinados por tu autoridad aduanera local.",
        },
        {
          question: "¿Cómo puedo rastrear mi pedido?",
          answer: "Una vez que tu pedido se envíe, recibirás un email de confirmación con un número de seguimiento. Podés usar esto para monitorear el viaje de tu paquete. Si no recibiste información de seguimiento dentro de 48 horas de tu pedido, contactá a nuestro equipo de soporte.",
        },
        {
          question: "¿Qué pasa si mi paquete se pierde o llega dañado?",
          answer: "Asumimos total responsabilidad por los paquetes hasta que te lleguen. Si tu pedido se pierde en tránsito o llega dañado, contactanos inmediatamente con fotos si aplica. Organizaremos un reemplazo o reembolso completo sin costo adicional.",
        },
      ],
    },
    {
      name: "Devoluciones y Cambios",
      id: "returns",
      questions: [
        {
          question: "¿Cuál es su política de devolución?",
          answer: "Ofrecemos una política de devolución de 30 días para artículos sin usar en su condición y empaque original. Los artículos personalizados no pueden devolverse a menos que estén defectuosos. Los reembolsos se procesan dentro de 5-7 días hábiles de recibir el artículo devuelto.",
        },
        {
          question: "¿Cómo inicio una devolución?",
          answer: "Contactá a nuestro equipo de servicio al cliente con tu número de pedido y motivo de devolución. Te proporcionaremos una etiqueta de devolución prepaga e instrucciones. Asegurate de que los artículos estén empacados de forma segura para prevenir daños durante el tránsito.",
        },
        {
          question: "¿Puedo cambiar por un producto diferente?",
          answer: "Absolutamente. Si preferís un artículo diferente, simplemente indicalo al iniciar tu devolución. Una vez que recibamos y procesemos tu devolución, enviaremos el artículo de cambio. Si hay diferencia de precio, cobraremos o reembolsaremos según corresponda.",
        },
      ],
    },
    {
      name: "Productos y Calidad",
      id: "quality",
      questions: [
        {
          question: "¿Sus productos tienen garantía?",
          answer: "Todos los productos Felton vienen con un mínimo de un año de garantía contra defectos de fabricación. Nuestras Series Guardian y Productos de Edición Limitada incluyen garantías de por vida. El desgaste normal y el daño por mal uso no están cubiertos.",
        },
        {
          question: "¿Cómo debo cuidar mis productos de cuero?",
          answer: "Nuestro cuero desarrolla una hermosa pátina naturalmente con el tiempo. Recomendamos acondicionamiento ocasional con un acondicionador de cuero de calidad, mantener alejado de la luz solar directa prolongada o calor, y guardar en la bolsa de polvo provista cuando no se use.",
        },
        {
          question: "¿Qué hace diferentes a los productos Felton?",
          answer: "Cada pieza Felton representa nuestro compromiso con la calidad sobre las tendencias. Usamos materiales premium de proveedores éticos, empleamos técnicas artesanales tradicionales mejoradas por precisión moderna, y diseñamos para la longevidad en lugar de la obsolescencia.",
        },
        {
          question: "¿Son sus productos réplicas?",
          answer: "Sí, ofrecemos réplicas de alta calidad inspiradas en diseños icónicos de marcas de lujo reconocidas mundialmente. Nos enfocamos en replicar la calidad de construcción y materiales, ofreciendo una alternativa accesible sin comprometer la artesanía.",
        },
      ],
    },
    {
      name: "Pagos y Seguridad",
      id: "payment",
      questions: [
        {
          question: "¿Qué métodos de pago aceptan?",
          answer: "Aceptamos todas las tarjetas de crédito principales (Visa, Mastercard, American Express), MercadoPago, transferencia bancaria y efectivo en puntos de pago. Todas las transacciones se procesan de forma segura con encriptación completa y protección contra fraude.",
        },
        {
          question: "¿Mi información de pago está segura?",
          answer: "Absolutamente. Nunca almacenamos tu información de pago completa en nuestros servidores. Todas las transacciones se procesan a través de procesadores de pago con cumplimiento PCI DSS con encriptación a nivel bancario. Tu seguridad es nuestra prioridad.",
        },
        {
          question: "¿Ofrecen planes de pago?",
          answer: "Sí, nos asociamos con proveedores de pago selectos para ofrecer opciones de cuotas en pedidos superiores a $50.000 ARS. Las opciones de plan de pago disponibles se mostrarán en el checkout basado en tu ubicación y total del pedido.",
        },
      ],
    },
  ],
  en: [
    {
      name: "Orders & Shipping",
      id: "shipping",
      questions: [
        {
          question: "How long does shipping take?",
          answer: "Standard shipping within Argentina takes 3-7 business days. Express shipping is available for 1-3 business day delivery. International orders typically arrive within 10-21 business days depending on destination and customs processing.",
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship to most countries worldwide. International orders may be subject to import duties and taxes, which are the responsibility of the recipient. These charges are determined by your local customs authority.",
        },
        {
          question: "How can I track my order?",
          answer: "Once your order ships, you'll receive a confirmation email with a tracking number. You can use this to monitor your package's journey. If you haven't received tracking information within 48 hours of your order, please contact our support team.",
        },
        {
          question: "What if my package is lost or damaged?",
          answer: "We take full responsibility for packages until they reach you. If your order is lost in transit or arrives damaged, contact us immediately with photos if applicable. We'll arrange a replacement or full refund at no additional cost.",
        },
      ],
    },
    {
      name: "Returns & Exchanges",
      id: "returns",
      questions: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for unused items in their original condition and packaging. Personalized items cannot be returned unless defective. Refunds are processed within 5-7 business days of receiving the returned item.",
        },
        {
          question: "How do I initiate a return?",
          answer: "Contact our customer service team with your order number and reason for return. We'll provide a prepaid return label and instructions. Please ensure items are securely packaged to prevent damage during transit.",
        },
        {
          question: "Can I exchange for a different product?",
          answer: "Absolutely. If you'd prefer a different item, simply indicate this when initiating your return. Once we receive and process your return, we'll ship the exchange item. If there's a price difference, we'll charge or refund accordingly.",
        },
      ],
    },
    {
      name: "Products & Quality",
      id: "quality",
      questions: [
        {
          question: "Are your products covered by warranty?",
          answer: "All Felton products come with a minimum one-year warranty against manufacturing defects. Our Guardian Series and Limited Edition collections include lifetime warranties. Normal wear and damage from misuse are not covered.",
        },
        {
          question: "How should I care for my leather products?",
          answer: "Our leather develops beautiful patina naturally over time. We recommend occasional conditioning with a quality leather conditioner, keeping away from prolonged direct sunlight or heat, and storing in the provided dust bag when not in use.",
        },
        {
          question: "What makes Felton products different?",
          answer: "Every Felton piece represents our commitment to quality over trends. We use premium materials from ethical suppliers, employ traditional craftsmanship techniques enhanced by modern precision, and design for longevity rather than obsolescence.",
        },
        {
          question: "Are your products replicas?",
          answer: "Yes, we offer high-quality replicas inspired by iconic designs from world-renowned luxury brands. We focus on replicating construction quality and materials, offering an accessible alternative without compromising craftsmanship.",
        },
      ],
    },
    {
      name: "Payment & Security",
      id: "payment",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, Mastercard, American Express), MercadoPago, bank transfer, and cash at payment points. All transactions are processed securely with full encryption and fraud protection.",
        },
        {
          question: "Is my payment information secure?",
          answer: "Absolutely. We never store your complete payment information on our servers. All transactions are processed through PCI DSS compliant payment processors with bank-level encryption. Your security is our priority.",
        },
        {
          question: "Do you offer payment plans?",
          answer: "Yes, we partner with select payment providers to offer installment options on orders above $50,000 ARS. Available payment plan options will be displayed at checkout based on your location and order total.",
        },
      ],
    },
  ],
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div 
      className="border-b border-primary/10"
      initial={false}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left group"
      >
        <span className="text-base font-light text-foreground pr-4 group-hover:text-primary transition-colors">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm font-light leading-relaxed text-muted-foreground">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQsPage() {
  const { locale } = useI18n()
  const categories = faqCategories[locale]

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <div className="bg-background border-b border-primary/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-14 text-center">
            <SectionHeader
              eyebrow={locale === "es" ? "Soporte" : "Support"}
              title={locale === "es" ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
              description={locale === "es"
                ? "Respuestas a preguntas comunes sobre pedidos, envíos, cuidado y todo lo que quieras saber sobre los productos Felton."
                : "Answers to common questions about ordering, shipping, care, and everything else you might want to know about Felton products."
              }
            />
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="bg-secondary/10 border-b border-primary/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="text-sm font-light text-muted-foreground transition-colors hover:text-primary border-b border-transparent hover:border-primary pb-1"
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="bg-secondary/10">
        <Section size="large">
          <motion.div 
            className="space-y-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((category) => (
              <motion.div key={category.id} id={category.id} variants={fadeIn}>
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="font-serif text-2xl font-light tracking-tight text-foreground lg:text-3xl">
                    {category.name}
                  </h2>
                  <div className="h-px flex-1 bg-primary/20" />
                </div>

                {/* Questions */}
                <div className="border-t border-primary/10">
                  {category.questions.map((faq) => (
                    <FAQItem
                      key={faq.question}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Section>
        </div>

        {/* Newsletter */}
        <Newsletter variant="elegant" />

        {/* Still Have Questions */}
        <Section variant="dark" size="default" className="border-t border-primary/10">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-primary/70 mb-4">
              {locale === "es" ? "¿Todavía Tenés Preguntas?" : "Still Have Questions?"}
            </p>
            <h3 className="font-serif text-2xl font-light tracking-tight text-foreground lg:text-3xl">
              {locale === "es" ? "Nuestro equipo está para ayudarte" : "Our team is here to help"}
            </h3>
            <p className="mt-4 max-w-xl mx-auto text-sm font-light text-muted-foreground">
              {locale === "es"
                ? "¿No encontrás la respuesta que buscás? Nuestro equipo de soporte está disponible para asistirte con cualquier pregunta sobre productos, pedidos o consultas generales."
                : "Can't find the answer you're looking for? Our customer support team is available to assist with any questions about products, orders, or general inquiries."
              }
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 border-2 border-primary bg-primary px-8 py-3 text-sm font-medium tracking-wide text-primary-foreground transition-all hover:bg-primary/90"
              >
                {locale === "es" ? "Contactanos" : "Contact Us"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}

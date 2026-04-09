"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Header, Footer, SectionHeader } from "@/components/layout"
import { fadeInUp, staggerContainer, luxuryTransition } from "@/lib/animations"

const sections = [
  {
    id: "aceptacion",
    title: "1. Aceptación de los Términos",
    content: [
      "Al acceder y usar este sitio, aceptás estos términos y condiciones en su totalidad. Si no estás de acuerdo con alguna de estas disposiciones, por favor no utilices el sitio ni realices compras a través de él.",
      "El uso continuado del sitio luego de cualquier modificación a estos términos implica la aceptación de los nuevos términos.",
    ],
  },
  {
    id: "naturaleza",
    title: "2. Naturaleza de los Productos",
    content: [
      "Felton comercializa réplicas de alta calidad inspiradas en diseños de marcas de lujo reconocidas mundialmente. Estos productos NO son artículos originales, auténticos ni fabricados, licenciados, patrocinados o avalados por las marcas originales.",
      "Los nombres de marcas, logos y diseños de terceros mencionados o utilizados como referencia son propiedad exclusiva de sus respectivos titulares. Felton no reclama ninguna afiliación, asociación ni relación con dichas marcas.",
      "Al realizar una compra, el cliente reconoce y acepta que está adquiriendo una réplica y no un producto original de la marca referenciada.",
    ],
  },
  {
    id: "productos",
    title: "3. Productos y Disponibilidad",
    content: [
      "Todos los productos están sujetos a disponibilidad de stock. Felton se reserva el derecho de discontinuar productos, modificar descripciones, imágenes o especificaciones sin previo aviso.",
      "Las imágenes de los productos son de carácter ilustrativo. Pueden existir variaciones menores en color, textura o acabado respecto al producto recibido.",
    ],
  },
  {
    id: "precios",
    title: "4. Precios y Pagos",
    content: [
      "Los precios publicados en el sitio pueden modificarse sin previo aviso. El precio válido es el vigente al momento de confirmar el pedido.",
      "El pago debe realizarse en su totalidad antes del despacho del pedido. Aceptamos los medios de pago detallados en el proceso de checkout.",
      "Felton no almacena datos de tarjetas de crédito ni información de pago sensible. Todas las transacciones se procesan a través de plataformas de pago seguras.",
    ],
  },
  {
    id: "envios",
    title: "5. Envíos y Devoluciones",
    content: [
      "Los tiempos y costos de envío varían según la ubicación del destinatario y la modalidad seleccionada. Los plazos estimados son orientativos y pueden verse afectados por factores externos.",
      "Las devoluciones se aceptan dentro de los 30 días corridos desde la fecha de recepción del pedido, siempre que el producto se encuentre en su estado original, sin uso y con su embalaje intacto.",
      "Para iniciar una devolución o cambio, el cliente debe contactarse con nuestro equipo indicando el número de pedido y el motivo. Los gastos de envío por devolución pueden ser a cargo del cliente según el caso.",
    ],
  },
  {
    id: "propiedad",
    title: "6. Propiedad Intelectual",
    content: [
      "El contenido propio de este sitio web — incluyendo textos, fotografías, diseño gráfico, logotipo de Felton y código fuente — es propiedad de Felton y está protegido por las leyes aplicables.",
      "Las marcas comerciales de terceros mencionadas en el sitio pertenecen a sus respectivos propietarios. Su mención tiene únicamente fines descriptivos y de referencia, sin implicar ningún tipo de asociación o endorsement.",
      "Queda prohibida la reproducción, distribución o modificación del contenido propio de Felton sin autorización expresa.",
    ],
  },
  {
    id: "responsabilidad",
    title: "7. Limitación de Responsabilidad",
    content: [
      "Felton no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos derivados del uso de nuestros productos o servicios.",
      "En ningún caso la responsabilidad total de Felton ante el cliente superará el monto abonado por el pedido en cuestión.",
      "Felton no garantiza que el sitio esté libre de interrupciones, errores o virus, y no se responsabiliza por daños derivados del acceso o uso del mismo.",
    ],
  },
  {
    id: "privacidad",
    title: "8. Privacidad y Datos",
    content: [
      "Los datos personales que el cliente proporciona al realizar una compra o al contactarnos son utilizados exclusivamente para procesar pedidos, gestionar consultas y mejorar la experiencia de uso del sitio.",
      "No vendemos ni cedemos datos personales a terceros con fines comerciales. Los datos pueden compartirse únicamente con proveedores logísticos o de pago en la medida necesaria para completar una transacción.",
      "El sitio puede utilizar cookies para mejorar la experiencia de navegación. El uso continuado del sitio implica la aceptación del uso de cookies.",
    ],
  },
  {
    id: "modificaciones",
    title: "9. Modificaciones a los Términos",
    content: [
      "Felton se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigencia desde el momento de su publicación en el sitio.",
      "Recomendamos revisar esta página periódicamente para mantenerse informado de cualquier actualización.",
    ],
  },
  {
    id: "contacto",
    title: "10. Contacto",
    content: [
      "Para consultas sobre estos términos y condiciones, podés contactarnos a través de los siguientes medios:",
    ],
    contact: true,
  },
]

export default function LegalPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero */}
        <div className="bg-background border-b border-primary/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-14 text-center">
            <SectionHeader
              eyebrow="Legal"
              title="Términos y Condiciones"
              description="Última actualización: 09 de abril de 2026"
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-secondary/10">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
            <motion.div
              className="space-y-14"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {sections.map((section) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  variants={fadeInUp}
                  transition={{ ...luxuryTransition }}
                  className="scroll-mt-36"
                >
                  <h2 className="font-serif text-2xl font-light tracking-tight text-foreground lg:text-3xl mb-5 pb-3 border-b border-primary/15">
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.content.map((paragraph, i) => (
                      <p key={i} className="text-base font-light leading-relaxed text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}
                    {section.contact && (
                      <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-3 text-base font-light text-muted-foreground">
                          <span className="text-primary/60">Email</span>
                          <a
                            href="mailto:Felton26.01@gmail.com"
                            className="hover:text-primary transition-colors"
                          >
                            Felton26.01@gmail.com
                          </a>
                        </div>
                        <div className="flex items-center gap-3 text-base font-light text-muted-foreground">
                          <span className="text-primary/60">Instagram</span>
                          <a
                            href="https://www.instagram.com/felton.ar/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                          >
                            @felton.ar
                          </a>
                        </div>
                        <div className="flex items-center gap-3 text-base font-light text-muted-foreground">
                          <span className="text-primary/60">FAQ</span>
                          <Link href="/faqs" className="hover:text-primary transition-colors">
                            Preguntas Frecuentes
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.section>
              ))}
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-primary/10 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-4">
              ¿Tenés dudas?
            </p>
            <h3 className="font-serif text-2xl font-light tracking-tight text-foreground lg:text-3xl mb-8">
              Estamos para ayudarte
            </h3>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 border border-primary bg-primary px-8 py-3 text-sm font-medium tracking-wide text-primary-foreground transition-all hover:bg-primary/90"
            >
              Contactanos
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

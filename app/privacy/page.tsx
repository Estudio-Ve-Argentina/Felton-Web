"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Header, Footer, SectionHeader } from "@/components/layout"
import { fadeInUp, staggerContainer, luxuryTransition } from "@/lib/animations"

const sections = [
  {
    id: "recopilacion",
    title: "1. Información que Recopilamos",
    content: [
      "Recopilamos la información que nos brindás directamente, por ejemplo cuando realizás una compra o nos contactás. Esto incluye nombre, dirección de email, dirección de envío y datos de pago.",
      "También recopilamos datos técnicos de uso del sitio de forma automática, como dirección IP, tipo de navegador, páginas visitadas y tiempo de permanencia, a través de cookies y herramientas de analítica.",
    ],
  },
  {
    id: "uso",
    title: "2. Cómo Usamos tu Información",
    content: ["Utilizamos la información recopilada para los siguientes fines:"],
    list: [
      "Procesar y despachar tus pedidos.",
      "Comunicarnos sobre tu cuenta o transacciones.",
      "Brindar soporte al cliente.",
      "Enviar comunicaciones de marketing (solo con tu consentimiento).",
      "Mejorar nuestros productos, servicios y experiencia del sitio.",
      "Detectar y prevenir fraudes o usos indebidos.",
    ],
  },
  {
    id: "compartir",
    title: "3. Compartir Información",
    content: [
      "No vendemos ni compartimos tu información personal con terceros sin tu consentimiento.",
      "Podemos compartir tus datos únicamente con proveedores que nos ayudan a operar el sitio, como plataformas de pago (ej. MercadoPago) y empresas logísticas, exclusivamente para los fines indicados en esta política.",
      "En caso de requerimiento legal, podemos divulgar información cuando así lo exija la ley o una autoridad competente.",
    ],
  },
  {
    id: "seguridad",
    title: "4. Seguridad de los Datos",
    content: [
      "Implementamos medidas técnicas y organizativas razonables para proteger tu información contra accesos no autorizados, alteración, divulgación o destrucción.",
      "No almacenamos datos completos de tarjetas de crédito en nuestros servidores. Todas las transacciones se procesan a través de plataformas con cumplimiento PCI DSS.",
    ],
  },
  {
    id: "cookies",
    title: "5. Cookies",
    content: [
      "El sitio utiliza cookies para mejorar la experiencia de navegación, recordar preferencias y obtener analíticas de uso.",
      "Podés configurar tu navegador para rechazar cookies o recibir una notificación antes de aceptarlas. Ten en cuenta que deshabilitar cookies puede afectar algunas funcionalidades del sitio.",
      "El uso continuado del sitio implica la aceptación del uso de cookies conforme a esta política.",
    ],
  },
  {
    id: "derechos",
    title: "6. Tus Derechos",
    content: ["Como usuario, tenés derecho a:"],
    list: [
      "Acceder a los datos personales que tenemos sobre vos.",
      "Solicitar la corrección de datos incorrectos o desactualizados.",
      "Solicitar la eliminación de tus datos personales.",
      "Retirar el consentimiento para comunicaciones de marketing en cualquier momento.",
      "Configurar tus preferencias de cookies desde tu navegador.",
    ],
  },
  {
    id: "retencion",
    title: "7. Retención de Datos",
    content: [
      "Conservamos tus datos personales durante el tiempo necesario para cumplir con los fines descritos en esta política, o según lo exija la legislación aplicable.",
      "Una vez que los datos ya no sean necesarios, los eliminamos o los anonimizamos de forma segura.",
    ],
  },
  {
    id: "modificaciones",
    title: "8. Modificaciones a esta Política",
    content: [
      "Felton se reserva el derecho de actualizar esta Política de Privacidad en cualquier momento. Los cambios entrarán en vigencia desde su publicación en el sitio.",
      "Recomendamos revisar esta página periódicamente. Si los cambios son significativos, lo comunicaremos de forma destacada.",
    ],
  },
  {
    id: "contacto",
    title: "9. Contacto",
    content: [
      "Si tenés dudas, consultas o solicitudes relacionadas con esta política o con el manejo de tus datos personales, podés contactarnos:",
    ],
    contact: true,
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero */}
        <div className="bg-background border-b border-primary/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-14 text-center">
            <SectionHeader
              eyebrow="Legal"
              title="Política de Privacidad"
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
                  className="scroll-mt-28"
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
                    {"list" in section && section.list && (
                      <ul className="space-y-2 mt-2 ml-4">
                        {section.list.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-base font-light text-muted-foreground">
                            <span className="mt-2.5 w-1 h-1 rounded-full bg-primary/50 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    {"contact" in section && section.contact && (
                      <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-3 text-base font-light text-muted-foreground">
                          <span className="text-primary/60">Email</span>
                          <a href="mailto:Felton26.01@gmail.com" className="hover:text-primary transition-colors">
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

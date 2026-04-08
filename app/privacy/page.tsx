"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Header, Footer, Section, SectionHeader } from "@/components/layout"
import { useTranslation } from "@/lib/i18n"
import { fadeInUp, luxuryTransition } from "@/lib/animations"

export default function PrivacyPage() {
  const { t, locale } = useTranslation()

  const privacyContent = {
    es: {
      title: "Politica de Privacidad",
      lastUpdated: "Ultima actualizacion: 15 de Enero, 2026",
      sections: [
        {
          title: "Introduccion",
          content: `En Felton, nos comprometemos a proteger su privacidad y sus datos personales. Esta Politica de Privacidad describe como recopilamos, utilizamos y protegemos la informacion que nos proporciona cuando utiliza nuestro sitio web.`
        },
        {
          title: "Informacion que Recopilamos",
          content: `Recopilamos informacion que usted nos proporciona directamente, como su nombre, direccion de correo electronico, direccion de envio y facturacion, numero de telefono e informacion de pago. Tambien recopilamos automaticamente cierta informacion cuando visita nuestro sitio, incluyendo su direccion IP, tipo de navegador, paginas visitadas y tiempo de permanencia.`
        },
        {
          title: "Uso de la Informacion",
          content: `Utilizamos la informacion recopilada para: procesar y enviar sus pedidos, comunicarnos con usted sobre su cuenta o pedidos, enviarle comunicaciones de marketing (con su consentimiento), mejorar nuestro sitio web y servicios, y cumplir con obligaciones legales.`
        },
        {
          title: "Cookies y Tecnologias de Seguimiento",
          content: `Utilizamos cookies y tecnologias similares para mejorar su experiencia en nuestro sitio, analizar el trafico y personalizar el contenido. Puede configurar su navegador para rechazar cookies, aunque esto puede afectar algunas funcionalidades del sitio.`
        },
        {
          title: "Comparticion de Datos",
          content: `No vendemos ni alquilamos su informacion personal a terceros. Podemos compartir su informacion con proveedores de servicios que nos ayudan a operar nuestro negocio (procesadores de pago, empresas de logistica), siempre bajo estrictos acuerdos de confidencialidad.`
        },
        {
          title: "Seguridad de los Datos",
          content: `Implementamos medidas de seguridad tecnicas y organizativas para proteger su informacion contra acceso no autorizado, alteracion, divulgacion o destruccion. Utilizamos encriptacion SSL para todas las transacciones.`
        },
        {
          title: "Sus Derechos",
          content: `Usted tiene derecho a acceder, corregir, actualizar o solicitar la eliminacion de su informacion personal. Tambien puede oponerse al procesamiento de sus datos u optar por no recibir comunicaciones de marketing en cualquier momento.`
        },
        {
          title: "Retencion de Datos",
          content: `Conservamos su informacion personal solo durante el tiempo necesario para los fines para los que fue recopilada, o segun lo requieran las obligaciones legales aplicables.`
        },
        {
          title: "Cambios a esta Politica",
          content: `Podemos actualizar esta Politica de Privacidad periodicamente. Le notificaremos sobre cambios significativos publicando la nueva politica en nuestro sitio web y, cuando sea apropiado, por correo electronico.`
        },
        {
          title: "Contacto",
          content: `Si tiene preguntas sobre esta Politica de Privacidad o desea ejercer sus derechos, contactenos en privacy@felton.ar.`
        }
      ]
    },
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: January 15, 2026",
      sections: [
        {
          title: "Introduction",
          content: `At Felton, we are committed to protecting your privacy and personal data. This Privacy Policy describes how we collect, use, and protect the information you provide to us when you use our website.`
        },
        {
          title: "Information We Collect",
          content: `We collect information that you provide directly to us, such as your name, email address, shipping and billing address, phone number, and payment information. We also automatically collect certain information when you visit our site, including your IP address, browser type, pages visited, and time spent.`
        },
        {
          title: "Use of Information",
          content: `We use the information collected to: process and ship your orders, communicate with you about your account or orders, send you marketing communications (with your consent), improve our website and services, and comply with legal obligations.`
        },
        {
          title: "Cookies and Tracking Technologies",
          content: `We use cookies and similar technologies to enhance your experience on our site, analyze traffic, and personalize content. You can configure your browser to reject cookies, although this may affect some site functionality.`
        },
        {
          title: "Data Sharing",
          content: `We do not sell or rent your personal information to third parties. We may share your information with service providers who help us operate our business (payment processors, logistics companies), always under strict confidentiality agreements.`
        },
        {
          title: "Data Security",
          content: `We implement technical and organizational security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. We use SSL encryption for all transactions.`
        },
        {
          title: "Your Rights",
          content: `You have the right to access, correct, update, or request deletion of your personal information. You can also object to the processing of your data or opt out of receiving marketing communications at any time.`
        },
        {
          title: "Data Retention",
          content: `We retain your personal information only for as long as necessary for the purposes for which it was collected, or as required by applicable legal obligations.`
        },
        {
          title: "Changes to this Policy",
          content: `We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new policy on our website and, where appropriate, by email.`
        },
        {
          title: "Contact",
          content: `If you have questions about this Privacy Policy or wish to exercise your rights, contact us at privacy@felton.ar.`
        }
      ]
    }
  }

  const content = locale === "es" ? privacyContent.es : privacyContent.en

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <Section variant="dark" size="default">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={luxuryTransition}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("common.back")}
            </Link>
          </motion.div>
          
          <SectionHeader
            title={content.title}
            description={content.lastUpdated}
            align="left"
          />
        </Section>

        <Section variant="default" size="large">
          <div className="max-w-3xl">
            {content.sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...luxuryTransition, delay: index * 0.05 }}
                className="mb-10"
              >
                <h2 className="font-serif text-xl font-light text-foreground mb-4">
                  {section.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}

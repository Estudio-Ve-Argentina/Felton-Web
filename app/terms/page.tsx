"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Header, Footer, Section, SectionHeader } from "@/components/layout"
import { useTranslation } from "@/lib/i18n"
import { fadeInUp, luxuryTransition } from "@/lib/animations"

export default function TermsPage() {
  const { t, locale } = useTranslation()

  const termsContent = {
    es: {
      title: "Terminos y Condiciones",
      lastUpdated: "Ultima actualizacion: 15 de Enero, 2026",
      sections: [
        {
          title: "1. Aceptacion de los Terminos",
          content: `Al acceder y utilizar el sitio web de Felton (felton.ar), usted acepta estar sujeto a estos Terminos y Condiciones. Si no esta de acuerdo con alguna parte de estos terminos, no debe utilizar nuestro sitio web ni nuestros servicios.`
        },
        {
          title: "2. Descripcion del Servicio",
          content: `Felton es una plataforma de comercio electronico especializada en accesorios de lujo para caballeros. Ofrecemos productos de marcas premium a traves de nuestro sitio web. Nos reservamos el derecho de modificar o discontinuar cualquier aspecto del servicio sin previo aviso.`
        },
        {
          title: "3. Productos y Precios",
          content: `Todos los productos mostrados en nuestro sitio estan sujetos a disponibilidad. Los precios estan expresados en Pesos Argentinos (ARS) o Dolares Estadounidenses (USD) segun se indique. Nos reservamos el derecho de modificar los precios sin previo aviso. Las imagenes de los productos son ilustrativas y pueden diferir ligeramente del producto real.`
        },
        {
          title: "4. Autenticidad Garantizada",
          content: `Todos los productos vendidos por Felton son 100% autenticos. Trabajamos directamente con distribuidores autorizados y garantizamos la procedencia legitima de cada articulo. En caso de cualquier duda sobre la autenticidad, ofrecemos devolucion completa.`
        },
        {
          title: "5. Proceso de Compra",
          content: `Para realizar una compra, los usuarios deben seguir el proceso de checkout indicado en el sitio. El contrato de compraventa se perfecciona una vez que reciba la confirmacion de su pedido. Nos reservamos el derecho de rechazar o cancelar pedidos en casos de errores de precio, problemas de inventario o sospecha de fraude.`
        },
        {
          title: "6. Envios y Entregas",
          content: `Los tiempos de entrega son estimados y pueden variar segun la ubicacion y disponibilidad. Felton no se hace responsable por demoras causadas por terceros (empresas de logistica, aduanas, etc.). Los gastos de envio se calculan al momento del checkout.`
        },
        {
          title: "7. Politica de Devoluciones",
          content: `Aceptamos devoluciones dentro de los 30 dias posteriores a la recepcion del producto, siempre que se encuentre en condiciones originales, sin uso y con su embalaje intacto. Los costos de envio de devolucion corren por cuenta del cliente, excepto en casos de productos defectuosos o error nuestro.`
        },
        {
          title: "8. Propiedad Intelectual",
          content: `Todo el contenido del sitio web, incluyendo textos, imagenes, logotipos, y disenos, es propiedad de Felton o de sus respectivos propietarios. Queda prohibida la reproduccion, distribucion o modificacion sin autorizacion expresa.`
        },
        {
          title: "9. Privacidad de Datos",
          content: `El tratamiento de sus datos personales se rige por nuestra Politica de Privacidad. Al utilizar nuestro sitio, usted acepta la recopilacion y uso de informacion de acuerdo con dicha politica.`
        },
        {
          title: "10. Limitacion de Responsabilidad",
          content: `Felton no sera responsable por danos indirectos, incidentales o consecuentes que resulten del uso o imposibilidad de uso del sitio o sus servicios. Nuestra responsabilidad maxima se limita al monto pagado por el producto en cuestion.`
        },
        {
          title: "11. Ley Aplicable",
          content: `Estos terminos se rigen por las leyes de la Republica Argentina. Cualquier disputa sera sometida a la jurisdiccion de los tribunales ordinarios de la Ciudad Autonoma de Buenos Aires.`
        },
        {
          title: "12. Contacto",
          content: `Para consultas sobre estos Terminos y Condiciones, puede contactarnos a traves de info@felton.ar o mediante nuestro formulario de contacto.`
        }
      ]
    },
    en: {
      title: "Terms and Conditions",
      lastUpdated: "Last updated: January 15, 2026",
      sections: [
        {
          title: "1. Acceptance of Terms",
          content: `By accessing and using the Felton website (felton.ar), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you should not use our website or services.`
        },
        {
          title: "2. Service Description",
          content: `Felton is an e-commerce platform specializing in luxury accessories for gentlemen. We offer products from premium brands through our website. We reserve the right to modify or discontinue any aspect of the service without prior notice.`
        },
        {
          title: "3. Products and Prices",
          content: `All products displayed on our site are subject to availability. Prices are expressed in Argentine Pesos (ARS) or US Dollars (USD) as indicated. We reserve the right to modify prices without prior notice. Product images are illustrative and may differ slightly from the actual product.`
        },
        {
          title: "4. Guaranteed Authenticity",
          content: `All products sold by Felton are 100% authentic. We work directly with authorized distributors and guarantee the legitimate origin of each item. In case of any doubt about authenticity, we offer a full refund.`
        },
        {
          title: "5. Purchase Process",
          content: `To make a purchase, users must follow the checkout process indicated on the site. The purchase contract is perfected once you receive confirmation of your order. We reserve the right to reject or cancel orders in cases of price errors, inventory problems, or suspected fraud.`
        },
        {
          title: "6. Shipping and Delivery",
          content: `Delivery times are estimated and may vary depending on location and availability. Felton is not responsible for delays caused by third parties (logistics companies, customs, etc.). Shipping costs are calculated at checkout.`
        },
        {
          title: "7. Return Policy",
          content: `We accept returns within 30 days of receipt of the product, provided it is in original condition, unused and with its packaging intact. Return shipping costs are the responsibility of the customer, except in cases of defective products or our error.`
        },
        {
          title: "8. Intellectual Property",
          content: `All content on the website, including texts, images, logos, and designs, is the property of Felton or their respective owners. Reproduction, distribution, or modification without express authorization is prohibited.`
        },
        {
          title: "9. Data Privacy",
          content: `The processing of your personal data is governed by our Privacy Policy. By using our site, you agree to the collection and use of information in accordance with said policy.`
        },
        {
          title: "10. Limitation of Liability",
          content: `Felton will not be liable for indirect, incidental, or consequential damages resulting from the use or inability to use the site or its services. Our maximum liability is limited to the amount paid for the product in question.`
        },
        {
          title: "11. Applicable Law",
          content: `These terms are governed by the laws of the Argentine Republic. Any dispute will be subject to the jurisdiction of the ordinary courts of the Autonomous City of Buenos Aires.`
        },
        {
          title: "12. Contact",
          content: `For inquiries about these Terms and Conditions, you can contact us at info@felton.ar or through our contact form.`
        }
      ]
    }
  }

  const content = locale === "es" ? termsContent.es : termsContent.en

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

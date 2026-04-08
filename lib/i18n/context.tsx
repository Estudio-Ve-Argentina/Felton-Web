"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type Locale = "es" | "en";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Translations
const translations: Record<Locale, Record<string, string>> = {
  es: {
    // Navigation
    "nav.collections": "Productos",
    "nav.brands": "Marcas",
    "nav.blog": "Blog",
    "nav.about": "Nosotros",
    "nav.contact": "Contacto",
    "nav.faqs": "Preguntas",
    "nav.guides": "Guías",
    "nav.comparisons": "Comparativas",
    "nav.dictionary": "Diccionario",
    "nav.legal": "Legal",

    // Hero
    "hero.title": "Felton No Es Para Cualquiera",
    "hero.description":
      "Para quienes entienden que la verdadera exclusividad no necesita explicación.",
    "hero.cta.primary": "Ver Productos",
    "hero.cta.secondary": "Nuestra Historia",
    "hero.scroll": "Descubrir",

    // Featured Brands
    "featured.eyebrow": "Marcas Asociadas",
    "featured.title": "Nuestros Socios de Lujo",
    "featured.description":
      "Colaboramos con las marcas más prestigiosas del mundo para ofrecerte lo mejor en accesorios premium.",
    "featured.explore": "Explorar Marca",

    // Philosophy
    "philosophy.eyebrow": "Nuestra Filosofía",
    "philosophy.title": "Exclusividad Sin Compromiso",
    "philosophy.description":
      "No vendemos productos. Curamos experiencias para quienes reconocen la diferencia entre lo común y lo extraordinario.",
    "philosophy.point1.title": "Selección Rigurosa",
    "philosophy.point1.description":
      "Cada pieza pasa por un proceso de selección exhaustivo. Solo lo mejor llega a nuestros productos.",
    "philosophy.point2.title": "Marcas de Elite",
    "philosophy.point2.description":
      "Trabajamos exclusivamente con las marcas más prestigiosas y reconocidas a nivel mundial.",
    "philosophy.point3.title": "Para Conocedores",
    "philosophy.point3.description":
      "Nuestros clientes no buscan ostentación, buscan calidad que habla por sí sola.",

    // Collections
    "collections.eyebrow": "Productos",
    "collections.title": "Curadas Para Cada Momento",
    "collections.description":
      "Cada colección representa un capítulo distinto en la narrativa Felton—organizadas no por tipo de producto, sino por las ocasiones y experiencias que realzan.",
    "collections.everyday.subtitle": "Uso Diario",
    "collections.everyday.title": "Esenciales Cotidianos",
    "collections.everyday.description":
      "Piezas pensadas para el ritmo de la vida diaria. Desde la mañana hasta la noche, accesorios que elevan lo ordinario.",
    "collections.travel.subtitle": "Colección Viaje",
    "collections.travel.title": "El Viajero",
    "collections.travel.description":
      "Para quienes se mueven por el mundo con intención. Fundas y organizadores diseñados para transiciones perfectas.",
    "collections.protection.subtitle": "Protección Premium",
    "collections.protection.title": "Serie Guardian",
    "collections.protection.description":
      "Donde la durabilidad se encuentra con la elegancia. Protección avanzada envuelta en materiales que envejecen con gracia.",
    "collections.editions.subtitle": "Lanzamientos Exclusivos",
    "collections.editions.title": "Ediciones Limitadas",
    "collections.editions.description":
      "Colaboraciones únicas y piezas de temporada para el coleccionista exigente. Cantidades limitadas que aseguran exclusividad.",
    "collections.explore": "Explorar Colección",
    "collections.viewAll": "Ver Todos los Productos",
    "collections.comingSoon": "Próximamente",
    "collections.comingSoonNotice":
      "Nuevos productos en camino — suscribite para ser el primero en enterarte.",

    // Brands
    "brands.eyebrow": "Marcas",
    "brands.title": "Las Mejores del Mundo",
    "brands.description":
      "Trabajamos exclusivamente con marcas que comparten nuestra visión de excelencia sin compromiso.",
    "brands.viewProducts": "Ver Productos",

    // Products
    "products.eyebrow": "Destacados",
    "products.title": "Selección del Curador",
    "products.description":
      "Los productos más exclusivos de nuestra colección, elegidos por su calidad excepcional y diseño atemporal.",
    "products.new": "Nuevo",
    "products.limited": "Edición Limitada",
    "products.viewProduct": "Ver Producto",
    "products.addToCart": "Comprar Ahora",

    // Testimonials
    "testimonials.eyebrow": "Testimonios",
    "testimonials.title": "Lo Que Dicen Nuestros Clientes",
    "testimonials.description":
      "Las experiencias de quienes ya descubrieron la diferencia Felton.",

    // Craftsmanship
    "craftsmanship.eyebrow": "Artesanía",
    "craftsmanship.title": "El Arte del Detalle",
    "craftsmanship.description":
      "Cada producto que seleccionamos cumple con los más altos estándares de calidad y diseño.",

    // Newsletter
    "newsletter.title": "Acceso Exclusivo",
    "newsletter.description":
      "Suscribite para recibir primero las novedades, lanzamientos exclusivos y ofertas especiales solo para miembros.",
    "newsletter.placeholder": "Tu email",
    "newsletter.button": "Suscribirme",
    "newsletter.privacy":
      "Respetamos tu privacidad. Podés darte de baja en cualquier momento.",
    "newsletter.success": "Gracias por suscribirte",

    // Footer
    "footer.description":
      "Accesorios premium para quienes entienden que lo mejor no es para cualquiera.",
    "footer.discover": "Descubrir",
    "footer.newArrivals": "Nuevos Ingresos",
    "footer.bestsellers": "Más Vendidos",
    "footer.learn": "Aprender",
    "footer.support": "Soporte",
    "footer.shipping": "Envíos y Devoluciones",
    "footer.company": "Empresa",
    "footer.philosophy": "Nuestra Filosofía",
    "footer.quality": "Estándares de Calidad",
    "footer.rights": "Todos los derechos reservados.",
    "footer.tagline": "No es para cualquiera.",
    "footer.privacy": "Privacidad",
    "footer.terms": "Términos",
    "footer.legal": "Aviso Legal",

    // Contact
    "contact.eyebrow": "Contacto",
    "contact.title": "Hablemos",
    "contact.description":
      "Estamos acá para ayudarte a encontrar exactamente lo que buscás.",
    "contact.form.name": "Nombre",
    "contact.form.email": "Email",
    "contact.form.subject": "Asunto",
    "contact.form.message": "Mensaje",
    "contact.form.submit": "Enviar Mensaje",
    "contact.info.title": "Información",
    "contact.info.email": "Email",
    "contact.info.response": "Respondemos en 24-48hs",

    // About
    "about.eyebrow": "Nuestra Historia",
    "about.title": "Más Que Una Tienda",
    "about.description":
      "Felton nació de una simple observación: las personas que realmente aprecian la calidad no necesitan que se la expliquen.",

    // Blog
    "blog.eyebrow": "Blog",
    "blog.title": "Últimas Novedades",
    "blog.description":
      "Explorá el mundo de los accesorios premium, tendencias y consejos de estilo.",
    "blog.readMore": "Leer Más",
    "blog.categories": "Categorías",
    "blog.recentPosts": "Posts Recientes",

    // Legal
    "legal.eyebrow": "Información Legal",
    "legal.title": "Términos y Condiciones",
    "legal.disclaimer.title": "Aviso Importante",
    "legal.disclaimer.content":
      "Felton comercializa productos de alta gama de diversas marcas reconocidas internacionalmente. Algunos de nuestros productos son réplicas de alta calidad, las cuales son claramente identificadas en su descripción. Nos comprometemos con la transparencia total hacia nuestros clientes.",
    "legal.replica.title": "Sobre Nuestras Réplicas",
    "legal.replica.content":
      "Las réplicas que comercializamos son productos inspirados en diseños de marcas de lujo, fabricados con materiales de primera calidad. Estas NO son productos originales de las marcas mencionadas y se venden como alternativas de alta calidad a precios accesibles. Al realizar una compra, el cliente acepta y reconoce esta condición.",

    // FAQs
    "faqs.eyebrow": "Preguntas Frecuentes",
    "faqs.title": "Respuestas Rápidas",
    "faqs.description":
      "Todo lo que necesitás saber sobre Felton, nuestros productos y servicios.",

    // Common
    "common.learnMore": "Saber Más",
    "common.viewAll": "Ver Todo",
    "common.back": "Volver",
    "common.loading": "Cargando...",
    "common.error": "Error",
    "common.success": "Éxito",
    "common.language": "Idioma",
  },
  en: {
    // Navigation
    "nav.collections": "Collections",
    "nav.brands": "Brands",
    "nav.blog": "Blog",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.faqs": "FAQs",
    "nav.guides": "Guides",
    "nav.comparisons": "Comparisons",
    "nav.dictionary": "Dictionary",
    "nav.legal": "Legal",

    // Hero
    "hero.title": "Felton Is Not For Everyone",
    "hero.description":
      "For those who understand that true exclusivity needs no explanation.",
    "hero.cta.primary": "View Collections",
    "hero.cta.secondary": "Our Story",
    "hero.scroll": "Discover",

    // Featured Brands
    "featured.eyebrow": "Partner Brands",
    "featured.title": "Our Luxury Partners",
    "featured.description":
      "We collaborate with the world's most prestigious brands to bring you the finest in premium accessories.",
    "featured.explore": "Explore Brand",

    // Philosophy
    "philosophy.eyebrow": "Our Philosophy",
    "philosophy.title": "Exclusivity Without Compromise",
    "philosophy.description":
      "We don't sell products. We curate experiences for those who recognize the difference between the ordinary and the extraordinary.",
    "philosophy.point1.title": "Rigorous Selection",
    "philosophy.point1.description":
      "Every piece goes through an exhaustive selection process. Only the best makes it to our collections.",
    "philosophy.point2.title": "Elite Brands",
    "philosophy.point2.description":
      "We work exclusively with the most prestigious and globally recognized brands.",
    "philosophy.point3.title": "For Connoisseurs",
    "philosophy.point3.description":
      "Our clients don't seek ostentation, they seek quality that speaks for itself.",

    // Collections
    "collections.eyebrow": "Collections",
    "collections.title": "Curated For Every Moment",
    "collections.description":
      "Each collection represents a distinct chapter in the Felton narrative—organized not by product type, but by the occasions and experiences they enhance.",
    "collections.everyday.subtitle": "Daily Use",
    "collections.everyday.title": "Everyday Essentials",
    "collections.everyday.description":
      "Pieces designed for the rhythm of daily life. From morning to night, accessories that elevate the ordinary.",
    "collections.travel.subtitle": "Travel Collection",
    "collections.travel.title": "The Traveler",
    "collections.travel.description":
      "For those who move through the world with intention. Cases and organizers designed for seamless transitions.",
    "collections.protection.subtitle": "Premium Protection",
    "collections.protection.title": "Guardian Series",
    "collections.protection.description":
      "Where durability meets elegance. Advanced protection wrapped in materials that age gracefully.",
    "collections.editions.subtitle": "Exclusive Releases",
    "collections.editions.title": "Limited Editions",
    "collections.editions.description":
      "Unique collaborations and seasonal pieces for the discerning collector. Limited quantities ensuring exclusivity.",
    "collections.explore": "Explore Collection",
    "collections.viewAll": "View All Collections",
    "collections.comingSoon": "Coming Soon",
    "collections.comingSoonNotice":
      "New collections on the way — subscribe to be the first to know.",

    // Brands
    "brands.eyebrow": "Brands",
    "brands.title": "The World's Finest",
    "brands.description":
      "We work exclusively with brands that share our vision of uncompromising excellence.",
    "brands.viewProducts": "View Products",

    // Products
    "products.eyebrow": "Featured",
    "products.title": "Curator's Selection",
    "products.description":
      "The most exclusive products in our collection, chosen for their exceptional quality and timeless design.",
    "products.new": "New",
    "products.limited": "Limited Edition",
    "products.viewProduct": "View Product",
    "products.addToCart": "Buy Now",

    // Testimonials
    "testimonials.eyebrow": "Testimonials",
    "testimonials.title": "What Our Clients Say",
    "testimonials.description":
      "Experiences from those who have discovered the Felton difference.",

    // Craftsmanship
    "craftsmanship.eyebrow": "Craftsmanship",
    "craftsmanship.title": "The Art of Detail",
    "craftsmanship.description":
      "Every product we select meets the highest standards of quality and design.",

    // Newsletter
    "newsletter.title": "Exclusive Access",
    "newsletter.description":
      "Subscribe to receive news first, exclusive launches and special offers for members only.",
    "newsletter.placeholder": "Your email",
    "newsletter.button": "Subscribe",
    "newsletter.privacy":
      "We respect your privacy. You can unsubscribe at any time.",
    "newsletter.success": "Thank you for subscribing",

    // Footer
    "footer.description":
      "Premium accessories for those who understand that the best is not for everyone.",
    "footer.discover": "Discover",
    "footer.newArrivals": "New Arrivals",
    "footer.bestsellers": "Bestsellers",
    "footer.learn": "Learn",
    "footer.support": "Support",
    "footer.shipping": "Shipping & Returns",
    "footer.company": "Company",
    "footer.philosophy": "Our Philosophy",
    "footer.quality": "Quality Standards",
    "footer.rights": "All rights reserved.",
    "footer.tagline": "Not for everyone.",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "footer.legal": "Legal Notice",

    // Contact
    "contact.eyebrow": "Contact",
    "contact.title": "Let's Talk",
    "contact.description":
      "We're here to help you find exactly what you're looking for.",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.subject": "Subject",
    "contact.form.message": "Message",
    "contact.form.submit": "Send Message",
    "contact.info.title": "Information",
    "contact.info.email": "Email",
    "contact.info.response": "We respond within 24-48h",

    // About
    "about.eyebrow": "Our Story",
    "about.title": "More Than A Store",
    "about.description":
      "Felton was born from a simple observation: people who truly appreciate quality don't need it explained to them.",

    // Blog
    "blog.eyebrow": "Blog",
    "blog.title": "Latest News",
    "blog.description":
      "Explore the world of premium accessories, trends and style tips.",
    "blog.readMore": "Read More",
    "blog.categories": "Categories",
    "blog.recentPosts": "Recent Posts",

    // Legal
    "legal.eyebrow": "Legal Information",
    "legal.title": "Terms & Conditions",
    "legal.disclaimer.title": "Important Notice",
    "legal.disclaimer.content":
      "Felton sells high-end products from various internationally recognized brands. Some of our products are high-quality replicas, which are clearly identified in their description. We are committed to total transparency with our customers.",
    "legal.replica.title": "About Our Replicas",
    "legal.replica.content":
      "The replicas we sell are products inspired by luxury brand designs, manufactured with top-quality materials. These are NOT original products from the mentioned brands and are sold as high-quality alternatives at accessible prices. By making a purchase, the customer accepts and acknowledges this condition.",

    // FAQs
    "faqs.eyebrow": "Frequently Asked Questions",
    "faqs.title": "Quick Answers",
    "faqs.description":
      "Everything you need to know about Felton, our products and services.",

    // Common
    "common.learnMore": "Learn More",
    "common.viewAll": "View All",
    "common.back": "Back",
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.language": "Language",
  },
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("felton-locale", newLocale);
    }
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[locale][key] || key;
    },
    [locale],
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

export function useTranslation() {
  const { t, locale } = useI18n();
  return { t, locale };
}

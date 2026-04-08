import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ArrowLeft, ExternalLink } from "lucide-react"
import { Header, Footer, Section, SectionHeader } from "@/components/layout"
import { notFound } from "next/navigation"

// Collection data - In production, this would come from a CMS or API
const collectionsData = {
  everyday: {
    title: "Everyday Essentials",
    subtitle: "Daily Companions",
    description: "Thoughtfully designed pieces for the rhythms of daily life. From morning commute to evening pursuits, accessories that elevate the ordinary into something meaningful.",
    philosophy: "The everyday deserves elegance. These pieces are engineered for the subtle demands of modern life—protective without bulk, refined without pretense. Each item is designed to become a seamless extension of your daily ritual.",
    products: [
      {
        id: "classic-sleeve",
        name: "Classic Sleeve",
        description: "Full-grain leather sleeve with microfiber interior. Designed for daily protection without adding bulk.",
        price: "€89",
        features: ["Full-grain leather", "Microfiber lining", "Slim profile", "Available in 3 sizes"],
        externalUrl: "#", // Tienda Nube link
      },
      {
        id: "executive-folio",
        name: "Executive Folio",
        description: "Multi-compartment organizer for documents, devices, and essentials. The professional's daily companion.",
        price: "€149",
        features: ["Premium leather exterior", "Multiple compartments", "Card slots", "Pen holder"],
        externalUrl: "#",
      },
      {
        id: "minimalist-wallet",
        name: "Minimalist Wallet",
        description: "Streamlined card holder with thoughtful organization. Carries what matters, nothing more.",
        price: "€69",
        features: ["6 card slots", "Cash compartment", "RFID protection", "Vegetable-tanned leather"],
        externalUrl: "#",
      },
      {
        id: "desk-mat",
        name: "Artisan Desk Mat",
        description: "Transform your workspace with this hand-finished leather surface. Develops unique patina over time.",
        price: "€129",
        features: ["Full-grain leather", "Non-slip backing", "Hand-finished edges", "Large format"],
        externalUrl: "#",
      },
    ],
  },
  travel: {
    title: "The Traveler",
    subtitle: "Journey Collection",
    description: "For those who move through the world with intention. Protective cases and organizers engineered for seamless transitions between destinations.",
    philosophy: "Travel reveals character—both yours and your possessions'. The Traveler collection is designed to arrive as composed as it departed, protecting your essentials while maintaining refined aesthetics.",
    products: [
      {
        id: "tech-organizer",
        name: "Tech Organizer",
        description: "Comprehensive storage for cables, chargers, and digital accessories. Security checkpoint friendly.",
        price: "€129",
        features: ["Multiple elastic loops", "Padded compartments", "Water-resistant lining", "TSA friendly"],
        externalUrl: "#",
      },
      {
        id: "document-holder",
        name: "Document Holder",
        description: "Passport, tickets, and travel documents in elegant organization. Peace of mind in your pocket.",
        price: "€179",
        features: ["Passport pocket", "Boarding pass slot", "Card organization", "Pen loop"],
        externalUrl: "#",
      },
      {
        id: "cable-pouch",
        name: "Cable Pouch",
        description: "Compact organization for essential cables and adapters. Never search through tangled cords again.",
        price: "€59",
        features: ["Compact design", "Interior dividers", "YKK zippers", "Durable construction"],
        externalUrl: "#",
      },
      {
        id: "weekender-insert",
        name: "Weekender Insert",
        description: "Modular organizer system that transforms any bag into a properly organized travel companion.",
        price: "€89",
        features: ["Modular design", "Multiple sizes", "Removes easily", "Lightweight"],
        externalUrl: "#",
      },
    ],
  },
  protection: {
    title: "Guardian Series",
    subtitle: "Premium Protection",
    description: "Where durability meets elegance. Advanced protection for your most valuable possessions, wrapped in materials that develop character over time.",
    philosophy: "Protection should never compromise aesthetics. The Guardian Series offers defense through design—invisible until needed, beautiful always. Each case undergoes rigorous testing while maintaining our signature refined appearance.",
    products: [
      {
        id: "impact-case",
        name: "Impact Case",
        description: "Military-grade protection in a slim profile. Exceeds drop test standards without bulk.",
        price: "€99",
        features: ["Drop tested", "Slim profile", "Raised edges", "Wireless charging compatible"],
        externalUrl: "#",
      },
      {
        id: "leather-shield",
        name: "Leather Shield",
        description: "Full-grain leather wrapped around protective core. Luxury meets durability.",
        price: "€119",
        features: ["Full-grain leather", "Shock-absorbing core", "Precision cutouts", "Card slot option"],
        externalUrl: "#",
      },
      {
        id: "premium-armor",
        name: "Premium Armor",
        description: "Our most protective case. Multiple layers of defense in an elegantly engineered package.",
        price: "€159",
        features: ["Multi-layer protection", "Antimicrobial coating", "Screen protection", "Lifetime warranty"],
        externalUrl: "#",
      },
      {
        id: "screen-guard",
        name: "Invisible Shield",
        description: "Edge-to-edge protection that maintains touch sensitivity and visual clarity.",
        price: "€49",
        features: ["Edge-to-edge coverage", "Oleophobic coating", "Easy installation", "Bubble-free"],
        externalUrl: "#",
      },
    ],
  },
  editions: {
    title: "Limited Editions",
    subtitle: "Exclusive Releases",
    description: "Rare collaborations and seasonal pieces for the discerning collector. Limited quantities ensure exclusivity without compromise.",
    philosophy: "Scarcity with purpose. Each limited edition represents a moment in Felton's evolving design language—collectible today, timeless tomorrow. These pieces reward those who appreciate the intersection of art and utility.",
    products: [
      {
        id: "anniversary-edition",
        name: "Anniversary Edition",
        description: "Commemorating our founding with a special collection featuring unique materials and finishes.",
        price: "€249",
        features: ["Numbered edition", "Special packaging", "Certificate of authenticity", "Exclusive colorway"],
        externalUrl: "#",
      },
      {
        id: "artist-series",
        name: "Artist Series",
        description: "Collaboration with emerging artists bringing unique perspectives to everyday objects.",
        price: "€199",
        features: ["Artist collaboration", "Limited run", "Unique artwork", "Collector's packaging"],
        externalUrl: "#",
      },
      {
        id: "heritage-collection",
        name: "Heritage Collection",
        description: "Reimagining classic Felton designs with premium materials and enhanced construction.",
        price: "€289",
        features: ["Premium materials", "Hand-numbered", "Archive design", "Wooden presentation box"],
        externalUrl: "#",
      },
      {
        id: "seasonal-release",
        name: "Seasonal Release",
        description: "Quarterly limited editions featuring colors and materials inspired by the changing seasons.",
        price: "€169",
        features: ["Seasonal colors", "Limited availability", "Special materials", "Gift packaging"],
        externalUrl: "#",
      },
    ],
  },
}

type CollectionSlug = keyof typeof collectionsData

export async function generateStaticParams() {
  return Object.keys(collectionsData).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  const collection = collectionsData[slug as CollectionSlug]
  
  if (!collection) {
    return {
      title: "Collection Not Found",
    }
  }
  
  return {
    title: collection.title,
    description: collection.description,
  }
}

export default async function CollectionPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const collection = collectionsData[slug as CollectionSlug]
  
  if (!collection) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <Section size="large" variant="textured" className="relative">
          <div className="absolute inset-0 bg-background/90" />
          <div className="relative z-10">
            {/* Back link */}
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-primary mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              All Collections
            </Link>
            
            <SectionHeader
              eyebrow={collection.subtitle}
              title={collection.title}
              description={collection.description}
              align="left"
            />
            
            <p className="mt-6 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground/80 italic">
              {collection.philosophy}
            </p>
          </div>
        </Section>

        {/* Products Grid */}
        <Section size="large">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
            {collection.products.map((product) => (
              <div
                key={product.id}
                className="group border border-border/30 bg-card/30 p-8 transition-all duration-300 hover:border-primary/30 lg:p-10"
              >
                {/* Product Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-light tracking-tight text-foreground lg:text-2xl">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-lg font-light text-primary">
                      {product.price}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
                  {product.description}
                </p>

                {/* Features */}
                <div className="mt-6 pt-6 border-t border-border/20">
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60 mb-3">
                    Features
                  </p>
                  <ul className="grid grid-cols-2 gap-2">
                    {product.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-xs font-light text-muted-foreground"
                      >
                        — {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA - Links to Tienda Nube */}
                <div className="mt-8">
                  <a
                    href={product.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-2 text-sm font-medium text-primary transition-all hover:gap-3"
                  >
                    View Product Details
                    <ExternalLink className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Related Section */}
        <Section variant="dark" size="default" className="border-t border-border/20">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-primary/70 mb-2">
                Need Help Choosing?
              </p>
              <p className="text-sm font-light text-muted-foreground">
                Our guides provide detailed comparisons and recommendations.
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/guides"
                className="group inline-flex items-center gap-2 border border-primary bg-primary px-6 py-2.5 text-sm font-medium tracking-wide text-primary-foreground transition-all hover:bg-primary/90"
              >
                View Guides
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/comparisons"
                className="inline-flex items-center gap-2 border border-border px-6 py-2.5 text-sm font-medium tracking-wide text-foreground transition-all hover:border-primary hover:text-primary"
              >
                Comparisons
              </Link>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}

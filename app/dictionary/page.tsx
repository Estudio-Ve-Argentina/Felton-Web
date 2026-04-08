import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Header, Footer, Section, SectionHeader } from "@/components/layout"

export const metadata: Metadata = {
  title: "Dictionary",
  description: "A comprehensive glossary of luxury craftsmanship terms, materials, and finishing techniques. Understanding the language of quality.",
}

const glossaryTerms = [
  {
    letter: "A",
    terms: [
      {
        term: "Aniline Leather",
        definition: "Leather dyed exclusively with soluble dyes without covering the surface with a topcoat or pigments. This process allows the natural surface of the hide to remain visible, resulting in the most natural look and feel but also making it more susceptible to staining.",
        related: ["Full-Grain Leather", "Semi-Aniline"],
      },
      {
        term: "Artisan Finishing",
        definition: "Hand-applied finishing techniques performed by skilled craftspeople rather than machines. These methods often result in subtle variations that give each piece unique character while ensuring exceptional attention to detail.",
        related: ["Hand-Stitching", "Burnishing"],
      },
    ],
  },
  {
    letter: "B",
    terms: [
      {
        term: "Burnishing",
        definition: "A finishing technique where leather edges are rubbed with friction and heat to seal and polish them, creating a smooth, professional finish that prevents fraying and adds durability. Often done with wood or bone tools.",
        related: ["Edge Finishing", "Artisan Finishing"],
      },
      {
        term: "Bridle Leather",
        definition: "A premium leather originally developed for horse bridles and tack. It's vegetable-tanned and then stuffed with tallow and wax, making it extremely durable and water-resistant while developing a beautiful patina over time.",
        related: ["Vegetable Tanning", "Full-Grain Leather"],
      },
    ],
  },
  {
    letter: "C",
    terms: [
      {
        term: "Chrome Tanning",
        definition: "A modern tanning process using chromium salts that takes hours rather than weeks. Produces softer, more uniform leather that's resistant to water and staining, though it doesn't develop patina like vegetable-tanned leather.",
        related: ["Vegetable Tanning", "Combination Tanning"],
      },
      {
        term: "Cowhide",
        definition: "The most commonly used leather, sourced from cattle. Offers excellent durability, availability in various grades, and consistent quality. The thickness and texture vary depending on the age of the animal and which part of the hide is used.",
        related: ["Full-Grain Leather", "Top-Grain Leather"],
      },
    ],
  },
  {
    letter: "E",
    terms: [
      {
        term: "Edge Finishing",
        definition: "The treatment applied to the cut edges of leather to prevent deterioration and create a polished appearance. Methods include burnishing, painting, folding, and binding—each offering different aesthetics and durability profiles.",
        related: ["Burnishing", "Artisan Finishing"],
      },
      {
        term: "Embossing",
        definition: "A process that creates raised or recessed patterns on leather using heat and pressure. Used to add texture, create patterns, or apply logos. Deeper embossing on high-quality leather retains detail better over time.",
        related: ["Hot Stamping", "Debossing"],
      },
    ],
  },
  {
    letter: "F",
    terms: [
      {
        term: "Full-Grain Leather",
        definition: "The highest quality leather, using the entire grain surface of the hide without any sanding or buffing. Retains natural markings and develops a distinctive patina over time. The strongest and most durable leather type available.",
        related: ["Top-Grain Leather", "Patina"],
      },
      {
        term: "Finishing",
        definition: "The final treatments applied to leather that determine its appearance, feel, and performance characteristics. Includes dyeing, buffing, coating, and protective treatments. The finishing process significantly impacts how leather ages and performs.",
        related: ["Aniline Leather", "Protective Coating"],
      },
    ],
  },
  {
    letter: "G",
    terms: [
      {
        term: "Grain",
        definition: "The outer surface of leather, featuring the natural texture and pattern of the animal's skin. The grain is the strongest part of the hide and its appearance varies based on the animal and tanning process used.",
        related: ["Full-Grain Leather", "Top-Grain Leather"],
      },
      {
        term: "Glazing",
        definition: "A finishing technique that creates a high-shine surface by applying pressure with glass or steel rollers. Creates a formal, polished appearance while maintaining the leather's natural characteristics underneath.",
        related: ["Finishing", "Burnishing"],
      },
    ],
  },
  {
    letter: "H",
    terms: [
      {
        term: "Hand-Stitching",
        definition: "Traditional sewing technique using two needles and a single thread, creating a distinctive look and superior durability compared to machine stitching. If one stitch breaks, the rest remain intact. A hallmark of premium craftsmanship.",
        related: ["Saddle Stitching", "Artisan Finishing"],
      },
      {
        term: "Hide",
        definition: "The raw, unprocessed skin of a large animal before tanning. The quality of the hide—determined by the animal's life conditions—sets the foundation for the quality of the finished leather product.",
        related: ["Tanning", "Full-Grain Leather"],
      },
    ],
  },
  {
    letter: "M",
    terms: [
      {
        term: "Microfiber Lining",
        definition: "A synthetic material made from ultra-fine fibers that's soft, lightweight, and excellent at protecting sensitive surfaces. Often used as interior lining in cases and sleeves to prevent scratches.",
        related: ["Interior Construction", "Technical Fabric"],
      },
      {
        term: "Molding",
        definition: "Shaping wet leather over a form and allowing it to dry, creating permanent three-dimensional shapes. This technique allows leather to maintain precise forms while retaining its structural integrity.",
        related: ["Wet Forming", "Construction"],
      },
    ],
  },
  {
    letter: "P",
    terms: [
      {
        term: "Patina",
        definition: "The character that develops on leather over time through use and exposure to natural elements. A desirable quality in premium leather, patina represents the personal history of a piece and is considered a sign of quality rather than wear.",
        related: ["Full-Grain Leather", "Vegetable Tanning"],
      },
      {
        term: "Protective Coating",
        definition: "A clear finish applied to leather surfaces to protect against stains, moisture, and environmental damage. While reducing the natural feel slightly, it significantly increases durability and maintenance ease.",
        related: ["Finishing", "Weather Resistance"],
      },
    ],
  },
  {
    letter: "S",
    terms: [
      {
        term: "Saddle Stitching",
        definition: "A hand-stitching technique using two needles and waxed thread, passing through each hole twice from opposite directions. Creates exceptionally strong seams that won't unravel if a thread breaks. Named for its use in saddle making.",
        related: ["Hand-Stitching", "Artisan Finishing"],
      },
      {
        term: "Semi-Aniline",
        definition: "Leather that's dyed with aniline dyes but has a light protective coating applied. Offers a balance between the natural look of aniline leather and the practical protection of pigmented leather.",
        related: ["Aniline Leather", "Finishing"],
      },
    ],
  },
  {
    letter: "T",
    terms: [
      {
        term: "Tanning",
        definition: "The process of converting raw animal hides into stable leather through chemical treatment. The two primary methods—vegetable and chrome tanning—produce leathers with distinctly different characteristics.",
        related: ["Vegetable Tanning", "Chrome Tanning"],
      },
      {
        term: "Top-Grain Leather",
        definition: "The second-highest grade of leather, where the surface has been slightly sanded to remove imperfections. More uniform in appearance than full-grain but slightly less strong. Still a premium material with excellent durability.",
        related: ["Full-Grain Leather", "Grain"],
      },
    ],
  },
  {
    letter: "V",
    terms: [
      {
        term: "Vegetable Tanning",
        definition: "The traditional tanning method using natural tannins from bark, leaves, and other plant materials. A slow process taking weeks or months that produces firm, durable leather known for developing rich patina over time.",
        related: ["Tanning", "Patina"],
      },
      {
        term: "Vachetta Leather",
        definition: "A type of vegetable-tanned leather left in its natural state without protective coating. Highly sought after for its ability to develop dramatic patina, it's also sensitive to water and oils.",
        related: ["Vegetable Tanning", "Patina"],
      },
    ],
  },
]

export default function DictionaryPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <Section size="large" variant="textured" className="relative">
          <div className="absolute inset-0 bg-background/90" />
          <div className="relative z-10">
            <SectionHeader
              eyebrow="Terminology"
              title="Dictionary"
              description="Understanding the language of luxury craftsmanship. A comprehensive glossary of materials, techniques, and quality indicators that define premium accessories."
            />
          </div>
        </Section>

        {/* Quick Navigation */}
        <Section size="small" className="border-b border-border/20">
          <div className="flex flex-wrap justify-center gap-3">
            {glossaryTerms.map((section) => (
              <a
                key={section.letter}
                href={`#letter-${section.letter.toLowerCase()}`}
                className="flex items-center justify-center w-10 h-10 border border-border/30 text-sm font-light text-muted-foreground transition-all hover:border-primary hover:text-primary"
              >
                {section.letter}
              </a>
            ))}
          </div>
        </Section>

        {/* Glossary Content */}
        <Section size="large">
          <div className="space-y-16">
            {glossaryTerms.map((section) => (
              <div key={section.letter} id={`letter-${section.letter.toLowerCase()}`}>
                {/* Letter Header */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="font-serif text-4xl font-light text-primary lg:text-5xl">
                    {section.letter}
                  </span>
                  <div className="h-px flex-1 bg-border/30" />
                </div>

                {/* Terms */}
                <div className="space-y-8">
                  {section.terms.map((item) => (
                    <div
                      key={item.term}
                      className="border-l-2 border-primary/20 pl-6 lg:pl-8"
                    >
                      <h3 className="font-serif text-xl font-light tracking-tight text-foreground lg:text-2xl">
                        {item.term}
                      </h3>
                      <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground max-w-3xl">
                        {item.definition}
                      </p>
                      {item.related.length > 0 && (
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
                            Related:
                          </span>
                          {item.related.map((rel, i) => (
                            <span key={rel} className="text-xs font-light text-primary/70">
                              {rel}{i < item.related.length - 1 && ","}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* CTA Section */}
        <Section variant="dark" size="default" className="border-t border-border/20">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-primary/70 mb-4">
              Continue Learning
            </p>
            <h3 className="font-serif text-2xl font-light tracking-tight text-foreground lg:text-3xl">
              Explore our guides for in-depth understanding
            </h3>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <Link
                href="/guides"
                className="group inline-flex items-center gap-2 border border-primary bg-primary px-8 py-3 text-sm font-medium tracking-wide text-primary-foreground transition-all hover:bg-primary/90"
              >
                View Guides
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/comparisons"
                className="inline-flex items-center gap-2 border border-border px-8 py-3 text-sm font-medium tracking-wide text-foreground transition-all hover:border-primary hover:text-primary"
              >
                See Comparisons
              </Link>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}

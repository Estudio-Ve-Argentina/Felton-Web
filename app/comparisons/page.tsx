import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check, Minus } from "lucide-react"
import { Header, Footer, Section, SectionHeader } from "@/components/layout"

export const metadata: Metadata = {
  title: "Comparisons",
  description: "Detailed comparisons of materials, finishes, and product features. Make informed decisions with Felton's transparent approach to quality.",
}

const materialComparisons = [
  {
    name: "Full-Grain Leather",
    description: "The highest quality leather, retaining the complete grain surface. Develops rich patina over time.",
    durability: 5,
    aesthetics: 5,
    pricePoint: "Premium",
    careLevel: "Moderate",
    aging: "Exceptional—develops unique character",
    bestFor: "Collectors and those who appreciate natural aging",
  },
  {
    name: "Top-Grain Leather",
    description: "Slightly sanded to remove imperfections while maintaining excellent quality and durability.",
    durability: 4,
    aesthetics: 4,
    pricePoint: "Mid-Premium",
    careLevel: "Low",
    aging: "Good—more consistent appearance over time",
    bestFor: "Daily use where uniform appearance is preferred",
  },
  {
    name: "Vegetable-Tanned Leather",
    description: "Traditional tanning process using natural materials. Eco-friendly with distinctive character.",
    durability: 4,
    aesthetics: 5,
    pricePoint: "Premium",
    careLevel: "Higher",
    aging: "Exceptional—rich patina development",
    bestFor: "Environmentally conscious buyers seeking character",
  },
  {
    name: "Technical Fabric",
    description: "Engineered materials offering specific performance characteristics. Weather and stain resistant.",
    durability: 5,
    aesthetics: 3,
    pricePoint: "Mid",
    careLevel: "Minimal",
    aging: "Stable—maintains original appearance",
    bestFor: "Active lifestyles and demanding environments",
  },
]

const finishComparisons = [
  {
    name: "Natural Finish",
    aspect: "Appearance",
    description: "Uncoated surface that reveals the leather's natural texture and allows for maximum patina development.",
    pros: ["Authentic feel", "Best patina", "Breathable"],
    cons: ["More susceptible to stains", "Requires care"],
  },
  {
    name: "Waxed Finish",
    aspect: "Protection",
    description: "Light wax coating providing modest protection while maintaining natural leather characteristics.",
    pros: ["Water resistance", "Enhanced durability", "Natural look"],
    cons: ["Requires reapplication", "Slightly different feel"],
  },
  {
    name: "Burnished Finish",
    aspect: "Aesthetics",
    description: "Hand-rubbed treatment creating subtle color variations and an aged appearance from the start.",
    pros: ["Immediate character", "Hides minor wear", "Unique"],
    cons: ["Less predictable aging", "Premium pricing"],
  },
  {
    name: "Protective Coating",
    aspect: "Durability",
    description: "Clear coating providing maximum protection against stains, scratches, and environmental damage.",
    pros: ["Maximum protection", "Easy maintenance", "Consistent look"],
    cons: ["Less natural feel", "Limited patina"],
  },
]

const featureComparisons = {
  headers: ["Feature", "Everyday", "Guardian", "Limited"],
  rows: [
    { feature: "Wireless Charging Compatible", everyday: true, guardian: true, limited: true },
    { feature: "RFID Protection", everyday: true, guardian: false, limited: true },
    { feature: "Drop Protection", everyday: false, guardian: true, limited: true },
    { feature: "Water Resistance", everyday: false, guardian: true, limited: false },
    { feature: "Full-Grain Leather", everyday: true, guardian: false, limited: true },
    { feature: "Numbered Edition", everyday: false, guardian: false, limited: true },
    { feature: "Lifetime Warranty", everyday: false, guardian: true, limited: true },
    { feature: "Gift Packaging", everyday: false, guardian: false, limited: true },
  ],
}

function RatingDots({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`h-2 w-2 rounded-full ${
            i < value ? "bg-primary" : "bg-border/30"
          }`}
        />
      ))}
    </div>
  )
}

export default function ComparisonsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <Section size="large" variant="textured" className="relative">
          <div className="absolute inset-0 bg-background/90" />
          <div className="relative z-10">
            <SectionHeader
              eyebrow="Informed Decisions"
              title="Comparisons"
              description="Understanding the differences helps you choose with confidence. We believe in transparency—here's how our materials, finishes, and features compare."
            />
          </div>
        </Section>

        {/* Materials Comparison */}
        <Section size="large">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-serif text-2xl font-light tracking-tight text-foreground lg:text-3xl">
              Materials
            </h2>
            <div className="h-px flex-1 bg-border/30" />
          </div>

          <p className="max-w-2xl text-sm font-light leading-relaxed text-muted-foreground mb-10">
            Each material offers distinct characteristics. Your choice depends on how you value 
            durability versus aesthetics, and whether you prefer materials that age gracefully 
            or maintain their original appearance.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left pb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
                    Material
                  </th>
                  <th className="text-left pb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
                    Durability
                  </th>
                  <th className="text-left pb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
                    Aesthetics
                  </th>
                  <th className="text-left pb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
                    Price Point
                  </th>
                  <th className="text-left pb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
                    Care Level
                  </th>
                </tr>
              </thead>
              <tbody>
                {materialComparisons.map((material) => (
                  <tr key={material.name} className="border-b border-border/20">
                    <td className="py-6">
                      <p className="font-serif text-lg font-light text-foreground">
                        {material.name}
                      </p>
                      <p className="mt-1 text-xs font-light text-muted-foreground max-w-xs">
                        {material.description}
                      </p>
                    </td>
                    <td className="py-6">
                      <RatingDots value={material.durability} />
                    </td>
                    <td className="py-6">
                      <RatingDots value={material.aesthetics} />
                    </td>
                    <td className="py-6 text-sm font-light text-foreground">
                      {material.pricePoint}
                    </td>
                    <td className="py-6 text-sm font-light text-foreground">
                      {material.careLevel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Detailed Material Cards */}
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
            {materialComparisons.map((material) => (
              <div
                key={material.name}
                className="border border-border/30 bg-card/30 p-6 lg:p-8"
              >
                <h3 className="font-serif text-xl font-light tracking-tight text-foreground">
                  {material.name}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
                  {material.description}
                </p>
                <div className="mt-6 pt-6 border-t border-border/20 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-light text-muted-foreground">Aging:</span>
                    <span className="font-light text-foreground text-right max-w-[60%]">
                      {material.aging}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-light text-muted-foreground">Best for:</span>
                    <span className="font-light text-foreground text-right max-w-[60%]">
                      {material.bestFor}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Finishes Comparison */}
        <Section size="large" variant="dark">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-serif text-2xl font-light tracking-tight text-foreground lg:text-3xl">
              Finishes
            </h2>
            <div className="h-px flex-1 bg-border/30" />
          </div>

          <p className="max-w-2xl text-sm font-light leading-relaxed text-muted-foreground mb-10">
            The finish applied to leather affects both its appearance and performance. 
            Each option represents a different philosophy of how leather should look and age.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {finishComparisons.map((finish) => (
              <div
                key={finish.name}
                className="border border-border/30 bg-secondary/30 p-6 lg:p-8"
              >
                <p className="text-xs font-medium uppercase tracking-widest text-primary/70">
                  {finish.aspect}
                </p>
                <h3 className="mt-2 font-serif text-xl font-light tracking-tight text-foreground">
                  {finish.name}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
                  {finish.description}
                </p>
                <div className="mt-6 pt-6 border-t border-border/20 grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60 mb-3">
                      Advantages
                    </p>
                    <ul className="space-y-2">
                      {finish.pros.map((pro) => (
                        <li key={pro} className="flex items-center gap-2 text-xs font-light text-foreground">
                          <Check className="h-3 w-3 text-primary" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60 mb-3">
                      Considerations
                    </p>
                    <ul className="space-y-2">
                      {finish.cons.map((con) => (
                        <li key={con} className="flex items-center gap-2 text-xs font-light text-muted-foreground">
                          <Minus className="h-3 w-3" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Feature Comparison Table */}
        <Section size="large">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-serif text-2xl font-light tracking-tight text-foreground lg:text-3xl">
              Collection Features
            </h2>
            <div className="h-px flex-1 bg-border/30" />
          </div>

          <p className="max-w-2xl text-sm font-light leading-relaxed text-muted-foreground mb-10">
            Different collections prioritize different features. This comparison helps you 
            understand what each collection offers and which best suits your needs.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border/30">
                  {featureComparisons.headers.map((header) => (
                    <th
                      key={header}
                      className={`pb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground/60 ${
                        header === "Feature" ? "text-left" : "text-center"
                      }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureComparisons.rows.map((row) => (
                  <tr key={row.feature} className="border-b border-border/20">
                    <td className="py-4 text-sm font-light text-foreground">
                      {row.feature}
                    </td>
                    <td className="py-4 text-center">
                      {row.everyday ? (
                        <Check className="h-4 w-4 text-primary mx-auto" />
                      ) : (
                        <Minus className="h-4 w-4 text-muted-foreground/30 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 text-center">
                      {row.guardian ? (
                        <Check className="h-4 w-4 text-primary mx-auto" />
                      ) : (
                        <Minus className="h-4 w-4 text-muted-foreground/30 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 text-center">
                      {row.limited ? (
                        <Check className="h-4 w-4 text-primary mx-auto" />
                      ) : (
                        <Minus className="h-4 w-4 text-muted-foreground/30 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* CTA Section */}
        <Section variant="dark" size="default" className="border-t border-border/20">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-primary/70 mb-4">
              Ready to Explore?
            </p>
            <h3 className="font-serif text-2xl font-light tracking-tight text-foreground lg:text-3xl">
              Browse our collections with confidence
            </h3>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <Link
                href="/collections"
                className="group inline-flex items-center gap-2 border border-primary bg-primary px-8 py-3 text-sm font-medium tracking-wide text-primary-foreground transition-all hover:bg-primary/90"
              >
                View Collections
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/dictionary"
                className="inline-flex items-center gap-2 border border-border px-8 py-3 text-sm font-medium tracking-wide text-foreground transition-all hover:border-primary hover:text-primary"
              >
                Explore Dictionary
              </Link>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  )
}

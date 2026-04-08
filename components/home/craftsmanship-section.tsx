import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Section } from "@/components/layout"

const craftDetails = [
  {
    label: "Materials",
    value: "Selected for their ability to develop character over time",
  },
  {
    label: "Construction",
    value: "Precision engineering meets artisanal finishing",
  },
  {
    label: "Finishing",
    value: "Hand-inspected details that reveal themselves slowly",
  },
  {
    label: "Longevity",
    value: "Designed to outlast trends and serve for years",
  },
]

export function CraftsmanshipSection() {
  return (
    <Section size="large" className="border-t border-border/20">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        {/* Left Content */}
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-4">
            Craftsmanship
          </p>
          <h2 className="font-serif text-3xl font-light tracking-tight text-foreground lg:text-4xl xl:text-5xl text-balance">
            Details That Define Distinction
          </h2>
          <p className="mt-6 text-base font-light leading-relaxed text-muted-foreground lg:text-lg text-pretty">
            Every Felton piece undergoes a journey from concept to completion that 
            prioritizes integrity over expedience. We work with suppliers who share 
            our commitment to excellence, selecting materials not for their novelty 
            but for their proven ability to age with grace.
          </p>
          <p className="mt-4 text-base font-light leading-relaxed text-muted-foreground lg:text-lg">
            The result is accessories that become more personal with time—developing 
            subtle patinas and worn-in comfort that fast-fashion alternatives can 
            never replicate.
          </p>

          {/* CTA */}
          <div className="mt-8">
            <Link
              href="/guides"
              className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-all hover:gap-3"
            >
              Explore Our Guides
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right Content - Details Grid */}
        <div className="lg:pl-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {craftDetails.map((detail, index) => (
              <div
                key={detail.label}
                className="border-l-2 border-primary/20 pl-6 py-2"
              >
                <span className="text-xs font-medium uppercase tracking-widest text-primary/60">
                  {String(index + 1).padStart(2, "0")}. {detail.label}
                </span>
                <p className="mt-2 text-sm font-light leading-relaxed text-foreground">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="mt-10 border-t border-border/30 pt-8">
            <blockquote className="font-serif text-lg font-light italic text-muted-foreground">
              {'"'}Quality is remembered long after the price is forgotten.{'"'}
            </blockquote>
            <p className="mt-3 text-xs font-medium uppercase tracking-widest text-primary/60">
              — Gucci Family Motto
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Clock, BookOpen } from "lucide-react"
import { Header, Footer, Section, SectionHeader } from "@/components/layout"

export const metadata: Metadata = {
  title: "Guides",
  description: "Expert guidance on selecting, caring for, and understanding premium accessories. Learn from Felton's expertise in materials, craftsmanship, and style.",
}

const guides = [
  {
    category: "Selection",
    items: [
      {
        slug: "choosing-the-right-case",
        title: "How to Choose the Right Case",
        excerpt: "A comprehensive approach to selecting protection that matches both your device and your lifestyle. Understanding the balance between form and function.",
        readTime: "8 min read",
        topics: ["Device compatibility", "Usage patterns", "Material selection", "Style considerations"],
      },
      {
        slug: "understanding-leather-grades",
        title: "Understanding Leather Grades",
        excerpt: "Not all leather is created equal. Learn to distinguish between grades, treatments, and what truly defines premium quality in leather goods.",
        readTime: "12 min read",
        topics: ["Full-grain vs top-grain", "Tanning processes", "Aging characteristics", "Care requirements"],
      },
      {
        slug: "size-fit-guide",
        title: "The Complete Size & Fit Guide",
        excerpt: "Ensuring perfect compatibility between your devices and Felton accessories. Detailed measurements and recommendations for every product line.",
        readTime: "5 min read",
        topics: ["Device measurements", "Case dimensions", "Fit tolerance", "Universal vs specific"],
      },
    ],
  },
  {
    category: "Care & Maintenance",
    items: [
      {
        slug: "leather-care-essentials",
        title: "Leather Care Essentials",
        excerpt: "Preserve and enhance your leather accessories with proper care techniques. Learn how to develop beautiful patina while maintaining structural integrity.",
        readTime: "10 min read",
        topics: ["Cleaning techniques", "Conditioning", "Stain removal", "Storage best practices"],
      },
      {
        slug: "extending-product-life",
        title: "Extending Product Life",
        excerpt: "Simple habits that significantly extend the lifespan of your accessories. Preventive care that protects your investment for years to come.",
        readTime: "6 min read",
        topics: ["Daily habits", "Environmental factors", "Wear patterns", "Repair vs replace"],
      },
      {
        slug: "patina-development",
        title: "The Art of Patina Development",
        excerpt: "Understanding how premium materials age gracefully. Embrace the character that develops uniquely on your Felton pieces over time.",
        readTime: "7 min read",
        topics: ["Natural aging", "Accelerating patina", "Maintaining evenness", "Material behavior"],
      },
    ],
  },
  {
    category: "Lifestyle",
    items: [
      {
        slug: "travel-essentials-setup",
        title: "The Perfect Travel Setup",
        excerpt: "Organize your tech and documents for seamless travel. A curated approach to what to carry and how to carry it elegantly.",
        readTime: "9 min read",
        topics: ["Packing strategies", "Airport efficiency", "Organization systems", "Weight optimization"],
      },
      {
        slug: "minimalist-everyday-carry",
        title: "Minimalist Everyday Carry",
        excerpt: "The philosophy of carrying only what serves you. How to refine your daily essentials without sacrificing functionality or style.",
        readTime: "7 min read",
        topics: ["Essential evaluation", "Space optimization", "Style cohesion", "Pocket management"],
      },
    ],
  },
]

export default function GuidesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <Section size="large" variant="textured" className="relative">
          <div className="absolute inset-0 bg-background/90" />
          <div className="relative z-10">
            <SectionHeader
              eyebrow="Knowledge & Expertise"
              title="Guides"
              description="Thoughtful guidance written with authority and restraint. Learn to choose wisely, care properly, and appreciate the details that define quality."
            />
          </div>
        </Section>

        {/* Guides by Category */}
        <Section size="large">
          <div className="space-y-20">
            {guides.map((category) => (
              <div key={category.category}>
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="font-serif text-2xl font-light tracking-tight text-foreground lg:text-3xl">
                    {category.category}
                  </h2>
                  <div className="h-px flex-1 bg-border/30" />
                </div>

                {/* Guides Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                  {category.items.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/guides/${guide.slug}`}
                      className="group flex flex-col border border-border/30 bg-card/30 p-6 transition-all duration-300 hover:border-primary/30 lg:p-8"
                    >
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {guide.readTime}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="h-3.5 w-3.5" />
                          Guide
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="mt-4 font-serif text-xl font-light tracking-tight text-foreground transition-colors group-hover:text-primary lg:text-2xl">
                        {guide.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-muted-foreground">
                        {guide.excerpt}
                      </p>

                      {/* Topics */}
                      <div className="mt-6 pt-6 border-t border-border/20">
                        <div className="flex flex-wrap gap-2">
                          {guide.topics.slice(0, 3).map((topic) => (
                            <span
                              key={topic}
                              className="text-xs font-light text-muted-foreground/60 border border-border/20 px-2 py-1"
                            >
                              {topic}
                            </span>
                          ))}
                          {guide.topics.length > 3 && (
                            <span className="text-xs font-light text-muted-foreground/40 px-2 py-1">
                              +{guide.topics.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition-all group-hover:gap-3">
                        Read Guide
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
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
              Looking for Specific Comparisons?
            </p>
            <h3 className="font-serif text-2xl font-light tracking-tight text-foreground lg:text-3xl">
              Compare materials, finishes, and features side by side
            </h3>
            <div className="mt-8">
              <Link
                href="/comparisons"
                className="group inline-flex items-center gap-2 border border-primary bg-primary px-8 py-3 text-sm font-medium tracking-wide text-primary-foreground transition-all hover:bg-primary/90"
              >
                View Comparisons
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

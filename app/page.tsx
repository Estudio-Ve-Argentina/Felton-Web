import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  PhilosophySection,
  FeaturedProducts,
  BrandCarousel,
  TestimonialsSection,
  BlogNewsletterSection,
  SuggestedProducts,
} from "@/components/home";
import { scrapeBlogPosts } from "@/lib/tiendanube-blog";

const PARTICLES = [
  { left: 51.7, top: 50.6, duration: 4.2, delay: 0.3  },
  { left: 90.9, top: 54.1, duration: 3.8, delay: 1.1  },
  { left: 11.3, top: 91.2, duration: 4.7, delay: 0.7  },
  { left: 56.5, top: 21.3, duration: 3.5, delay: 1.5  },
  { left: 93.2, top: 81.3, duration: 4.1, delay: 0.1  },
  { left: 16.6, top: 53.0, duration: 3.9, delay: 1.8  },
  { left: 34.0, top: 18.0, duration: 4.8, delay: 0.9  },
  { left: 65.4, top: 29.8, duration: 3.7, delay: 1.4  },
  { left: 7.2,  top: 33.5, duration: 4.4, delay: 0.5  },
  { left: 28.1, top: 67.9, duration: 3.6, delay: 2.1  },
  { left: 74.8, top: 12.4, duration: 4.9, delay: 0.4  },
  { left: 42.3, top: 85.7, duration: 3.3, delay: 1.7  },
  { left: 83.6, top: 40.2, duration: 4.6, delay: 0.8  },
  { left: 22.4, top: 75.3, duration: 3.4, delay: 2.3  },
  { left: 60.1, top: 62.8, duration: 4.0, delay: 1.2  },
  { left: 48.9, top: 6.1,  duration: 5.1, delay: 0.6  },
  { left: 3.5,  top: 14.7, duration: 3.8, delay: 1.9  },
  { left: 78.3, top: 95.4, duration: 4.3, delay: 0.2  },
  { left: 37.6, top: 44.1, duration: 3.6, delay: 2.5  },
  { left: 19.0, top: 28.6, duration: 4.7, delay: 1.0  },
  { left: 68.7, top: 73.2, duration: 3.9, delay: 1.6  },
  { left: 87.1, top: 20.9, duration: 4.5, delay: 0.3  },
  { left: 44.5, top: 57.4, duration: 3.7, delay: 2.0  },
  { left: 5.8,  top: 48.3, duration: 4.2, delay: 1.3  },
  { left: 31.2, top: 38.7, duration: 4.3, delay: 0.6  },
  { left: 72.5, top: 8.3,  duration: 3.9, delay: 2.2  },
  { left: 14.8, top: 60.1, duration: 4.6, delay: 1.0  },
  { left: 58.3, top: 77.4, duration: 3.4, delay: 0.4  },
  { left: 96.1, top: 30.5, duration: 5.0, delay: 1.7  },
  { left: 25.7, top: 5.2,  duration: 4.1, delay: 2.4  },
  { left: 80.4, top: 68.9, duration: 3.5, delay: 0.9  },
  { left: 39.9, top: 92.3, duration: 4.8, delay: 1.4  },
  { left: 63.7, top: 45.6, duration: 3.6, delay: 2.8  },
  { left: 9.4,  top: 79.8, duration: 4.4, delay: 0.2  },
  { left: 85.2, top: 16.3, duration: 3.8, delay: 1.6  },
];

export default async function HomePage() {
  const blogPosts = await scrapeBlogPosts().then((posts) =>
    posts
      .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
      .slice(0, 3)
  ).catch(() => []);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />

        <div
          className="relative bg-background"
          style={{
            backgroundImage: 'url("/images/leather-texture.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "multiply",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-10"
            style={{ background: "linear-gradient(to bottom, #0B1120 0%, transparent 100%)" }} />
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(212,175,55,0.05) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(212,175,55,0.05) 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            />
          </div>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {PARTICLES.map((p, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  background: "rgba(212,175,55,0.6)",
                  animation: `particleFloat ${p.duration}s ease-out ${p.delay}s infinite`,
                }}
              />
            ))}
          </div>

          <FeaturedProducts />
          <TestimonialsSection />
        </div>

        <BrandCarousel />
        <PhilosophySection />
        <SuggestedProducts />
        <BlogNewsletterSection initialPosts={blogPosts} />
      </main>
      <Footer />
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  PhilosophySection,
  CollectionsPreview,
  FeaturedProducts,
  BrandCarousel,
  TestimonialsSection,
  BlogNewsletterSection,
  SuggestedProducts,
} from "@/components/home";

const PARTICLES = [
  { left: 51.7, top: 50.6, duration: 4.2, delay: 0.3,  dx: 0,   dy: -30 },
  { left: 90.9, top: 54.1, duration: 3.8, delay: 1.1,  dx: -20, dy: -20 },
  { left: 11.3, top: 91.2, duration: 4.7, delay: 0.7,  dx: 15,  dy: -25 },
  { left: 56.5, top: 21.3, duration: 3.5, delay: 1.5,  dx: 0,   dy: -30 },
  { left: 93.2, top: 81.3, duration: 4.1, delay: 0.1,  dx: -25, dy: -15 },
  { left: 16.6, top: 53.0, duration: 3.9, delay: 1.8,  dx: 20,  dy: -20 },
  { left: 34.0, top: 18.0, duration: 4.8, delay: 0.9,  dx: -15, dy: -25 },
  { left: 65.4, top: 29.8, duration: 3.7, delay: 1.4,  dx: 0,   dy: -30 },
  { left: 7.2,  top: 33.5, duration: 4.4, delay: 0.5,  dx: 25,  dy: -10 },
  { left: 28.1, top: 67.9, duration: 3.6, delay: 2.1,  dx: -10, dy: -28 },
  { left: 74.8, top: 12.4, duration: 4.9, delay: 0.4,  dx: 18,  dy: -22 },
  { left: 42.3, top: 85.7, duration: 3.3, delay: 1.7,  dx: -22, dy: -18 },
  { left: 83.6, top: 40.2, duration: 4.6, delay: 0.8,  dx: 12,  dy: -28 },
  { left: 22.4, top: 75.3, duration: 3.4, delay: 2.3,  dx: 28,  dy: -12 },
  { left: 60.1, top: 62.8, duration: 4.0, delay: 1.2,  dx: -18, dy: -22 },
  { left: 48.9, top: 6.1,  duration: 5.1, delay: 0.6,  dx: 0,   dy: -30 },
  { left: 3.5,  top: 14.7, duration: 3.8, delay: 1.9,  dx: 22,  dy: -18 },
  { left: 78.3, top: 95.4, duration: 4.3, delay: 0.2,  dx: -28, dy: -12 },
  { left: 37.6, top: 44.1, duration: 3.6, delay: 2.5,  dx: 10,  dy: -28 },
  { left: 19.0, top: 28.6, duration: 4.7, delay: 1.0,  dx: -12, dy: -28 },
  { left: 68.7, top: 73.2, duration: 3.9, delay: 1.6,  dx: 20,  dy: -20 },
  { left: 87.1, top: 20.9, duration: 4.5, delay: 0.3,  dx: -20, dy: -20 },
  { left: 44.5, top: 57.4, duration: 3.7, delay: 2.0,  dx: 30,  dy: 0   },
  { left: 5.8,  top: 48.3, duration: 4.2, delay: 1.3,  dx: -30, dy: 0   },
  { left: 31.2, top: 38.7, duration: 4.3, delay: 0.6,  dx: 16,  dy: -24 },
  { left: 72.5, top: 8.3,  duration: 3.9, delay: 2.2,  dx: -14, dy: -26 },
  { left: 14.8, top: 60.1, duration: 4.6, delay: 1.0,  dx: 24,  dy: -16 },
  { left: 58.3, top: 77.4, duration: 3.4, delay: 0.4,  dx: -26, dy: -14 },
  { left: 96.1, top: 30.5, duration: 5.0, delay: 1.7,  dx: -22, dy: -18 },
  { left: 25.7, top: 5.2,  duration: 4.1, delay: 2.4,  dx: 18,  dy: -22 },
  { left: 80.4, top: 68.9, duration: 3.5, delay: 0.9,  dx: -16, dy: -24 },
  { left: 39.9, top: 92.3, duration: 4.8, delay: 1.4,  dx: 22,  dy: -18 },
  { left: 63.7, top: 45.6, duration: 3.6, delay: 2.8,  dx: -28, dy: -10 },
  { left: 9.4,  top: 79.8, duration: 4.4, delay: 0.2,  dx: 26,  dy: -14 },
  { left: 85.2, top: 16.3, duration: 3.8, delay: 1.6,  dx: -12, dy: -28 },
  { left: 47.6, top: 33.1, duration: 4.7, delay: 0.7,  dx: 14,  dy: -26 },
  { left: 20.3, top: 88.4, duration: 3.3, delay: 2.6,  dx: -24, dy: -16 },
  { left: 76.9, top: 52.7, duration: 4.5, delay: 1.1,  dx: 20,  dy: -20 },
  { left: 33.5, top: 70.2, duration: 3.7, delay: 0.8,  dx: -18, dy: -22 },
  { left: 55.8, top: 3.9,  duration: 4.2, delay: 2.0,  dx: 12,  dy: -28 },
  { left: 2.1,  top: 42.6, duration: 5.2, delay: 1.5,  dx: 28,  dy: -12 },
  { left: 91.7, top: 65.1, duration: 3.6, delay: 0.3,  dx: -20, dy: -20 },
  { left: 17.4, top: 10.8, duration: 4.9, delay: 2.2,  dx: 22,  dy: -18 },
  { left: 70.2, top: 84.5, duration: 3.4, delay: 1.3,  dx: -10, dy: -28 },
  { left: 50.0, top: 36.7, duration: 4.0, delay: 0.5,  dx: -30, dy: -5  },
  { left: 29.8, top: 58.0, duration: 4.6, delay: 1.8,  dx: 30,  dy: -5  },
  { left: 13.1, top: 23.4, duration: 4.1, delay: 0.3,  dx: 18,  dy: -22 },
  { left: 40.7, top: 71.8, duration: 3.8, delay: 1.9,  dx: -22, dy: -18 },
  { left: 67.3, top: 15.6, duration: 4.5, delay: 0.6,  dx: 14,  dy: -26 },
  { left: 88.6, top: 47.2, duration: 3.5, delay: 2.3,  dx: -26, dy: -14 },
  { left: 23.9, top: 83.1, duration: 4.8, delay: 1.0,  dx: 20,  dy: -20 },
  { left: 54.4, top: 30.5, duration: 3.6, delay: 2.7,  dx: -16, dy: -24 },
  { left: 79.8, top: 61.3, duration: 4.3, delay: 0.4,  dx: 24,  dy: -16 },
  { left: 36.2, top: 9.7,  duration: 3.9, delay: 1.6,  dx: -20, dy: -20 },
  { left: 6.5,  top: 55.8, duration: 4.7, delay: 0.8,  dx: 28,  dy: -12 },
  { left: 62.1, top: 89.4, duration: 3.3, delay: 2.1,  dx: -12, dy: -28 },
  { left: 94.5, top: 22.7, duration: 4.4, delay: 1.2,  dx: -24, dy: -16 },
  { left: 18.3, top: 46.5, duration: 3.7, delay: 0.1,  dx: 16,  dy: -24 },
  { left: 75.6, top: 76.2, duration: 5.0, delay: 2.5,  dx: -18, dy: -22 },
  { left: 45.1, top: 18.9, duration: 4.2, delay: 1.4,  dx: 22,  dy: -18 },
  { left: 8.9,  top: 96.3, duration: 3.8, delay: 0.7,  dx: 26,  dy: -14 },
  { left: 59.7, top: 41.8, duration: 4.6, delay: 2.0,  dx: -28, dy: -10 },
  { left: 84.3, top: 7.5,  duration: 3.4, delay: 1.3,  dx: -14, dy: -26 },
  { left: 27.6, top: 64.9, duration: 4.9, delay: 0.9,  dx: 10,  dy: -28 },
  { left: 71.4, top: 35.3, duration: 3.6, delay: 2.4,  dx: -30, dy: -5  },
  { left: 15.7, top: 72.6, duration: 4.3, delay: 0.5,  dx: 30,  dy: -5  },
  { left: 48.2, top: 97.1, duration: 3.9, delay: 1.7,  dx: -10, dy: -28 },
  { left: 92.8, top: 58.4, duration: 4.1, delay: 0.2,  dx: -22, dy: -18 },
  { left: 32.4, top: 26.8, duration: 4.7, delay: 2.6,  dx: 20,  dy: -20 },
  { left: 57.9, top: 51.2, duration: 3.5, delay: 1.1,  dx: -26, dy: -14 },
  { left: 4.3,  top: 37.4, duration: 4.4, delay: 0.6,  dx: 24,  dy: -16 },
  { left: 77.1, top: 93.7, duration: 3.7, delay: 2.2,  dx: -20, dy: -20 },
  { left: 41.8, top: 13.2, duration: 5.1, delay: 0.8,  dx: 18,  dy: -22 },
  { left: 66.5, top: 80.6, duration: 3.4, delay: 1.5,  dx: -16, dy: -24 },
  { left: 21.2, top: 44.9, duration: 4.5, delay: 2.9,  dx: 14,  dy: -26 },
  { left: 89.4, top: 11.3, duration: 3.8, delay: 0.3,  dx: -18, dy: -22 },
  { left: 35.6, top: 66.7, duration: 4.2, delay: 1.8,  dx: 26,  dy: -14 },
  { left: 73.2, top: 28.1, duration: 3.6, delay: 2.3,  dx: -12, dy: -28 },
  { left: 12.5, top: 87.3, duration: 4.8, delay: 0.4,  dx: 12,  dy: -28 },
  { left: 53.7, top: 4.8,  duration: 3.9, delay: 1.2,  dx: -28, dy: -12 },
  { left: 97.3, top: 72.5, duration: 4.1, delay: 2.7,  dx: -24, dy: -16 },
  { left: 26.3, top: 19.6, duration: 3.5, delay: 0.9,  dx: 22,  dy: -18 },
  { left: 81.7, top: 48.8, duration: 4.6, delay: 1.6,  dx: -20, dy: -20 },
  { left: 43.5, top: 78.3, duration: 3.3, delay: 0.1,  dx: 16,  dy: -24 },
  { left: 69.8, top: 24.5, duration: 4.4, delay: 2.1,  dx: -14, dy: -26 },
  { left: 10.6, top: 63.7, duration: 3.7, delay: 1.0,  dx: 28,  dy: -12 },
  { left: 64.9, top: 39.2, duration: 5.0, delay: 0.7,  dx: -22, dy: -18 },
  { left: 38.1, top: 56.4, duration: 4.0, delay: 2.4,  dx: 20,  dy: -20 },
  { left: 86.7, top: 3.1,  duration: 3.8, delay: 1.3,  dx: -26, dy: -14 },
  { left: 1.4,  top: 82.9, duration: 4.3, delay: 0.5,  dx: 30,  dy: 0   },
  { left: 61.3, top: 17.4, duration: 3.6, delay: 2.0,  dx: -30, dy: 0   },
  { left: 30.5, top: 95.8, duration: 4.7, delay: 1.4,  dx: 18,  dy: -22 },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />

        {/* Shared background: FeaturedProducts + PhilosophySection */}
        <div
          className="relative bg-background"
          style={{
            backgroundImage: 'url("/images/leather-texture.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "multiply",
          }}
        >
          {/* Top fade from hero */}
          <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-10"
            style={{ background: "linear-gradient(to bottom, #0B1120 0%, transparent 100%)" }} />

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(212, 175, 55, 0.05) 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          {/* Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {PARTICLES.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/60 rounded-full"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  willChange: "transform, opacity",
                }}
                animate={{
                  x: [0, particle.dx * 0.6, particle.dx, particle.dx],
                  y: [0, particle.dy * 0.6, particle.dy, particle.dy],
                  opacity: [0, 1, 0, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  times: [0, 0.45, 0.75, 1],
                  ease: "easeOut",
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
        <BlogNewsletterSection />
      </main>
      <Footer />
    </>
  );
}

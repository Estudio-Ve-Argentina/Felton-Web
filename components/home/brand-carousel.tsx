"use client";

import Image from "next/image";

const brands = [
  { name: "Louis Vuitton", logo: "/brands/Louis_Vuitton_LV_logo.png", width: 160, height: 60 },
  { name: "Gucci", logo: "/brands/gucci-logo.png", width: 160, height: 60 },
  { name: "Prada", logo: "/brands/logo-prada.png", width: 160, height: 60 },
  { name: "Cartier", logo: "/brands/cartier-logo.png", width: 160, height: 60 },
  { name: "Diesel", logo: "/brands/diesel-logo.png", width: 160, height: 60 },
  { name: "Supreme", logo: "/brands/supreme-logo.png", width: 160, height: 60 },
];

export function BrandCarousel() {
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="brand-carousel-section relative w-full overflow-hidden bg-background">
      <style jsx>{`
        .brand-carousel-section {
          margin-top: -4rem;
          padding-top: 2rem;
          padding-bottom: 3rem;
          position: relative;
          z-index: 5;
        }

        .carousel-track {
          display: flex;
          gap: 4rem;
          align-items: center;
          padding: 1.5rem 0;
          width: max-content;
          will-change: transform;
          animation: carousel-scroll 25s linear infinite;
        }

        @keyframes carousel-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-1 * (240px + 4rem) * 6)); }
        }

        @keyframes carousel-scroll-mobile {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-1 * (240px + 1.3rem) * 6)); }
        }

        @media (max-width: 640px) {
          .carousel-track {
            gap: 1.3rem;
            animation: carousel-scroll-mobile 17s linear infinite;
          }
        }

        .brand-item {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 240px;
          height: 6rem;
        }
      `}</style>

      {/* Top fade from testimonials */}
      <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, var(--background) 0%, transparent 100%)" }} />

      <div className="absolute left-0 top-0 bottom-0 w-40 bg-linear-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-40 bg-linear-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

      <div className="carousel-track">
        {duplicatedBrands.map((brand, index) => (
          <div key={`${brand.name}-${index}`} className="brand-item">
            <div className="relative">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={brand.width}
                height={brand.height}
                className="object-contain opacity-60 hover:opacity-90 transition-opacity duration-500 relative z-10"
                style={{
                  maxHeight: "70px",
                  width: "auto",
                  filter: "brightness(0) saturate(100%) invert(100%)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

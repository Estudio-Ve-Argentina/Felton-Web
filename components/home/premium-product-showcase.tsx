"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProductShowcaseProps {
  product: {
    id: string;
    name: string;
    brand: string;
    price: string;
    image: string;
    href: string;
  };
  index: number;
}

function ProductCard({ product, index }: ProductShowcaseProps) {
  const [particles, setParticles] = useState<
    Array<{ id: number; style: React.CSSProperties }>
  >([]);

  useEffect(() => {
    // Partículas diminutas que emergen de la luz (no caen desde arriba)
    const newParticles = Array.from({ length: 40 }).map((_, i) => {
      const size = 0.3 + Math.random() * 0.8; // Muy pequeñas
      // Posición inicial en el área de la luz (centro-abajo)
      const startX = 180 + Math.random() * 240;
      const startY = 400 + Math.random() * 200; // Desde el área de luz
      const drift = (Math.random() - 0.5) * 60;
      const rise = -100 - Math.random() * 150; // Suben en lugar de caer

      return {
        id: i,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          left: `${startX}px`,
          top: `${startY}px`,
          animationDelay: `${Math.random() * 4}s`,
          animationDuration: `${4 + Math.random() * 3}s`,
          "--x-drift": `${drift}px`,
          "--y-rise": `${rise}px`,
        } as React.CSSProperties & { "--x-drift": string; "--y-rise": string },
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="product-card-wrapper"
    >
      <style jsx>{`
        .product-card-wrapper {
          position: relative;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }

        .product-container {
          position: relative;
          cursor: pointer;
          width: 100%;
          height: 650px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          background-image: url("/images/leather-texture.png");
          background-size: cover;
          background-position: center;
          background-blend-mode: multiply;
          background-color: rgba(11, 17, 32, 0.85);
          border: 3px solid rgba(212, 175, 55, 0.12);
          transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1);
          overflow: hidden;
          padding: 40px 30px 30px 30px;
        }

        @media (max-width: 768px) {
          .product-container {
            height: 550px;
            padding: 30px 20px 20px 20px;
          }
        }

        .product-container:hover {
          border-color: rgba(212, 175, 55, 0.35);
          box-shadow:
            0 0 40px rgba(212, 175, 55, 0.08),
            inset 0 0 80px rgba(212, 175, 55, 0.02);
        }

        /* ILUMINACIÓN - Todo dentro de la card */
        .lighting-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          pointer-events: none;
          will-change: opacity;
        }

        /* Luz principal - cono desde arriba DENTRO de la card */
        .main-light-cone {
          position: absolute;
          top: -5%;
          left: 50%;
          transform: translateX(-50%);
          width: 50%;
          height: 25%;
          background: linear-gradient(
            180deg,
            rgba(255, 245, 180, 0.45) 0%,
            rgba(255, 240, 170, 0.42) 3%,
            rgba(255, 235, 160, 0.38) 6%,
            rgba(255, 230, 150, 0.35) 9%,
            rgba(255, 225, 140, 0.32) 12%,
            rgba(255, 220, 130, 0.29) 15%,
            rgba(245, 210, 120, 0.26) 18%,
            rgba(235, 200, 110, 0.23) 21%,
            rgba(225, 190, 100, 0.2) 24%,
            rgba(212, 175, 55, 0.17) 27%,
            rgba(212, 175, 55, 0.14) 30%,
            rgba(212, 175, 55, 0.12) 33%,
            rgba(212, 175, 55, 0.1) 36%,
            rgba(212, 175, 55, 0.08) 39%,
            rgba(212, 175, 55, 0.06) 42%,
            rgba(212, 175, 55, 0.04) 45%,
            rgba(212, 175, 55, 0.02) 48%,
            rgba(212, 175, 55, 0.01) 51%,
            rgba(212, 175, 55, 0.005) 54%,
            rgba(212, 175, 55, 0.003) 57%,
            rgba(212, 175, 55, 0.001) 60%,
            rgba(212, 175, 55, 0.0005) 63%,
            rgba(212, 175, 55, 0.0003) 66%,
            rgba(212, 175, 55, 0.0001) 69%,
            rgba(212, 175, 55, 0.00005) 72%,
            rgba(212, 175, 55, 0.00003) 75%,
            rgba(212, 175, 55, 0.000025) 78%,
            rgba(212, 175, 55, 0.00002) 81%,
            rgba(212, 175, 55, 0.000015) 84%,
            rgba(212, 175, 55, 0.00001) 87%,
            rgba(212, 175, 55, 0.000005) 90%,
            rgba(212, 175, 55, 0.000003) 93%,
            rgba(212, 175, 55, 0.000001) 96%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 2s cubic-bezier(0.23, 1, 0.32, 1);
          filter: blur(60px);
          clip-path: polygon(28% 0%, 72% 0%, 88% 100%, 12% 100%);
          z-index: 999;
        }

        .product-container:hover .main-light-cone {
          opacity: 0.5;
        }

        /* Haz de luz concentrado en el producto */
        .product-spotlight {
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          height: 400px;
          background: radial-gradient(
            circle,
            rgba(255, 250, 220, 0.45) 0%,
            rgba(255, 245, 210, 0.42) 5%,
            rgba(255, 240, 200, 0.38) 10%,
            rgba(255, 235, 190, 0.34) 15%,
            rgba(255, 230, 170, 0.3) 20%,
            rgba(245, 220, 160, 0.26) 25%,
            rgba(235, 210, 150, 0.23) 30%,
            rgba(225, 195, 130, 0.2) 35%,
            rgba(212, 175, 55, 0.17) 40%,
            rgba(212, 175, 55, 0.14) 45%,
            rgba(212, 175, 55, 0.12) 50%,
            rgba(212, 175, 55, 0.1) 55%,
            rgba(212, 175, 55, 0.08) 60%,
            rgba(212, 175, 55, 0.06) 65%,
            rgba(212, 175, 55, 0.04) 70%,
            rgba(212, 175, 55, 0.02) 75%,
            rgba(212, 175, 55, 0.01) 80%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 2.2s cubic-bezier(0.23, 1, 0.32, 1) 0.4s;
          filter: blur(65px);
          z-index: 2;
        }

        .product-container:hover .product-spotlight {
          opacity: 0.6;
        }

        /* Luz de acento superior - más intensa */
        .top-accent-light {
          position: absolute;
          top: 5%;
          left: 50%;
          transform: translateX(-50%);
          width: 65%;
          height: 65%;
          background: radial-gradient(
            ellipse at top,
            rgba(255, 245, 200, 0.35) 0%,
            rgba(255, 240, 190, 0.32) 8%,
            rgba(255, 235, 180, 0.28) 15%,
            rgba(255, 230, 170, 0.24) 22%,
            rgba(255, 225, 160, 0.2) 28%,
            rgba(245, 215, 150, 0.17) 34%,
            rgba(235, 205, 140, 0.14) 40%,
            rgba(225, 195, 120, 0.11) 46%,
            rgba(212, 175, 55, 0.09) 52%,
            rgba(212, 175, 55, 0.07) 58%,
            rgba(212, 175, 55, 0.05) 64%,
            rgba(212, 175, 55, 0.03) 70%,
            rgba(212, 175, 55, 0.02) 76%,
            rgba(212, 175, 55, 0.01) 82%,
            rgba(212, 175, 55, 0.005) 88%,
            transparent 94%
          );
          opacity: 0;
          transition: opacity 2s cubic-bezier(0.23, 1, 0.32, 1) 0.2s;
          filter: blur(70px);
          z-index: 1;
        }

        .product-container:hover .top-accent-light {
          opacity: 0.35;
        }

        /* Reflejo de luz en el producto */
        .product-rim-light {
          position: absolute;
          top: 32%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 300px;
          background: radial-gradient(
            circle,
            rgba(255, 250, 220, 0.25) 0%,
            rgba(255, 245, 200, 0.22) 15%,
            rgba(255, 235, 170, 0.18) 25%,
            rgba(212, 175, 55, 0.14) 35%,
            rgba(212, 175, 55, 0.1) 45%,
            rgba(212, 175, 55, 0.06) 55%,
            rgba(212, 175, 55, 0.03) 65%,
            transparent 75%
          );
          opacity: 0;
          transition: opacity 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s;
          filter: blur(40px);
          z-index: 4;
        }

        .product-container:hover .product-rim-light {
          opacity: 0.3;
        }

        /* PRODUCTO - Empieza más abajo y se eleva suavemente */
        .product {
          position: relative;
          width: 240px;
          height: 240px;
          margin-top: 120px;
          z-index: 5;
          transform: translateY(40px);
          will-change: transform;
          transition:
            transform 3.5s cubic-bezier(0.19, 1, 0.22, 1),
            scale 3.5s cubic-bezier(0.19, 1, 0.22, 1);
        }

        @media (max-width: 768px) {
          .product {
            width: 200px;
            height: 200px;
            margin-top: 90px;
            transform: translateY(30px);
          }
        }

        .product-img {
          filter: brightness(0.6) contrast(1.1) saturate(0.85);
          transition: filter 3.5s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .product-container:hover .product {
          transform: translateY(-18px);
          scale: 1.08;
        }

        .product-container:hover .product-img {
          filter: brightness(1.45) contrast(1.3) saturate(1.2)
            drop-shadow(0 25px 50px rgba(212, 175, 55, 0.45))
            drop-shadow(0 10px 25px rgba(255, 235, 150, 0.3));
        }

        /* SOMBRAS - Realistas y dinámicas */

        /* Sombra principal del producto */
        .product-shadow-main {
          position: absolute;
          bottom: 240px;
          left: 50%;
          transform: translateX(-50%);
          width: 280px;
          height: 70px;
          background: radial-gradient(
            ellipse at center,
            rgba(0, 0, 0, 0.85) 0%,
            rgba(0, 0, 0, 0.65) 25%,
            rgba(0, 0, 0, 0.4) 50%,
            rgba(0, 0, 0, 0.2) 70%,
            transparent 90%
          );
          opacity: 0.9;
          transition: all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s;
          filter: blur(20px);
          z-index: 3;
        }

        .product-container:hover .product-shadow-main {
          opacity: 0.45;
          width: 240px;
          height: 55px;
          bottom: 245px;
          filter: blur(28px);
        }

        /* Sombra suave extendida */
        .product-shadow-soft {
          position: absolute;
          bottom: 230px;
          left: 50%;
          transform: translateX(-50%);
          width: 380px;
          height: 90px;
          background: radial-gradient(
            ellipse at center,
            rgba(0, 0, 0, 0.4) 0%,
            rgba(0, 0, 0, 0.25) 35%,
            rgba(0, 0, 0, 0.12) 60%,
            transparent 85%
          );
          opacity: 0.7;
          transition: all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.35s;
          filter: blur(35px);
          z-index: 2;
        }

        .product-container:hover .product-shadow-soft {
          opacity: 0.35;
          width: 340px;
          bottom: 235px;
          filter: blur(42px);
        }

        /* Reflejo dorado en el suelo - más realista */
        .floor-reflection {
          position: absolute;
          bottom: 210px;
          left: 50%;
          transform: translateX(-50%);
          width: 75%;
          height: 120px;
          background: radial-gradient(
            ellipse at center,
            rgba(212, 175, 55, 0.42) 0%,
            rgba(212, 175, 55, 0.32) 15%,
            rgba(212, 175, 55, 0.24) 25%,
            rgba(212, 175, 55, 0.18) 35%,
            rgba(212, 175, 55, 0.12) 45%,
            rgba(212, 175, 55, 0.08) 55%,
            rgba(212, 175, 55, 0.04) 65%,
            transparent 80%
          );
          opacity: 0;
          transition: opacity 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s;
          filter: blur(35px);
          z-index: 1;
        }

        .product-container:hover .floor-reflection {
          opacity: 1;
        }

        /* Partículas diminutas que emergen de la luz */
        .particles-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 3;
          opacity: 0;
          transition: opacity 1.5s ease;
          will-change: opacity;
        }

        .product-container:hover .particles-container {
          opacity: 1;
        }

        .particle {
          position: absolute;
          background: radial-gradient(
            circle,
            rgba(255, 245, 200, 0.6) 0%,
            rgba(255, 230, 150, 0.3) 40%,
            transparent 100%
          );
          border-radius: 50%;
          opacity: 0;
          animation: particleRise infinite ease-out;
        }

        @keyframes particleRise {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0.3);
          }
          20% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.15;
            transform: translate(var(--x-drift), var(--y-rise)) scale(1);
          }
          80% {
            opacity: 0.08;
          }
          100% {
            opacity: 0;
            transform: translate(
                calc(var(--x-drift) * 1.6),
                calc(var(--y-rise) * 1.8)
              )
              scale(0.2);
          }
        }

        /* Brillo ambiental sutil */
        .ambient-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            ellipse at 50% 35%,
            rgba(212, 175, 55, 0.08) 0%,
            rgba(212, 175, 55, 0.05) 25%,
            rgba(212, 175, 55, 0.03) 40%,
            rgba(212, 175, 55, 0.01) 55%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s;
          pointer-events: none;
          z-index: 1;
        }

        .product-container:hover .ambient-glow {
          opacity: 1;
        }

        /* Información del producto - Abajo del todo */
        .product-info {
          position: absolute;
          bottom: 20px; /* Adjusted for more spacing from the edge */
          left: 0;
          right: 0;
          text-align: center;
          padding: 0 30px; /* Adjusted for more spacing from the edge */
          z-index: 10;
          transition: all 2.2s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .product-container:hover .product-info {
          transform: translateY(-8px);
        }

        .product-brand {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(212, 175, 55, 0.65);
          margin-bottom: 16px;
          transition: all 2s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .product-container:hover .product-brand {
          color: rgba(255, 215, 100, 1);
          letter-spacing: 0.3em;
          text-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
        }

        .product-name {
          font-family: var(--font-serif, serif);
          font-size: 24px;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.88);
          margin-bottom: 12px;
          line-height: 1.3;
          transition: all 2s cubic-bezier(0.23, 1, 0.32, 1);
          padding: 0 20px;
        }

        @media (max-width: 768px) {
          .product-name {
            font-size: 20px;
            margin-bottom: 4px;
          }
        }

        .product-container:hover .product-name {
          color: rgba(255, 255, 255, 1);
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
        }

        .product-price {
          font-size: 32px;
          font-weight: 600;
          color: rgba(212, 175, 55, 0.92);
          letter-spacing: 0.03em;
          transition: all 2s cubic-bezier(0.23, 1, 0.32, 1);
          margin-bottom: 10px;
        }

        @media (max-width: 768px) {
          .product-price {
            font-size: 28px;
            margin-bottom: 10px;
          }
        }

        .product-container:hover .product-price {
          color: rgba(255, 225, 120, 1);
          text-shadow:
            0 0 25px rgba(212, 175, 55, 0.35),
            0 0 10px rgba(255, 235, 150, 0.2);
          transform: scale(1.05);
          margin-bottom: 10px;
        }

        /* Botón de Añadir al Carrito */
        .add-to-cart-btn {
          position: absolute;
          bottom: -60px;
          left: 50%;
          transform: translateX(-50%);
          padding: 11px 28px;
          background: linear-gradient(
            135deg,
            rgba(212, 175, 55, 0.15) 0%,
            rgba(212, 175, 55, 0.08) 100%
          );
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: rgba(255, 255, 255, 0.9);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          opacity: 0;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 15;
          backdrop-filter: blur(10px);
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .add-to-cart-btn {
            padding: 10px 24px;
            font-size: 9px;
          }
        }

        .product-container:hover .add-to-cart-btn {
          opacity: 1;
          bottom: 15px;
        }

        .add-to-cart-btn:hover {
          background: linear-gradient(
            135deg,
            rgba(212, 175, 55, 0.25) 0%,
            rgba(212, 175, 55, 0.15) 100%
          );
          border-color: rgba(212, 175, 55, 0.6);
          color: rgba(255, 255, 255, 1);
          box-shadow:
            0 0 20px rgba(212, 175, 55, 0.2),
            inset 0 0 20px rgba(212, 175, 55, 0.1);
          transform: translateX(-50%) translateY(-2px);
        }

        .add-to-cart-btn:active {
          transform: translateX(-50%) translateY(0px);
        }

        /* Ajustar product-info para hacer espacio al botón */
        .product-container:hover .product-info {
          transform: translateY(-40px);
        }
      `}</style>

      <Link href={product.href} className="block">
        <div className="product-container group">
          {/* Contenedor de iluminación - TODO DENTRO */}
          <div className="lighting-container">
            {/* Brillo ambiental */}
            <div className="ambient-glow"></div>

            {/* Cono de luz principal */}
            <div className="main-light-cone"></div>

            {/* Luz de acento superior */}
            <div className="top-accent-light"></div>

            {/* Spotlight en el producto */}
            <div className="product-spotlight"></div>

            {/* Luz de contorno del producto */}
            <div className="product-rim-light"></div>

            {/* Reflejo dorado en el suelo */}
            <div className="floor-reflection"></div>

            {/* Partículas diminutas que emergen */}
            <div className="particles-container">
              {particles.map((p) => (
                <div key={p.id} className="particle" style={p.style} />
              ))}
            </div>
          </div>

          {/* Sombras del producto */}
          <div className="product-shadow-soft"></div>
          <div className="product-shadow-main"></div>

          {/* Producto */}
          <div className="product">
            <Image
              src={product.image}
              alt={product.name}
              width={240}
              height={240}
              className="product-img"
            />
          </div>

          {/* Información del producto */}
          <div className="product-info">
            <p className="product-brand">{product.brand}</p>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price}</p>
          </div>

          {/* Botón Añadir al Carrito */}
          <button
            className="add-to-cart-btn"
            onClick={(e) => {
              e.preventDefault();
              // Aquí puedes agregar la lógica para añadir al carrito
              console.log(`Añadido al carrito: ${product.name}`);
            }}
          >
            Añadir al Carrito
          </button>
        </div>
      </Link>
    </motion.div>
  );
}

export function PremiumProductShowcase() {
  const products = [
    {
      id: "1",
      name: "Bolso Premium Collection",
      brand: "Gucci",
      price: "$2,890",
      image: "/images/gucci-bag-transparent.png",
      href: "#",
    },
    {
      id: "2",
      name: "Bolso Duffle Ophidia",
      brand: "Gucci",
      price: "$3,200",
      image: "/images/gucci-duffle-bag.webp",
      href: "#",
    },
    {
      id: "3",
      name: "Bolso Crossbody",
      brand: "Gucci",
      price: "$1,650",
      image: "/images/gucci-crossbody-bag.webp",
      href: "#",
    },
  ];

  return (
    <section className="premium-showcase-section relative w-full min-h-screen bg-[#0B1120] pt-16 pb-28">
      {/* Soft top gradient — blends hero into products seamlessly */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "180px",
          background:
            "linear-gradient(to bottom, rgba(8,13,26,0.9) 0%, rgba(9,14,28,0.6) 25%, rgba(10,16,30,0.3) 50%, rgba(11,17,32,0.1) 75%, transparent 100%)",
          zIndex: 3,
        }}
      />
      <style jsx>{`
        .premium-showcase-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.035;
          pointer-events: none;
          z-index: 1;
          mix-blend-mode: overlay;
        }

        .premium-showcase-section > * {
          position: relative;
          z-index: 2;
        }
      `}</style>
      {/* Title Section */}
      <div className="text-center mb-24 px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.4em] text-primary/60 uppercase mb-4"
        >
          Selección Exclusiva
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white/90 mb-6"
        >
          Productos Destacados
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm text-white/50 max-w-2xl mx-auto"
        >
          Descubre nuestra colección de productos premium con iluminación
          cinematográfica
        </motion.p>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

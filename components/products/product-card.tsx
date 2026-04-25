"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice, getProductMainImage } from "@/lib/tiendanube";
import type { TiendaNubeProduct } from "@/lib/tiendanube";

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: string;
  image: string;
  variantId?: number;
  rawPrice?: string;
  stock?: number;
}

export function tnToProductItem(p: TiendaNubeProduct): ProductItem {
  const variant = p.variants?.[0];
  return {
    id: String(p.id),
    slug: p.handle?.es ?? String(p.id),
    name: p.name?.es ?? "",
    category: p.categories?.[0]?.name?.es ?? "",
    price: variant ? formatPrice(variant.price) : "",
    image: getProductMainImage(p) ?? "",
    variantId: variant?.id,
    rawPrice: variant?.price ?? "",
    stock: variant?.stock_management ? (variant?.stock ?? 0) : 999,
  };
}

interface ProductCardProps {
  product: ProductItem | TiendaNubeProduct;
  idx?: number;
  isDragging?: React.RefObject<boolean>;
  className?: string;
}

export function ProductCard({ product: rawProduct, idx = 0, isDragging, className = "" }: ProductCardProps) {
  const product = ("handle" in rawProduct) ? tnToProductItem(rawProduct as TiendaNubeProduct) : rawProduct as ProductItem;
  
  const [particles, setParticles] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);
  const [hovered, setHovered] = useState(false);
  const particlesCreated = useRef(false);
  const { addToCart, openCart } = useCart();
  const inStock = (product.stock ?? 999) > 0;

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock || !product.variantId) return;
    addToCart({
      id: String(product.variantId),
      variantId: product.variantId,
      name: product.name,
      price: product.rawPrice ?? "",
      image: product.image,
      category: product.category,
      stock: product.stock ?? 999,
    });
    openCart();
  }, [product, inStock, addToCart, openCart]);

  const createParticles = () => {
    if (particlesCreated.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return;
    particlesCreated.current = true;
    const newParticles = Array.from({ length: 30 }).map((_, i) => {
      const size = 0.3 + Math.random() * 0.8;
      const startX = 150 + Math.random() * 200;
      const startY = 300 + Math.random() * 150;
      const drift = (Math.random() - 0.5) * 60;
      const rise = -100 - Math.random() * 150;
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
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.05 }}
      className={`product-card-wrapper relative group ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <style jsx>{`
        .product-card-wrapper { position: relative; width: 100%; }

        .product-container {
          position: relative; cursor: pointer; width: 100%; height: 500px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          border: 1px solid rgba(212, 175, 55, 0.12);
          transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1);
          overflow: hidden; padding: 20px;
        }

        @media (max-width: 768px) {
          .product-container { height: 400px; padding: 15px; border-width: 0.5px; }
        }

        @media (hover: hover) {
          .product-container:hover {
            border-color: rgba(212, 175, 55, 0.35);
            box-shadow: 0 0 40px rgba(212, 175, 55, 0.08), inset 0 0 80px rgba(212, 175, 55, 0.02);
          }
        }

        .lighting-container {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          overflow: hidden; pointer-events: none;
        }

        .main-light-cone, .product-spotlight, .top-accent-light, .product-rim-light, .floor-reflection, .particles-container {
          opacity: 0;
        }

        @media (hover: hover) {
          .main-light-cone {
            position: absolute; top: -5%; left: 50%; transform: translateX(-50%);
            width: 50%; height: 25%;
            background: linear-gradient(180deg, rgba(255,245,180,0.45) 0%, rgba(212,175,55,0.14) 30%, rgba(212,175,55,0.02) 48%, transparent 60%);
            transition: opacity 2s cubic-bezier(0.23,1,0.32,1);
            filter: blur(60px); clip-path: polygon(28% 0%, 72% 0%, 88% 100%, 12% 100%); z-index: 99;
          }
          .product-container:hover .main-light-cone { opacity: 0.5; }

          .product-spotlight {
            position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%);
            width: 350px; height: 350px;
            background: radial-gradient(circle, rgba(255,250,220,0.45) 0%, rgba(212,175,55,0.1) 55%, transparent 80%);
            transition: opacity 2.2s cubic-bezier(0.23,1,0.32,1) 0.4s;
            filter: blur(65px); z-index: 2;
          }
          .product-container:hover .product-spotlight { opacity: 0.6; }

          .top-accent-light {
            position: absolute; top: 5%; left: 50%; transform: translateX(-50%);
            width: 60%; height: 60%;
            background: radial-gradient(ellipse at top, rgba(255,245,200,0.35) 0%, rgba(212,175,55,0.09) 52%, transparent 94%);
            transition: opacity 2s cubic-bezier(0.23,1,0.32,1) 0.2s;
            filter: blur(70px); z-index: 1;
          }
          .product-container:hover .top-accent-light { opacity: 0.35; }

          .product-rim-light {
            position: absolute; top: 32%; left: 50%; transform: translate(-50%, -50%);
            width: 250px; height: 250px;
            background: radial-gradient(circle, rgba(255,250,220,0.25) 0%, rgba(212,175,55,0.03) 65%, transparent 75%);
            transition: opacity 1.5s cubic-bezier(0.25,0.46,0.45,0.94) 0.4s;
            filter: blur(40px); z-index: 4;
          }
          .product-container:hover .product-rim-light { opacity: 0.3; }

          .floor-reflection {
            position: absolute; bottom: 120px; left: 50%; transform: translateX(-50%);
            width: 70%; height: 60px;
            background: radial-gradient(ellipse at center, rgba(212,175,55,0.35) 0%, rgba(212,175,55,0.03) 65%, transparent 80%);
            transition: opacity 1.6s cubic-bezier(0.25,0.46,0.45,0.94) 0.5s;
            filter: blur(30px); z-index: 1;
          }
          .product-container:hover .floor-reflection { opacity: 1; }

          .particles-container {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            pointer-events: none; z-index: 3; transition: opacity 1.5s ease;
          }
          .product-container:hover .particles-container { opacity: 1; }
        }

        .ambient-glow {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(ellipse at 50% 35%, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.03) 40%, transparent 70%);
          opacity: 0; transition: opacity 1.4s cubic-bezier(0.25,0.46,0.45,0.94) 0.2s;
          pointer-events: none; z-index: 1;
        }
        @media (hover: hover) {
          .product-container:hover .ambient-glow { opacity: 1; }
        }

        .product {
          position: relative; width: 240px; height: 240px; z-index: 5;
          transform: translateY(10px);
          transition: transform 3.5s cubic-bezier(0.19,1,0.22,1), scale 3.5s cubic-bezier(0.19,1,0.22,1);
          display: flex; align-items: center; justify-content: center;
        }
        @media (max-width: 768px) { .product { width: 180px; height: 180px; transform: translateY(0); } }

        .product-img {
          filter: none;
          transition: filter 3s cubic-bezier(0.19,1,0.22,1);
          object-fit: contain;
        }

        @media (hover: hover) {
          .product-container:hover .product { transform: translateY(-15px) scale(1.08); }
          .product-container:hover .product-img {
            filter: brightness(1.3) contrast(1.2) saturate(1.1)
              drop-shadow(0 15px 30px rgba(212,175,55,0.35));
          }
        }
        
        @media (max-width: 768px) {
           .product-img { filter: none; }
        }

        .product-shadow-main {
          position: absolute; bottom: 140px; left: 50%; transform: translateX(-50%);
          width: 220px; height: 40px;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, transparent 90%);
          opacity: 0.8; transition: all 1.5s cubic-bezier(0.25,0.46,0.45,0.94);
          z-index: 3;
        }
        @media (hover: hover) {
          .product-container:hover .product-shadow-main { opacity: 0.4; width: 180px; bottom: 150px; filter: blur(20px); }
        }

        .particle {
          position: absolute;
          background: radial-gradient(circle, rgba(255,245,200,0.5) 0%, rgba(255,230,150,0.2) 40%, transparent 100%);
          border-radius: 50%; opacity: 0; animation: particleRise infinite ease-out;
        }
        @keyframes particleRise {
          0%   { opacity: 0; transform: translate(0,0) scale(0.3); }
          20%  { opacity: 0.3; }
          50%  { opacity: 0.1; transform: translate(var(--x-drift), var(--y-rise)) scale(1); }
          100% { opacity: 0; transform: translate(calc(var(--x-drift)*1.4), calc(var(--y-rise)*1.6)) scale(0.2); }
        }

        .product-info {
          position: absolute; bottom: 25px; left: 0; right: 0;
          text-align: center; padding: 0 20px; z-index: 10;
          transition: all 0.5s ease;
        }
        @media (max-width: 768px) {
          .product-info { bottom: 15px; }
        }

        .product-brand {
          font-size: 8px; font-weight: 700; letter-spacing: 0.3em;
          text-transform: uppercase; color: rgba(212, 175, 55, 0.6); margin-bottom: 6px;
        }
        .product-name {
          font-family: var(--font-serif, serif); font-size: 16px; font-weight: 300;
          color: white; margin-bottom: 4px; line-height: 1.2;
          overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
        }
        .product-price {
          font-size: 20px; font-weight: 600; color: rgba(212, 175, 55, 1);
          letter-spacing: 0.02em;
        }
        @media (max-width: 768px) {
          .product-name { font-size: 14px; }
          .product-price { font-size: 18px; }
        }

        .shine-button {
          position: relative;
          overflow: hidden;
        }
        @media (hover: hover) {
          .shine-button:hover {
            background-color: var(--gold-light, #ffd700);
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
          }
          .shine-button::after {
            content: "";
            position: absolute;
            top: -50%;
            left: -60%;
            width: 20%;
            height: 200%;
            background: linear-gradient(
              to right,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.6) 50%,
              rgba(255, 255, 255, 0) 100%
            );
            transform: rotate(30deg);
            transition: none;
          }
          .shine-button:hover::after {
            left: 120%;
            transition: all 0.7s cubic-bezier(0.19, 1, 0.22, 1);
          }
        }
        
        /* Mobile specific adjustments to hide desktop-only hover elements */
        @media (max-width: 768px) {
          .lighting-container { display: none; }
          .particles-container { display: none; }
          .product-info.on-hover-hide { opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      <Link href={`/products/${product.slug}`} className="block">
        <div className="product-container group" onMouseEnter={createParticles}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/Fondo-cards.jpg"
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
          />
          <div className="lighting-container">
            <div className="ambient-glow" />
            <div className="main-light-cone" />
            <div className="top-accent-light" />
            <div className="product-spotlight" />
            <div className="product-rim-light" />
            <div className="floor-reflection" />
            <div className="particles-container">
              {particles.map((p) => (
                <div key={p.id} className="particle" style={p.style} />
              ))}
            </div>
          </div>
          <div className="product-shadow-soft hidden sm:block" />
          <div className="product-shadow-main" />
          <div className="product">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                width={240}
                height={240}
                className="product-img"
              />
            ) : (
              <div style={{ width: 140, height: 140, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.1, fontSize: 60, fontFamily: "serif" }}>F</div>
            )}
          </div>
          <div className={`product-info transition-all duration-500 sm:group-hover:opacity-0 sm:group-hover:translate-y-2`}>
            <p className="product-brand">{product.category}</p>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price}</p>
          </div>
        </div>
      </Link>

      <div 
        className={`purchase-button-container absolute bottom-0 left-0 right-0 z-30 transition-all duration-500 sm:opacity-0 sm:translate-y-4 sm:group-hover:opacity-100 sm:group-hover:translate-y-0`}
      >
        <button
          onClick={handleAddToCart}
          disabled={!inStock || !product.variantId}
          className="w-full flex items-center justify-center gap-2.5 py-4 sm:py-5 bg-primary text-black font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.2em] shadow-[0_-10px_40px_rgba(0,0,0,0.4)] transition-all duration-300 shine-button active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          {inStock ? "Comprar ahora" : "Sin stock"}
        </button>
      </div>
    </motion.div>
  );
}

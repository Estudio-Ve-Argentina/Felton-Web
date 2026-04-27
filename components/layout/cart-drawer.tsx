"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";

function formatARS(num: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(num);
}

export function CartDrawer() {
  const {
    items,
    totalItems,
    totalPrice,
    isOpen,
    closeCart,
    increment,
    decrement,
    remove,
  } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeCart]);

  async function handleCheckout() {
    if (!items.length) return;
    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/tiendanube/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            variantId: i.variantId,
            quantity: i.quantity,
            name: i.name,
            price: i.price,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(
          data.error || "No pudimos generar el link de pago seguro",
        );
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error("No se pudo generar el link de pago");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      toast.error("¡Ups! Hubo un problema", {
        description:
          "No te preocupes, tus productos siguen guardados en el carrito. Por favor, intenta de nuevo en unos momentos o contáctanos si el problema persiste.",
        duration: 6000,
      });
    } finally {
      setIsCheckingOut(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={closeCart}
          />

          <motion.aside
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-[oklch(0.12_0.02_260)] border-l border-primary/15 z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-primary/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h2 className="font-serif text-lg font-light text-foreground tracking-wide">
                  Carrito
                </h2>
                {totalItems > 0 && (
                  <span className="bg-primary text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Cerrar carrito"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4 px-6 space-y-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-20">
                  <ShoppingBag className="h-12 w-12 text-primary/20" />
                  <p className="text-sm font-light text-muted-foreground">
                    Tu carrito está vacío
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ duration: 0.22 }}
                    className="flex gap-4 pb-5 border-b border-primary/10 last:border-0"
                  >
                    <div className="flex-shrink-0 w-20 h-20 bg-white/[0.04] border border-primary/10 flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-primary/20 text-2xl font-serif">
                          F
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      {item.category && (
                        <p className="text-[10px] uppercase tracking-[0.2em] text-primary/60 mb-0.5">
                          {item.category}
                        </p>
                      )}
                      <p className="text-sm font-light text-foreground leading-snug mb-2 truncate">
                        {item.name}
                      </p>
                      <p className="text-base font-semibold text-primary">
                        {formatARS(parseFloat(item.price))}
                      </p>

                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => decrement(item.id)}
                          className="w-7 h-7 flex items-center justify-center border border-primary/25 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                          aria-label="Reducir cantidad"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-light text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increment(item.id)}
                          disabled={item.quantity >= item.stock}
                          className="w-7 h-7 flex items-center justify-center border border-primary/25 text-muted-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        {item.quantity >= item.stock && item.stock < 999 && (
                          <span className="text-[10px] text-primary/50 ml-1">
                            Máx
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => remove(item.id)}
                      className="self-start p-1 text-muted-foreground/40 hover:text-red-400 transition-colors"
                      aria-label="Eliminar producto"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-primary/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    Total
                  </span>
                  <span className="text-xl font-semibold text-primary tracking-tight">
                    {formatARS(totalPrice)}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full group relative inline-flex items-center justify-center gap-3 py-4 bg-primary text-black font-semibold text-xs tracking-[0.25em] uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative">
                    {isCheckingOut ? "Procesando..." : "Ir a comprar"}
                  </span>
                </button>

                <button
                  onClick={closeCart}
                  className="w-full py-3 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                >
                  Seguir comprando
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

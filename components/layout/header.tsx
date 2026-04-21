"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { FeltonLogo } from "@/components/shared";
import { cn } from "@/lib/utils";

export function Header() {
  const { t } = useTranslation();
  const { totalItems, openCart } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const navigation = [
    {
      name: t("nav.collections"),
      href: "/products",
      dropdown: [
        { name: "Bolsos", href: "/products?category=Bolsos" },
        { name: "Carteras", href: "/products?category=Carteras" },
        { name: "Cinturones", href: "/products?category=Cinturones" },
        { name: "Otros", href: "/products?category=Otros" },
      ],
    },
    {
      name: t("nav.brands"),
      href: "/brands",
      dropdown: [
        { name: "Louis Vuitton", href: "/products?q=Louis+Vuitton" },
        { name: "Diesel", href: "/products?q=Diesel" },
        { name: "Gucci", href: "/products?q=Gucci" },
        { name: "Prada", href: "/products?q=Prada" },
        { name: "Cartier", href: "/products?q=Cartier" },
        { name: "Supreme", href: "/products?q=Supreme" },
      ],
    },
    { name: t("nav.blog"), href: "/blog" },
    { name: t("nav.about"), href: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery("");
  };

  const visible = !isHome || scrolled;

  return (
    <motion.header
      initial={{ y: isHome ? -100 : 0, opacity: isHome ? 0 : 1 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-primary/10"
    >
      {/* Desktop: 5-col grid — Logo | gap | Search | Nav (centered) | Right */}
      <nav className="mx-auto hidden lg:grid max-w-7xl items-center py-3 pl-2 pr-2"
        style={{ gridTemplateColumns: "auto 32px 240px 1fr auto" }}
      >
        {/* Logo — pushed left */}
        <Link href="/" className="shrink-0">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="opacity-90 hover:opacity-100 transition-opacity duration-500"
          >
            <FeltonLogo textClassName="text-xl lg:text-2xl" />
          </motion.div>
        </Link>

        {/* Spacer */}
        <div />

        {/* Search bar — fixed 240px */}
        <form
          onSubmit={handleSearch}
          className="flex items-center overflow-hidden rounded-full bg-secondary/30 border border-primary/20 focus-within:border-primary/40 focus-within:bg-secondary/50 transition-all duration-300"
        >
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar producto..."
            className="flex-1 bg-transparent pl-4 pr-2 py-1.5 text-xs font-light text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
          />
          <button
            type="submit"
            className="shrink-0 bg-primary hover:bg-primary/85 rounded-full m-1 px-2.5 py-1 flex items-center justify-center transition-colors duration-200"
            aria-label="Buscar"
          >
            <Search className="h-3 w-3 text-primary-foreground" />
          </button>
        </form>

        {/* Navigation — centrada en el espacio 1fr */}
        <div className="flex items-center justify-center gap-x-7">
          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              <Link
                href={item.href}
                className="relative text-sm font-light tracking-wide text-muted-foreground transition-colors hover:text-primary whitespace-nowrap"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>

              {item.dropdown && (
                <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="bg-background/95 backdrop-blur-md border border-primary/20 shadow-xl min-w-[200px] py-2">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-6 py-3 text-sm font-light text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right side — pushed right */}
        <div className="flex items-center gap-x-4">
          <Link
            href="/contact"
            className="group relative text-sm font-light tracking-wide text-muted-foreground transition-colors hover:text-primary whitespace-nowrap"
          >
            {t("nav.contact")}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
          </Link>


          <button
            onClick={openCart}
            className="relative p-1.5 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Abrir carrito"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile nav — una sola fila: Logo | Search | Hamburger + Cart */}
      <nav className="lg:hidden mx-auto flex max-w-7xl items-center gap-2 px-3 py-2.5">
        <Link href="/" className="shrink-0">
          <FeltonLogo textClassName="text-xl" />
        </Link>

        {/* Search — ocupa el espacio disponible */}
        <form
          onSubmit={handleSearch}
          className="flex flex-1 items-center overflow-hidden rounded-full bg-secondary/30 border border-primary/20 focus-within:border-primary/40 transition-all duration-300 min-w-0"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar..."
            className="flex-1 min-w-0 bg-transparent pl-3.5 pr-1 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
          />
          <button
            type="submit"
            className="shrink-0 bg-primary hover:bg-primary/85 rounded-full m-1 px-2.5 py-1 flex items-center justify-center transition-colors duration-200"
            aria-label="Buscar"
          >
            <Search className="h-3 w-3 text-primary-foreground" />
          </button>
        </form>

        {/* Hamburger + Cart */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 text-muted-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          <button
            onClick={openCart}
            className="relative p-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Abrir carrito"
          >
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>


      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:hidden overflow-hidden bg-background/98 backdrop-blur-md border-t border-primary/10"
          >
            <div className="px-6 pb-8 pt-4 space-y-1">
              {navigation.map((item, index) => (
                <motion.div key={item.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                  <Link
                    href={item.href}
                    className="block py-3 text-lg font-light tracking-wide text-muted-foreground transition-colors hover:text-primary border-b border-border/20"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <Link href="/contact" className="block py-3 text-lg font-light tracking-wide text-muted-foreground transition-colors hover:text-primary border-b border-border/20" onClick={() => setMobileMenuOpen(false)}>
                  {t("nav.contact")}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

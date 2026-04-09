"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { Instagram, Mail } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { Newsletter, FeltonLogo } from "@/components/shared";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Footer() {
  const { t } = useTranslation();

  const footerLinks = {
    discover: [
      { name: t("footer.bestsellers"), href: "/products" },
      { name: t("nav.brands"), href: "/brands" },
      { name: t("nav.blog"), href: "/blog" },
    ],
    support: [
      { name: t("nav.faqs"), href: "/faqs" },
      { name: t("nav.contact"), href: "/contact" },
      { name: t("footer.shipping"), href: "/faqs#shipping" },
    ],
    company: [
      { name: t("nav.about"), href: "/about" },
      { name: t("footer.philosophy"), href: "/about#philosophy" },
      { name: t("nav.legal"), href: "/legal" },
    ],
  };

  return (
    <footer className="bg-navy-dark border-t border-primary/10">
      {/* Main Footer Content */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16"
      >
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="col-span-2">
            <Link href="/" className="inline-block mb-2">
              <FeltonLogo
                className="items-start"
                textClassName="text-4xl lg:text-5xl"
                lineClassName="mx-0 w-2/3"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-muted-foreground">
              {t("footer.description")}
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://instagram.com/felton"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 w-10 border border-border/30 text-muted-foreground transition-all hover:border-primary hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="mailto:contacto@felton.com"
                className="flex items-center justify-center h-10 w-10 border border-border/30 text-muted-foreground transition-all hover:border-primary hover:text-primary"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          {/* Discover */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-xs font-medium uppercase tracking-widest text-primary/80">
              {t("footer.discover")}
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.discover.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-light text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-xs font-medium uppercase tracking-widest text-primary/80">
              {t("footer.support")}
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-light text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-xs font-medium uppercase tracking-widest text-primary/80">
              {t("footer.company")}
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-light text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 h-px w-full bg-primary/20 origin-left"
        />

        {/* Bottom Bar */}
        <motion.div
          variants={fadeInUp}
          className="mt-8 flex flex-col items-center justify-between gap-4 lg:flex-row"
        >
          <div className="flex flex-col items-center gap-2 lg:flex-row lg:gap-4">
            <p className="text-xs font-light text-muted-foreground/60">
              {new Date().getFullYear()} Felton. {t("footer.rights")}
            </p>
            <span className="hidden lg:inline text-muted-foreground/30">|</span>
            <p className="text-xs font-medium text-primary/60 italic">
              {t("footer.tagline")}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs font-light text-muted-foreground/60 transition-colors hover:text-primary"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              href="/terms"
              className="text-xs font-light text-muted-foreground/60 transition-colors hover:text-primary"
            >
              {t("footer.terms")}
            </Link>
            <Link
              href="/legal"
              className="text-xs font-light text-muted-foreground/60 transition-colors hover:text-primary"
            >
              {t("footer.legal")}
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}

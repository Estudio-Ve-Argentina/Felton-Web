"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Check } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/tiendanube/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setIsSubmitted(true);
        setEmail("");
        setTimeout(() => setIsSubmitted(false), 6000);
      }
    } catch {
      // Silent fail — still show success to avoid UX confusion
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 6000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative w-full py-24 lg:py-32 bg-background/95 border-t border-border/20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-background border border-border/30 p-12 lg:p-16 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-8"
          >
            <Mail className="w-7 h-7 text-primary" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-4"
          >
            Únete a Nuestra Comunidad Exclusiva
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto h-px w-24 bg-primary/50 origin-center mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Recibe acceso anticipado a productos exclusivos, ofertas especiales y contenido premium directamente en tu bandeja de entrada.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  disabled={isSubmitted}
                  className="w-full pl-13 pr-4 py-4 bg-transparent border-2 border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/70 focus:outline-none transition-colors text-base"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isLoading || isSubmitted}
                whileHover={{ scale: isSubmitted ? 1 : 1.03 }}
                whileTap={{ scale: isSubmitted ? 1 : 0.97 }}
                className={`px-10 py-4 text-sm font-medium tracking-wide transition-all ${
                  isSubmitted
                    ? "bg-green-600/90 text-white border-2 border-green-600/90"
                    : "bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90"
                } disabled:opacity-70 flex items-center justify-center gap-2 whitespace-nowrap`}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                  />
                ) : isSubmitted ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>¡Listo!</span>
                  </>
                ) : (
                  <>
                    <span>Suscribirse</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </div>

            <p className="text-xs text-muted-foreground/60 mt-5">
              Al suscribirte, aceptas recibir correos de marketing. Cancela en cualquier momento.
            </p>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center justify-center gap-8 mt-10 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary/70" />
              <span>Sin spam</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary/70" />
              <span>Cancela cuando quieras</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary/70" />
              <span>100% privado</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

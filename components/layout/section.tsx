"use client";

import React from "react";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { goldLineReveal, fadeInUp, luxuryTransition } from "@/lib/animations";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "dark" | "light" | "textured";
  size?: "default" | "large" | "small";
  id?: string;
}

export function Section({
  children,
  className,
  variant = "default",
  size = "default",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        {
          "bg-background": variant === "default",
          "bg-secondary/10": variant === "dark",
          "bg-card": variant === "light",
        },
        {
          "py-16 lg:py-24": size === "default",
          "py-20 lg:py-32": size === "large",
          "py-12 lg:py-16": size === "small",
        },
        className,
      )}
    >
      {variant === "textured" && (
        <>
          <div className="absolute inset-0 bg-background/95" />
          <div className="absolute inset-0 textured-bg" />
        </>
      )}
      <div className={cn("mx-auto max-w-7xl px-6 lg:px-8", variant === "textured" && "relative z-10")}>
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      className={cn(
        "relative",
        align === "center" && "text-center",
        align === "left" && "text-left",
        className,
      )}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <motion.p
          variants={fadeInUp}
          transition={{ ...luxuryTransition, delay: 0 }}
          className="text-xs font-medium uppercase tracking-[0.3em] text-primary/80"
        >
          {eyebrow}
        </motion.p>
      )}

      {/* Gold accent line */}
      <motion.div
        variants={goldLineReveal}
        className={cn(
          "mt-4 h-px w-16 bg-primary/60",
          align === "center" && "mx-auto origin-center",
          align === "left" && "origin-left",
        )}
      />

      {/* Title */}
      <motion.h2
        variants={fadeInUp}
        transition={{ ...luxuryTransition, delay: 0.1 }}
        className="mt-6 font-serif text-3xl font-light tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance"
      >
        {title}
      </motion.h2>

      {/* Description */}
      {description && (
        <motion.p
          variants={fadeInUp}
          transition={{ ...luxuryTransition, delay: 0.2 }}
          className={cn(
            "mt-4 text-base font-light leading-relaxed text-muted-foreground lg:text-lg text-pretty",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

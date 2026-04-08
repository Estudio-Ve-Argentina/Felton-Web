// Framer Motion animation variants for Felton luxury aesthetic

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

export const fadeInDown = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
}

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
}

export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

export const slideInFromBottom = {
  initial: { y: "100%" },
  animate: { y: 0 },
  exit: { y: "100%" },
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const staggerContainerSlow = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

// Luxury-specific animations
export const luxuryReveal = {
  initial: { 
    opacity: 0, 
    y: 40,
    filter: "blur(4px)"
  },
  animate: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)"
  },
}

export const goldLineReveal = {
  initial: { scaleX: 0 },
  animate: { 
    scaleX: 1
  },
}

export const cardHover = {
  rest: { 
    scale: 1,
    borderColor: "rgba(179, 146, 93, 0.1)"
  },
  hover: { 
    scale: 1.02,
    borderColor: "rgba(179, 146, 93, 0.4)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
}

export const imageReveal = {
  initial: { 
    opacity: 0,
    scale: 1.1
  },
  animate: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
}

// Transition presets
export const smoothTransition = {
  duration: 0.5,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
}

export const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
}

export const luxuryTransition = {
  duration: 0.8,
  ease: [0.19, 1.0, 0.22, 1.0] as const, // Expo.easeOut
}

// Viewport settings for scroll animations
export const viewportOnce = {
  once: true,
  amount: 0.2,
}

export const viewportRepeat = {
  once: false,
  amount: 0.3,
}

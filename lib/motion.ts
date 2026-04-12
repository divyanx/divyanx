import type { Variants } from "framer-motion";

// The cinematic ease: fast start, very slow end — like a film cut settling into frame.
export const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: cinematicEase },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: cinematicEase },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: cinematicEase },
  },
};

export const chipReveal: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: cinematicEase },
  },
};

export const portraitReveal: Variants = {
  hidden: { opacity: 0, x: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.9, ease: cinematicEase, delay: 0.7 },
  },
};

// Shared viewport config — matches the existing IntersectionObserver threshold
export const defaultViewport = { once: true, amount: 0.15 } as const;

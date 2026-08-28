/**
 * Shared Framer Motion animation variants and helpers
 * Used across all sections for consistent, creative scroll animations
 */

import type { Variants } from 'framer-motion'

// ── Fade + rise (standard scroll-in) ──────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

// ── Fade from left ─────────────────────────────────────────────────────────
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

// ── Fade from right ────────────────────────────────────────────────────────
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

// ── Scale pop (for cards, icons, badges) ──────────────────────────────────
export const scalePop: Variants = {
  hidden: { opacity: 0, scale: 0.82, y: 18 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }, // spring overshoot
  },
}

// ── Card flip-up (subtle perspective) ─────────────────────────────────────
export const cardFlipUp: Variants = {
  hidden: { opacity: 0, y: 36, rotateX: 8 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

// ── Stagger container (wraps lists of children) ───────────────────────────
export function staggerContainer(staggerChildren = 0.1, delayChildren = 0): Variants {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  }
}

// ── Clip-path reveal (image wipe) ─────────────────────────────────────────
export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
  show: {
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
    transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
  },
}

// ── Word-by-word heading reveal ───────────────────────────────────────────
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 24, skewY: 3 },
  show: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

// ── Line draw (for connector lines, dividers) ─────────────────────────────
export const lineDraw: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
  },
}

// ── Stagger list item ─────────────────────────────────────────────────────
export const listItem: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

// ── Shimmer badge enter ───────────────────────────────────────────────────
export const badgePop: Variants = {
  hidden: { opacity: 0, scale: 0.75, y: -8 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] },
  },
}

// ── Icon rotate-scale pop ─────────────────────────────────────────────────
export const iconPop: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -12 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
}

// ── Stat counter shimmer ──────────────────────────────────────────────────
export const statReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

// ── Button glow entrance ──────────────────────────────────────────────────
export const buttonEntrance: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.2, 0.64, 1] },
  },
}

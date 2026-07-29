'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { stats } from '@/lib/data'
import {
  staggerContainer,
  wordReveal,
  badgePop,
  fadeRight,
  statReveal,
  buttonEntrance,
  scalePop,
} from '@/lib/animations'

/* ── Animated counter ─────────────────────────────────────── */
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          let start = 0
          const duration = 2000
          const step = value / (duration / 16)
          const timer = setInterval(() => {
            start += step
            if (start >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, started])

  return <span ref={ref} className="tabular-nums">{count.toLocaleString()}{suffix}</span>
}

/* ── Split heading into word spans ───────────────────────── */
function SplitWords({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          variants={wordReveal}
          className={`inline-block mr-[0.26em] ${className ?? ''}`}
        >
          {word}
        </motion.span>
      ))}
    </>
  )
}

export default function HeroSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const rawY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const imageY = useSpring(rawY, { stiffness: 80, damping: 20 })
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.25, 0.55])

  return (
    <section ref={sectionRef} className="section-bg-a pt-10 pb-14 md:pt-14 md:pb-18 overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Left column ── */}
          <motion.div
            variants={staggerContainer(0.08, 0.05)}
            initial="hidden"
            animate="show"
          >
            {/* Pill badge */}
            <motion.span
              variants={badgePop}
              className="inline-flex items-center gap-2 bg-white border border-border font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground px-4 py-1.5 rounded-full shadow-sm mb-7"
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              India&apos;s Most Trusted Pharma Wholesaler
            </motion.span>

            {/* Heading — word-by-word reveal */}
            <motion.h1
              variants={staggerContainer(0.07, 0.1)}
              className="font-sans font-bold text-foreground leading-[1.1] text-balance text-[2.6rem] md:text-5xl xl:text-[3.25rem] mb-6"
            >
              <SplitWords text="Advancing Health" />
              <br />
              <SplitWords text="Through" />
              {' '}
              <motion.em
                variants={wordReveal}
                className="accent-italic text-primary inline-block"
              >
                Wholesale
              </motion.em>
              {' '}
              <motion.span variants={wordReveal} className="inline-block">Excellence</motion.span>
            </motion.h1>

            <motion.p
              variants={wordReveal}
              className="text-muted-foreground leading-relaxed text-[1.0625rem] mb-10 max-w-[440px]"
            >
              Supplying certified, quality-assured medicines and medical devices to
              hospitals, pharmacies, and healthcare chains across India.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={staggerContainer(0.1, 0.05)}
              className="flex flex-wrap items-center gap-3 mb-14"
            >
              <motion.div variants={buttonEntrance} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 text-white font-bold text-sm px-8 py-4 rounded-full shadow-md hover:brightness-105 transition-all bg-navy-btn"
                >
                  Browse Products
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </motion.div>
              <motion.div variants={buttonEntrance} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-foreground font-semibold text-sm rounded-full border border-border shadow-md hover:border-primary/30 hover:bg-muted/40 transition-all"
                >
                  Request a Quote
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              variants={staggerContainer(0.1, 0.3)}
              className="flex flex-wrap gap-x-10 gap-y-5 pt-8 border-t border-border"
            >
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={statReveal}>
                  <div className="font-mono font-bold text-foreground text-2xl leading-none tracking-tight">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted-foreground mt-1.5">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right column — parallax image ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="show"
            className="relative"
          >
            {/* Main image with parallax */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
                <Image
                  src="/images/hero-pharma.png"
                  alt="Premium pharmaceutical warehouse"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-foreground via-transparent to-transparent"
                style={{ opacity: overlayOpacity }}
              />
            </div>

            {/* Blue info card */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.55, ease: [0.34, 1.3, 0.64, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="absolute -bottom-7 -left-5 bg-primary text-white rounded-2xl px-6 py-5 shadow-2xl shadow-primary/30 min-w-[210px]"
            >
              <div className="font-sans font-semibold text-[13px] mb-3 text-white/80 uppercase tracking-wide">Delivery Coverage</div>
              <div className="space-y-2.5">
                {[
                  ['Pan-India', '28 States'],
                  ['Metro Cities', '24-hr Delivery'],
                  ['Emergency', '24/7 Support'],
                ].map(([label, val], i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.75 + i * 0.1 }}
                    className="flex items-center justify-between gap-10"
                  >
                    <span className="font-mono text-[11px] text-white/60">{label}</span>
                    <span className="font-mono text-[11px] font-semibold text-white">{val}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Floating stat badge */}
            <motion.div
              variants={scalePop}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.75 }}
              whileHover={{ rotate: -3, scale: 1.05, transition: { duration: 0.2 } }}
              className="absolute -top-5 -right-4 bg-white border border-border rounded-2xl px-5 py-4 shadow-xl shadow-black/8 cursor-default"
            >
              <div className="font-mono font-bold text-foreground text-[2.25rem] leading-none tracking-tight">25+</div>
              <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-foreground mt-2 leading-tight">Years of<br/>Excellence</div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

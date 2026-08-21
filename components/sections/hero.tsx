'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { stats } from '@/lib/data'
import {
  staggerContainer,
  wordReveal,
  badgePop,
  fadeLeft,
  fadeRight,
  statReveal,
  buttonEntrance,
  scalePop,
  clipReveal,
  lineDraw,
  listItem,
} from '@/lib/animations'
import { useLoaderReady } from '@/components/loader-context'

/* ── Animated counter ─────────────────────────────────────── */
function AnimatedCounter({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
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
    return () => clearInterval(timer)
  }, [value, active])

  return <span className="tabular-nums">{count.toLocaleString()}{suffix}</span>
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
  const inView = useInView(sectionRef, { once: true, margin: '-40px' })
  const { isReady } = useLoaderReady()
  // Wait for splash loader to finish, then play entrance animations
  const play = isReady && inView

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
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
            variants={fadeLeft}
            initial="hidden"
            animate={play ? 'show' : 'hidden'}
          >
            <motion.div
              variants={staggerContainer(0.1, 0.08)}
              initial="hidden"
              animate={play ? 'show' : 'hidden'}
            >
              {/* Pill badge */}
              <motion.div variants={badgePop} className="mb-7">
                <span className="inline-flex items-center gap-2 bg-white border border-border font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground px-4 py-1.5 rounded-full shadow-sm">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                    animate={play ? { scale: [1, 1.5, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  India&apos;s Most Trusted Pharma Wholesaler
                </span>
              </motion.div>

              {/* Heading — word-by-word reveal */}
              <motion.h1
                variants={staggerContainer(0.07, 0.05)}
                className="font-heading font-black text-foreground leading-[1.1] text-balance text-[2.6rem] md:text-5xl xl:text-[3.25rem] mb-6"
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
                <motion.span variants={wordReveal} className="inline-block">
                  Excellence
                </motion.span>
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
                variants={staggerContainer(0.12, 0.05)}
                className="flex flex-wrap items-center gap-3 mb-14"
              >
                <motion.div variants={buttonEntrance} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center gap-2 text-white font-bold text-sm px-8 py-4 rounded-full shadow-md hover:brightness-105 transition-all bg-navy-btn"
                  >
                    Browse Products
                    <motion.span
                      animate={play ? { x: [0, 3, 0] } : {}}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.span>
                  </Link>
                </motion.div>
                <motion.div variants={buttonEntrance} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-foreground font-semibold text-sm rounded-full border border-border shadow-md hover:border-primary/30 hover:bg-muted/40 transition-all"
                  >
                    Request a Quote
                    <motion.span
                      animate={play ? { x: [0, 3, 0] } : {}}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Divider */}
              <motion.div variants={lineDraw} className="h-px bg-border mb-8 origin-left" />

              {/* Stats strip */}
              <motion.div
                variants={staggerContainer(0.1, 0.05)}
                className="flex flex-wrap gap-x-10 gap-y-5"
              >
                {stats.map((stat) => (
                  <motion.div key={stat.label} variants={statReveal}>
                    <div className="font-mono font-bold text-foreground text-2xl leading-none tracking-tight">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} active={play} />
                    </div>
                    <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted-foreground mt-1.5">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── Right column — image + floating cards ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={play ? 'show' : 'hidden'}
            className="relative"
          >
            {/* Main image with clip reveal + parallax */}
            <motion.div
              variants={clipReveal}
              initial="hidden"
              animate={play ? 'show' : 'hidden'}
              className="relative rounded-3xl overflow-hidden aspect-[4/3]"
            >
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
            </motion.div>

            {/* Blue info card */}
            <motion.div
              variants={scalePop}
              initial="hidden"
              animate={play ? 'show' : 'hidden'}
              transition={{ delay: 0.45 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="absolute -bottom-7 -left-5 bg-primary text-white rounded-2xl px-6 py-5 shadow-2xl shadow-primary/30 min-w-[210px]"
            >
              <div className="font-sans font-semibold text-[13px] mb-3 text-white/80 uppercase tracking-wide">
                Delivery Coverage
              </div>
              <motion.div
                variants={staggerContainer(0.08, 0.1)}
                initial="hidden"
                animate={play ? 'show' : 'hidden'}
                className="space-y-2.5"
              >
                {[
                  ['Pan-India', '28 States'],
                  ['Metro Cities', '24-hr Delivery'],
                  ['Emergency', '24/7 Support'],
                ].map(([label, val]) => (
                  <motion.div
                    key={label}
                    variants={listItem}
                    className="flex items-center justify-between gap-10"
                  >
                    <span className="font-mono text-[11px] text-white/60">{label}</span>
                    <span className="font-mono text-[11px] font-semibold text-white">{val}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Floating stat badge */}
            <motion.div
              variants={scalePop}
              initial="hidden"
              animate={play ? 'show' : 'hidden'}
              transition={{ delay: 0.55 }}
              whileHover={{ rotate: -3, scale: 1.05, transition: { duration: 0.2 } }}
              className="absolute -top-5 -right-4 bg-white border border-border rounded-2xl px-5 py-4 shadow-xl shadow-black/8 cursor-default"
            >
              <div className="font-mono font-bold text-foreground text-[2.25rem] leading-none tracking-tight">
                25+
              </div>
              <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-foreground mt-2 leading-tight">
                Years of<br />Excellence
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

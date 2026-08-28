'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import SectionHeading from '@/components/section-heading'
import {
  staggerContainer,
  fadeLeft,
  fadeRight,
  listItem,
  buttonEntrance,
  scalePop,
  clipReveal,
} from '@/lib/animations'

const highlights = [
  'GMP-GLP compliant plant with modern labs, chemical plants, and large-scale lines',
  'Full oral and topical range: tablets, capsules, liquids, and ointments',
  'In-house R&D for formulation work, including prolonged-release products',
  'Third-party manufacturing for small and large pharmaceutical companies',
]

const miniStats = [
  { value: 'TAB', label: 'Tablets' },
  { value: 'CAP', label: 'Capsules' },
  { value: 'LIQ', label: 'Liquids' },
  { value: 'OIN', label: 'Ointments' },
]

export default function AboutSection({
  ctaHref = '/about',
  ctaLabel = 'Discover More',
}: {
  ctaHref?: string
  ctaLabel?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  /* Subtle parallax on the image */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [-24, 24])

  return (
    <section ref={ref} className="py-14 md:py-20 section-bg-b overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Image side ── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="relative"
          >
            {/* Pill label */}
            <motion.div
              variants={scalePop}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              transition={{ delay: 0.3 }}
              className="absolute -top-3 left-6 z-10"
            >
              <span className="inline-flex items-center gap-2 bg-white border border-border font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground px-4 py-1.5 rounded-full shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                About Samay Pharma
              </span>
            </motion.div>

            {/* Image with clip-path wipe + parallax */}
            <motion.div
              variants={clipReveal}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="relative rounded-3xl overflow-hidden aspect-[4/3]"
            >
              <motion.div style={{ y: imgY }} className="absolute inset-[-10%] inset-x-0">
                <Image
                  src="/images/about-warehouse.png"
                  alt="Samay Pharma manufacturing facility"
                  fill
                  className="object-cover scale-110"
                />
              </motion.div>
            </motion.div>

            {/* Info overlay card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.55, ease: [0.34, 1.3, 0.64, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="absolute -bottom-6 -right-5 bg-foreground text-white rounded-2xl px-6 py-5 shadow-2xl shadow-black/20"
            >
              <div className="font-sans font-semibold text-[13px] mb-3 text-white/70 uppercase tracking-wide font-mono">Kala Amb, H.P.</div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {miniStats.map(({ value, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.85 + i * 0.07 }}
                  >
                    <div className="font-mono font-bold text-white text-xl leading-none">{value}</div>
                    <div className="font-mono text-[9px] tracking-[0.14em] uppercase text-white/50 mt-1">{label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Content side ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ delay: 0.15 }}
            className="pt-6 lg:pt-0"
          >
            <SectionHeading
              badge="Our Story"
              title="Building a Healthier Life Through Quality"
              accentWord="Medicines"
              subtitle="Based in Kala Amb, Himachal Pradesh, Samay Pharma India manufactures quality medicines — tablets, capsules, liquids, and ointments — to international pharmacopoeia standards, at prices meant to stay within reach."
              centered={false}
              inView={inView}
            />

            {/* Highlights — staggered list */}
            <motion.ul
              variants={staggerContainer(0.1, 0.35)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="space-y-3 mt-8 mb-10"
            >
              {highlights.map((item) => (
                <motion.li key={item} variants={listItem} className="flex items-start gap-3">
                  <motion.span
                    initial={{ scale: 0, rotate: -45 }}
                    animate={inView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 18 }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={2} />
                  </motion.span>
                  <span className="text-[15px] text-foreground/75 leading-snug">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              variants={buttonEntrance}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link
                href={ctaHref}
                className="inline-flex items-center justify-center gap-2 text-white font-bold text-sm px-8 py-4 rounded-full shadow-md hover:brightness-105 transition-all bg-navy-btn"
              >
                {ctaLabel}
                <motion.span
                  animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

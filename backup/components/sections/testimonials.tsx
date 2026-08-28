'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import { testimonials } from '@/lib/data'
import { staggerContainer, cardFlipUp, listItem } from '@/lib/animations'

const avatarImages: Record<number, string> = {
  1: '/images/avatars/dr-rajesh.png',
  2: '/images/avatars/priya-mehta.png',
  3: '/images/avatars/dr-rajesh.png',
  4: '/images/avatars/sunita-patel.png',
}

function TealStars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mt-1">
      {Array.from({ length: count }).map((_, i) => (
        <motion.svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="oklch(0.60 0.16 210)"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.07 + 0.3, type: 'spring', stiffness: 300, damping: 15 }}
        >
          <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.43L7 8.885l-3.09 1.615.59-3.43L2 4.635l3.455-.505L7 1z" />
        </motion.svg>
      ))}
    </div>
  )
}

const VISIBLE = 3

export default function TestimonialsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [page, setPage] = useState(0)
  const [dir, setDir] = useState(1)

  const maxPage = testimonials.length - VISIBLE

  const go = (d: number) => {
    const next = page + d
    if (next < 0 || next > maxPage) return
    setDir(d)
    setPage(next)
  }

  const visible = testimonials.slice(page, page + VISIBLE)

  return (
    <section ref={ref} className="py-14 md:py-20 section-bg-dark overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-10">
        <div className="grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-16 items-start">

          {/* ── Left: heading + controls ── */}
          <motion.div
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="flex flex-col gap-0"
          >
            <motion.span
              variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { duration: 0.45 } } }}
              className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/40 mb-5"
            >
              Valuable Feedback
            </motion.span>

            <motion.h2
              variants={staggerContainer(0.07, 0.1)}
              className="font-heading font-black text-white leading-[1.1] text-[2.1rem] mb-6"
            >
              {['Our', 'Happy'].map((w, i) => (
                <motion.span key={i} variants={{ hidden: { opacity: 0, y: 24, skewY: 3 }, show: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }} className="inline-block mr-[0.26em]">{w}</motion.span>
              ))}
              <br />
              <motion.span variants={{ hidden: { opacity: 0, y: 24, skewY: 3 }, show: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }} className="inline-block">Customers</motion.span>
              {' '}
              <motion.em variants={{ hidden: { opacity: 0, y: 24, skewY: 3 }, show: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }} className="accent-italic text-primary inline-block">Review</motion.em>
            </motion.h2>

            <motion.div
              variants={staggerContainer(0.1, 0.35)}
              className="flex flex-col gap-3 mb-10"
            >
              {[
                { label: '1,200+ Partners' },
                { label: '98% Satisfaction' },
              ].map(({ label }) => (
                <motion.div key={label} variants={listItem} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" strokeWidth={2} />
                  <span className="font-sans text-[13px] font-medium text-white/60">{label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Prev / Next */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4, delay: 0.5 } } }}
              className="flex items-center gap-3"
            >
              <motion.button
                onClick={() => go(-1)}
                disabled={page === 0}
                aria-label="Previous reviews"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-secondary hover:text-secondary disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={() => go(1)}
                disabled={page >= maxPage}
                aria-label="Next reviews"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-secondary hover:text-secondary disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* ── Right: 3 review cards ── */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={page}
                custom={dir}
                initial={{ opacity: 0, x: dir * 56 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -dir * 36 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {visible.map((t, i) => (
                  <motion.div
                    key={t.id}
                    variants={cardFlipUp}
                    initial="hidden"
                    animate="show"
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className={`bg-white/5 backdrop-blur-sm rounded-2xl border flex flex-col gap-4 p-6 hover:bg-white/8 transition-all duration-300 ${
                      i === 0
                        ? 'border-primary/30 hover:border-primary/60'
                        : i === 1
                        ? 'border-secondary/30 hover:border-secondary/60'
                        : 'border-white/10 hover:border-white/25'
                    }`}
                  >
                    {/* Avatar row */}
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="w-12 h-12 rounded-full overflow-hidden border border-white/15 shrink-0"
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.1 + 0.2, type: 'spring', stiffness: 260, damping: 18 }}
                      >
                        <Image
                          src={avatarImages[t.id] ?? avatarImages[1]}
                          alt={t.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div>
                        <div className="font-sans font-semibold text-white text-[13px] leading-tight">{t.name}</div>
                        <TealStars count={t.rating} />
                      </div>
                    </div>

                    <div className="h-px bg-white/8" />

                    <div>
                      <p className="font-sans font-bold text-white text-[14px] leading-snug mb-2">
                        {t.role} at {t.company}
                      </p>
                      <p className="text-white/50 text-[13px] leading-relaxed line-clamp-3">
                        {t.quote.replace(/&apos;/g, "'")}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}

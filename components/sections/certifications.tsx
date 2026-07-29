'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, fadeLeft, fadeRight, lineDraw, scalePop } from '@/lib/animations'

/* Per-cert icons */
const CertIcons = [
  () => (
    <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3L4 7v8c0 6.5 4.5 10.5 10 12 5.5-1.5 10-5.5 10-12V7L14 3z" />
      <path d="M9 14l3.5 3.5 6.5-7" strokeWidth="2.2" />
    </svg>
  ),
  () => (
    <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="14" r="10" />
      <path d="M5 14a9 9 0 0 1 9-9 9 9 0 0 1 6.36 2.64" />
      <path d="M20 5l1.36 2.64L23 6.5" />
      <path d="M8 23l-1.36-2.64L5 21.5" />
    </svg>
  ),
  () => (
    <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 24h20M6 24V12M22 24V12M14 6L4 12h20L14 6z" />
      <rect x="10" y="16" width="4" height="8" rx="0.5" />
    </svg>
  ),
  () => (
    <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="8" width="16" height="12" rx="1.5" />
      <path d="M18 11h4l4 4v5h-8V11z" />
      <circle cx="7" cy="22" r="2" />
      <circle cx="21" cy="22" r="2" />
    </svg>
  ),
  () => (
    <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="22" height="22" rx="4" />
      <path d="M14 9v10M9 14h10" strokeWidth="2.2" />
    </svg>
  ),
]

const certifications = [
  { year: '2001', title: 'WHO-GMP Certification', body: 'World Health Organization', description: 'Good Manufacturing Practices across all product categories' },
  { year: '2008', title: 'ISO 9001:2015', body: 'Bureau Veritas', description: 'International Quality Management System certification' },
  { year: '2015', title: 'CDSCO License', body: 'Central Drugs Standard Control Org.', description: "India's national regulatory authority for drug standards" },
  { year: '2019', title: 'GDP Certification', body: 'Indian Pharmaceutical Alliance', description: 'Good Distribution Practices for pharmaceutical supply chain' },
  { year: '2022', title: 'ISO 13485:2016', body: 'TÜV SÜD', description: 'Quality management systems for medical devices' },
]

export default function CertificationsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-16 md:py-24 section-bg-navy overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-10">

        {/* ── Top: badge + heading centered ── */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
            className="inline-flex items-center gap-2 bg-white/8 border border-white/15 text-white/60 font-mono text-[10px] tracking-[0.18em] uppercase rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" />
            Quality & Certifications
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans font-bold text-white text-4xl md:text-5xl leading-[1.1] text-balance"
          >
            Internationally{' '}
            <em className="accent-italic text-primary">Recognized</em>{' '}
            Standards
          </motion.h2>
        </div>

        {/* ── Main layout: left panel + right editorial rows ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 lg:gap-20 items-start">

          {/* ── Left panel ── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="lg:sticky lg:top-28"
          >
            {/* Big accent quote */}
            <div className="mb-8">
              <div className="w-10 h-1 bg-primary rounded-full mb-5" />
              <p className="text-white/60 text-[15px] leading-relaxed">
                Every product we supply is backed by rigorous international certifications — ensuring your supply chain meets the highest global standards.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { value: '20+', label: 'Years certified' },
                { value: '5', label: 'Active licenses' },
                { value: '100%', label: 'Audit pass rate' },
                { value: 'WHO', label: 'Global standard' },
              ].map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4"
                >
                  <div className="font-sans font-black text-white text-2xl leading-none mb-1">{value}</div>
                  <div className="text-white/40 text-[11px]">{label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.55 }}
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 text-secondary font-semibold text-sm group"
            >
              View all compliance documents
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </motion.a>
          </motion.div>

          {/* ── Right: editorial cert rows ── */}
          <div className="relative">

            {/* Vertical connecting line */}
            <motion.div
              variants={lineDraw}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              style={{ originY: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="absolute left-[22px] top-6 bottom-6 w-px bg-gradient-to-b from-primary/60 via-secondary/40 to-transparent [transform-origin:top]"
            />

            <motion.div
              variants={staggerContainer(0.13, 0.15)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="flex flex-col gap-0"
            >
              {certifications.map((cert, i) => {
                const Icon = CertIcons[i % CertIcons.length]
                const isEven = i % 2 === 0
                const accentClass = isEven ? 'text-primary border-primary/30 bg-primary/10' : 'text-secondary border-secondary/30 bg-secondary/10'
                const dotClass = isEven ? 'bg-primary shadow-primary/50' : 'bg-secondary shadow-secondary/50'

                return (
                  <motion.div
                    key={cert.year}
                    variants={{
                      hidden: { opacity: 0, x: 32 },
                      show: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                    className="relative pl-14 pb-10 last:pb-0 group"
                  >
                    {/* Timeline dot */}
                    <motion.div
                      variants={scalePop}
                      className={`absolute left-[14px] top-5 w-[18px] h-[18px] rounded-full ${dotClass} shadow-lg border-2 border-[oklch(0.20_0.055_265)] z-10`}
                    />

                    {/* Card */}
                    <motion.div
                      whileHover={{ x: 6, transition: { duration: 0.2, ease: 'easeOut' } }}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-white/20 group-hover:bg-white/8 rounded-2xl p-6 transition-colors duration-300"
                    >
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          {/* Icon box */}
                          <div className={`w-10 h-10 rounded-xl border ${accentClass} flex items-center justify-center shrink-0`}>
                            <Icon />
                          </div>
                          <div>
                            <h3 className="font-sans font-bold text-white text-[16px] leading-snug">{cert.title}</h3>
                            <p className={`font-mono text-[10px] uppercase tracking-[0.14em] mt-0.5 ${isEven ? 'text-primary' : 'text-secondary'}`}>{cert.body}</p>
                          </div>
                        </div>

                        {/* Ghost year — right aligned */}
                        <span className="font-mono font-black text-[2.8rem] leading-none text-white/[0.05] select-none shrink-0 -mt-1">
                          {cert.year}
                        </span>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-white/8 mb-4" />

                      {/* Bottom row: description + year pill */}
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-white/50 text-[13px] leading-relaxed">{cert.description}</p>
                        <span className={`shrink-0 font-mono text-[11px] font-bold px-3 py-1 rounded-full border ${accentClass} whitespace-nowrap`}>
                          Since {cert.year}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}

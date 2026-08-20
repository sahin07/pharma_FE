'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from '@/components/section-heading'
import { features } from '@/lib/data'
import { staggerContainer, cardFlipUp, iconPop } from '@/lib/animations'

/* Outlined medical SVGs per feature */
const FeatureSVGs: Record<string, () => React.ReactNode> = {
  Shield: () => (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 4L6 8v9c0 6.627 4.925 11 11 11s11-4.373 11-11V8L17 4z"/>
      <path d="M12 17l3 3 6-6" strokeWidth="1.8"/>
    </svg>
  ),
  Truck: () => (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="9" width="18" height="14" rx="2"/>
      <path d="M21 13h4l4 5v5h-8V13z"/>
      <circle cx="9" cy="25" r="2.5"/>
      <circle cx="26" cy="25" r="2.5"/>
    </svg>
  ),
  Award: () => (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="17" cy="13" r="8"/>
      <path d="M11 20l-3 10 9-4 9 4-3-10"/>
      <path d="M14 13l2 2 4-4" strokeWidth="1.8"/>
    </svg>
  ),
  Users: () => (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13" cy="11" r="4"/>
      <path d="M5 28c0-4.418 3.582-8 8-8h0c4.418 0 8 3.582 8 8"/>
      <circle cx="24" cy="11" r="3"/>
      <path d="M29 28c0-3.314-2.239-6-5-6"/>
    </svg>
  ),
  MapPin: () => (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 4C12.582 4 9 7.582 9 12c0 7 8 18 8 18s8-11 8-18c0-4.418-3.582-8-8-8z"/>
      <circle cx="17" cy="12" r="3"/>
    </svg>
  ),
  Tag: () => (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 5h12l12 12-12 12L5 17V5z"/>
      <circle cx="11" cy="11" r="2" fill="currentColor" stroke="none"/>
    </svg>
  ),
}

export default function WhyChooseUsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-14 md:py-20 overflow-hidden section-bg-why"
    >
      <div className="max-w-[1680px] mx-auto px-10">
        <SectionHeading
          badge="Why Choose Us"
          title="The Samay Pharma"
          accentWord="Promise"
          subtitle="We believe access to safe, effective, and affordable healthcare is a right — and we manufacture to that standard."
          inView={inView}
          dark
        />

        <motion.div
          variants={staggerContainer(0.09, 0.1)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          style={{ perspective: 1200 }}
        >
          {features.map((feature, i) => {
            const SvgIcon = FeatureSVGs[feature.icon]
            const accents = [
              { ring: 'border-primary/30 hover:border-primary/70', iconBg: 'bg-primary/15 text-primary group-hover:bg-primary group-hover:text-white', titleColor: 'text-white' },
              { ring: 'border-secondary/30 hover:border-secondary/70', iconBg: 'bg-secondary/15 text-secondary group-hover:bg-secondary group-hover:text-white', titleColor: 'text-white' },
              { ring: 'border-primary/25 hover:border-primary/60', iconBg: 'bg-primary/12 text-primary group-hover:bg-primary group-hover:text-white', titleColor: 'text-white' },
            ]
            const a = accents[i % accents.length]
            return (
              <motion.div
                key={feature.title}
                variants={cardFlipUp}
                transition={{ delay: i * 0.09 }}
                whileHover={{ y: -6, transition: { duration: 0.22, ease: 'easeOut' } }}
                className={`bg-white/5 backdrop-blur-sm rounded-3xl border ${a.ring} p-7 hover:bg-white/8 transition-all relative group cursor-default`}
              >
                {/* Coloured icon — top right with pop animation */}
                {SvgIcon && (
                  <motion.div
                    variants={iconPop}
                    transition={{ delay: i * 0.09 + 0.25 }}
                    className={`absolute top-5 right-5 w-12 h-12 rounded-xl ${a.iconBg} flex items-center justify-center transition-all duration-300`}
                  >
                    <SvgIcon />
                  </motion.div>
                )}

                <h3 className={`font-sans font-bold ${a.titleColor} text-[17px] leading-snug pr-16 mb-3`}>{feature.title}</h3>

                <motion.div
                  className="h-px bg-white/10 mb-5"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: i * 0.09 + 0.3, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                />

                <p className="text-[13px] text-white/55 leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from '@/components/section-heading'
import { categories } from '@/lib/data'
import { staggerContainer, iconPop, lineDraw } from '@/lib/animations'

/* Outlined medical SVG icons matching the reference screenshot */
const CategorySVGs: Record<string, () => React.ReactNode> = {
  Tablets: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="10" width="24" height="12" rx="6"/>
      <line x1="16" y1="10" x2="16" y2="22"/>
    </svg>
  ),
  Capsules: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 16C10 11.582 12.686 8 16 8s6 3.582 6 8-2.686 8-6 8-6-3.582-6-8z"/>
      <line x1="10" y1="16" x2="22" y2="16"/>
    </svg>
  ),
  Syrups: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6h8l2 4v14a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V10l2-4z"/>
      <line x1="10" y1="14" x2="22" y2="14"/>
      <path d="M14 6V4h4v2"/>
    </svg>
  ),
  Injectables: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="24" y1="8" x2="8" y2="24"/>
      <path d="M20 6l6 6-2 2-6-6z"/>
      <path d="M10 22l-3 3"/>
      <path d="M14 14l4 4"/>
    </svg>
  ),
  'Medical Devices': () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 12h4l2-4 4 8 2-4h4"/>
      <circle cx="16" cy="22" r="3"/>
    </svg>
  ),
  'Surgical Products': () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 8l16 16M8 24 L24 8"/>
      <circle cx="16" cy="16" r="6"/>
      <line x1="16" y1="10" x2="16" y2="22"/>
      <line x1="10" y1="16" x2="22" y2="16"/>
    </svg>
  ),
  'OTC Medicines': () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 14h4V8h8v6h4l-8 10-8-10z"/>
    </svg>
  ),
}

export default function CategoriesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-14 md:py-20 section-bg-c">
      <div className="max-w-[1680px] mx-auto px-10">
        <SectionHeading
          badge="Our Lab Expertise"
          title="Comprehensive Pharmaceutical"
          accentWord="Catalog"
          subtitle="From generic medicines to specialty drugs and medical devices, our catalog covers every need of modern healthcare providers."
          inView={inView}
        />

        <motion.div
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {categories.map((cat, i) => {
            const SvgIcon = CategorySVGs[cat.name]
            const accents = [
              { border: 'hover:border-primary/50', icon: 'text-primary bg-primary/8 group-hover:bg-primary group-hover:text-white', num: 'text-primary', activeBorder: 'border-primary/50', activeIcon: 'bg-primary text-white', activeShadow: 'shadow-xl shadow-primary/8' },
              { border: 'hover:border-secondary/50', icon: 'text-secondary bg-secondary/8 group-hover:bg-secondary group-hover:text-white', num: 'text-secondary', activeBorder: 'border-secondary/50', activeIcon: 'bg-secondary text-white', activeShadow: 'shadow-xl shadow-secondary/8' },
              { border: 'hover:border-primary/40', icon: 'text-primary bg-primary/6 group-hover:bg-primary group-hover:text-white', num: 'text-primary', activeBorder: 'border-primary/40', activeIcon: 'bg-primary text-white', activeShadow: 'shadow-xl shadow-primary/8' },
              { border: 'hover:border-secondary/40', icon: 'text-secondary bg-secondary/6 group-hover:bg-secondary group-hover:text-white', num: 'text-secondary', activeBorder: 'border-secondary/40', activeIcon: 'bg-secondary text-white', activeShadow: 'shadow-xl shadow-secondary/8' },
            ]
            const a = accents[i % accents.length]
            const isDefaultHover = i === 1
            return (
              <motion.div
                key={cat.id}
                variants={{
                  hidden: { opacity: 0, y: 36, rotate: i % 2 === 0 ? -2 : 2, scale: 0.95 },
                  show: {
                    opacity: 1, y: isDefaultHover ? -8 : 0, rotate: 0, scale: 1,
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                whileHover={{ y: -8, transition: { duration: 0.22, ease: 'easeOut' } }}
              >
                <Link
                  href={`/products?category=${cat.slug}`}
                  className={`group block bg-white rounded-3xl border p-7 transition-all duration-300 relative ${
                    isDefaultHover
                      ? `${a.activeBorder} ${a.activeShadow}`
                      : `border-border ${a.border} hover:shadow-xl hover:shadow-primary/8`
                  }`}
                >
                  {/* Icon — pops in with rotate */}
                  {SvgIcon && (
                    <motion.div
                      variants={iconPop}
                      transition={{ delay: i * 0.08 + 0.2 }}
                      className={`absolute top-5 right-5 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isDefaultHover ? a.activeIcon : a.icon
                      }`}
                    >
                      <SvgIcon />
                    </motion.div>
                  )}

                  <span className={`font-mono text-[10px] tracking-[0.14em] uppercase ${a.num} mb-2 block`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-sans font-bold text-foreground text-lg leading-tight mb-3 pr-14">{cat.name}</h3>

                  {/* Animated divider */}
                  <motion.div
                    variants={lineDraw}
                    transition={{ delay: i * 0.08 + 0.3 }}
                    className="h-px bg-border mb-4"
                  />

                  <p className="text-[13px] text-muted-foreground leading-relaxed mb-5">{cat.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted-foreground">
                      {cat.count}+ products
                    </span>
                    <motion.span
                      className={`w-4 h-4 ${isDefaultHover ? 'text-secondary' : 'text-muted-foreground/40'}`}
                      whileHover={{ x: 2, y: -2, transition: { duration: 0.15 } }}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

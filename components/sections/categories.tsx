'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import SectionHeading from '@/components/section-heading'
import { categories } from '@/lib/data'
import { CategoryIcon } from '@/lib/category-icons'
import { staggerContainer, iconPop, lineDraw } from '@/lib/animations'

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
          subtitle="Capsules, tablets, oral liquids, and ointments — our core pharmaceutical dosage forms for modern healthcare."
          inView={inView}
        />

        <motion.div
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {categories.map((cat, i) => {
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
                  href={`/products/${cat.slug}`}
                  className={`group block bg-white rounded-3xl border p-7 transition-all duration-300 relative ${
                    isDefaultHover
                      ? `${a.activeBorder} ${a.activeShadow}`
                      : `border-border ${a.border} hover:shadow-xl hover:shadow-primary/8`
                  }`}
                >
                  {/* Icon — pops in with rotate */}
                  <motion.div
                      variants={iconPop}
                      transition={{ delay: i * 0.08 + 0.2 }}
                      className={`absolute top-5 right-5 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isDefaultHover ? a.activeIcon : a.icon
                      }`}
                    >
                      <CategoryIcon name={cat.name} size={32} />
                    </motion.div>

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

                  <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">{cat.description}</p>

                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted-foreground block">
                        {cat.countLabel}
                      </span>
                      <span className="inline-flex mt-2 text-[10px] font-mono tracking-[0.1em] uppercase text-primary bg-primary/8 border border-primary/15 rounded-full px-2.5 py-1">
                        {cat.badge}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-primary group-hover:translate-x-0.5 transition-transform">
                      Explore Range →
                    </span>
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

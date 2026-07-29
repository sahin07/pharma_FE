'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Eye } from 'lucide-react'
import SectionHeading from '@/components/section-heading'
import { featuredProducts, categories } from '@/lib/data'
import { buttonEntrance, scalePop } from '@/lib/animations'

/* Tab icons — small outlined SVGs for the filter bar */
const TabIcons: Record<string, () => React.ReactNode> = {
  All: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="1" y="1" width="5" height="5" rx="1"/><rect x="10" y="1" width="5" height="5" rx="1"/>
      <rect x="1" y="10" width="5" height="5" rx="1"/><rect x="10" y="10" width="5" height="5" rx="1"/>
    </svg>
  ),
  Tablets: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="5" width="12" height="6" rx="3"/><line x1="8" y1="5" x2="8" y2="11"/>
    </svg>
  ),
  Capsules: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <ellipse cx="8" cy="8" rx="5" ry="3.5"/>
      <line x1="3" y1="8" x2="13" y2="8"/>
    </svg>
  ),
  Syrups: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M6 3h4l1 2v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5l1-2z"/>
      <line x1="5" y1="7" x2="11" y2="7"/><path d="M7 3V2h2v1"/>
    </svg>
  ),
  Injectables: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="12" y1="4" x2="4" y2="12"/><path d="M10 3l3 3-1 1-3-3z"/>
      <line x1="5" y1="11" x2="3" y2="13"/>
    </svg>
  ),
  'Medical Devices': () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M2 8h2l2-4 3 8 2-4h3"/>
    </svg>
  ),
  'Surgical Products': () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="8" r="5"/>
      <line x1="8" y1="5" x2="8" y2="11"/><line x1="5" y1="8" x2="11" y2="8"/>
    </svg>
  ),
  'OTC Medicines': () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M4 7h3V4h2v3h3v2h-3v3H7V9H4V7z"/>
    </svg>
  ),
}

const ALL_TAB = 'All'
const tabs = [ALL_TAB, ...categories.map((c) => c.name)]

export default function FeaturedProductsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeTab, setActiveTab] = useState(ALL_TAB)

  const filtered = activeTab === ALL_TAB
    ? featuredProducts
    : featuredProducts.filter((p) => p.category === activeTab)

  return (
    <section ref={ref} className="py-14 md:py-20 section-bg-a">
      <div className="max-w-[1680px] mx-auto px-10">

        {/* Header row */}
        <div className="flex items-end justify-between mb-4">
          <SectionHeading
            badge="Recent Products"
            title="Medical"
            accentWord="Products"
            subtitle=""
            centered={false}
            inView={inView}
            className="mb-0"
          />
          <motion.div
            variants={buttonEntrance}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:block shrink-0"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              View All
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* ── Category tab bar — matches reference screenshot ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="mb-8"
        >
          <div className="inline-flex items-center border border-border rounded-xl overflow-hidden bg-white shadow-sm w-full md:w-auto">
            {tabs.slice(0, 5).map((tab, i) => {
              const Icon = TabIcons[tab]
              const isActive = tab === activeTab
              const isLast = i === Math.min(tabs.length, 5) - 1
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    relative flex items-center gap-2 px-5 py-3 text-[13px] font-medium transition-all duration-200 whitespace-nowrap flex-1 justify-center
                    ${isActive
                      ? 'text-primary'
                      : 'text-foreground/60 hover:text-foreground'
                    }
                    ${!isLast ? 'border-r border-border' : ''}
                  `}
                >
                  {/* Active underline indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-secondary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {/* Active icon gets secondary colour */}
                  <span className={isActive ? 'text-secondary' : ''}>
                    {Icon && <Icon />}
                  </span>
                  {tab}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Product grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {(filtered.length ? filtered : featuredProducts).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -8, transition: { duration: 0.22, ease: 'easeOut' } }}
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="group block bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/10 hover:border-primary/25 transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative bg-muted/30 overflow-hidden h-52">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Quick view overlay */}
                    <div className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="flex items-center gap-2 text-white font-semibold text-sm bg-white/20 px-5 py-2.5 rounded-full backdrop-blur-sm">
                        <Eye className="w-4 h-4" />
                        Quick View
                      </span>
                    </div>
                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-medium bg-white/90 text-primary backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <div className="text-xs text-secondary font-semibold mb-1 uppercase tracking-wide">{product.brand}</div>
                    <h3 className="font-sans font-semibold text-foreground text-[15px] mb-2 leading-snug group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-primary">Request Quote</span>
                      <span className="w-8 h-8 bg-primary/8 rounded-lg flex items-center justify-center group-hover:bg-primary transition-all">
                        <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:text-white transition-colors" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="md:hidden mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-primary-foreground font-bold rounded-full shadow-md hover:brightness-105 transition-all"
            style={{
              background: 'linear-gradient(180deg, oklch(0.58 0.20 258), oklch(0.48 0.21 258))',
            }}
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

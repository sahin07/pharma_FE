'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Pill,
  FlaskConical,
  HeartPulse,
  Package,
  ArrowUpRight,
} from 'lucide-react'
import { categories } from '@/lib/data'

const categoryIcons = {
  Capsules: Package,
  Tablets: Pill,
  'Oral Liquids': FlaskConical,
  Ointments: HeartPulse,
} as const

const productCategories = categories.map((cat) => ({
  name: cat.name,
  label: cat.name,
  href: `/products/${cat.slug}`,
  icon: categoryIcons[cat.name as keyof typeof categoryIcons],
  badge: cat.badge,
  count: cat.countLabel,
  description: cat.description,
}))

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products', hasDropdown: true },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(true)

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top Bar */}
      <div className="bg-foreground text-white py-3.5 hidden md:block">
        <div className="max-w-[1680px] mx-auto px-10 flex items-center justify-between">
          <span className="font-mono text-[12px] tracking-[0.12em] uppercase text-white/70">
            WHO-GMP Certified &nbsp;·&nbsp; ISO 9001:2015 &nbsp;·&nbsp; Nationwide Distribution
          </span>
          <div className="flex items-center gap-6 font-mono text-[12px] tracking-wider text-white/70">
            <a href="tel:+919816667007" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5" />
              +91 98166 67007
            </a>
            <span className="opacity-40">|</span>
            <a href="mailto:support@samaypharmaindia.com" className="hover:text-white transition-colors">
              support@samaypharmaindia.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 border-b border-border ${
          isScrolled ? 'bg-white/98 backdrop-blur-md shadow-sm shadow-black/4' : 'bg-white'
        }`}
      >
        <nav className="max-w-[1680px] mx-auto px-10 flex items-center justify-between h-[4.75rem]">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 group">
            <Image
              src="/images/logos/2.png"
              alt="Samay Pharma"
              width={160}
              height={38}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <button className={`flex items-center gap-1 px-4 py-2.5 text-[15px] font-medium rounded-full transition-colors ${
                    isActive('/products') || productsOpen
                      ? 'text-primary bg-muted'
                      : 'text-foreground hover:text-primary hover:bg-muted'
                  }`}>
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {/* Desktop Mega Menu Dropdown */}
                  <AnimatePresence>
                    {productsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] bg-white rounded-3xl shadow-2xl shadow-black/12 border border-border/80 overflow-hidden p-6 text-left z-50"
                      >
                        {/* Mega Menu Top Header */}
                        <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/60">
                          <div>
                            <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-primary flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-primary" />
                              GMP & GLP Certified Formulations
                            </h3>
                            <p className="text-sm text-muted-foreground mt-0.5 font-medium">
                              Explore our primary pharmaceutical dosage categories manufactured to strict standards.
                            </p>
                          </div>
                          <span className="text-xs font-semibold bg-primary/10 text-primary px-3.5 py-1.5 rounded-full shrink-0 border border-primary/20">
                            4 Core Range
                          </span>
                        </div>

                        {/* 4 Category Mega Menu Grid */}
                        <div className="grid grid-cols-2 gap-3.5">
                          {productCategories.map((cat) => (
                            <Link
                              key={cat.name}
                              href={cat.href}
                              onClick={() => setProductsOpen(false)}
                              className="group relative flex flex-col justify-between p-4 rounded-2xl border border-border/70 bg-muted/20 hover:bg-muted/80 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200"
                            >
                              <div>
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-border/60 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200">
                                      <cat.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                      <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                                        {cat.name}
                                      </h4>
                                      <span className="text-[11px] font-mono text-muted-foreground">
                                        {cat.count}
                                      </span>
                                    </div>
                                  </div>
                                  <ArrowUpRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                                  {cat.description}
                                </p>
                              </div>

                              <div className="mt-3 pt-2.5 border-t border-border/40 flex items-center justify-between">
                                <span className="text-[11px] font-semibold text-primary/90 bg-primary/8 px-2.5 py-0.5 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                                  {cat.badge}
                                </span>
                                <span className="text-xs font-bold text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                                  Explore Range &rarr;
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* Mega Menu Bottom Banner */}
                        <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between bg-gradient-to-r from-primary/5 via-primary/8 to-transparent -mx-6 -mb-6 p-4 px-6">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-medium text-foreground">
                              Looking for Third-Party Contract Manufacturing?
                            </span>
                          </div>
                          <Link
                            href="/products"
                            onClick={() => setProductsOpen(false)}
                            className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                          >
                            Browse All Products <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2.5 text-[15px] font-medium rounded-full transition-colors ${
                    isActive(link.href)
                      ? 'text-primary bg-muted'
                      : 'text-foreground hover:text-primary hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 text-[15px] font-bold text-white px-7 py-3 rounded-full shadow-md hover:brightness-105 transition-all"
              style={{
                background: 'linear-gradient(180deg, #3DC0C3, #00827F)',
              }}
            >
              Get a Quote
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden border-t border-border bg-white overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`block px-4 py-3 text-sm font-medium rounded-full transition-all ${
                      isActive(link.href)
                        ? 'text-primary bg-muted'
                        : 'text-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="block w-full text-center px-4 py-3 text-sm font-bold text-primary-foreground rounded-full shadow-md hover:brightness-105 transition-all"
                    style={{
                      background: 'linear-gradient(180deg, #3DC0C3, #00827F)',
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    Get a Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}

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
  Syringe,
  FlaskConical,
  HeartPulse,
  Stethoscope,
  ShieldCheck,
  Package,
  ArrowUpRight,
} from 'lucide-react'

const productCategories = [
  { name: 'Tablets', href: '/products?category=tablets', icon: Pill, description: 'Oral solid formulations' },
  { name: 'Capsules', href: '/products?category=capsules', icon: Package, description: 'Gelatin-encapsulated medicines' },
  { name: 'Syrups', href: '/products?category=syrups', icon: FlaskConical, description: 'Liquid oral formulations' },
  { name: 'Injectables', href: '/products?category=injectables', icon: Syringe, description: 'Sterile parenteral preparations' },
  { name: 'Medical Devices', href: '/products?category=medical-devices', icon: Stethoscope, description: 'Diagnostic & therapeutic equipment' },
  { name: 'Surgical Products', href: '/products?category=surgical', icon: ShieldCheck, description: 'Sterile surgical consumables' },
  { name: 'OTC Medicines', href: '/products?category=otc', icon: HeartPulse, description: 'Consumer health products' },
]

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
            <a href="tel:+911234567890" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5" />
              +91 12345 67890
            </a>
            <span className="opacity-40">|</span>
            <a href="mailto:sales@pharmacore.com" className="hover:text-white transition-colors">
              sales@pharmacore.com
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
                  <AnimatePresence>
                    {productsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.17 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-[500px] bg-white rounded-2xl shadow-2xl shadow-black/10 border border-border overflow-hidden p-3 grid grid-cols-2 gap-1"
                      >
                        {productCategories.map((cat) => (
                          <Link
                            key={cat.name}
                            href={cat.href}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted transition-colors group"
                          >
                            <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors mt-0.5">
                              <cat.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-foreground leading-tight">{cat.name}</div>
                              <div className="text-xs text-muted-foreground leading-snug mt-0.5">{cat.description}</div>
                            </div>
                          </Link>
                        ))}
                        <Link
                          href="/products"
                          className="col-span-2 flex items-center justify-between p-3 rounded-xl bg-muted hover:bg-primary/8 transition-colors group mt-1 border-t border-border pt-3"
                        >
                          <span className="text-sm font-semibold text-foreground">Browse all products</span>
                          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
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

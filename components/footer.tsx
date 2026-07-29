'use client'

import Link from 'next/link'
import { HeartPulse, Phone, Mail, MapPin, ArrowRight, Globe, Share2, MessageSquare, AtSign } from 'lucide-react'

const footerLinks = {
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/about#team' },
      { label: 'Certifications', href: '/certifications' },
      { label: 'Infrastructure', href: '/about#infrastructure' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  products: {
    title: 'Products',
    links: [
      { label: 'Tablets & Capsules', href: '/products?category=tablets' },
      { label: 'Syrups & Liquids', href: '/products?category=syrups' },
      { label: 'Injectables', href: '/products?category=injectables' },
      { label: 'Medical Devices', href: '/products?category=medical-devices' },
      { label: 'Surgical Products', href: '/products?category=surgical' },
    ],
  },
  services: {
    title: 'Services',
    links: [
      { label: 'Bulk Procurement', href: '/services' },
      { label: 'Cold Chain Logistics', href: '/services#cold-chain' },
      { label: 'Export Services', href: '/services#export' },
      { label: 'Regulatory Support', href: '/services#regulatory' },
      { label: 'Custom Packaging', href: '/services#packaging' },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Product Catalog', href: '/products' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
}

const socials = [
  { icon: Globe, href: '#', label: 'LinkedIn' },
  { icon: Share2, href: '#', label: 'Twitter / X' },
  { icon: MessageSquare, href: '#', label: 'Facebook' },
  { icon: AtSign, href: '#', label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer
      className="text-primary-foreground"
      style={{
        background: 'linear-gradient(135deg, oklch(0.14 0.06 258) 0%, oklch(0.22 0.10 210) 100%)',
      }}
    >
      <div className="max-w-[1680px] mx-auto px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-6 group">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center group-hover:bg-primary/80 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <div>
                <div className="font-sans font-bold text-white text-[15px] tracking-tight leading-none">PharmaCore</div>
                <div className="font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase leading-none mt-0.5">Wholesale</div>
              </div>
            </Link>
            <p className="text-[13px] text-white/50 leading-relaxed mb-6 max-w-[240px]">
              India&apos;s trusted B2B pharmaceutical wholesale company. Supplying quality medicines since 1999.
            </p>
            <div className="space-y-2.5">
              <a href="tel:+911234567890" className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                +91 12345 67890
              </a>
              <a href="mailto:sales@pharmacore.com" className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                sales@pharmacore.com
              </a>
              <div className="flex items-start gap-2.5 text-sm text-white/70">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                123 Pharma Hub, Andheri East, Mumbai 400069
              </div>
            </div>
          </div>

          {/* Nav Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-mono font-semibold text-white/90 text-[11px] mb-4 uppercase tracking-[0.16em]">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 pt-10 pb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h4 className="font-sans font-bold text-white text-base mb-1">Subscribe to Product Updates</h4>
              <p className="text-[13px] text-white/50">Get notified about new products, offers, and regulatory updates.</p>
            </div>
            <form className="flex gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2.5 bg-white/10 border border-white/15 rounded-xl text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all flex-1 min-w-0 md:min-w-[260px]"
              />
              <button
                type="submit"
                className="px-6 py-2.5 text-white font-bold rounded-full text-sm shadow-md hover:brightness-105 transition-all shrink-0"
                style={{
                  background: 'linear-gradient(180deg, oklch(0.58 0.20 258), oklch(0.48 0.21 258))',
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] tracking-wide text-white/35 text-center">
            &copy; {new Date().getFullYear()} PharmaCore Wholesale Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

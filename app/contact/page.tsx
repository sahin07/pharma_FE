import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ContactSection from '@/components/sections/contact'

export const metadata: Metadata = {
  title: 'Contact Samay Pharma | Get a Quote',
  description: 'Contact Samay Pharma for product inquiries, pricing, and manufacturing partnership opportunities. Our team responds within 2 business hours.',
}

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <div className="section-bg-dark border-b border-white/10 py-16 px-10">
        <div className="max-w-[1680px] mx-auto">
          <div className="flex items-center gap-2 text-sm text-white/40 mb-4 font-mono tracking-wide">
            <a href="/" className="hover:text-white/70 transition-colors">Home</a>
            <span>/</span>
            <span className="text-white/65">Contact</span>
          </div>
          <h1 className="font-heading text-5xl font-black text-white">Contact <em className="not-italic italic text-secondary">Us</em></h1>
          <p className="text-white/50 text-base mt-3 max-w-md">Reach our pharmaceutical experts for pricing, manufacturing, and partnership inquiries.</p>
        </div>
      </div>
      <ContactSection />
      <Footer />
    </main>
  )
}

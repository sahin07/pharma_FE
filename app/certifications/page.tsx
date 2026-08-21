import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import CertificationsSection from '@/components/sections/certifications'
import CTABanner from '@/components/sections/cta-banner'

export const metadata: Metadata = {
  title: 'Certifications | PharmaCore Wholesale',
  description: 'PharmaCore Wholesale certifications: WHO-GMP, ISO 9001:2015, CDSCO, GDP, and ISO 13485. Verified quality from globally recognized bodies.',
}

export default function CertificationsPage() {
  return (
    <main>
      <Navbar />
      <div className="bg-primary/4 border-b border-border py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm text-muted-foreground mb-2">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span>Certifications</span>
          </div>
          <h1 className="font-heading text-4xl font-black text-foreground">Quality & Certifications</h1>
        </div>
      </div>
      <CertificationsSection />
      <CTABanner />
      <Footer />
    </main>
  )
}

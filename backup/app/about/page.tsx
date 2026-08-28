import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import AboutSection from '@/components/sections/about'
import WhyChooseUsSection from '@/components/sections/why-choose-us'
import CertificationsSection from '@/components/sections/certifications'
import CTABanner from '@/components/sections/cta-banner'

export const metadata: Metadata = {
  title: 'About Samay Pharma | Our Story & Mission',
  description: 'Samay Pharma India Pvt. Ltd. manufactures quality medicines from Kala Amb, Himachal Pradesh — GMP-GLP compliant tablets, capsules, liquids, and ointments, including third-party manufacturing.',
}

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      {/* Page Header */}
      <div className="bg-primary/4 border-b border-border py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm text-muted-foreground mb-2">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span>About</span>
          </div>
          <h1 className="font-heading text-4xl font-black text-foreground">About Samay Pharma</h1>
        </div>
      </div>
      <AboutSection ctaHref="/contact" ctaLabel="Partner With Us" />
      <WhyChooseUsSection />
      <CertificationsSection />
      <CTABanner />
      <Footer />
    </main>
  )
}

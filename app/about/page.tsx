import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import AboutSection from '@/components/sections/about'
import WhyChooseUsSection from '@/components/sections/why-choose-us'
import CertificationsSection from '@/components/sections/certifications'
import CTABanner from '@/components/sections/cta-banner'

export const metadata: Metadata = {
  title: 'About PharmaCore Wholesale | Our Story & Mission',
  description: 'Learn about PharmaCore Wholesale — 25+ years of trusted pharmaceutical distribution, WHO-GMP certification, and commitment to quality healthcare supply.',
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
          <h1 className="font-heading text-4xl font-bold text-foreground">About PharmaCore</h1>
        </div>
      </div>
      <AboutSection />
      <WhyChooseUsSection />
      <CertificationsSection />
      <CTABanner />
      <Footer />
    </main>
  )
}

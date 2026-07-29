import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import FAQSection from '@/components/sections/faq'
import CTABanner from '@/components/sections/cta-banner'

export const metadata: Metadata = {
  title: 'FAQ | PharmaCore Wholesale',
  description: 'Frequently asked questions about ordering, payment terms, certifications, and delivery at PharmaCore Wholesale.',
}

export default function FAQPage() {
  return (
    <main>
      <Navbar />
      <div className="bg-primary/4 border-b border-border py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm text-muted-foreground mb-2">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span>FAQ</span>
          </div>
          <h1 className="font-heading text-4xl font-bold text-foreground">Frequently Asked Questions</h1>
        </div>
      </div>
      <FAQSection />
      <CTABanner />
      <Footer />
    </main>
  )
}

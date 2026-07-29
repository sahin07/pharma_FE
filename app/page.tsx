import Navbar from '@/components/navbar'
import HeroSection from '@/components/sections/hero'
import TrustedPartners from '@/components/sections/trusted-partners'
import AboutSection from '@/components/sections/about'
import CategoriesSection from '@/components/sections/categories'
import FeaturedProductsSection from '@/components/sections/featured-products'
import WhyChooseUsSection from '@/components/sections/why-choose-us'
import CertificationsSection from '@/components/sections/certifications'
import ProcessSection from '@/components/sections/process'
import TestimonialsSection from '@/components/sections/testimonials'
import InsightsSection from '@/components/sections/insights'
import FAQSection from '@/components/sections/faq'
import CTABanner from '@/components/sections/cta-banner'
import ContactSection from '@/components/sections/contact'
import Footer from '@/components/footer'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <TrustedPartners />
      <AboutSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <WhyChooseUsSection />
      <CertificationsSection />
      <ProcessSection />
      <TestimonialsSection />
      <InsightsSection />
      <FAQSection />
      <CTABanner />
      <ContactSection />
      <Footer />
    </main>
  )
}

import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ProductsClient from '@/components/products-client'
import CTABanner from '@/components/sections/cta-banner'

export const metadata: Metadata = {
  title: 'Products | PharmaCore Wholesale — 5,000+ Medicines & Medical Devices',
  description: 'Browse PharmaCore Wholesale catalog: 5,000+ medicines, medical devices, and surgical products from WHO-GMP certified manufacturers.',
}

export default function ProductsPage() {
  return (
    <main>
      <Navbar />
      <div className="bg-primary/4 border-b border-border py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm text-muted-foreground mb-2">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span>Products</span>
          </div>
          <h1 className="font-heading text-4xl font-bold text-foreground">Product Catalog</h1>
          <p className="text-muted-foreground mt-2">5,000+ certified pharmaceutical products from leading manufacturers</p>
        </div>
      </div>
      <ProductsClient />
      <CTABanner />
      <Footer />
    </main>
  )
}

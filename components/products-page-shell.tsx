import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ProductsClient from '@/components/products-client'
import CTABanner from '@/components/sections/cta-banner'

type ProductsPageShellProps = {
  categorySlug: string
  title?: string
  description?: string
  breadcrumbLabel?: string
}

export default function ProductsPageShell({
  categorySlug,
  title = 'Product Catalog',
  description = 'Certified medicines manufactured at our International compliant facility',
  breadcrumbLabel,
}: ProductsPageShellProps) {
  return (
    <main>
      <Navbar />
      <div className="bg-primary/4 border-b border-border py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-sm text-muted-foreground mb-2">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            {breadcrumbLabel ? (
              <>
                <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
                <span className="mx-2">/</span>
                <span>{breadcrumbLabel}</span>
              </>
            ) : (
              <span>Products</span>
            )}
          </div>
          <h1 className="font-heading text-4xl font-black text-foreground">{title}</h1>
          <p className="text-muted-foreground mt-2">{description}</p>
        </div>
      </div>
      <ProductsClient categorySlug={categorySlug} />
      <CTABanner />
      <Footer />
    </main>
  )
}

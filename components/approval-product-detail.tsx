import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import CTABanner from '@/components/sections/cta-banner'
import type { ApprovalProduct } from '@/lib/approval-products'
import { cleanCompositionDisplay } from '@/lib/parse-composition'
import { ArrowLeft, CheckCircle2, Mail, Phone } from 'lucide-react'

type ApprovalProductDetailProps = {
  product: ApprovalProduct & { categorySlug: string; categoryName: string }
}

export default function ApprovalProductDetail({ product }: ApprovalProductDetailProps) {
  return (
    <main>
      <Navbar />

      <div className="bg-primary/4 border-b border-border py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <span>/</span>
          <Link href={`/products/${product.categorySlug}`} className="hover:text-primary transition-colors">
            {product.categoryName}
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium line-clamp-1">{product.formulation}</span>
        </div>
      </div>

      <section className="py-14 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href={`/products/${product.categorySlug}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {product.categoryName}
          </Link>

          <div className="bg-white rounded-3xl border border-border shadow-xl shadow-slate-900/5 overflow-hidden">
            <div className="bg-primary/8 border-b border-border px-8 py-6">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="font-mono text-xs font-bold tracking-[0.14em] text-primary bg-white border border-primary/20 rounded-full px-3 py-1">
                  S. No. {String(product.serialNo).padStart(2, '0')}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground bg-white border border-border rounded-full px-3 py-1">
                  {product.categoryName}
                </span>
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-black text-foreground leading-tight text-balance">
                {product.formulation}
              </h1>
            </div>

            <div className="px-8 py-8">
              <h2 className="font-heading text-lg font-black text-foreground mb-4">Composition</h2>
              <div className="rounded-2xl border border-border bg-muted/30 px-5 py-5">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/85">
                  {product.composition
                    ? product.composition
                        .split('\n')
                        .map((line) => cleanCompositionDisplay(line))
                        .join('\n')
                    : 'Composition details available on request.'}
                </pre>
              </div>

              <ul className="space-y-2.5 mt-8 mb-8">
                {[
                  'Manufactured in an International certified facility',
                  'Samay Pharma India Pvt. Ltd — Kala Amb, Himachal Pradesh',
                  'Third-party manufacturing and bulk supply available',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4.5 h-4.5 text-secondary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 text-primary-foreground font-bold rounded-full shadow-md shadow-primary/20 hover:brightness-105 transition-all"
                  style={{ background: 'linear-gradient(180deg, #008000, #006400)' }}
                >
                  Request a Quote
                </Link>
                <a
                  href="tel:+919816667007"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-foreground font-semibold rounded-full border border-border shadow-sm hover:border-primary/30 hover:bg-muted/40 transition-all"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  Call to Order
                </a>
              </div>

              <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-xl px-4 py-3 border border-border">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>
                  Email us at{' '}
                  <a href="mailto:support@samaypharmaindia.com" className="text-primary font-medium hover:underline">
                    support@samaypharmaindia.com
                  </a>{' '}
                  for pricing and availability
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  )
}

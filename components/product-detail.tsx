import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import CTABanner from '@/components/sections/cta-banner'
import { getApprovalProductBySlug } from '@/lib/approval-products'
import { parseComposition, type CompositionRow } from '@/lib/parse-composition'
import { allProducts, type Product } from '@/lib/products'
import { ArrowLeft, Mail, Phone } from 'lucide-react'

function compositionCells(row: CompositionRow) {
  if (row.type === 'ingredient') {
    return [row.name, row.spc, row.qty, row.unit]
  }
  if (row.type === 'excipients') {
    return ['Excipients', '', row.qty, '']
  }
  if (row.type === 'base') {
    return [row.name, '', row.qty, '']
  }
  if (row.type === 'header' || row.type === 'colour' || row.type === 'note') {
    return [row.text, '', '', '']
  }
  return ['', '', '', '']
}

type ProductDetailProps = {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const approval = getApprovalProductBySlug(product.approvalSlug)
  const compositionRows = parseComposition(approval?.composition ?? '')
  const related = allProducts.filter(
    (p) => p.category === product.category && p.slug !== product.slug,
  ).slice(0, 3)

  return (
    <main>
      <Navbar />

      <div className="bg-primary/4 border-b border-border py-5 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </div>
      </div>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-xl shadow-slate-900/8">
              <div className="relative h-[380px] md:h-[460px] bg-white">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-6"
                  priority
                />
                <div className="absolute top-4 left-4">
                  <span className="text-sm font-semibold bg-primary text-primary-foreground rounded-full px-3.5 py-1.5">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="mb-1">
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{product.brand}</span>
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-black text-foreground text-balance mb-3 leading-tight">
                {product.name}
              </h1>
              <p className="text-foreground/80 leading-relaxed mb-2 text-base">
                {approval?.formulation ?? product.description}
              </p>
              {approval && (
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-6">
                  Approval list S. No. {String(approval.serialNo).padStart(2, '0')}
                </p>
              )}

              <h2 className="font-heading text-lg font-black text-foreground mb-3">Composition</h2>
              <div className="overflow-x-auto rounded-2xl border border-border mb-8">
                <table className="w-full min-w-[520px] border-collapse text-sm">
                  <thead>
                    <tr className="bg-primary/8 text-left">
                      <th className="px-4 py-3 font-semibold text-foreground">Composition</th>
                      <th className="px-3 py-3 font-semibold text-foreground text-center">SPC</th>
                      <th className="px-3 py-3 font-semibold text-foreground text-center">Qty</th>
                      <th className="px-3 py-3 font-semibold text-foreground text-center">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compositionRows.map((row, index) => {
                      const [name, spc, qty, unit] = compositionCells(row)
                      return (
                        <tr key={`${name}-${index}`} className="border-t border-border">
                          <td className="px-4 py-2.5 text-foreground/85">{name}</td>
                          <td className="px-3 py-2.5 text-center text-foreground/80">{spc}</td>
                          <td className="px-3 py-2.5 text-center text-foreground/80">{qty}</td>
                          <td className="px-3 py-2.5 text-center text-foreground/80">{unit}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 text-primary-foreground font-bold rounded-full shadow-md shadow-primary/20 hover:brightness-105 hover:-translate-y-0.5 transition-all"
                  style={{
                    background: 'linear-gradient(180deg, #008000, #006400)',
                  }}
                >
                  Request a Quote
                </Link>
                <a
                  href="tel:+919816667007"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-foreground font-semibold rounded-full border border-border shadow-md hover:border-primary/30 hover:bg-muted/40 hover:-translate-y-0.5 transition-all"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  Call to Order
                </a>
              </div>

              <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-xl px-4 py-3 border border-border">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>Email us at <a href="mailto:support@samaypharmaindia.com" className="text-primary font-medium hover:underline">support@samaypharmaindia.com</a> for bulk pricing</span>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div>
              <h2 className="font-heading text-2xl font-black text-foreground mb-6">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    className="group block bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-slate-900/8 hover:-translate-y-1.5 transition-all duration-300"
                  >
                    <div className="relative h-52 bg-white overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-xs font-medium bg-white/90 text-primary rounded-full px-2.5 py-1 backdrop-blur-sm">{p.category}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="text-xs text-muted-foreground mb-1">{p.brand}</div>
                      <h3 className="font-heading font-semibold text-foreground text-base group-hover:text-primary transition-colors mb-2">{p.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{p.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import CTABanner from '@/components/sections/cta-banner'
import { featuredProducts, categories } from '@/lib/data'
import { ArrowLeft, CheckCircle2, Package, Shield, Truck, Phone, Mail } from 'lucide-react'

// Combine all products from both the featured list and the extended list in products-client
const allProducts = [
  ...featuredProducts,
  {
    id: 7,
    name: 'Atorvastatin 20mg Tablets',
    brand: 'Zydus Pharmaceuticals',
    category: 'Tablets',
    description: 'HMG-CoA reductase inhibitor for hypercholesterolemia and cardiovascular risk reduction',
    image: '/images/products/metformin.png',
    slug: 'atorvastatin-20mg',
  },
  {
    id: 8,
    name: 'Azithromycin 250mg Capsules',
    brand: 'Lupin Ltd',
    category: 'Capsules',
    description: 'Macrolide antibiotic for respiratory tract and soft tissue infections',
    image: '/images/products/amoxicillin.png',
    slug: 'azithromycin-250mg',
  },
  {
    id: 9,
    name: 'Ondansetron 4mg Syrup',
    brand: 'Cipla Ltd',
    category: 'Syrups',
    description: 'Antiemetic serotonin antagonist for nausea and vomiting',
    image: '/images/products/paracetamol-syrup.png',
    slug: 'ondansetron-syrup',
  },
  {
    id: 10,
    name: 'Insulin Glargine 100U/ml',
    brand: 'Novo Nordisk',
    category: 'Injectables',
    description: 'Long-acting basal insulin analog for Type 1 and Type 2 diabetes management',
    image: '/images/products/ceftriaxone.png',
    slug: 'insulin-glargine',
  },
  {
    id: 11,
    name: 'Omeprazole 20mg Capsules',
    brand: 'Samay Pharma',
    category: 'Capsules',
    description: 'Proton pump inhibitor for acid reflux and peptic ulcer disease',
    image: '/images/products/amoxicillin.png',
    slug: 'omeprazole-20mg',
  },
  {
    id: 12,
    name: 'Ibuprofen 400mg Tablets',
    brand: 'Samay Pharma',
    category: 'Tablets',
    description: 'NSAID for pain relief, inflammation, and fever management',
    image: '/images/products/metformin.png',
    slug: 'ibuprofen-400mg',
  },
]

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = allProducts.find((p) => p.slug === slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: `${product.name} | Samay Pharma`,
    description: `${product.description}. Manufactured by Samay Pharma — GMP-GLP certified pharmaceutical manufacturer.`,
  }
}

export async function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }))
}

const productDetails = {
  storage: '25°C or below, away from direct sunlight',
  moq: '1 Carton (100 units)',
  leadTime: '48–72 hours',
  regulatory: 'CDSCO Licensed | WHO-GMP Certified Source',
}

const highlights = [
  'Manufactured in a GMP-GLP certified facility',
  'CDSCO licensed and fully documented',
  'Cold-chain compliant packaging available',
  'Bulk and third-party manufacturing on request',
]

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = allProducts.find((p) => p.slug === slug)

  if (!product) notFound()

  const related = allProducts.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, 3)

  return (
    <main>
      <Navbar />

      {/* Breadcrumb */}
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
            {/* Image */}
            <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-xl shadow-slate-900/8">
              <div className="relative h-[380px] md:h-[460px] bg-muted/30">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 left-4">
                  <span className="text-sm font-semibold bg-primary text-primary-foreground rounded-full px-3.5 py-1.5">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <div className="mb-1">
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{product.brand}</span>
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-black text-foreground text-balance mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                {product.description}
              </p>

              {/* Key specs */}
              <div className="grid grid-cols-2 gap-3 mb-7">
                {[
                  { label: 'Min. Order', value: productDetails.moq, icon: Package },
                  { label: 'Lead Time', value: productDetails.leadTime, icon: Truck },
                  { label: 'Storage', value: productDetails.storage, icon: Shield },
                  { label: 'Regulatory', value: productDetails.regulatory, icon: CheckCircle2 },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="bg-muted/50 rounded-xl border border-border p-4">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground leading-snug">{value}</span>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <ul className="space-y-2.5 mb-8">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4.5 h-4.5 text-secondary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 text-primary-foreground font-bold rounded-full shadow-md shadow-primary/20 hover:brightness-105 hover:-translate-y-0.5 transition-all"
                  style={{
                    background: 'linear-gradient(180deg, #3DC0C3, #00827F)',
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

              {/* Quick contact */}
              <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-xl px-4 py-3 border border-border">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>Email us at <a href="mailto:support@samaypharmaindia.com" className="text-primary font-medium hover:underline">support@samaypharmaindia.com</a> for bulk pricing</span>
              </div>
            </div>
          </div>

          {/* Related Products */}
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
                    <div className="relative h-44 bg-muted/30 overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
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

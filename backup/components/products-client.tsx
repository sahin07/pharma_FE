'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Search, LayoutGrid, List, ArrowRight, Eye, SlidersHorizontal, X } from 'lucide-react'
import { featuredProducts, categories } from '@/lib/data'

// Expand the product list with more entries for the listing page
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

const brands = ['All Brands', 'GSK Pharma', 'Sun Pharma', 'Cipla', 'Dr. Reddys', 'Lupin', 'Abbott India', 'Pfizer', 'Zydus', 'Novartis', 'Novo Nordisk']

export default function ProductsClient() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeBrand, setActiveBrand] = useState('All Brands')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)
  const ITEMS_PER_PAGE = 9

  const allCategories = ['All', ...categories.map((c) => c.name)]

  const filtered = allProducts.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    const matchBrand = activeBrand === 'All Brands' || p.brand === activeBrand
    return matchSearch && matchCat && matchBrand
  })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const resetFilters = () => {
    setSearch('')
    setActiveCategory('All')
    setActiveBrand('All Brands')
    setPage(1)
  }

  const hasActiveFilters = search || activeCategory !== 'All' || activeBrand !== 'All Brands'

  return (
    <section className="py-10 bg-background">
      <div className="max-w-[1680px] mx-auto px-10">
        {/* Search + Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by product name, brand, or description..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="w-full pl-11 pr-4 py-3 bg-white border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-full border text-sm font-bold shadow-md transition-all ${
                showFilters
                  ? 'text-primary-foreground border-transparent hover:brightness-105'
                  : 'bg-white border-border text-foreground hover:border-primary/30 hover:bg-muted/40'
              }`}
              style={
                showFilters
                  ? { background: 'linear-gradient(180deg, #3DC0C3, #00827F)' }
                  : undefined
              }
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
            <div className="flex gap-1 p-1 bg-white border border-border rounded-xl">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white rounded-2xl border border-border p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Category</h4>
                    <div className="flex flex-wrap gap-2">
                      {allCategories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => { setActiveCategory(cat); setPage(1) }}
                          className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                            activeCategory === cat
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Brand</h4>
                    <div className="flex flex-wrap gap-2">
                      {brands.map((brand) => (
                        <button
                          key={brand}
                          onClick={() => { setActiveBrand(brand); setPage(1) }}
                          className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                            activeBrand === brand
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                          }`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results + active filters */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> products
          </p>
          {hasActiveFilters && (
            <button onClick={resetFilters} className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors">
              <X className="w-3.5 h-3.5" />
              Clear Filters
            </button>
          )}
        </div>

        {/* Product Grid / List */}
        {paginated.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-muted-foreground text-lg mb-2">No products found</div>
            <button onClick={resetFilters} className="text-primary text-sm hover:underline">Clear filters</button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {paginated.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="group block bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-slate-900/8 hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className="relative bg-muted/30 h-48 overflow-hidden">
                    <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="flex items-center gap-2 text-white font-semibold text-sm bg-white/20 px-5 py-2.5 rounded-full backdrop-blur-sm">
                        <Eye className="w-4 h-4" /> View Details
                      </span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-medium bg-white/90 text-primary backdrop-blur-sm px-2.5 py-1 rounded-full">{product.category}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-xs text-muted-foreground mb-1">{product.brand}</div>
                    <h3 className="font-heading font-semibold text-foreground text-base mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-primary">Request Quote</span>
                      <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 mb-10">
            {paginated.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="group flex gap-5 bg-white rounded-2xl border border-border p-5 hover:shadow-lg hover:shadow-slate-900/8 hover:-translate-y-0.5 transition-all"
                >
                  <div className="relative w-24 h-24 bg-muted/30 rounded-xl overflow-hidden shrink-0">
                    <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium bg-primary/8 text-primary rounded-full px-2.5 py-0.5">{product.category}</span>
                          <span className="text-xs text-muted-foreground">{product.brand}</span>
                        </div>
                        <h3 className="font-heading font-semibold text-foreground text-base group-hover:text-primary transition-colors">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{product.description}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-sm font-semibold text-primary hidden md:block">Request Quote</span>
                        <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-5 py-2.5 text-sm font-semibold bg-white border border-border rounded-full shadow-md hover:border-primary/30 hover:bg-muted/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 text-sm font-bold rounded-full shadow-md transition-all ${
                  page === i + 1
                    ? 'text-primary-foreground hover:brightness-105 border-transparent'
                    : 'bg-white border border-border hover:border-primary/30 hover:bg-muted/40'
                }`}
                style={
                  page === i + 1
                    ? { background: 'linear-gradient(180deg, #3DC0C3, #00827F)' }
                    : undefined
                }
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-5 py-2.5 text-sm font-semibold bg-white border border-border rounded-full shadow-md hover:border-primary/30 hover:bg-muted/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

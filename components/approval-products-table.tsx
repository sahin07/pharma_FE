'use client'

import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import type { ApprovalProduct } from '@/lib/approval-products'
import ApprovalProductsTableDesktop from '@/components/approval-products-table-desktop'
import ApprovalProductsTableMobile from '@/components/approval-products-table-mobile'

type TableProduct = ApprovalProduct & {
  categoryName?: string
  categorySlug?: string
}

type ApprovalProductsTableProps = {
  products: TableProduct[]
  title?: string
}

export default function ApprovalProductsTable({
  products,
  title,
}: ApprovalProductsTableProps) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return products
    return products.filter((product) => {
      const haystack = [product.formulation, product.composition, String(product.serialNo)]
        .join(' ')
        .toLowerCase()
      return haystack.includes(query)
    })
  }, [products, search])

  const resetSearch = () => setSearch('')

  return (
    <div>
      {title ? (
        <h2 className="font-heading text-xl md:text-2xl font-black text-primary mb-6 text-center uppercase tracking-wide underline underline-offset-4">
          {title}
        </h2>
      ) : null}

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search formulations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>
        {search ? (
          <button
            onClick={resetSearch}
            className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl border border-border bg-white text-sm font-semibold text-primary hover:bg-muted/40 transition-colors"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        ) : null}
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{filtered.length}</span> formulations
      </p>

      <div className="block md:hidden">
        <ApprovalProductsTableMobile products={filtered} />
      </div>

      <div className="hidden md:block">
        <ApprovalProductsTableDesktop products={filtered} />
      </div>
    </div>
  )
}

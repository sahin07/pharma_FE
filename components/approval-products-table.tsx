'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Search, X } from 'lucide-react'
import type { ApprovalProduct } from '@/lib/approval-products'
import { parseComposition } from '@/lib/parse-composition'

type TableProduct = ApprovalProduct & {
  categoryName?: string
  categorySlug?: string
}

type ApprovalProductsTableProps = {
  products: TableProduct[]
  title?: string
}

const cellBase =
  'border border-slate-800 px-1.5 py-1 text-xs md:text-sm text-slate-900'

const cell = `${cellBase} align-top`

const compositionCell = `${cell} w-[1%] whitespace-nowrap`
const compositionCellWrap = `${cell} w-[1%]`

function rowspanCell(classes: string) {
  return `${cellBase} border-b-0 relative p-0 ${classes}`
}

function rowspanContent(classes: string) {
  return `absolute inset-0 flex items-center px-1.5 py-1 ${classes}`
}

function withoutBottomBorder(classes: string) {
  return `${classes} border-b-0`
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

      <div className="overflow-x-auto border-2 border-slate-800 bg-white">
        <table className="w-max min-w-full border-collapse">
          <colgroup>
            <col className="w-10" />
            <col className="w-[200px]" />
            <col />
            <col className="w-12" />
            <col className="w-12" />
            <col className="w-12" />
            <col className="w-[88px]" />
          </colgroup>
          <thead>
            <tr className="bg-white">
              <th className={`${cell} font-bold text-center`}>S.N.</th>
              <th className={`${cell} font-bold`}>GENERIC NAME &amp; DOSAGE FORM.</th>
              <th className={`${compositionCell} font-bold`}>COMPOSITION.</th>
              <th className={`${cell} font-bold text-center`}>SPC.</th>
              <th className={`${cell} font-bold text-center`}>QTY.</th>
              <th className={`${cell} font-bold text-center`}>UNIT</th>
              <th className={`${cell} font-bold text-center`}>REFERENCE</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className={`${cell} py-16 text-center text-muted-foreground`}>
                  No formulations found. Try a different search.
                </td>
              </tr>
            ) : (
              filtered.flatMap((product) => {
                const compositionRows = parseComposition(product.composition)
                const rowSpan = compositionRows.length

                const rows = compositionRows.map((row, rowIndex) => {
                  const isLastSubRow = rowIndex === compositionRows.length - 1
                  const rowCell = (classes: string) =>
                    isLastSubRow ? withoutBottomBorder(classes) : classes

                  return (
                  <tr key={`${product.slug}-${rowIndex}`}>
                    {rowIndex === 0 ? (
                      <>
                        <td className={rowspanCell('text-center font-semibold')} rowSpan={rowSpan}>
                          <div className={rowspanContent('justify-center')}>{product.serialNo}</div>
                        </td>
                        <td className={rowspanCell('font-medium')} rowSpan={rowSpan}>
                          <div className={rowspanContent('leading-snug')}>{product.formulation}</div>
                        </td>
                      </>
                    ) : null}

                    {row.type === 'header' ? (
                      <>
                        <td className={rowCell(compositionCell)}>{row.text}</td>
                        <td className={rowCell(cell)} />
                        <td className={rowCell(cell)} />
                        <td className={rowCell(cell)} />
                      </>
                    ) : null}

                    {row.type === 'ingredient' ? (
                      <>
                        <td className={rowCell(compositionCell)}>{row.name}</td>
                        <td className={rowCell(`${cell} text-center`)}>{row.spc}</td>
                        <td className={rowCell(`${cell} text-center`)}>{row.qty}</td>
                        <td className={rowCell(`${cell} text-center`)}>{row.unit}</td>
                      </>
                    ) : null}

                    {row.type === 'excipients' ? (
                      <>
                        <td className={rowCell(compositionCell)}>Excipients</td>
                        <td className={rowCell(cell)} />
                        <td className={rowCell(`${cell} text-center`)}>{row.qty}</td>
                        <td className={rowCell(cell)} />
                      </>
                    ) : null}

                    {row.type === 'colour' || row.type === 'note' ? (
                      <>
                        <td className={rowCell(compositionCellWrap)}>{row.text}</td>
                        <td className={rowCell(cell)} />
                        <td className={rowCell(cell)} />
                        <td className={rowCell(cell)} />
                      </>
                    ) : null}

                    {rowIndex === 0 ? (
                      <td className={rowspanCell('text-center')} rowSpan={rowSpan}>
                        <div className={rowspanContent('justify-center')}>
                          <Link
                            href={`/products/${product.slug}`}
                            className="font-semibold text-primary hover:text-primary/80 underline underline-offset-2"
                          >
                            Click Here
                          </Link>
                        </div>
                      </td>
                    ) : null}
                  </tr>
                  )
                })

                return [
                  ...rows,
                  <tr key={`${product.slug}-divider`} aria-hidden="true" className="h-0">
                    <td
                      colSpan={7}
                      className="h-0 p-0 border-0 border-b-2 border-b-slate-800 leading-[0]"
                    />
                  </tr>,
                ]
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

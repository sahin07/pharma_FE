import Link from 'next/link'
import type { ApprovalProduct } from '@/lib/approval-products'
import { parseComposition } from '@/lib/parse-composition'

type TableProduct = ApprovalProduct & {
  categoryName?: string
  categorySlug?: string
}

type ApprovalProductsTableDesktopProps = {
  products: TableProduct[]
}

const cellBase = 'border border-slate-800 px-1.5 py-1 text-sm text-slate-900'

const headerCell =
  'border border-slate-800 px-1.5 py-3.5 text-sm font-bold text-slate-900 bg-slate-100 align-middle'

function rowBg(striped: boolean) {
  return striped ? 'bg-slate-100' : 'bg-white'
}

function cell(striped: boolean) {
  return `${cellBase} ${rowBg(striped)} align-top`
}

const compositionCell = (striped: boolean) => `${cell(striped)} w-[1%] whitespace-nowrap`
const compositionCellWrap = (striped: boolean) => `${cell(striped)} w-[1%]`

const productBlockHover =
  'transition-colors duration-200 hover:bg-primary [&_td]:transition-colors hover:[&_td]:bg-primary hover:[&_td]:text-primary-foreground hover:[&_td]:border-primary-foreground/25 hover:[&_div]:text-primary-foreground hover:[&_a]:text-primary-foreground hover:[&_a]:hover:text-primary-foreground/80'

const referenceLink =
  'font-semibold text-primary underline underline-offset-2 transition-colors'

function rowspanCell(classes: string, striped: boolean) {
  return `${cellBase} ${rowBg(striped)} border-b-0 relative p-0 ${classes}`
}

function rowspanContent(classes: string) {
  return `absolute inset-0 flex items-center px-1.5 py-1 ${classes}`
}

function withoutBottomBorder(classes: string) {
  return `${classes} border-b-0`
}

function renderCompositionCells(
  row: ReturnType<typeof parseComposition>[number],
  rowCell: (classes: string) => string,
  striped: boolean,
) {
  if (row.type === 'header') {
    return (
      <>
        <td className={rowCell(compositionCell(striped))}>{row.text}</td>
        <td className={rowCell(cell(striped))} />
        <td className={rowCell(cell(striped))} />
        <td className={rowCell(cell(striped))} />
      </>
    )
  }
  if (row.type === 'ingredient') {
    return (
      <>
        <td className={rowCell(compositionCell(striped))}>{row.name}</td>
        <td className={rowCell(`${cell(striped)} text-center`)}>{row.spc}</td>
        <td className={rowCell(`${cell(striped)} text-center`)}>{row.qty}</td>
        <td className={rowCell(`${cell(striped)} text-center`)}>{row.unit}</td>
      </>
    )
  }
  if (row.type === 'excipients') {
    return (
      <>
        <td className={rowCell(compositionCell(striped))}>Excipients</td>
        <td className={rowCell(cell(striped))} />
        <td className={rowCell(`${cell(striped)} text-center`)}>{row.qty}</td>
        <td className={rowCell(cell(striped))} />
      </>
    )
  }
  if (row.type === 'base') {
    return (
      <>
        <td className={rowCell(compositionCell(striped))}>{row.name}</td>
        <td className={rowCell(cell(striped))} />
        <td className={rowCell(`${cell(striped)} text-center`)}>{row.qty}</td>
        <td className={rowCell(cell(striped))} />
      </>
    )
  }
  if (row.type === 'colour' || row.type === 'note') {
    return (
      <>
        <td className={rowCell(compositionCellWrap(striped))}>{row.text}</td>
        <td className={rowCell(cell(striped))} />
        <td className={rowCell(cell(striped))} />
        <td className={rowCell(cell(striped))} />
      </>
    )
  }
  return null
}

export default function ApprovalProductsTableDesktop({
  products,
}: ApprovalProductsTableDesktopProps) {
  if (products.length === 0) {
    return (
      <div className="overflow-x-auto border-2 border-slate-800 bg-white">
        <table className="w-max min-w-full border-collapse">
          <thead>
            <tr>
              <th className={`${headerCell} text-center`}>S.N.</th>
              <th className={headerCell}>GENERIC NAME &amp; DOSAGE FORM.</th>
              <th className={`${headerCell} whitespace-nowrap w-[1%]`}>COMPOSITION.</th>
              <th className={`${headerCell} text-center`}>SPC.</th>
              <th className={`${headerCell} text-center`}>QTY.</th>
              <th className={`${headerCell} text-center`}>UNIT</th>
              <th className={`${headerCell} text-center`}>REFERENCE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} className={`${cell(false)} py-16 text-center text-muted-foreground`}>
                No formulations found. Try a different search.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  return (
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
          <tr>
            <th className={`${headerCell} text-center`}>S.N.</th>
            <th className={headerCell}>GENERIC NAME &amp; DOSAGE FORM.</th>
            <th className={`${headerCell} whitespace-nowrap w-[1%]`}>COMPOSITION.</th>
            <th className={`${headerCell} text-center`}>SPC.</th>
            <th className={`${headerCell} text-center`}>QTY.</th>
            <th className={`${headerCell} text-center`}>UNIT</th>
            <th className={`${headerCell} text-center`}>REFERENCE</th>
          </tr>
        </thead>
        {products.map((product, productIndex) => {
          const compositionRows = parseComposition(product.composition)
          const rowSpan = compositionRows.length
          const striped = productIndex % 2 === 1

          return (
            <tbody key={product.slug} className={productBlockHover}>
              {compositionRows.map((row, rowIndex) => {
                const isLastSubRow = rowIndex === compositionRows.length - 1
                const rowCell = (classes: string) =>
                  isLastSubRow ? withoutBottomBorder(classes) : classes

                return (
                  <tr key={`${product.slug}-${rowIndex}`}>
                    {rowIndex === 0 ? (
                      <>
                        <td
                          className={rowspanCell('text-center font-semibold', striped)}
                          rowSpan={rowSpan}
                        >
                          <div className={rowspanContent('justify-center')}>{product.serialNo}</div>
                        </td>
                        <td className={rowspanCell('font-medium', striped)} rowSpan={rowSpan}>
                          <div className={rowspanContent('leading-snug')}>{product.formulation}</div>
                        </td>
                      </>
                    ) : null}

                    {renderCompositionCells(row, rowCell, striped)}

                    {rowIndex === 0 ? (
                      <td className={rowspanCell('text-center', striped)} rowSpan={rowSpan}>
                        <div className={rowspanContent('justify-center')}>
                          <Link href={`/products/${product.slug}`} className={referenceLink}>
                            Click Here
                          </Link>
                        </div>
                      </td>
                    ) : null}
                  </tr>
                )
              })}
              <tr aria-hidden="true" className="h-0">
                <td
                  colSpan={7}
                  className="h-0 p-0 border-0 border-b-2 border-b-slate-800 leading-0"
                />
              </tr>
            </tbody>
          )
        })}
      </table>
    </div>
  )
}

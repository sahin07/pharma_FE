import Link from 'next/link'
import type { ApprovalProduct } from '@/lib/approval-products'
import { parseComposition } from '@/lib/parse-composition'

type TableProduct = ApprovalProduct & {
  categoryName?: string
  categorySlug?: string
}

type ApprovalProductsTableMobileProps = {
  products: TableProduct[]
}

const mobileLabel =
  'border border-slate-800 px-2 py-1.5 text-[10px] font-bold text-slate-900 bg-white align-top'
const mobileValue =
  'border border-slate-800 px-2 py-1.5 text-xs text-slate-900 bg-white align-top'
const mobileMiniCell =
  'border border-slate-800 px-1.5 py-1 text-[10px] text-slate-900 bg-white align-top'

const productBlockHover =
  'transition-colors duration-200 hover:bg-primary [&_td]:transition-colors [&_th]:transition-colors hover:[&_td]:bg-primary hover:[&_th]:bg-primary hover:[&_td]:text-primary-foreground hover:[&_th]:text-primary-foreground hover:[&_td]:border-primary-foreground/25 hover:[&_th]:border-primary-foreground/25 hover:[&_a]:text-primary-foreground hover:[&_a]:hover:text-primary-foreground/80'

const referenceLink =
  'font-semibold text-primary underline underline-offset-2 transition-colors'

function withoutBottomBorder(classes: string) {
  return `${classes} border-b-0`
}

function renderMobileCompositionCells(
  row: ReturnType<typeof parseComposition>[number],
  rowCell: (classes: string) => string,
) {
  if (row.type === 'header') {
    return (
      <>
        <td className={rowCell(mobileMiniCell)}>{row.text}</td>
        <td className={rowCell(mobileMiniCell)} />
        <td className={rowCell(mobileMiniCell)} />
        <td className={rowCell(mobileMiniCell)} />
      </>
    )
  }
  if (row.type === 'ingredient') {
    return (
      <>
        <td className={rowCell(mobileMiniCell)}>{row.name}</td>
        <td className={rowCell(`${mobileMiniCell} text-center`)}>{row.spc}</td>
        <td className={rowCell(`${mobileMiniCell} text-center`)}>{row.qty}</td>
        <td className={rowCell(`${mobileMiniCell} text-center`)}>{row.unit}</td>
      </>
    )
  }
  if (row.type === 'excipients') {
    return (
      <>
        <td className={rowCell(mobileMiniCell)}>Excipients</td>
        <td className={rowCell(mobileMiniCell)} />
        <td className={rowCell(`${mobileMiniCell} text-center`)}>{row.qty}</td>
        <td className={rowCell(mobileMiniCell)} />
      </>
    )
  }
  if (row.type === 'base') {
    return (
      <>
        <td className={rowCell(mobileMiniCell)}>{row.name}</td>
        <td className={rowCell(mobileMiniCell)} />
        <td className={rowCell(`${mobileMiniCell} text-center`)}>{row.qty}</td>
        <td className={rowCell(mobileMiniCell)} />
      </>
    )
  }
  if (row.type === 'colour' || row.type === 'note') {
    return (
      <>
        <td className={rowCell(mobileMiniCell)}>{row.text}</td>
        <td className={rowCell(mobileMiniCell)} />
        <td className={rowCell(mobileMiniCell)} />
        <td className={rowCell(mobileMiniCell)} />
      </>
    )
  }
  return null
}

export default function ApprovalProductsTableMobile({
  products,
}: ApprovalProductsTableMobileProps) {
  if (products.length === 0) {
    return (
      <div className="border-2 border-slate-800 bg-white">
        <p className="py-16 text-center text-sm text-muted-foreground">
          No formulations found. Try a different search.
        </p>
      </div>
    )
  }

  return (
    <div className="border-2 border-slate-800 bg-white">
      {products.map((product) => {
        const compositionRows = parseComposition(product.composition)

        return (
          <div
            key={product.slug}
            className={`border-b-2 border-slate-800 last:border-b-0 ${productBlockHover}`}
          >
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className={`${mobileLabel} w-[34%]`}>S.N.</td>
                  <td className={`${mobileValue} font-semibold text-center`}>
                    {product.serialNo}
                  </td>
                </tr>
                <tr>
                  <td className={mobileLabel}>GENERIC NAME &amp; DOSAGE FORM.</td>
                  <td className={`${mobileValue} font-medium leading-snug`}>
                    {product.formulation}
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="w-full border-collapse border-t border-slate-800">
              <thead>
                <tr>
                  <th className={`${mobileMiniCell} font-bold`}>COMPOSITION.</th>
                  <th className={`${mobileMiniCell} font-bold text-center w-10`}>SPC.</th>
                  <th className={`${mobileMiniCell} font-bold text-center w-10`}>QTY.</th>
                  <th className={`${mobileMiniCell} font-bold text-center w-10`}>UNIT</th>
                </tr>
              </thead>
              <tbody>
                {compositionRows.map((row, rowIndex) => {
                  const isLastSubRow = rowIndex === compositionRows.length - 1
                  const rowCell = (classes: string) =>
                    isLastSubRow ? withoutBottomBorder(classes) : classes

                  return (
                    <tr key={`${product.slug}-comp-${rowIndex}`}>
                      {renderMobileCompositionCells(row, rowCell)}
                    </tr>
                  )
                })}
              </tbody>
            </table>

            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className={`${mobileLabel} w-[34%]`}>REFERENCE</td>
                  <td className={`${mobileValue} text-center`}>
                    <Link href={`/products/${product.slug}`} className={referenceLink}>
                      Click Here
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      })}
    </div>
  )
}

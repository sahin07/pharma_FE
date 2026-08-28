import ProductCategoryTabs from '@/components/product-category-tabs'
import ApprovalProductsTable from '@/components/approval-products-table'
import { getApprovalProductsByCategory } from '@/lib/approval-products'
import { getCategoryBySlug } from '@/lib/category-utils'

type ProductsClientProps = {
  categorySlug: string
}

export default function ProductsClient({ categorySlug }: ProductsClientProps) {
  const category = getCategoryBySlug(categorySlug)
  const products = getApprovalProductsByCategory(categorySlug)

  return (
    <section className="py-10 bg-background">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-10">
        <ProductCategoryTabs />
        <ApprovalProductsTable
          products={products}
          title={category ? category.name.toUpperCase() : undefined}
        />
      </div>
    </section>
  )
}

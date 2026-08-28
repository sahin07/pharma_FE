import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { categories } from '@/lib/data'
import { getCategoryBySlug, getLegacyCategoryRedirect, isCategorySlug } from '@/lib/category-utils'
import {
  getAllApprovalProductSlugs,
  getApprovalProductBySlug,
} from '@/lib/approval-products'
import { allProducts, getProductBySlug } from '@/lib/products'
import ApprovalProductDetail from '@/components/approval-product-detail'
import ProductDetail from '@/components/product-detail'
import ProductsPageShell from '@/components/products-page-shell'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  if (isCategorySlug(slug)) {
    const category = getCategoryBySlug(slug)
    if (!category) return { title: 'Category Not Found' }
    return {
      title: `${category.name} | Samay Pharma Products`,
      description: `${category.description} Browse ${category.name.toLowerCase()} manufactured by Samay Pharma.`,
    }
  }

  const approvalProduct = getApprovalProductBySlug(slug)
  if (approvalProduct) {
    return {
      title: `${approvalProduct.formulation} | Samay Pharma`,
      description: `${approvalProduct.formulation} — manufactured by Samay Pharma. View composition and request a quote.`,
    }
  }

  const product = getProductBySlug(slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: `${product.name} | Samay Pharma`,
    description: `${product.description}. Manufactured by Samay Pharma — GMP-GLP certified pharmaceutical manufacturer.`,
  }
}

export async function generateStaticParams() {
  return [
    ...categories.map((c) => ({ slug: c.slug })),
    ...getAllApprovalProductSlugs().map((slug) => ({ slug })),
    ...allProducts.map((p) => ({ slug: p.slug })),
  ]
}

export default async function ProductsSlugPage({ params }: Props) {
  const { slug } = await params

  const legacyRedirect = getLegacyCategoryRedirect(slug)
  if (legacyRedirect) {
    redirect(`/products/${legacyRedirect}`)
  }

  if (slug === 'injectables' || slug === 'otc') {
    redirect('/products/capsules')
  }

  if (isCategorySlug(slug)) {
    const category = getCategoryBySlug(slug)
    if (!category) notFound()

    return (
      <ProductsPageShell
        categorySlug={slug}
        title={category.name}
        description={category.description}
        breadcrumbLabel={category.name}
      />
    )
  }

  const approvalProduct = getApprovalProductBySlug(slug)
  if (approvalProduct) {
    return <ApprovalProductDetail product={approvalProduct} />
  }

  const product = getProductBySlug(slug)
  if (!product) notFound()

  return <ProductDetail product={product} />
}

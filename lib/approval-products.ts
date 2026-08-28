import approvalData from '@/lib/approval-products.json'

export type ApprovalProduct = {
  serialNo: number
  formulation: string
  composition: string
  slug: string
}

export type ApprovalCategory = {
  name: string
  slug: string
  productCount: number
  products: ApprovalProduct[]
}

type ApprovalCatalog = {
  source: string
  company: string
  extractedAt: string
  categories: ApprovalCategory[]
  totalProducts: number
}

const catalog = approvalData as ApprovalCatalog

const productsBySlug = new Map<string, ApprovalProduct & { categorySlug: string; categoryName: string }>()

for (const category of catalog.categories) {
  for (const product of category.products) {
    productsBySlug.set(product.slug, {
      ...product,
      categorySlug: category.slug,
      categoryName: category.name,
    })
  }
}

export const approvalCategories = catalog.categories

export function getAllApprovalProducts() {
  return catalog.categories.flatMap((category) =>
    category.products.map((product) => ({
      ...product,
      categorySlug: category.slug,
      categoryName: category.name,
    })),
  )
}

export function getApprovalProductsByCategory(slug: string) {
  const category = catalog.categories.find((c) => c.slug === slug)
  return category?.products ?? []
}

export function getApprovalCategory(slug: string) {
  return catalog.categories.find((c) => c.slug === slug)
}

export function getApprovalProductBySlug(slug: string) {
  return productsBySlug.get(slug)
}

export function getAllApprovalProductSlugs() {
  return [...productsBySlug.keys()]
}

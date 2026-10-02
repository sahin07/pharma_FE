import { featuredProducts } from '@/lib/data'

export type Product = {
  id: number
  name: string
  brand: string
  category: string
  description: string
  image: string
  slug: string
  approvalSlug: string
}

export const allProducts: Product[] = [...featuredProducts]

export function getProductBySlug(slug: string) {
  return allProducts.find((p) => p.slug === slug)
}

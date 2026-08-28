import { categories } from '@/lib/data'

export const categorySlugs = new Set(categories.map((c) => c.slug))

const legacyCategoryRedirects: Record<string, string> = {
  syrups: 'oral-liquids',
  liquids: 'oral-liquids',
}

export function isCategorySlug(slug: string) {
  return categorySlugs.has(slug)
}

export function getLegacyCategoryRedirect(slug: string) {
  return legacyCategoryRedirects[slug]
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug)
}

export function getCategoryHref(slug: string) {
  return `/products/${slug}`
}

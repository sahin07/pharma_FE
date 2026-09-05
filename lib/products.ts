import { featuredProducts } from '@/lib/data'

export type Product = {
  id: number
  name: string
  brand: string
  category: string
  description: string
  image: string
  slug: string
}

export const allProducts: Product[] = [
  ...featuredProducts,
  {
    id: 7,
    name: 'Atorvastatin 20mg Tablets',
    brand: 'Samay Pharma',
    category: 'Tablets',
    description: 'HMG-CoA reductase inhibitor for hypercholesterolemia and cardiovascular risk reduction',
    image: '/images/products/metformin.png',
    slug: 'atorvastatin-20mg',
  },
  {
    id: 8,
    name: 'Azithromycin 250mg Capsules',
    brand: 'Samay Pharma',
    category: 'Capsules',
    description: 'Macrolide antibiotic for respiratory tract and soft tissue infections',
    image: '/images/products/amoxicillin.png',
    slug: 'azithromycin-250mg',
  },
  {
    id: 9,
    name: 'Ondansetron 4mg Syrup',
    brand: 'Samay Pharma',
    category: 'Oral Liquids',
    description: 'Antiemetic serotonin antagonist for nausea and vomiting',
    image: '/images/products/paracetamol-syrup.png',
    slug: 'ondansetron-syrup',
  },
  {
    id: 10,
    name: 'Antacid Oral Suspension',
    brand: 'Samay Pharma',
    category: 'Oral Liquids',
    description: 'Oral liquid suspension for relief of acidity and indigestion',
    image: '/images/products/paracetamol-syrup.png',
    slug: 'antacid-oral-suspension',
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

export function getProductBySlug(slug: string) {
  return allProducts.find((p) => p.slug === slug)
}

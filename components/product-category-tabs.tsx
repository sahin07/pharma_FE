'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { categories } from '@/lib/data'
import { CategoryIcon } from '@/lib/category-icons'
import { cn } from '@/lib/utils'

export default function ProductCategoryTabs() {
  const pathname = usePathname()

  return (
    <nav aria-label="Product categories" className="mb-10 w-full">
      <div className="grid w-full grid-cols-2 gap-1.5 rounded-xl border border-border bg-white p-1.5 shadow-sm sm:inline-flex sm:w-auto sm:grid-cols-none sm:items-center sm:justify-center sm:gap-2 sm:px-3 sm:py-1.5">
        {categories.map((cat) => {
          const href = `/products/${cat.slug}`
          const isActive = pathname === href

          return (
            <Link
              key={cat.slug}
              href={href}
              className={cn(
                'inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold transition-all duration-200 sm:shrink-0 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm sm:whitespace-nowrap',
                isActive
                  ? 'bg-gradient-to-r from-[#008000] to-[#006400] text-white shadow-md shadow-primary/25'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <CategoryIcon
                name={cat.name}
                size={16}
                className={isActive ? 'text-white' : 'text-muted-foreground/70'}
              />
              {cat.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

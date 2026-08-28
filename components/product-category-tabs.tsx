'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { categories } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function ProductCategoryTabs() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Product categories"
      className="mb-8 -mx-1 overflow-x-auto scrollbar-none"
    >
      <div className="flex w-max min-w-full gap-2 px-1 pb-1">
        {categories.map((cat) => {
          const href = `/products/${cat.slug}`
          const isActive = pathname === href

          return (
            <Link
              key={cat.slug}
              href={href}
              className={cn(
                'shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-all border',
                isActive
                  ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20'
                  : 'bg-white text-muted-foreground border-border hover:border-primary/30 hover:text-primary hover:bg-muted/40',
              )}
            >
              {cat.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { categories } from '@/lib/data'
import { cn } from '@/lib/utils'

const TabIcons: Record<string, () => React.ReactNode> = {
  Tablets: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <rect x="2" y="5" width="12" height="6" rx="3" />
      <line x1="8" y1="5" x2="8" y2="11" />
    </svg>
  ),
  Capsules: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <ellipse cx="8" cy="8" rx="5" ry="3.5" />
      <line x1="3" y1="8" x2="13" y2="8" />
    </svg>
  ),
  'Oral Liquids': () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <path d="M6 2h4l1 2v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4l1-2z" />
      <path d="M6 8c1 2 3 2 4 0" />
    </svg>
  ),
  Ointments: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <path d="M6 2h4v2l1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5l1-1V2z" />
      <line x1="6" y1="7" x2="10" y2="7" />
    </svg>
  ),
}

export default function ProductCategoryTabs() {
  const pathname = usePathname()

  return (
    <nav aria-label="Product categories" className="mb-10 w-full">
      <div className="grid w-full grid-cols-2 gap-1.5 rounded-xl border border-border bg-white p-1.5 shadow-sm sm:inline-flex sm:w-auto sm:grid-cols-none sm:items-center sm:justify-center sm:gap-2 sm:px-3 sm:py-1.5">
        {categories.map((cat) => {
          const href = `/products/${cat.slug}`
          const isActive = pathname === href
          const Icon = TabIcons[cat.name]

          return (
            <Link
              key={cat.slug}
              href={href}
              className={cn(
                'inline-flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold transition-all duration-200 sm:shrink-0 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm sm:whitespace-nowrap',
                isActive
                  ? 'bg-gradient-to-r from-[#3DC0C3] to-[#00827F] text-white shadow-md shadow-primary/25'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {Icon ? <span className={isActive ? 'text-white' : 'text-muted-foreground/70'}>{Icon()}</span> : null}
              {cat.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

import { FlaskConical, HeartPulse, Package, Pill, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const categoryIconMap: Record<string, LucideIcon> = {
  Capsules: Package,
  Tablets: Pill,
  'Oral Liquids': FlaskConical,
  Ointments: HeartPulse,
}

type CategoryIconProps = {
  name: string
  size?: number
  className?: string
}

export function CategoryIcon({ name, size = 16, className }: CategoryIconProps) {
  const Icon = categoryIconMap[name]
  if (!Icon) return null

  return <Icon size={size} className={cn('shrink-0', className)} aria-hidden />
}

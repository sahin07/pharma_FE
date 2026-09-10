import { FlaskConical, HeartPulse, Package, Pill, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const categoryIconMap: Record<string, LucideIcon> = {
  Capsule: Package,
  Capsules: Package,
  Tablet: Pill,
  Tablets: Pill,
  'Oral Liquid': FlaskConical,
  'Oral Liquids': FlaskConical,
  Ointments: HeartPulse,
  'External Preparations': HeartPulse,
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

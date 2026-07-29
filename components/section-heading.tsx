'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { staggerContainer, wordReveal, badgePop } from '@/lib/animations'

interface SectionHeadingProps {
  badge?: string
  title: string
  accentWord?: string
  subtitle?: string
  centered?: boolean
  className?: string
  inView?: boolean
  dark?: boolean
}

export default function SectionHeading({
  badge,
  title,
  accentWord,
  subtitle,
  centered = true,
  className,
  inView = true,
  dark = false,
}: SectionHeadingProps) {
  const accent = accentWord ?? title.split(' ').at(-1) ?? ''
  const base = accentWord
    ? title.includes(accentWord)
      ? title.slice(0, title.lastIndexOf(accentWord)).trimEnd()
      : title.trimEnd()
    : title.split(' ').slice(0, -1).join(' ')

  /* Split base title into words for staggered reveal */
  const baseWords = base.split(' ').filter(Boolean)

  return (
    <div className={cn(centered ? 'text-center' : 'text-left', 'mb-12', className)}>
      {badge && (
        <motion.div
          variants={badgePop}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className={cn('mb-5', centered ? 'flex justify-center' : '')}
        >
          <span className={cn(
            'inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase px-4 py-1.5 rounded-full shadow-sm',
            dark
              ? 'bg-white/10 border border-white/20 text-white/70'
              : 'bg-white border border-border text-muted-foreground'
          )}>
            <motion.span
              className={cn('w-1.5 h-1.5 rounded-full shrink-0', dark ? 'bg-secondary' : 'bg-primary')}
              animate={{ scale: [1, 1.6, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            {badge}
          </span>
        </motion.div>
      )}

      {/* Heading — word-by-word stagger */}
      <motion.h2
        variants={staggerContainer(0.07, badge ? 0.12 : 0.05)}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className={cn(
          'font-sans font-bold leading-[1.15] text-balance text-3xl md:text-4xl lg:text-[2.75rem]',
          dark ? 'text-white' : 'text-foreground'
        )}
      >
        {baseWords.map((word, i) => (
          <motion.span key={i} variants={wordReveal} className="inline-block mr-[0.26em]">
            {word}
          </motion.span>
        ))}
        {' '}
        <motion.span
          variants={wordReveal}
          className="accent-italic text-primary inline-block"
        >
          {accent}
        </motion.span>
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'mt-4 leading-relaxed text-base md:text-[1.0625rem]',
            dark ? 'text-white/55' : 'text-muted-foreground',
            centered ? 'max-w-2xl mx-auto' : 'max-w-xl',
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

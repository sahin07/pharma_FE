'use client'

import { motion } from 'framer-motion'
import { partners } from '@/lib/data'

export default function TrustedPartners() {
  // Repeat enough times so one track always wider than typical viewports
  const track = [...partners, ...partners, ...partners]

  return (
    <section className="py-14 section-bg-dark border-y border-white/8">
      <div className="max-w-[1680px] mx-auto px-10 mb-8 text-center">
        <p className="font-mono text-[10px] font-medium text-white uppercase tracking-[0.22em]">
          Trusted by Leading Pharmaceutical Manufacturers
        </p>
      </div>

      {/* Marquee — two identical tracks; animate by exactly 50% for a seamless loop */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex items-center gap-4 pr-4"
              aria-hidden={copy === 1}
            >
              {track.map((partner, i) => (
                <div
                  key={`${copy}-${partner}-${i}`}
                  className="px-7 py-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-secondary/50 transition-all cursor-default group shrink-0"
                >
                  <span className="text-[13px] font-semibold text-white/50 group-hover:text-white transition-colors whitespace-nowrap">
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[oklch(0.16_0.045_265)] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[oklch(0.16_0.045_265)] to-transparent pointer-events-none" />
      </div>
    </section>
  )
}

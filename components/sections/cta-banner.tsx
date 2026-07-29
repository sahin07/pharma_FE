'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import Image from 'next/image'
import { staggerContainer, badgePop, wordReveal, buttonEntrance } from '@/lib/animations'

export default function CTABanner() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#F4F6F9]"
    >
      {/* Soft geometric pattern (light) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: 'url(/images/bg-geometric.jpg)' }}
      />

      <div className="relative z-10 max-w-[1680px] mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch gap-4 lg:gap-6 min-h-[480px]">

          {/* ── Left: doctor flush to section bottom, close to text ───────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-end justify-center lg:justify-end pt-10 lg:pt-8 lg:-translate-x-20"
          >
            <div className="relative h-[400px] w-[360px] lg:h-[500px] lg:w-[460px]">
              <Image
                src="/images/doctor-with-pills-cutout.png"
                alt="PharmaCore pharmaceutical professional"
                fill
                className="object-contain object-bottom"
                sizes="460px"
                priority
              />
            </div>
          </motion.div>

          {/* ── Right: text vertically centered ───────────────────────────── */}
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="flex flex-col justify-center py-12 lg:py-16 lg:pl-2"
          >
            {/* Badge */}
            <motion.div variants={badgePop} className="mb-5">
              <span className="inline-flex items-center gap-2 bg-primary/8 text-primary border border-primary/15 rounded-full px-4 py-1.5 text-sm font-medium">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                Start Your Partnership Today
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={staggerContainer(0.06, 0.1)}
              className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance mb-5 leading-tight"
            >
              {['Ready', 'to', 'Streamline', 'Your', 'Pharmaceutical'].map((w, i) => (
                <motion.span key={i} variants={wordReveal} className="inline-block mr-[0.22em]">{w}</motion.span>
              ))}
              <motion.span variants={wordReveal} className="accent-italic text-primary inline-block">
                Procurement?
              </motion.span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-muted-foreground text-base max-w-lg leading-relaxed mb-8"
            >
              Join 1,200+ healthcare providers who trust PharmaCore for reliable,
              quality-assured pharmaceutical supplies. Get personalised pricing within 24 hours.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={staggerContainer(0.12, 0.55)}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div variants={buttonEntrance} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-bold rounded-full shadow-md hover:brightness-105 transition-all"
                  style={{
                    background: 'linear-gradient(180deg, oklch(0.58 0.20 258), oklch(0.48 0.21 258))',
                  }}
                >
                  Get a Free Quote
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </motion.div>
              <motion.div variants={buttonEntrance} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="tel:+911234567890"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-foreground font-semibold rounded-full border border-border shadow-md hover:border-primary/30 hover:bg-muted/40 transition-all"
                >
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Phone className="w-4 h-4 text-primary" />
                  </motion.span>
                  Call Us Now
                </a>
              </motion.div>
            </motion.div>

            {/* Small trust line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
              className="mt-6 text-muted-foreground/70 text-xs font-mono tracking-wide uppercase"
            >
              1,200+ partners &nbsp;·&nbsp; WHO-GMP certified &nbsp;·&nbsp; 24h response
            </motion.p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

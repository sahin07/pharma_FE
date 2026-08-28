'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from '@/components/section-heading'
import { insights } from '@/lib/data'
import { staggerContainer, cardFlipUp, badgePop } from '@/lib/animations'

export default function InsightsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-14 md:py-20 section-bg-b">
      <div className="max-w-[1680px] mx-auto px-10">

        <SectionHeading
          badge="Trends and Updates"
          title="Latest Research and Laboratory"
          accentWord="Insights"
          inView={inView}
        />

        {/* Cards grid */}
        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {insights.map((article, i) => (
            <motion.article
              key={article.id}
              variants={cardFlipUp}
              whileHover={{ y: -8, transition: { duration: 0.22, ease: 'easeOut' } }}
              className="group bg-white rounded-3xl border border-border overflow-hidden hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 transition-shadow duration-300"
            >
              {/* Image container */}
              <div className="relative h-[260px] overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Subtle bottom gradient for date legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>

                {/* Date pill — bottom-left over image */}
                <motion.div
                  variants={badgePop}
                  className="absolute bottom-4 left-4 z-10"
                >
                  <span className="inline-flex items-center font-mono text-[10px] tracking-[0.14em] uppercase text-white bg-black/40 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
                    {article.date}
                  </span>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-4">
                <h3 className="font-sans font-bold text-foreground text-[1.125rem] leading-snug group-hover:text-primary transition-colors duration-200">
                  {article.title}
                </h3>

                {/* Bottom row — tags + arrow */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Admin tag always present */}
                    <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted-foreground border border-border rounded-full px-3 py-1">
                      Admin
                    </span>
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted-foreground border border-border rounded-full px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Arrow button */}
                  <Link
                    href={`/insights/${article.slug}`}
                    aria-label={`Read ${article.title}`}
                    className="shrink-0 w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground shadow-md hover:bg-primary hover:border-primary hover:text-white transition-all duration-200"
                  >
                    <motion.span
                      whileHover={{ x: 2, y: -2 }}
                      transition={{ duration: 0.15 }}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.span>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View all posts */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mt-10"
        >
          <Link
            href="/insights"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-bold rounded-full shadow-md hover:brightness-105 transition-all"
            style={{
              background: 'linear-gradient(180deg, #3DC0C3, #00827F)',
            }}
          >
            View All Posts
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.span>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}

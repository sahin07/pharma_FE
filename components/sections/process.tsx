'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from '@/components/section-heading'
import { processSteps } from '@/lib/data'
import { staggerContainer, scalePop, lineDraw } from '@/lib/animations'

const StepIcons = [
  () => (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 26c0-2 1.5-3 3-3h4l6-6a2 2 0 0 1 2.83 2.83L19 24h3a2 2 0 0 1 0 4H13c-1.5 0-3-.5-5-2z"/>
      <rect x="4" y="18" width="5" height="9" rx="1.5"/>
      <path d="M17 6h7M17 10h5M17 14h3"/>
      <rect x="11" y="4" width="12" height="16" rx="2"/>
    </svg>
  ),
  () => (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4l8 8-14 14H8v-8L22 4z"/>
      <path d="M18 8l8 8"/>
      <circle cx="9" cy="27" r="2" strokeWidth="1.4"/>
    </svg>
  ),
  () => (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="12" width="9" height="16" rx="2"/>
      <path d="M5 16h9M9 12V9"/>
      <rect x="17" y="9" width="12" height="19" rx="2"/>
      <path d="M17 14h12M23 9V6"/>
      <path d="M20 9h6"/>
    </svg>
  ),
  () => (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="6" width="20" height="24" rx="2"/>
      <path d="M13 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/>
      <path d="M12 16l3 3 7-7" strokeWidth="2"/>
      <path d="M12 24h10"/>
    </svg>
  ),
  () => (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 4L6 8v9c0 7 5 11 11 11s11-4 11-11V8L17 4z"/>
      <path d="M12 17l3 3 7-7" strokeWidth="2"/>
    </svg>
  ),
]

export default function ProcessSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const steps = processSteps.slice(0, 4)

  return (
    <section ref={ref} className="py-14 md:py-20 section-bg-b overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-10">

        <SectionHeading
          badge="Our Process"
          title="How does it Work?"
          accentWord="Work?"
          subtitle="From inquiry to doorstep delivery — four simple steps that power reliable pharmaceutical supply."
          inView={inView}
        />

        <motion.div
          variants={staggerContainer(0.14, 0.1)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0"
        >
          {steps.map((step, i) => {
            const Icon = StepIcons[i % StepIcons.length]
            const isLast = i === steps.length - 1

            return (
              <motion.div
                key={step.step}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="flex flex-col items-center text-center px-4 relative"
              >
                {/* Circle + connector */}
                <div className="relative flex items-center justify-center w-full mb-8">
                  {/* Connector line — draws in from left */}
                  {!isLast && (
                    <motion.div
                      variants={lineDraw}
                      transition={{ delay: i * 0.14 + 0.3 }}
                      className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-primary/30 origin-left"
                      style={{ width: '100%', left: '50%' }}
                    />
                  )}

                  {/* Dark navy circle with icon — scale-pop entry */}
                  <motion.div
                    variants={scalePop}
                    transition={{ delay: i * 0.14 + 0.05 }}
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.4 },
                    }}
                    className="relative z-10 w-[88px] h-[88px] rounded-full bg-foreground flex items-center justify-center shadow-lg shadow-foreground/20 shrink-0 cursor-default"
                  >
                    <Icon />
                  </motion.div>
                </div>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.14 + 0.22, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="font-sans font-bold text-foreground text-[15px] leading-snug mb-2.5"
                >
                  {step.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: i * 0.14 + 0.32, duration: 0.5 }}
                  className="text-muted-foreground text-[13px] leading-relaxed mb-7 max-w-[180px]"
                >
                  {step.description}
                </motion.p>

                {/* Number badge — bounces in */}
                <motion.div
                  initial={{ scale: 0, rotate: 20 }}
                  animate={inView ? { scale: 1, rotate: 0 } : {}}
                  transition={{
                    delay: i * 0.14 + 0.4,
                    type: 'spring',
                    stiffness: 260,
                    damping: 16,
                  }}
                  className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-md shadow-primary/30"
                >
                  <span className="font-mono font-bold text-white text-[13px] leading-none">
                    {step.step}
                  </span>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}

'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useLoaderReady } from '@/components/loader-context'

const MIN_DISPLAY_MS = 1100

export default function PageLoader() {
  const { markReady } = useLoaderReady()
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = Date.now()
    let frame = 0
    let done = false

    const tick = () => {
      const elapsed = Date.now() - start
      const target = document.readyState === 'complete' ? 100 : Math.min(90, 20 + elapsed / 18)
      setProgress((prev) => prev + (target - prev) * 0.12)
      if (!done) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    const finish = () => {
      const wait = Math.max(0, MIN_DISPLAY_MS - (Date.now() - start))
      window.setTimeout(() => {
        setProgress(100)
        window.setTimeout(() => {
          done = true
          cancelAnimationFrame(frame)
          setVisible(false)
          // Start page animations as the splash begins fading out
          markReady()
        }, 220)
      }, wait)
    }

    if (document.readyState === 'complete') {
      finish()
    } else {
      window.addEventListener('load', finish, { once: true })
    }

    document.body.style.overflow = 'hidden'

    return () => {
      done = true
      cancelAnimationFrame(frame)
      window.removeEventListener('load', finish)
      document.body.style.overflow = ''
    }
  }, [markReady])

  useEffect(() => {
    if (!visible) document.body.style.overflow = ''
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center section-bg-why"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
          aria-busy="true"
          aria-label="Loading Samay Pharma"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                'radial-gradient(ellipse 50% 40% at 50% 45%, color-mix(in srgb, #3DC0C3 28%, transparent), transparent 70%)',
            }}
          />

          <motion.div
            className="relative z-10 flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="flex items-center justify-center"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src="/images/logos/3.png"
                alt="Samay Pharma"
                width={200}
                height={45}
                className="h-10 w-auto object-contain"
                priority
              />
            </motion.div>

            <div className="mt-2 h-1 w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-primary"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              Loading
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

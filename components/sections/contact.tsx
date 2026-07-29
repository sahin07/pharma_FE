'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react'
import { staggerContainer, fadeLeft, fadeRight, listItem, iconPop, buttonEntrance } from '@/lib/animations'

const contactMeta = [
  {
    icon: Phone,
    label: 'Call Us',
    lines: ['+91 12345 67890', '+91 98765 43210'],
    sub: 'Mon – Sat, 9 am – 6 pm IST',
    accent: 'primary',
  },
  {
    icon: Mail,
    label: 'Email Us',
    lines: ['sales@pharmacore.com', 'support@pharmacore.com'],
    sub: 'Reply within 2 business hours',
    accent: 'secondary',
  },
  {
    icon: MapPin,
    label: 'Head Office',
    lines: ['123 Pharma Hub, Andheri East', 'Mumbai, Maharashtra 400069'],
    sub: 'India',
    accent: 'primary',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    lines: ['Mon – Fri: 9:00 am – 6:00 pm', 'Sat: 9:00 am – 2:00 pm'],
    sub: 'Sunday Closed',
    accent: 'secondary',
  },
]

const fields = [
  { id: 'name',    label: 'Full Name',              type: 'text',  placeholder: 'Dr. Rajesh Sharma',     required: true },
  { id: 'email',   label: 'Email Address',           type: 'email', placeholder: 'rajesh@hospital.com',   required: true },
  { id: 'company', label: 'Company / Hospital',      type: 'text',  placeholder: 'Apollo Hospitals',      required: false },
  { id: 'phone',   label: 'Phone Number',            type: 'tel',   placeholder: '+91 98765 43210',       required: false },
]

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      id="contact"
      style={{
        background: 'linear-gradient(135deg, oklch(0.14 0.06 258) 0%, oklch(0.22 0.10 210) 100%)',
      }}
    >

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1680px] mx-auto px-10 py-20 md:py-28">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-0 items-center">

          {/* ── LEFT: info panel ─────────────────────────────────────────── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="pr-0 lg:pr-16 pb-16 lg:pb-0"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/70 rounded-full px-4 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              Contact Us
            </motion.div>

            {/* Heading */}
            <h2 className="font-sans font-bold text-white text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.15] text-balance mb-6">
              Let&apos;s Start a{' '}
              <em className="accent-italic text-primary">Conversation</em>
            </h2>
            <p className="text-white/55 text-base leading-relaxed mb-12 max-w-sm">
              Our pharmaceutical experts are ready to help you source the right products, get competitive pricing, and streamline your supply chain.
            </p>

            {/* Contact rows */}
            <motion.div
              variants={staggerContainer(0.1, 0.3)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="flex flex-col"
            >
              {contactMeta.map((item, i) => (
                <motion.div
                  key={item.label}
                  variants={listItem}
                  className="flex items-start gap-5 py-6 border-b border-white/10 last:border-0 group"
                >
                  {/* Icon */}
                  <motion.div
                    variants={iconPop}
                    transition={{ delay: i * 0.1 + 0.35 }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      item.accent === 'primary'
                        ? 'bg-primary/25 text-primary border border-primary/30'
                        : 'bg-secondary/25 text-secondary border border-secondary/30'
                    }`}
                  >
                    <item.icon className="w-5 h-5" strokeWidth={1.8} />
                  </motion.div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-[13px] tracking-[0.14em] uppercase text-white/65 block mb-1.5">
                      {item.label}
                    </span>
                    {item.lines.map((line) => (
                      <p key={line} className="text-white text-sm md:text-base font-semibold leading-snug">
                        {line}
                      </p>
                    ))}
                    <p className="text-white/55 text-sm mt-1">{item.sub}</p>
                  </div>

                  <ChevronRight className="w-5 h-5 text-white/25 group-hover:text-white/55 shrink-0 mt-2 transition-colors" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: form card ──────────────────────────────────────────── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <div className="bg-white/6 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">

              {/* Card header strip */}
              <div className="bg-primary/90 border-b border-white/10 px-8 py-5 flex items-center justify-between">
                <div>
                  <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/60 mb-0.5">Quick Inquiry</p>
                  <h3 className="font-sans font-bold text-white text-lg">Send Us a Message</h3>
                </div>
                <div className="flex items-center gap-1.5 bg-white/15 border border-white/20 rounded-full px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/80 text-[11px] font-medium">Responds in 2h</span>
                </div>
              </div>

              {/* Form body */}
              <div className="px-8 py-8">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="py-14 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -15 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                        className="w-20 h-20 bg-secondary/10 border border-secondary/20 rounded-full flex items-center justify-center mx-auto mb-5"
                      >
                        <CheckCircle2 className="w-9 h-9 text-secondary" />
                      </motion.div>
                      <h4 className="font-sans font-bold text-white text-2xl mb-2">Inquiry Sent!</h4>
                      <p className="text-white/50 text-sm max-w-xs mx-auto leading-relaxed">
                        Our team will get back to you within 2 business hours with a personalized response.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* 2-col fields */}
                      <div className="grid sm:grid-cols-2 gap-5 mb-5">
                        {fields.map((field, i) => (
                          <motion.div
                            key={field.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.45, delay: 0.5 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                            className="relative"
                          >
                            {/* Floating label */}
                            <label
                              htmlFor={field.id}
                              className={`absolute left-3.5 font-sans text-xs font-medium pointer-events-none transition-all duration-200 ${
                                focused === field.id || form[field.id as keyof typeof form]
                                  ? '-top-2.5 text-[10px] text-secondary bg-transparent px-1 z-10'
                                  : 'top-3 text-white/40 text-sm'
                              }`}
                            >
                              {field.label}{field.required && ' *'}
                            </label>
                            <input
                              id={field.id}
                              type={field.type}
                              required={field.required}
                              value={form[field.id as keyof typeof form]}
                              onFocus={() => setFocused(field.id)}
                              onBlur={() => setFocused(null)}
                              onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                              className={`w-full px-3.5 pt-3.5 pb-2.5 bg-white/6 border rounded-xl text-sm text-white focus:outline-none transition-all duration-200 placeholder:text-white/20 ${
                                focused === field.id
                                  ? 'border-secondary/60 ring-2 ring-secondary/15 bg-white/10'
                                  : 'border-white/12 hover:border-white/25'
                              }`}
                            />
                          </motion.div>
                        ))}
                      </div>

                      {/* Message field */}
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.45, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
                        className="relative mb-6"
                      >
                        <label
                          htmlFor="message"
                          className={`absolute left-3.5 font-sans text-xs font-medium pointer-events-none transition-all duration-200 ${
                            focused === 'message' || form.message
                              ? '-top-2.5 text-[10px] text-secondary bg-transparent px-1 z-10'
                              : 'top-3 text-white/40 text-sm'
                          }`}
                        >
                          Inquiry Details *
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={4}
                          value={form.message}
                          onFocus={() => setFocused('message')}
                          onBlur={() => setFocused(null)}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className={`w-full px-3.5 pt-3.5 pb-2.5 bg-white/6 border rounded-xl text-sm text-white focus:outline-none transition-all duration-200 resize-none placeholder:text-white/20 ${
                            focused === 'message'
                              ? 'border-secondary/60 ring-2 ring-secondary/15 bg-white/10'
                              : 'border-white/12 hover:border-white/25'
                          }`}
                        />
                      </motion.div>

                      {/* Submit */}
                      <motion.button
                        variants={buttonEntrance}
                        initial="hidden"
                        animate={inView ? 'show' : 'hidden'}
                        whileHover={{ scale: 1.02, transition: { duration: 0.18 } }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 text-white font-bold rounded-full text-sm shadow-md shadow-primary/30 hover:brightness-105 transition-all group"
                        style={{
                          background: 'linear-gradient(180deg, oklch(0.58 0.20 258), oklch(0.48 0.21 258))',
                        }}
                      >
                        Send Inquiry
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.span>
                      </motion.button>

                      {/* Trust strip */}
                      <div className="flex items-center justify-center gap-4 mt-5 pt-5 border-t border-white/10">
                        {['SSL Secured', 'No Spam', 'GDPR Safe'].map((t) => (
                          <div key={t} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-secondary" strokeWidth={2.5} />
                            <span className="text-[11px] text-white/40 font-medium">{t}</span>
                          </div>
                        ))}
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

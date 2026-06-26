import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const SectionWrapper = ({
  id,
  children,
  className = '',
  label = '',
  number = '',
  dark = false
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section
      id={id}
      ref={ref}
      className={`relative py-24 overflow-hidden ${dark ? 'bg-arena-surface' : 'bg-arena-black'} ${className}`}
    >
      {/* Background grid (subtle) */}
      <div className="absolute inset-0 grid-lines opacity-10" />

      {/* Section label */}
      {label && (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="absolute top-8 left-6 md:left-12 flex items-center gap-3"
        >
          {number && (
            <span className="font-mono text-xs text-arena-gray tracking-widest">
              [{number}]
            </span>
          )}
          <span className="font-mono text-xs tracking-[0.4em] text-arena-blue">
            {label}
          </span>
          <div
            className="h-px w-16 opacity-50"
            style={{ background: 'linear-gradient(90deg, #00d4ff, transparent)' }}
          />
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 mt-8">
        {children}
      </div>
    </section>
  )
}

export default SectionWrapper

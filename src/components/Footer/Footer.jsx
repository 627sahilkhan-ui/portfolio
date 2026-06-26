import React from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-arena-black py-24">
      {/* Grid */}
      <div className="absolute inset-0 grid-lines opacity-10" />

      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #00d4ff, #ff2233, transparent)' }}
      />

      {/* Massive text */}
      <div className="relative overflow-hidden">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center px-6"
        >
          <div
            className="font-display leading-none"
            style={{
              fontSize: 'clamp(32px, 8vw, 120px)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.1)',
              letterSpacing: '0.1em',
            }}
          >
            SEE YOU IN
          </div>
          <div
            className="font-display leading-none"
            style={{
              fontSize: 'clamp(32px, 8vw, 120px)',
              color: '#e8e8e8',
              letterSpacing: '0.1em',
              textShadow: '0 0 80px rgba(0,212,255,0.15)',
            }}
          >
            THE FUTURE
          </div>
        </motion.div>
      </div>

      {/* Bottom row */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="relative z-10 max-w-7xl mx-auto px-6 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="font-mono text-xs tracking-widest text-arena-gray">
          © 2024 SAHIL KHAN — DIGITAL PERFORMANCE ARENA
        </div>

        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-arena-blue"
            style={{ boxShadow: '0 0 8px #00d4ff', animation: 'pulse 1.5s ease-in-out infinite' }}
          />
          <span className="font-mono text-xs tracking-widest text-arena-gray">
            ALL SYSTEMS OPERATIONAL
          </span>
        </div>

        <div className="font-mono text-xs tracking-widest text-arena-gray">
          BUILT WITH REACT + FRAMER + THREE.JS
        </div>
      </motion.div>
    </footer>
  )
}

export default Footer

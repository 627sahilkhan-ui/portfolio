import React, { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import HeroCanvas from './HeroCanvas'

const Hero = () => {
  const titleRef = useRef()
  const heroRef = useRef()
  const isHeroInView = useInView(heroRef)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-char',
        { y: 120, opacity: 0, rotationX: -90 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          stagger: 0.05,
          ease: 'power4.out',
          delay: 0.3
        }
      )
    }, titleRef)

    return () => ctx.revert()
  }, [])

  const splitChars = (text) =>
    text.split('').map((char, i) => (
      <span
        key={i}
        className="hero-char inline-block"
        style={{ perspective: '400px' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-arena-black"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-lines opacity-20" />

      {/* Diagonal accent line */}
      <div
        className="absolute top-0 right-0 w-px h-full opacity-20"
        style={{ background: 'linear-gradient(180deg, transparent, #00d4ff, transparent)' }}
      />

      {/* Red accent stripe */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 top-0 bottom-0 w-1 origin-top"
        style={{ background: 'linear-gradient(180deg, #ff2233, #ff223344, transparent)' }}
      />

      {/* Bottom accent bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px origin-left"
        style={{ background: 'linear-gradient(90deg, #00d4ff, transparent)' }}
      />

      {/* 3D Canvas — right side */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 md:w-2/5">
        <div className="w-full h-full opacity-80">
          {isHeroInView && <HeroCanvas />}
        </div>
        {/* Gradient overlay to blend */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, #050505 10%, transparent 60%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full" ref={titleRef}>
        {/* Status label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-arena-blue"
            style={{ boxShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff' }}
          />
          <span className="font-mono text-xs tracking-[0.4em] text-arena-blue">
            PERFORMANCE ARENA — ACTIVE
          </span>
        </motion.div>

        {/* Massive name */}
        <div className="overflow-hidden mb-2">
          <div
            className="font-display text-[18vw] md:text-[14vw] leading-none text-arena-white"
            style={{
              letterSpacing: '0.05em',
              textShadow: '0 0 80px rgba(0,212,255,0.1)'
            }}
          >
            {splitChars('SAHIL')}
          </div>
        </div>
        <div className="overflow-hidden mb-8">
          <div
            className="font-display text-[18vw] md:text-[14vw] leading-none"
            style={{
              letterSpacing: '0.05em',
              color: 'transparent',
              WebkitTextStroke: '1px #00d4ff',
              textShadow: '0 0 60px #00d4ff44'
            }}
          >
            {splitChars('KHAN')}
          </div>
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center gap-4 mb-12"
        >
          {['AI', 'DEVELOPER', 'CREATOR', 'BUILDER'].map((tag, i) => (
            <React.Fragment key={tag}>
              <span className="font-mono text-xs md:text-sm tracking-[0.25em] text-arena-gray-light">
                {tag}
              </span>
              {i < 3 && (
                <span className="text-arena-blue opacity-50">•</span>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex items-center gap-6"
        >
          <motion.a
            href="#profile"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#profile')?.scrollIntoView({ behavior: 'smooth' })
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center gap-3 no-underline group overflow-hidden"
            style={{
              background: '#00d4ff',
              color: '#050505',
              padding: '16px 40px',
              clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '18px',
              letterSpacing: '0.2em',
            }}
          >
            <span className="relative z-10">ENTER THE ARENA</span>
            <span className="relative z-10 text-lg group-hover:translate-x-1 transition-transform duration-200">→</span>
            <div
              className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-400"
              style={{ background: '#ff2233' }}
            />
          </motion.a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="font-mono text-xs tracking-widest text-arena-gray-light hover:text-arena-blue transition-colors duration-200 no-underline border-b border-transparent hover:border-arena-blue pb-1"
          >
            SEND TRANSMISSION →
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex items-center gap-8 mt-16 pt-8"
          style={{ borderTop: '1px solid rgba(0,212,255,0.1)' }}
        >
          {[
            { val: '3+', label: 'YEARS BUILDING' },
            { val: '20+', label: 'PROJECTS SHIPPED' },
            { val: '∞', label: 'PROBLEMS SOLVED' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-3xl text-arena-blue">{stat.val}</div>
              <div className="font-mono text-[10px] text-arena-gray-light tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] tracking-[0.4em] text-arena-gray-light writing-vertical">SCROLL DOWN</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-arena-blue to-transparent"
        />
      </motion.div>
    </section>
  )
}

export default Hero

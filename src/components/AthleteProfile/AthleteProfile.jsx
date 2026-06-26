import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionWrapper from '../../layouts/SectionWrapper'
import { fadeUpVariant, staggerContainer } from '../../animations/variants'

const StatGauge = ({ label, value, color = '#00d4ff', delay = 0 }) => {
  const [display, setDisplay] = useState(0)
  const ref = useRef()
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const timer = setTimeout(() => {
      let current = 0
      const increment = value / 60
      const interval = setInterval(() => {
        current += increment
        if (current >= value) {
          current = value
          clearInterval(interval)
        }
        setDisplay(Math.floor(current))
      }, 16)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [isInView, value, delay])

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-xs tracking-widest text-arena-gray-light">{label}</span>
        <span className="font-display text-2xl" style={{ color }}>{display}</span>
      </div>

      {/* Track */}
      <div className="relative h-1.5 bg-arena-gray overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : {}}
          transition={{ duration: 1.2, delay: delay / 1000 + 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 left-0"
          style={{
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
        {/* Energy pulse */}
        <motion.div
          initial={{ left: '-5%', opacity: 0 }}
          animate={isInView ? { left: '105%', opacity: [0, 1, 0] } : {}}
          transition={{ duration: 1, delay: delay / 1000 + 1.2 }}
          className="absolute inset-y-0 w-4"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            boxShadow: `0 0 12px ${color}`,
          }}
        />
      </div>

      {/* Tick marks */}
      <div className="flex justify-between mt-1">
        {[0, 25, 50, 75, 100].map(tick => (
          <div key={tick}
            className="w-px h-1.5"
            style={{ background: display >= tick ? color : '#333' }}
          />
        ))}
      </div>
    </div>
  )
}

const stats = [
  { label: 'CREATIVITY', value: 95, color: '#00d4ff' },
  { label: 'SPEED', value: 98, color: '#ff2233' },
  { label: 'EXECUTION', value: 96, color: '#ffaa00' },
  { label: 'PROBLEM SOLVING', value: 93, color: '#00d4ff' },
  { label: 'INNOVATION', value: 97, color: '#ff2233' },
]

const AthleteProfile = () => {
  const ref = useRef()
  const isInView = useInView(ref, { once: true })

  return (
    <SectionWrapper id="profile" label="ATHLETE PROFILE" number="01" dark>
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left: Identity card */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUpVariant} className="mb-6">
            <span className="font-mono text-xs tracking-[0.4em] text-arena-red">
              COMPETITOR PROFILE
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUpVariant}
            className="font-display text-7xl md:text-9xl text-arena-white leading-none mb-2"
            style={{ letterSpacing: '0.05em' }}
          >
            SAHIL
          </motion.h2>
          <motion.h2
            variants={fadeUpVariant}
            className="font-display text-7xl md:text-9xl leading-none mb-10"
            style={{
              letterSpacing: '0.05em',
              color: 'transparent',
              WebkitTextStroke: '1px #00d4ff',
            }}
          >
            KHAN
          </motion.h2>

          {/* ID card */}
          <motion.div
            variants={fadeUpVariant}
            className="carbon-texture hud-corner relative p-6"
            style={{
              border: '1px solid rgba(0,212,255,0.2)',
              borderLeft: '3px solid #00d4ff',
            }}
          >
            {/* HUD data rows */}
            {[
              { key: 'NAME', value: 'SAHIL KHAN' },
              { key: 'CLASS', value: 'ELITE DEVELOPER' },
              { key: 'SPECIALTY', value: 'AI / REACT / CREATIVE TECH' },
              { key: 'LOCATION', value: 'DIGITAL ARENA' },
              { key: 'STATUS', value: 'ACTIVE', highlight: true },
            ].map(({ key, value, highlight }) => (
              <div key={key} className="flex items-center gap-4 py-2"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
              >
                <span className="font-mono text-xs text-arena-gray-light tracking-widest w-32 flex-shrink-0">
                  {key}
                </span>
                <div className="flex-1 h-px opacity-20"
                  style={{ background: 'linear-gradient(90deg, #00d4ff, transparent)' }} />
                <span className={`font-mono text-xs tracking-widest ${
                  highlight ? 'text-arena-blue' : 'text-arena-white'
                }`}
                  style={highlight ? { textShadow: '0 0 10px #00d4ff' } : {}}
                >
                  {value}
                  {highlight && (
                    <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-arena-blue"
                      style={{
                        boxShadow: '0 0 6px #00d4ff',
                        animation: 'pulse 1.5s ease-in-out infinite'
                      }}
                    />
                  )}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Performance meters */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="mb-8">
            <span className="font-mono text-xs tracking-[0.4em] text-arena-gray-light">
              PERFORMANCE METRICS
            </span>
          </div>

          <div className="space-y-8">
            {stats.map((stat, i) => (
              <StatGauge
                key={stat.label}
                label={stat.label}
                value={stat.value}
                color={stat.color}
                delay={i * 150}
              />
            ))}
          </div>

          {/* Overall rating */}
          <div className="mt-10 p-6 carbon-texture"
            style={{
              border: '1px solid rgba(255,34,51,0.3)',
              borderLeft: '3px solid #ff2233',
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-xs tracking-widest text-arena-gray-light mb-1">
                  OVERALL PERFORMANCE INDEX
                </div>
                <div className="font-display text-5xl text-arena-red"
                  style={{ textShadow: '0 0 20px #ff2233' }}
                >
                  S+ TIER
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-6xl text-arena-white">9.5</div>
                <div className="font-mono text-xs text-arena-gray-light">/ 10.0</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

export default AthleteProfile

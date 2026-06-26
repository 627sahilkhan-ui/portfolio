import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('init') // init, loading, activating, done
  const [lines, setLines] = useState([])

  const bootLines = [
    '> SYSTEM BOOT SEQUENCE INITIATED',
    '> LOADING NEURAL INTERFACE...',
    '> CALIBRATING PERFORMANCE METRICS...',
    '> INJECTING CREATIVE PAYLOAD...',
    '> SYNCHRONIZING EXECUTION MODULES...',
    '> ARENA PROTOCOLS ONLINE',
  ]

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 3 + 1
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setPhase('activating')
        setTimeout(() => {
          setPhase('done')
          setTimeout(onComplete, 600)
        }, 1000)
      }
      setProgress(Math.floor(current))
    }, 40)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress > 0) {
      const lineIndex = Math.floor((progress / 100) * bootLines.length)
      setLines(bootLines.slice(0, Math.min(lineIndex + 1, bootLines.length)))
    }
  }, [progress])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-arena-black flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
              zIndex: 1
            }}
          />

          {/* Grid */}
          <div className="absolute inset-0 grid-lines opacity-30" />

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-arena-blue opacity-60" />
          <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-arena-blue opacity-60" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-arena-red opacity-60" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-arena-red opacity-60" />

          {/* Content */}
          <div className="relative z-10 w-full max-w-2xl px-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="text-arena-blue font-mono text-xs tracking-[0.5em] mb-2 opacity-60">
                DIGITAL PERFORMANCE ARENA
              </div>
              <div
                className="font-display text-7xl text-arena-white text-glow-blue tracking-widest"
                style={{ letterSpacing: '0.15em' }}
              >
                SAHIL KHAN
              </div>
            </motion.div>

            {/* Boot terminal */}
            <div className="bg-arena-surface bg-opacity-50 border border-arena-gray rounded-none p-6 mb-8 font-mono text-xs"
              style={{ borderLeft: '3px solid #00d4ff' }}>
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-arena-blue mb-1"
                >
                  {line}
                  {i === lines.length - 1 && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="ml-1 inline-block w-2 h-3 bg-arena-blue align-middle"
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-xs text-arena-gray-light tracking-widest">
                  {phase === 'activating' ? 'PERFORMANCE MODE ENABLING...' : 'INITIALIZING...'}
                </span>
                <span className="font-mono text-sm text-arena-blue font-bold">
                  {progress}%
                </span>
              </div>

              <div className="h-1 bg-arena-gray relative overflow-hidden">
                <motion.div
                  className="h-full bg-arena-blue absolute left-0 top-0"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.05 }}
                />
                <div
                  className="h-full absolute top-0 w-8 opacity-80"
                  style={{
                    left: `${progress}%`,
                    background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
                    boxShadow: '0 0 10px #00d4ff',
                    transform: 'translateX(-50%)'
                  }}
                />
              </div>

              {/* Ticks */}
              <div className="flex justify-between mt-1">
                {[0, 25, 50, 75, 100].map(tick => (
                  <div key={tick}
                    className={`font-mono text-[9px] transition-colors duration-300 ${
                      progress >= tick ? 'text-arena-blue' : 'text-arena-gray'
                    }`}
                  >
                    {tick}
                  </div>
                ))}
              </div>
            </div>

            {/* Activation flash */}
            <AnimatePresence>
              {phase === 'activating' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center mt-8"
                >
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.4, repeat: 3 }}
                    className="font-display text-3xl text-arena-blue text-glow-blue tracking-[0.4em]"
                  >
                    PERFORMANCE MODE ENABLED
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Scanning line */}
          <div
            className="absolute left-0 right-0 h-px pointer-events-none animate-scan"
            style={{ background: 'linear-gradient(90deg, transparent, #00d4ff88, transparent)' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Loader

import React, { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from './ProjectCard'
import SectionWrapper from '../../layouts/SectionWrapper'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'AI NEURAL HUB',
    description: 'Intelligent dashboard powered by machine learning models. Real-time data visualization with predictive analytics engine.',
    type: 'AI / ML',
    tech: ['React', 'Python', 'TensorFlow', 'FastAPI'],
    accent: '#00d4ff',
  },
  {
    title: 'ARENA PLATFORM',
    description: 'High-performance social platform for competitive gaming. Sub-10ms latency architecture built for scale.',
    type: 'FULLSTACK',
    tech: ['React', 'Node.js', 'WebSocket', 'Redis'],
    accent: '#ff2233',
  },
  {
    title: 'VELOCITY EDITOR',
    description: 'Browser-based video editing suite with AI-powered auto-cut and motion effects. Zero native install required.',
    type: 'CREATIVE TECH',
    tech: ['React', 'WebGL', 'FFmpeg', 'WASM'],
    accent: '#ffaa00',
  },
  {
    title: 'CIPHER PROTOCOL',
    description: 'End-to-end encrypted communication layer with quantum-resistant cryptography. Open source security toolkit.',
    type: 'SECURITY',
    tech: ['C++', 'Rust', 'WebCrypto', 'React'],
    accent: '#00d4ff',
  },
  {
    title: 'MOTION CRAFT',
    description: 'Professional motion graphics toolkit for React developers. 200+ animation presets with GPU acceleration.',
    type: 'DESIGN TOOLS',
    tech: ['React', 'GSAP', 'Three.js', 'CSS'],
    accent: '#ff2233',
  },
]

const Projects = () => {
  const scrollRef = useRef()
  const containerRef = useRef()
  const ref = useRef()
  const isInView = useInView(ref, { once: true })

  return (
    <SectionWrapper id="projects" label="COMPETITION RECORD" number="03" dark>
      <div ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <h2 className="font-display text-6xl md:text-8xl text-arena-white leading-none"
              style={{ letterSpacing: '0.05em' }}
            >
              PROJECTS
            </h2>
            <div
              className="font-display text-6xl md:text-8xl leading-none"
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px #ff2233',
              }}
            >
              DEPLOYED
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 text-arena-gray-light font-mono text-xs tracking-widest mb-2">
            <span>SCROLL</span>
            <div className="flex gap-1">
              <div className="w-4 h-px bg-arena-blue" />
              <div className="w-8 h-px bg-arena-blue" />
            </div>
          </div>
        </motion.div>

        {/* Horizontal scroll container */}
        <div className="relative overflow-x-auto no-scrollbar" ref={containerRef}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            ref={scrollRef}
            className="flex gap-6 pb-8"
            style={{ width: 'max-content' }}
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </motion.div>

          {/* Gradient fade right */}
          <div
            className="absolute top-0 right-0 bottom-8 w-24 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, #111)' }}
          />
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-12 mt-8 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {[
            { val: '20+', label: 'TOTAL PROJECTS' },
            { val: '100%', label: 'SHIPPED ON TIME' },
            { val: '0', label: 'ABANDONED BUILDS' },
          ].map(s => (
            <div key={s.label}>
              <div className="font-display text-3xl text-arena-blue">{s.val}</div>
              <div className="font-mono text-[10px] text-arena-gray-light tracking-widest">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

export default Projects

import React, { useState } from 'react'
import { motion } from 'framer-motion'

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex-shrink-0 w-80 md:w-96 overflow-hidden group cursor-pointer"
      style={{
        background: '#0a0a0a',
        border: `1px solid ${hovered ? project.accent : 'rgba(255,255,255,0.06)'}`,
        transition: 'border-color 0.3s ease',
      }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Image / visual area */}
      <div
        className="relative h-48 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${project.accent}22 0%, #111 100%)`,
        }}
      >
        {/* Diagonal pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              ${project.accent}08 20px,
              ${project.accent}08 21px
            )`,
          }}
        />

        {/* Project number */}
        <div
          className="absolute top-4 left-4 font-display text-7xl opacity-10"
          style={{ color: project.accent }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Type tag */}
        <div
          className="absolute top-4 right-4 font-mono text-[10px] tracking-widest px-2 py-1"
          style={{
            color: project.accent,
            background: `${project.accent}22`,
            border: `1px solid ${project.accent}44`,
          }}
        >
          {project.type}
        </div>

        {/* Hover overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: `${project.accent}11` }}
        >
          <div
            className="font-mono text-xs tracking-widest px-6 py-3"
            style={{
              color: project.accent,
              border: `1px solid ${project.accent}`,
            }}
          >
            VIEW PROJECT →
          </div>
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-6">
        {/* Title */}
        <h3
          className="font-display text-2xl text-arena-white mb-2 group-hover:text-arena-blue transition-colors duration-300"
          style={{ letterSpacing: '0.1em' }}
        >
          {project.title}
        </h3>

        <p className="font-mono text-xs text-arena-gray-light leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map(t => (
            <span
              key={t}
              className="font-mono text-[9px] tracking-widest px-2 py-0.5"
              style={{
                color: '#666',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          animate={{ width: hovered ? '100%' : '0%' }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-0 left-0 h-0.5"
          style={{ background: project.accent, boxShadow: `0 0 8px ${project.accent}` }}
        />
      </div>
    </motion.div>
  )
}

export default ProjectCard

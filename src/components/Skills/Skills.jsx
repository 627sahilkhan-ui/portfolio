import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  SiReact, SiHtml5, SiPython,
  SiJavascript, SiNodedotjs, SiGit
} from 'react-icons/si'
import { TbBrain } from 'react-icons/tb'
import { MdVideoLibrary, MdCode } from 'react-icons/md'
import { FiCpu } from 'react-icons/fi'
import SectionWrapper from '../../layouts/SectionWrapper'
import { staggerContainer, scaleVariant } from '../../animations/variants'

const skills = [
  {
    id: 'react',
    label: 'REACT',
    sublabel: 'Frontend Framework',
    icon: SiReact,
    color: '#00d4ff',
    level: 92,
    tag: 'CORE',
  },
  {
    id: 'html',
    label: 'HTML5',
    sublabel: 'Structure Layer',
    icon: SiHtml5,
    color: '#ff6b35',
    level: 97,
    tag: 'MASTERED',
  },
  {
    id: 'css',
    label: 'CSS3',
    sublabel: 'Style Engine',
    icon: MdCode,
    color: '#0066cc',
    level: 94,
    tag: 'MASTERED',
  },
  {
    id: 'c',
    label: 'C / C++',
    sublabel: 'Systems Level',
    icon: () => <span style={{ fontFamily: 'Bebas Neue', fontSize: '1.5rem', color: '#888' }}>C</span>,
    color: '#888888',
    level: 80,
    tag: 'PROFICIENT',
  },
  {
    id: 'ai',
    label: 'AI / ML',
    sublabel: 'Intelligence Layer',
    icon: TbBrain,
    color: '#ff2233',
    level: 85,
    tag: 'ADVANCED',
  },
  {
    id: 'video',
    label: 'VIDEO EDIT',
    sublabel: 'Motion & Media',
    icon: MdVideoLibrary,
    color: '#ffaa00',
    level: 88,
    tag: 'ADVANCED',
  },
  {
    id: 'js',
    label: 'JAVASCRIPT',
    sublabel: 'Runtime Engine',
    icon: SiJavascript,
    color: '#ffcc00',
    level: 91,
    tag: 'CORE',
  },
  {
    id: 'python',
    label: 'PYTHON',
    sublabel: 'AI & Scripting',
    icon: SiPython,
    color: '#4b8bbe',
    level: 86,
    tag: 'ADVANCED',
  },
]

const SkillCard = ({ skill, index }) => {
  const [hovered, setHovered] = useState(false)
  const Icon = skill.icon

  return (
    <motion.div
      variants={scaleVariant}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group cursor-pointer overflow-hidden"
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${skill.color}11, ${skill.color}22)`
          : 'rgba(17,17,17,0.8)',
        border: `1px solid ${hovered ? skill.color : 'rgba(255,255,255,0.06)'}`,
        borderLeft: `3px solid ${hovered ? skill.color : 'rgba(255,255,255,0.1)'}`,
        padding: '24px',
        transition: 'all 0.3s ease',
        boxShadow: hovered ? `0 0 30px ${skill.color}22, 0 0 60px ${skill.color}11` : 'none',
      }}
    >
      {/* Tag */}
      <div
        className="absolute top-3 right-3 font-mono text-[9px] tracking-widest px-2 py-0.5"
        style={{
          color: skill.color,
          border: `1px solid ${skill.color}44`,
          background: `${skill.color}11`,
        }}
      >
        {skill.tag}
      </div>

      {/* Icon */}
      <div className="mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
        <Icon
          size={36}
          style={{
            color: hovered ? skill.color : '#444',
            filter: hovered ? `drop-shadow(0 0 8px ${skill.color})` : 'none',
            transition: 'all 0.3s ease',
          }}
        />
      </div>

      {/* Label */}
      <div className="font-display text-2xl text-arena-white mb-0.5 tracking-wider">
        {skill.label}
      </div>
      <div className="font-mono text-xs text-arena-gray-light tracking-widest mb-4">
        {skill.sublabel}
      </div>

      {/* Level bar */}
      <div className="h-px bg-arena-gray relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={hovered ? { width: `${skill.level}%` } : { width: `${skill.level * 0.5}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${skill.color}66, ${skill.color})`,
            boxShadow: `0 0 6px ${skill.color}`,
          }}
        />
      </div>

      {/* Level value */}
      <div className="flex justify-between mt-2">
        <span className="font-mono text-[9px] text-arena-gray-light">PROFICIENCY</span>
        <span className="font-mono text-[9px]" style={{ color: skill.color }}>
          {skill.level}%
        </span>
      </div>

      {/* Energy pulse on hover */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${skill.color}22 0%, transparent 70%)`
          }}
        />
      )}
    </motion.div>
  )
}

const Skills = () => {
  const ref = useRef()
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <SectionWrapper id="skills" label="SKILL MODULES" number="02">
      <div ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="font-display text-6xl md:text-8xl text-arena-white leading-none mb-4"
            style={{ letterSpacing: '0.05em' }}
          >
            PERFORMANCE<br />
            <span style={{
              color: 'transparent',
              WebkitTextStroke: '1px #00d4ff',
            }}>MODULES</span>
          </h2>
          <p className="font-mono text-sm text-arena-gray-light max-w-lg leading-relaxed">
            Each skill is a weapon, sharpened through relentless iteration. These are the tools of the arena.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {skills.map((skill, i) => (
            <SkillCard key={skill.id} skill={skill} index={i} />
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

export default Skills

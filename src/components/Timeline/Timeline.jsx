import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionWrapper from '../../layouts/SectionWrapper'

const events = [
  {
    year: '2024',
    title: 'AI INTEGRATION MASTERY',
    desc: 'Deployed multiple production AI systems. Integrated LLMs, computer vision, and predictive models into real-world applications.',
    tag: 'MILESTONE',
    color: '#00d4ff',
    side: 'right',
  },
  {
    year: '2023',
    title: 'FULL-STACK EVOLUTION',
    desc: 'Leveled up from frontend to full-stack. Built and shipped 10+ complete products from database to deployment.',
    tag: 'EVOLUTION',
    color: '#ff2233',
    side: 'left',
  },
  {
    year: '2023',
    title: 'CREATIVE TECH UNLOCK',
    desc: 'Merged design, motion graphics and code. Started creating experiences that live at the boundary of art and engineering.',
    tag: 'UNLOCK',
    color: '#ffaa00',
    side: 'right',
  },
  {
    year: '2022',
    title: 'REACT DOMINANCE',
    desc: 'Deep dive into React ecosystem. Mastered state management, performance optimization, and component architecture.',
    tag: 'ACHIEVEMENT',
    color: '#00d4ff',
    side: 'left',
  },
  {
    year: '2021',
    title: 'ARENA ENTRY',
    desc: 'Wrote first line of code. The beginning of a relentless pursuit of technical mastery and creative excellence.',
    tag: 'ORIGIN',
    color: '#ff2233',
    side: 'right',
  },
]

const TimelineEvent = ({ event, index }) => {
  const ref = useRef()
  const isInView = useInView(ref, { once: true, margin: '-15%' })
  const isLeft = event.side === 'left'

  return (
    <div ref={ref} className={`relative flex items-center gap-0 ${isLeft ? 'flex-row' : 'flex-row-reverse'} mb-12`}>
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`w-5/12 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}
      >
        <div className="mb-1">
          <span
            className="font-mono text-[10px] tracking-widest px-2 py-0.5"
            style={{
              color: event.color,
              border: `1px solid ${event.color}44`,
              background: `${event.color}11`,
            }}
          >
            {event.tag}
          </span>
        </div>
        <div className="font-display text-4xl text-arena-white mt-2 mb-1"
          style={{ letterSpacing: '0.08em' }}
        >
          {event.title}
        </div>
        <p className="font-mono text-xs text-arena-gray-light leading-relaxed">
          {event.desc}
        </p>
      </motion.div>

      {/* Center node */}
      <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-2/12">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div
            className="w-12 h-12 flex items-center justify-center"
            style={{
              background: '#050505',
              border: `2px solid ${event.color}`,
              boxShadow: `0 0 20px ${event.color}44, 0 0 40px ${event.color}22`,
            }}
          >
            <div
              className="w-4 h-4"
              style={{
                background: event.color,
                boxShadow: `0 0 8px ${event.color}`,
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              }}
            />
          </div>

          {/* Year label */}
          <div
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 font-mono text-[10px] tracking-widest whitespace-nowrap"
            style={{ color: event.color }}
          >
            {event.year}
          </div>
        </motion.div>
      </div>

      {/* Empty right half */}
      <div className="w-5/12" />
    </div>
  )
}

const Timeline = () => {
  const ref = useRef()
  const isInView = useInView(ref, { once: true })

  return (
    <SectionWrapper id="timeline" label="JOURNEY LOG" number="04">
      <div ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-6xl md:text-8xl leading-none mb-4"
            style={{ letterSpacing: '0.05em' }}
          >
            <span className="text-arena-white">THE </span>
            <span style={{ color: 'transparent', WebkitTextStroke: '1px #00d4ff' }}>ASCENT</span>
          </h2>
          <p className="font-mono text-sm text-arena-gray-light">
            EVERY MILESTONE. EVERY LEVEL-UP. DOCUMENTED.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-0 bottom-0 w-px origin-top"
            style={{
              background: 'linear-gradient(180deg, #00d4ff, #ff2233, #00d4ff)',
              transform: 'translateX(-50%)',
            }}
          />

          {/* Events */}
          <div className="pt-4">
            {events.map((event, i) => (
              <TimelineEvent key={i} event={event} index={i} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Timeline

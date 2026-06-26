import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const MagneticButton = ({ children, className = '', style = {}, onClick, strength = 0.4 }) => {
  const ref = useRef()
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength
    setPosition({ x: dx, y: dy })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

export default MagneticButton

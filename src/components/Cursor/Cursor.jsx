import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const Cursor = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const trailX = useSpring(mouseX, { stiffness: 200, damping: 25, mass: 0.5 })
  const trailY = useSpring(mouseY, { stiffness: 200, damping: 25, mass: 0.5 })

  useEffect(() => {
    const updatePosition = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleLeave = () => setIsVisible(false)
    const handleEnter = () => setIsVisible(true)

    const handleOver = (e) => {
      if (e.target.closest('a, button, [data-cursor="hover"]')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }
    const handleDown = () => setIsClicking(true)
    const handleUp = () => setIsClicking(false)

    window.addEventListener('mousemove', updatePosition, { passive: true })
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)
    window.addEventListener('mouseover', handleOver)
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
      window.removeEventListener('mouseover', handleOver)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div
          className={`rounded-full border transition-all duration-200 ${
            isHovering
              ? 'border-arena-red w-14 h-14 border-2'
              : 'border-arena-blue w-10 h-10'
          } ${isClicking ? 'scale-75' : 'scale-100'}`}
          style={{
            boxShadow: isHovering
              ? '0 0 15px #ff2233, 0 0 30px #ff223344'
              : '0 0 10px #00d4ff44',
            transition: 'width 0.2s, height 0.2s, border-color 0.2s, border-width 0.2s, transform 0.15s, box-shadow 0.2s',
          }}
        />
      </motion.div>

      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full transition-colors duration-150 ${
            isHovering ? 'bg-arena-red' : 'bg-arena-blue'
          }`}
          style={{
            boxShadow: isHovering
              ? '0 0 8px #ff2233'
              : '0 0 8px #00d4ff',
          }}
        />
      </motion.div>
    </>
  )
}

export default Cursor

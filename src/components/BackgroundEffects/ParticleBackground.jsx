import React, { useEffect, useRef } from 'react'

const ParticleBackground = () => {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight

    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 25 : 60
    const maxDist = isMobile ? 80 : 120
    const maxDistSq = maxDist * maxDist

    const particles = Array.from({ length: particleCount }, () => {
      const color = Math.random() > 0.7 ? '#ff2233' : '#00d4ff'
      const opacity = Math.random() * 0.4 + 0.1
      const opacityHex = Math.floor(opacity * 255).toString(16).padStart(2, '0')
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.2,
        fillStyle: color + opacityHex,
      }
    })

    let animId
    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.fillStyle
        ctx.fill()
      })

      // Draw lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distSq = dx * dx + dy * dy
          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq)
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(0,212,255,${(1 - dist / maxDist) * 0.08})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
    />
  )
}

export default ParticleBackground

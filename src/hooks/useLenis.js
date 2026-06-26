import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    let active = true
    function raf(time) {
      if (!active) return
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      active = false
      lenis.destroy()
    }
  }, [])
}

export default useLenis

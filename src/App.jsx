import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import Loader from './components/Loader/Loader'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import AthleteProfile from './components/AthleteProfile/AthleteProfile'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Timeline from './components/Timeline/Timeline'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Cursor from './components/Cursor/Cursor'
import ParticleBackground from './components/BackgroundEffects/ParticleBackground'
import useLenis from './hooks/useLenis'

function App() {
  const [loaded, setLoaded] = useState(false)

  useLenis()

  return (
    <>
      {/* Custom cursor */}
      <Cursor />

      {/* Boot loader */}
      <AnimatePresence>
        {!loaded && (
          <Loader onComplete={() => setLoaded(true)} />
        )}
      </AnimatePresence>

      {/* Main site */}
      {loaded && (
        <>
          {/* Ambient particle network */}
          <ParticleBackground />

          <div className="relative z-10">
            <Navbar />
            <main>
              <Hero />
              <AthleteProfile />
              <Skills />
              <Projects />
              <Timeline />
              <Contact />
            </main>
            <Footer />
          </div>
        </>
      )}
    </>
  )
}

export default App

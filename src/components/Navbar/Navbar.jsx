import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'PROFILE', href: '#profile' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'TIMELINE', href: '#timeline' },
  { label: 'CONTACT', href: '#contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    setActive(href)
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          scrolled
            ? 'bg-arena-black bg-opacity-95 border-b border-arena-gray'
            : 'bg-transparent'
        }`}
        style={{
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center gap-3 no-underline group"
            whileHover={{ scale: 1.02 }}
          >
            <div
              className="w-8 h-8 flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #00d4ff22, #00d4ff44)',
                border: '1px solid #00d4ff',
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
              }}
            >
              <span className="font-display text-arena-blue text-sm">SK</span>
            </div>
            <span className="font-display text-arena-white text-xl tracking-widest group-hover:text-arena-blue transition-colors duration-200">
              SAHIL KHAN
            </span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNav(e, item.href)}
                className="relative font-mono text-xs tracking-widest transition-colors duration-200 group no-underline"
                style={{ color: active === item.href ? '#00d4ff' : '#888888' }}
              >
                {item.label}
                <span
                  className="absolute -bottom-1 left-0 h-px bg-arena-blue transition-all duration-300"
                  style={{ width: active === item.href ? '100%' : '0%' }}
                />
                <span className="absolute -bottom-1 left-0 h-px bg-arena-blue w-0 group-hover:w-full transition-all duration-300" />
              </a>
            ))}

            <motion.a
              href="#contact"
              onClick={(e) => handleNav(e, '#contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-mono text-xs tracking-widest text-arena-black bg-arena-blue px-5 py-2 no-underline transition-all duration-200 hover:bg-arena-red"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
              }}
            >
              HIRE ME
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-arena-blue"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-4 h-px bg-arena-blue"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-arena-blue"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[999] bg-arena-black bg-opacity-98 flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNav(e, item.href)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="font-display text-5xl text-arena-white hover:text-arena-blue transition-colors duration-200 no-underline tracking-widest"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar

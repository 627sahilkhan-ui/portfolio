import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiSend, FiMail, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import SectionWrapper from '../../layouts/SectionWrapper'
import { staggerContainer, fadeUpVariant } from '../../animations/variants'

const InputField = ({ label, type = 'text', name, placeholder, multiline = false }) => {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')

  const baseStyle = {
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${focused ? '#00d4ff' : 'rgba(255,255,255,0.1)'}`,
    color: '#e8e8e8',
    padding: '12px 0',
    width: '100%',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '13px',
    letterSpacing: '0.05em',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    resize: 'none',
  }

  return (
    <div className="relative group">
      <label
        className="block font-mono text-[10px] tracking-[0.4em] mb-2 transition-colors duration-300"
        style={{ color: focused ? '#00d4ff' : '#555' }}
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={5}
          style={{ ...baseStyle, paddingTop: '8px' }}
          className="placeholder-arena-gray block w-full"
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={baseStyle}
          className="placeholder-arena-gray block w-full"
        />
      )}

      {/* Underline glow */}
      <motion.div
        animate={{ width: focused ? '100%' : '0%' }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 h-px"
        style={{
          background: '#00d4ff',
          boxShadow: '0 0 8px #00d4ff',
        }}
      />
    </div>
  )
}

const socials = [
  { icon: FiGithub, label: 'GITHUB', href: '#' },
  { icon: FiLinkedin, label: 'LINKEDIN', href: '#' },
  { icon: FiTwitter, label: 'TWITTER', href: '#' },
  { icon: FiMail, label: 'EMAIL', href: 'mailto:sahil@arena.dev' },
]

const Contact = () => {
  const ref = useRef()
  const isInView = useInView(ref, { once: true })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
    }, 1800)
  }

  return (
    <SectionWrapper id="contact" label="TRANSMISSION CENTER" number="05" dark>
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Left: info */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUpVariant}>
            <h2 className="font-display text-6xl md:text-8xl leading-none mb-4"
              style={{ letterSpacing: '0.05em' }}
            >
              <span className="text-arena-white">LET'S</span><br />
              <span style={{ color: 'transparent', WebkitTextStroke: '1px #00d4ff' }}>
                CONNECT
              </span>
            </h2>
          </motion.div>

          <motion.p variants={fadeUpVariant}
            className="font-mono text-sm text-arena-gray-light leading-relaxed max-w-sm mb-12"
          >
            Ready to build something that breaks barriers? Send a transmission and I'll respond within 24 hours.
          </motion.p>

          {/* Contact details */}
          <motion.div variants={fadeUpVariant} className="space-y-4 mb-12">
            <div className="flex items-center gap-4"
              style={{ borderLeft: '2px solid #00d4ff', paddingLeft: '16px' }}
            >
              <div>
                <div className="font-mono text-[10px] tracking-widest text-arena-gray-light">EMAIL</div>
                <div className="font-mono text-sm text-arena-white">sahil@arena.dev</div>
              </div>
            </div>
            <div className="flex items-center gap-4"
              style={{ borderLeft: '2px solid #ff2233', paddingLeft: '16px' }}
            >
              <div>
                <div className="font-mono text-[10px] tracking-widest text-arena-gray-light">RESPONSE TIME</div>
                <div className="font-mono text-sm text-arena-white">{'< 24 HOURS'}</div>
              </div>
            </div>
          </motion.div>

          {/* Socials */}
          <motion.div variants={fadeUpVariant} className="flex gap-4">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                className="group flex flex-col items-center gap-2 no-underline"
                data-cursor="hover"
              >
                <div
                  className="w-12 h-12 flex items-center justify-center transition-all duration-300"
                  style={{
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <Icon size={18} className="text-arena-gray-light group-hover:text-arena-blue transition-colors duration-300" />
                </div>
                <span className="font-mono text-[9px] tracking-widest text-arena-gray group-hover:text-arena-blue transition-colors duration-300">
                  {label}
                </span>
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div
            className="p-8 carbon-texture hud-corner relative"
            style={{
              border: '1px solid rgba(0,212,255,0.15)',
              borderLeft: '3px solid #00d4ff',
            }}
          >
            <div className="font-mono text-xs tracking-[0.4em] text-arena-blue mb-8">
              INITIATE TRANSMISSION
            </div>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center"
              >
                <div className="font-display text-4xl text-arena-blue mb-3 text-glow-blue">
                  TRANSMISSION SENT
                </div>
                <div className="font-mono text-xs text-arena-gray-light tracking-widest">
                  RESPONSE INBOUND WITHIN 24HRS
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <InputField
                  label="IDENTIFIER / NAME"
                  name="name"
                  placeholder="Your name"
                />
                <InputField
                  label="TRANSMISSION ADDRESS"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                />
                <InputField
                  label="SUBJECT LINE"
                  name="subject"
                  placeholder="Project brief / Collaboration / ..."
                />
                <InputField
                  label="MESSAGE PAYLOAD"
                  name="message"
                  placeholder="Describe your mission..."
                  multiline
                />

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={!sending ? { scale: 1.02 } : {}}
                  whileTap={!sending ? { scale: 0.98 } : {}}
                  className="w-full flex items-center justify-center gap-3 font-display text-xl tracking-widest py-4 transition-all duration-300"
                  style={{
                    background: sending ? 'rgba(0,212,255,0.2)' : '#00d4ff',
                    color: sending ? '#00d4ff' : '#050505',
                    border: `1px solid #00d4ff`,
                    clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                    cursor: sending ? 'not-allowed' : 'pointer',
                  }}
                >
                  {sending ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border border-arena-blue border-t-transparent rounded-full"
                      />
                      TRANSMITTING...
                    </>
                  ) : (
                    <>
                      <FiSend size={16} />
                      SEND TRANSMISSION
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

export default Contact

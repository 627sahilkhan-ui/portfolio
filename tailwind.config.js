/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'arena-black': '#050505',
        'arena-dark': '#0a0a0a',
        'arena-surface': '#111111',
        'arena-blue': '#00d4ff',
        'arena-blue-dim': '#0088aa',
        'arena-red': '#ff2233',
        'arena-red-dim': '#aa1122',
        'arena-gold': '#ffaa00',
        'arena-white': '#e8e8e8',
        'arena-gray': '#333333',
        'arena-gray-light': '#666666',
      },
      fontFamily: {
        'display': ['Bebas Neue', 'Impact', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Courier New', 'monospace'],
        'body': ['Inter', 'sans-serif'],
      },
      animation: {
        'scan': 'scan 3s linear infinite',
        'pulse-blue': 'pulse-blue 2s ease-in-out infinite',
        'flicker': 'flicker 0.15s infinite',
        'slide-in': 'slideIn 0.5s ease forwards',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'pulse-blue': {
          '0%, 100%': { boxShadow: '0 0 5px #00d4ff, 0 0 20px #00d4ff33' },
          '50%': { boxShadow: '0 0 20px #00d4ff, 0 0 60px #00d4ff66' },
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#60a5fa',
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
        },
        background: {
          light: '#eef6ff',
          lighter: '#f8faff',
          dark: '#0a1428',
          darker: '#061020',
          darkest: '#030a16',
          glow: '#60a5fa15',
          nightglow: '#3b82f630'
        },
        text: {
          light: '#1f2937',
          dark: '#f3f4f6',
        }
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'night': "url('/src/assets/images/night-bg.jpg')",
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} 
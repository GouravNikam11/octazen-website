/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f0fe', 100: '#c9d9fd', 200: '#93b4fb',
          300: '#5c8ef9', 400: '#2d6af7', 500: '#1a4fa0',
          600: '#1440832', 700: '#0d3266', 800: '#0b2450',
          900: '#0a1b3d', 950: '#060d1f',
        },
        cyan: {
          400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2',
        },
        brand: {
          navy: '#0a1b3d',
          blue: '#1a4fa0',
          cyan: '#00b4d8',
          light: '#e8f4fd',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #0a1b3d 0%, #1a4fa0 50%, #00b4d8 100%)',
        'gradient-dark': 'linear-gradient(180deg, #060d1f 0%, #0a1b3d 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(26,79,160,0.1) 0%, rgba(0,180,216,0.05) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(30px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px)' } },
        'gradient-x': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
      },
      boxShadow: {
        'glow-blue': '0 0 30px rgba(26, 79, 160, 0.4)',
        'glow-cyan': '0 0 30px rgba(0, 180, 216, 0.3)',
        'card': '0 4px 40px rgba(0, 0, 0, 0.12)',
        'card-hover': '0 8px 60px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};

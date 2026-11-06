/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fbf2ed',
          100: '#f4dfd3',
          200: '#ebc3ad',
          300: '#e2a786',
          400: '#dc946e',
          500: '#d98760',
          600: '#bb6946',
          700: '#965139',
          accent: '#eab98c',
          indigo: '#9b8c7b',
          glow: 'rgba(217, 135, 96, 0.15)',
        },
        dark: {
          950: '#171814',
          900: '#20211C',
          850: '#292A24',
          800: '#30312A',
          750: '#393A32',
          700: '#48493F',
          border: 'rgba(244, 239, 225, 0.11)',
          'border-light': 'rgba(244, 239, 225, 0.18)',
          'border-brand': 'rgba(217, 135, 96, 0.42)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'glow-sm': '0 0 20px -5px rgba(217, 135, 96, 0.24)',
        'glow-md': '0 0 35px -5px rgba(217, 135, 96, 0.28)',
        'glow-lg': '0 0 60px -10px rgba(217, 135, 96, 0.3)',
        'inner-glow': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
      }
    },
  },
  plugins: [],
}

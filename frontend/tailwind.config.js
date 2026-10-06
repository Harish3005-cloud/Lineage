/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f0f1f4',
          100: '#d9dce4',
          200: '#b3b8c8',
          300: '#8d93ab',
          400: '#676f8f',
          500: '#4a5275',
          600: '#3a4160',
          700: '#2a304b',
          800: '#1a1f36',
          900: '#0f1220',
          950: '#080a14',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        warm: {
          50: '#faf9f7',
          100: '#f5f3ef',
          200: '#ece8e1',
          300: '#ddd7cc',
          400: '#c4baa8',
        },
        surface: {
          light: '#ffffff',
          dark: '#1a1f2e',
          'dark-elevated': '#232838',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      fontSize: {
        'eyebrow': ['0.6875rem', { letterSpacing: '0.08em', fontWeight: '600' }],
      },
      borderColor: {
        DEFAULT: 'var(--border)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 1. SUPER SONIC (Pantone 18-4143 TCX - Accent / Action)
        supersonic: {
          DEFAULT: '#0066ff',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          500: '#0066ff',
          600: '#0052cc',
          700: '#0040a3',
          800: '#1e40af',
        },
        // 2. ETHEREAL GREEN (Pantone 11-0609 TCX - Dominant Neutral / Background)
        ethereal: {
          DEFAULT: '#f4fbf7',
          bg: '#f4fbf7',
          surface: '#ffffff',
          accent: '#00c9a7',
          badge: '#d1fae5',
          50: '#f4fbf7',
          100: '#e2f7ed',
          200: '#bbf2d9',
          500: '#00c9a7',
          600: '#00a387',
          700: '#007d67',
        },
        // 3. SURF THE WEB (Pantone 19-3952 TCX - Deep Structure / Headings / Dark Mode)
        surftheweb: {
          DEFAULT: '#192744',
          light: '#24355a',
          dark: '#0f172a',
          500: '#192744',
          600: '#142038',
          700: '#0f172a',
          800: '#0b1120',
          900: '#070b14',
          950: '#04070d',
        },
        ink: {
          50: '#f0f1f4',
          100: '#d9dce4',
          200: '#b3b8c8',
          300: '#8d93ab',
          400: '#676f8f',
          500: '#4a5275',
          600: '#3a4160',
          700: '#2a304b',
          800: '#192744',
          900: '#0f172a',
          950: '#04070d',
        },
        teal: {
          50: '#f4fbf7',
          100: '#e2f7ed',
          200: '#bbf2d9',
          500: '#00c9a7',
          600: '#00a387',
          700: '#007d67',
        },
      },
      fontFamily: {
        sans: ['"Inter"', '"Manrope"', 'system-ui', '-apple-system', 'sans-serif'],
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

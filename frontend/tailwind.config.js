/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // PRIMARY: Light Blue (Soft, Calm, Modern)
        primary: {
          50: '#f8fbff',
          100: '#f0f7ff',
          200: '#e1efff',
          300: '#cde5ff',
          400: '#9ecbff',
          500: '#7db3ff',  // Main brand color - light blue
          600: '#5a9bff',
          700: '#4a86e6',
          800: '#3d6fd4',
          900: '#2d4a8f',
        },
        // SECONDARY: Soft Sky Blue (Complementary light touch)
        secondary: {
          50: '#f5fafe',
          100: '#ecf4fd',
          200: '#d9e9fc',
          300: '#c5defa',
          400: '#a8cff7',
          500: '#8bc1f5',  // Secondary brand color - sky blue
          600: '#6ab5ea',
          700: '#5aa3d8',
          800: '#4a8cc4',
          900: '#3a6b9e',
        },
        // NEUTRAL: Warm Off-White & Light Grays
        neutral: {
          50: '#faf9f7',
          100: '#f5f4f1',
          150: '#f0ede8',
          200: '#ebe8e3',
          300: '#ddd8d0',
          400: '#c4bbb0',
          500: '#a89d90',
          600: '#8b8178',
          700: '#6f6559',
          800: '#54493f',
          900: '#3d3428',
          950: '#2a2220',
        },
        // STATUS COLORS
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        },
        info: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          600: '#0284c7',
        },
      },
      spacing: {
        xs: '0.5rem',    // 8px
        sm: '1rem',      // 16px
        md: '1.5rem',    // 24px
        lg: '2.5rem',    // 40px
        xl: '5rem',      // 80px
      },
      borderRadius: {
        DEFAULT: '0.875rem',  // 14px
        lg: '1.25rem',        // 20px
        xl: '1.75rem',        // 28px
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0, 0, 0, 0.06)',
        hover: '0 20px 60px rgba(0, 0, 0, 0.12)',
        card: '0 4px 12px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      maxWidth: {
        'container': '1100px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-40px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(40px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Purple Rain Color Palette
        purple: {
          'rain-deep': '#2D1B69',
          'rain-shadow': '#1A0E3D', 
          'rain-accent': '#4A2C7A',
          'rain-mist': '#6B4C9F',
          'royal': '#800080',
          'deep': '#4B0082',
          'soft': '#9370DB',
          'light': '#DDA0DD'
        },
        album: {
          'black': '#0F0A1A',
          'charcoal': '#1C1429',
          'midnight': '#262038',
          'shadow': '#322947'
        },
        cream: {
          'soft': '#F4F1E8',
          'warm': '#E8E2D5',
          'muted': '#D4CFC4'
        },
        paisley: {
          'gold': '#B8860B',
          'rose': '#8B6F7D',
          'sage': '#6B7B5F'
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'neural-pulse': 'neural-pulse 3s ease-in-out infinite',
        'mirror-shimmer': 'mirror-shimmer 8s ease-in-out infinite',
        'paisley-flow': 'paisley-flow 30s linear infinite',
        'gradient-shift': 'gradient-shift 6s ease-in-out infinite'
      },
      keyframes: {
        'neural-pulse': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' }
        },
        'mirror-shimmer': {
          '0%': { opacity: '0.1', transform: 'translateX(-100%)' },
          '50%': { opacity: '0.3', transform: 'translateX(0%)' },
          '100%': { opacity: '0.1', transform: 'translateX(100%)' }
        },
        'paisley-flow': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(90deg) scale(1.1)' },
          '50%': { transform: 'rotate(180deg) scale(1)' },
          '75%': { transform: 'rotate(270deg) scale(0.9)' },
          '100%': { transform: 'rotate(360deg) scale(1)' }
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        }
      },
      backgroundImage: {
        'neural-network': `
          radial-gradient(circle at 15% 25%, rgba(147, 51, 234, 0.3) 3px, transparent 4px),
          radial-gradient(circle at 85% 20%, rgba(59, 130, 246, 0.3) 3px, transparent 4px),
          radial-gradient(circle at 70% 60%, rgba(236, 72, 153, 0.3) 2px, transparent 3px)
        `,
        'purple-gradient': 'linear-gradient(135deg, #2D1B69 0%, #4A2C7A 50%, #6B4C9F 100%)',
        'mirror-gradient': 'linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)'
      }
    },
  },
  plugins: [],
}
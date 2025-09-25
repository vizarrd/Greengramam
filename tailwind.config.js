/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2E7D32',
        secondary: '#8BC34A',
        accent: '#FFC107',
        sky: '#4FC3F7',
        earth: '#795548',
        background: '#F9FAF5',
        surface: '#FFFFFF',
        text: '#2E2E2E',
        muted: '#9E9E9E',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'sm': '0.375rem',
        'md': '0.75rem',
        'lg': '1.5rem',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
      },
      animation: {
        'gentle-bounce': 'gentle-bounce 2s ease-in-out infinite',
        'grow': 'grow 3s ease-in-out infinite',
      },
      boxShadow: {
        'card': '0 4px 10px rgba(0,0,0,0.08)',
        'hover': '0 6px 14px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        forest: {
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
      },
      boxShadow: {
        premium: '0 25px 50px -12px rgba(15, 23, 42, 0.12)',
        'premium-lg': '0 32px 64px -16px rgba(15, 23, 42, 0.18)',
      },
      fontFamily: {
        display: ['"DM Sans"', 'system-ui', 'sans-serif'],
        body: ['"Nunito"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

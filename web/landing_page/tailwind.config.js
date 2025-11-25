/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        'paper': '#F9FAFB',
        'ink': '#111827',
        'highlight': '#FDE047',
      },
      backgroundImage: {
        'marker': 'linear-gradient(120deg, #FDE047 0%, #FDE047 100%)',
      }
    },
  },
  plugins: [],
}


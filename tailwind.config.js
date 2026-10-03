/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#E5A93C',
          'gold-hover': '#cf952e',
          'gold-light': '#FDF3E7',
          navy: '#091522',
          'navy-light': '#102235',
          'navy-dark': '#060E18',
          slate: '#1E293B',
          gray: '#64748B',
          bg: '#F4F6F9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        oserif: ['"Open Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

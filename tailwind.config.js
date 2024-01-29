/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{header:"#110ba1"},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

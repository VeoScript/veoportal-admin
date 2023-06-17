/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        "accent-1": "#FEF27A",
        "accent-2": "#CCCCCC",
        "accent-3": "#242529",
        "accent-4": "#36383E",
      },
      fontFamily: {
        "poppins": "Poppins"
      }
    },
  },
  plugins: [],
}


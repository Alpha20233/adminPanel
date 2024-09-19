/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  // important: true,
  corePlugins: {
    preflight: false, // Disables Tailwind’s base resets
  },  
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        text:{
          100:'#6D849F'
        },
        stroke:{
          100:'#CEDAE9'
        },
        graies: {
          100: "#EBF1F9",
        },
        azure: {
          50: "#EFF5FF",
          100: "#DBE8FE",
          200: "#BFD7FE",
          300: "#93BBFD",
          400: "#609AFA",
          500: "#3B82F6",
          600: "#2570EB",
          700: "#1D64D8",
          800: "#1E55AF",
          900: "#1E478A",
          950: "#172E54",
        },
      },
    },
  },
  plugins: [],
} 
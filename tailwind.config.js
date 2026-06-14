/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#F5F2E9",
        charcoal: "#2A1B18",
        gold: "#D4AF37",
        antique: "#C69214",
        brown: "#4A3E3D"
      },
      fontFamily: {
        serif: ["Lora", "Georgia", "serif"]
      }
    },
  },
  plugins: [],
}

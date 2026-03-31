/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "glow-primary": "#5C3A21",
        "glow-secondary": "#7D5A44",
        "glow-accent": "#A5846E",
        "glow-background": "#FBF6F3",
        brand: "#FBF6F3",
        "brand-dark": "#5C3A21",
        "brand-brown": "#7D5A44",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};

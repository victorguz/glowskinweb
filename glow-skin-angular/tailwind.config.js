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
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

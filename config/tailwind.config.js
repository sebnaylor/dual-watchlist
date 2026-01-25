/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./public/*.html",
    "./app/helpers/**/*.rb",
    "./app/javascript/**/*.{js,jsx,ts,tsx}",
    "./app/views/**/*.{erb,haml,html,slim}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        mxl: "1100px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        backgroundBlack: "#1F1E20",
        darkPurple: "#2c2638",
        brand: {
          dark: "#1F1E20",
          purple: "#2c2638",
          accent: "#f05542",
          primary: "rgb(55 48 163)",
          muted: "#b8b7ad",
        },
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        titleFont: ["IBM Plex Mono", "monospace"],
      },
      height: {
        "media-backdrop": "200px",
        "media-hero": "500px",
        "media-hero-lg": "600px",
      },
      width: {
        "media-poster": "500px",
      },
    },
  },
  plugins: [],
};

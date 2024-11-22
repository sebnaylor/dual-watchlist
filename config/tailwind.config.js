/** @type {import('tailwindcss').Config} */
module.exports = {
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
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"], // Add the Google Font here
      },
    },
  },
  plugins: [],
};

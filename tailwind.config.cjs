/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: ".5rem",
        xl: "6rem",
      },
    },
    extend: {},
  },
  darkMode: "class",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        urdu: ['"Noto Nastaliq Urdu"', "serif"],
      },
      colors: {
        brand: {
          brown: "#8b5e3c",
          light: "#d4a373",
          cream: "#faf6f0",
          dark: "#2c1810",
          muted: "#5a4a3a",
        },
      },
      transitionProperty: {
        width: "width",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: "Inter",
        jost: "Jost",
      },
    },
    container: {
      padding: "2rem",
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: "light",
  },
  theme: {
    extend: {},
  },
  /*global require*/
  /*eslint no-undef: "error"*/
  plugins: [
    require("daisyui"), 
  ],
};

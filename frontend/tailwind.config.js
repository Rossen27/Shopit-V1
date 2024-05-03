const { nextui } = require("@nextui-org/react");


/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  // daisyui: {
  //   themes: ["light", "dark"],
  // },
  theme: {
    extend: {},
  },
  darkMode: "media", // or 'media' or 'class'
  /*global require*/
  /*eslint no-undef: "error"*/
  plugins: [
    nextui(),
    // require("@tailwindcss/typography"),
    // // require("daisyui"),
    // require("@tailwindcss/forms"),
    // require("@nextui-org/react/tailwind"),
  ],
};

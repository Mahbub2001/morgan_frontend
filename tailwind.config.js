/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    screens: {
      sm: "600px", // Custom small screen
      md: "768px", // Default medium screen
      lg: "1024px", // Default large screen
      xl: "1280px", // Default extra-large screen
      "2xl": "1440px", // Custom breakpoint for very large screens
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    require('tailwind-scrollbar')
    // ({
    //   charts:true,
    // }),
  ],
};

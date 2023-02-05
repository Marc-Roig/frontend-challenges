/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require("tailwindcss/colors");
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // fontFamily: {
      //   sans: ["var(--font-sans)", ...fontFamily.sans],
      // },
      colors: {
        text: colors.white,
        subtleText: colors.slate["400"],
        border: colors.slate["700"],
        surface: {
          background: colors.slate["900"],
          container: colors.slate["800"],
          content: colors.slate["700"],
          highlight: colors.slate["600"],
        },
        primary: {
          ...colors.sky,
          DEFAULT: colors.sky["600"],
          light: colors.sky["500"],
          dark: colors.sky["700"],
          darker: colors.sky["800"],
        },
        error: "#E35E54",
        ...colors.colors,
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

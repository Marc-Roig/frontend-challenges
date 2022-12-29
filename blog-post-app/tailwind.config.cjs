/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require("tailwindcss/colors");
const { fontFamily } = require("tailwindcss/defaultTheme");

/**
 * PALETES: https://www.schemecolor.com/powerful-black-and-white-color-palette.php
 *          https://www.schemecolor.com/pastel-red-grays-blacks.php
 * https://web.dev/building-a-color-scheme/
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", ...fontFamily.sans],
      },
      colors: {
        brand: {
          primary: "var(--brand)",
          text: "var(--text1)",
          subtleText: "var(--text2)",
          border: "var(--border)",
          borderFocus: "var(--border-focus)",
        },
        surface: {
          background: "var(--surface-background)",
          container: "var(--surface-container)",
          content: "var(--surface-content)",
          highlight: "var(--surface-highlight)",
        },
        primary: {
          ...colors.violet,
          DEFAULT: colors.violet["600"],
          light: colors.violet["500"],
          dark: colors.violet["700"],
          darker: colors.violet["800"],
        },
        error: "#E35E54",
        ...colors.colors,
      },
      keyframes: {
        like: {
          "0%, 100%": { transform: "scale(1)" },
          "25%, 75%": { transform: "scale(1.1)" },
        },
        bounceSlow: {
          "0%, 100%": {
            transform: "translateY(-2%)",
            "animation-timing-function": "linear",
          },
          "50%": { transform: "none", "animation-timing-function": "linear" },
        },
      },
      animation: {
        like: "like 1s .1s",
        bounceSlow: "bounceSlow 4s infinite",
      },
      backgroundImage: {
        dotted:
          "radial-gradient(var(--surface-highlight) 1px, transparent 1px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

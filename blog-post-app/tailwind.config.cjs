/* eslint-disable @typescript-eslint/no-var-requires */
const { colors } = require("tailwindcss/colors");
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
          primaryLight: "var(--brand-light)",
          text: "var(--text1)",
          subtleText: "var(--text2)",
          surface1: "var(--surface1)",
          surface2: "var(--surface2)",
          surface3: "var(--surface3)",
          surface4: "var(--surface4)",
          border: "var(--border)",
          borderFocus: "var(--border-focus)",
        },
        surface: {
          background: "var(--surface1)",
          container: "var(--surface2)",
          content: "var(--surface3)",
          highlight: "var(--surface4)",
        },
        accent: {
          secondary: "#6246ea",
          secondaryLight: "#7c5dfa",
          secondaryDark: "#4c3dd9",
          tertiary: "#e45858",
          tertiaryLight: "#f66a6a",
          tertiaryDark: "#c34545",
        },
        ...colors,
        error: "#E35E54",
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
        dotted: "radial-gradient(var(--brand) 1px, transparent 1px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

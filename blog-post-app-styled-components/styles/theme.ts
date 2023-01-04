import { DefaultTheme } from "styled-components";

// https://maketintsandshades.com/#1a1a1a
const theme: DefaultTheme = {
  colors: {
    primary: {
      100: "#1a1a1a",
      200: "#151515",
      300: "#101010",
      400: "#0a0a0a",
      500: "#050505",
      600: "#000000",
      700: "#000000",
      800: "#000000",
    },
    secondary: {
      100: "#ffffff",
      200: "#fbfcfd",
      300: "#f5f8fb",
      400: "#f1f5f9",
      500: "#a9acae",
      600: "#606264",
      700: "#303132",
      800: "#181819",
    },
  },
  fontSizes: {
    xs: "0.6rem",
    sm: "0.8rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },
  fontWeight: {
    normal: 400,
    bold: 700,
  },
  breakpoints: {
    xs: "480px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    xxl: "1536px",
  },
  radius: {
    xs: "0.0625rem",
    sm: "0.125rem",
    md: "0.25rem",
    lg: "0.5rem",
    xl: "1rem",
    xxl: "2rem",
  },
  shadows: {
    xs: "0 1px 1px 0 rgba(0, 0, 0, 0.05)",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    lg: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    xl: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xxl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
};

export default theme;

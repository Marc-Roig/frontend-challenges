import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*,
*::before,
*::after {
  box-sizing: border-box;
}
:root {
  font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  color-scheme: light;
  color: rgb(0, 0, 0);
  background-color: #ffffff;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  padding: 2rem;
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;

}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
  letter-spacing: -0.05em;
  margin: 0;
}

p {
  margin: 0;
  padding: 0;
}

a {
  text-decoration-line: underline;
  text-underline-offset: 4px;
  cursor: pointer;
}

`;
export default GlobalStyle;

import type { AppProps } from "next/app";
import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/globalStyles";
import theme from "../styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

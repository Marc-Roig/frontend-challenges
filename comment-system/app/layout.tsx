"use client";

/* eslint-disable @next/next/no-head-element */
import React from "react";
import GlobalStyle from "../styles/globalStyles";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

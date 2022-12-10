// styled.d.ts
import "styled-components";

interface IPalette {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
}

interface ISizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: IPalette;
      secondary: IPalette;
    };
    fontWeight: {
      normal: number;
      bold: number;
    };
    fontSizes: ISizes;
    breakpoints: ISizes;
    radius: ISizes;
    shadows: ISizes;
  }
}

// export const theme = {
//   PRIMARY_COLOR: "#0474ED",
//   FOREGROUND: "#FFFFFF",
//   TEXT_COLOR: "#FFFFFF",
//   FOREGROUND2: "#D5D9EB",
//   FOREGROUND3: "#A2A5B2",
//   BACKGROUND: "#191923",
//   ACCENT: "#2E2E3D",
//   ACCENT2: "#4C5266",
//   ACCENT3: "#787978",
// };

import Color from "color";
import { DefaultTheme as DefaultThemeProps } from "styled-components";

export enum Font {
  EuclidLight = "Euclid-Light",
  EuclidMedium = "Euclid-Medium",
  EuclidBold = "Euclid-Bold",
  EuclidSemiBold = "Euclid-SemiBold",
  EuclidExtraBold = "Euclid-ExtraBold",
  EuclidRegular = "Euclid-Regular",
}
export const DefaultConfigs = {
  typography: {
    fontFamily: {
      light: Font.EuclidLight,
      medium: Font.EuclidMedium,
      regular: Font.EuclidRegular,
      semiBold: Font.EuclidSemiBold,
      bold: Font.EuclidBold,
      extraBold: Font.EuclidExtraBold,
    },
    sizes: {
      h1: {
        size: 38,
        lineHeight: 44,
      },
      h2: {
        size: 32,
        lineHeight: 36,
      },
      h3: {
        size: 24,
        lineHeight: 30,
      },
      large: {
        size: 18,
        lineHeight: 26,
      },
      regular: {
        size: 16,
        lineHeight: 18,
      },
      small: {
        size: 14,
        lineHeight: 20,
      },
    },
  },
};

export const DarkTheme: DefaultThemeProps = {
  ...DefaultConfigs,
  dark: true,
  colors: {
    primary: "#5F55FE",
    text: "#D5D9EB",
    secondaryText: "#DDD9EB",
    secondaryText2: Color("#D5D9EB").fade(0.5).rgb().string(),
    background: "#181820",
    secondaryBackground: "#21212b",
    // secondaryBackground: "#111214",
    border: "#696464",
    red: "#ff0000",
    green: "#00ff00",
  },
};

export const LightTheme: DefaultThemeProps = {
  ...DefaultConfigs,
  dark: false,
  colors: {
    primary: "#5F55FE",
    text: "#3e4857",
    secondaryText: "#4C5266",
    secondaryText2: Color("#4C5266").fade(0.5).rgb().string(),
    background: "#ffffff",
    secondaryBackground: "#f5f6f8",
    border: "#f2f2f2",
    red: "#ff0000",
    green: "#00ff00",
  },
};

export const DefaultTheme = LightTheme;

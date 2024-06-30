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
  UrbanistLight = "Urbanist-Light",
  UrbanistMedium = "Urbanist-Medium",
  UrbanistBold = "Urbanist-Bold",
  UrbanistSemiBold = "Urbanist-SemiBold",
  UrbanistExtraBold = "Urbanist-ExtraBold",
  UrbanistRegular = "Urbanist-Regular",
}
export const DefaultConfigs = {
  typography: {
    fontFamily: {
      light: Font.UrbanistLight,
      medium: Font.UrbanistMedium,
      regular: Font.UrbanistRegular,
      semiBold: Font.UrbanistSemiBold,
      bold: Font.UrbanistBold,
      extraBold: Font.UrbanistExtraBold,
    },
    sizes: {
      h1: {
        size: 34,
        lineHeight: 44,
      },
      h2: {
        size: 28,
        lineHeight: 36,
      },
      h3: {
        size: 20,
        lineHeight: 28,
      },
      large: {
        size: 16,
        lineHeight: 24,
      },
      regular: {
        size: 12,
        lineHeight: 18,
      },
      small: {
        size: 10,
        lineHeight: 12,
      },
    },
  },
};

export const DarkTheme: DefaultThemeProps = {
  ...DefaultConfigs,
  dark: true,
  colors: {
    primary: "#5F55FE",
    secondary: "#ff1a40",
    text: "#D5D9EB",
    secondaryText: Color("#D5D9EB").fade(0.3).rgb().string(),
    secondaryText2: Color("#D5D9EB").fade(0.5).rgb().string(),
    background: "#181820",
    secondaryBackground: "#21212b",
    tertiaryBackground: "",
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
    secondary: "#ff1a40",
    text: "#3e4857",
    secondaryText: "#696464",
    secondaryText2: Color("#696464").fade(0.5).rgb().string(),
    background: "#ffffff",
    secondaryBackground: "#ececec",
    tertiaryBackground: "",
    border: "#f2f2f2",
    red: "#ff0000",
    green: "#00ff00",
  },
};

export const DefaultTheme = LightTheme;

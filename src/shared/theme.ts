import { config as DefaultConfig, IConfig } from "@gluestack-ui/config";
import { createConfig } from "@gluestack-ui/themed";
export const theme = {
  // PRIMARY_COLOR: "#0474ED",
  PRIMARY_COLOR: "#C5F277",
  FOREGROUND: "#F2F2F2",
  TEXT_COLOR: "#F2F2F2",
  FOREGROUND2: "#D5D9EB",
  FOREGROUND3: "#A2A5B2",
  BACKGROUND: "#191923",
  ACCENT: "#2E2E3D",
  ACCENT2: "#4C5266",
  ACCENT3: "#787978",
};

export const glueStackConfig: IConfig = createConfig({
  ...DefaultConfig,
  tokens: {
    colors: {
      ...DefaultConfig.tokens.colors,
      primary0: "#ffffff",
      primary50: "#a3fff4",
      primary100: "#82fff0",
      primary200: "#61ffed",
      primary300: "#45fae5",
      primary400: "#24f9e1",
      primary500: "#17f3d9",
      primary600: "#12e4cb",
      primary700: "#17ccb7",
      primary800: "#1ab5a3",
      primary900: "#1c9f90",
      primary950: "#000000",
    },
  },
});

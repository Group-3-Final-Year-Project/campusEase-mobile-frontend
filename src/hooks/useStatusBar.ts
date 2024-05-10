import { theme } from "../shared/theme";
import { useEffect } from "react";
import { Platform, StatusBar } from "react-native";

export const useStatusBar = (
  isTransparent?: boolean,
  backgroundColor?: string,
  barStyle?: "light-content" | "dark-content"
) => {
  useEffect(() => {
    if (Platform.OS === "android") {
      if (isTransparent) {
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor("transparent", true);
      } else {
        StatusBar.setBackgroundColor(
          backgroundColor || theme.PRIMARY_COLOR,
          true
        );
      }
      StatusBar.setBarStyle(barStyle || "light-content");
    } else {
      StatusBar.setBarStyle("dark-content");
    }
  }, []);
};

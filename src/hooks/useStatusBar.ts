import { useContext, useEffect } from "react";
import { useColorScheme } from "react-native";
import { Platform, StatusBar } from "react-native";
import { ThemeContext } from "styled-components/native";

const useStatusBar = (
  isTransparent?: boolean,
  backgroundColor?: string,
  barStyle?: "light-content" | "dark-content"
) => {
  const theme = useContext(ThemeContext);
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (Platform.OS === "android") {
      if (isTransparent) {
        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor("transparent", true);
      } else {
        StatusBar.setBackgroundColor(
          backgroundColor ||
            theme?.colors.background ||
            (colorScheme === "dark" ? "#07112D" : "#ffffff"),
          true
        );
      }
      StatusBar.setBarStyle(barStyle || "light-content");
    } else {
      StatusBar.setBarStyle("dark-content");
    }
  }, []);
};

export default useStatusBar;

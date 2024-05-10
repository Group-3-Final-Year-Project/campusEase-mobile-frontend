import { useEffect } from "react";
import { Platform } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { theme } from "../shared/theme";

export const useNavigationBar = (
  isTransparent?: boolean,
  backgroundColor?: string
) => {
  const setNavbar = async () => {
    if (isTransparent) {
      await NavigationBar.setBackgroundColorAsync("#00000000");
    } else {
      await NavigationBar.setBackgroundColorAsync(
        backgroundColor || theme.BACKGROUND
      );
    }
    await NavigationBar.setBorderColorAsync("#00000000");
  };
  useEffect(() => {
    if (Platform.OS === "android") {
      setNavbar();
    }
  }, []);
};

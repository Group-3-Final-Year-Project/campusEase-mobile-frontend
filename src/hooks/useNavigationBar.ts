import { useContext, useEffect } from "react";
import { Platform, useColorScheme } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { ThemeContext } from "styled-components/native";

const useNavigationBar = (
  isTransparent?: boolean,
  backgroundColor?: string
) => {
  const theme = useContext(ThemeContext);
  const colorScheme = useColorScheme();

  const setNavbar = async () => {
    if (isTransparent) {
      await NavigationBar.setBackgroundColorAsync("#00000000");
    } else {
      await NavigationBar.setBackgroundColorAsync(
        backgroundColor ||
          theme?.colors.background ||
          (colorScheme === "dark" ? "#07112D" : "#ffffff")
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

export default useNavigationBar;

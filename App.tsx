import "react-native-gesture-handler";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useMemo } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  // Urbanist_800ExtraBold,
  // Urbanist_300Light,
  // Urbanist_400Regular,
  // Urbanist_500Medium,
  // Urbanist_600SemiBold,
  // Urbanist_700Bold,
} from "@expo-google-fonts/urbanist";
import {
  setCustomTextInput,
  setCustomText,
  setCustomScrollView,
} from "react-native-global-props";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";
import { useNavigationBar, useStatusBar } from "~hooks";
import { DarkTheme, DefaultTheme, Font, LightTheme } from "~src/shared/theme";
import { useDidMountEffect } from "~services/uiService";
import { SafeComponent } from "~components";
import RootNavigator from "~src/navigators/RootNavigator";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import store from "~store/store";

enableScreens();
SplashScreen.preventAutoHideAsync();

export default function App() {
  useStatusBar(true, "", "light-content");
  useNavigationBar();
  let [fontsLoaded, error] = useFonts({
    [Font.GilroyBold]: require("./src/assets/fonts/Gilroy-Bold.ttf"),
    [Font.GilroyExtraBold]: require("./src/assets/fonts/Gilroy-ExtraBold.ttf"),
    [Font.GilroyLight]: require("./src/assets/fonts/Gilroy-Light.ttf"),
    [Font.GilroyMedium]: require("./src/assets/fonts/Gilroy-Medium.ttf"),
    [Font.GilroyRegular]: require("./src/assets/fonts/Gilroy-Regular.ttf"),
    [Font.GilroySemiBold]: require("./src/assets/fonts/Gilroy-SemiBold.ttf"),
  });
  const colorScheme = useColorScheme();
  const theme = useMemo(() => {
    if (!colorScheme) return DefaultTheme;
    return colorScheme === "dark" ? DarkTheme : LightTheme;
  }, [colorScheme]);

  useDidMountEffect(() => {
    if (fontsLoaded) setTimeout(SplashScreen.hideAsync, 100);
  }, [fontsLoaded]);

  if (error) {
    throw error;
  }
  if (!fontsLoaded) {
    return null;
  }
  setCustomText({
    style: {
      fontFamily: Font.GilroyRegular,
      color: theme.colors.text,
    },
  });
  setCustomTextInput({
    style: {
      fontFamily: Font.GilroyRegular,
    },
  });

  setCustomScrollView({
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
  });

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <SafeComponent request={{ loading: !fontsLoaded, data: true }}>
          <Provider store={store}>
            <StatusBar style="dark" />
            <NavigationContainer theme={theme as any}>
              <RootNavigator />
            </NavigationContainer>
          </Provider>
        </SafeComponent>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

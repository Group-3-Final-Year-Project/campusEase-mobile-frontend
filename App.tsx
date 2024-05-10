import "react-native-gesture-handler";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigators/RootNavigator";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Urbanist_200ExtraLight,
  Urbanist_300Light,
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
} from "@expo-google-fonts/urbanist";
import {
  Lexend_100Thin,
  Lexend_200ExtraLight,
  Lexend_300Light,
  Lexend_400Regular,
  Lexend_500Medium,
  Lexend_600SemiBold,
  Lexend_700Bold,
  Lexend_800ExtraBold,
  Lexend_900Black,
} from "@expo-google-fonts/lexend";
import { setCustomTextInput, setCustomText } from "react-native-global-props";
import { useStatusBar } from "./src/hooks/useStatusBar";
import { useNavigationBar } from "./src/hooks/useNavigationBar";
import { theme } from "./src/shared/theme";
SplashScreen.preventAutoHideAsync();
export default function App() {
  useStatusBar(true, "", "light-content");
  useNavigationBar();
  const [fontsLoaded, error] = useFonts({
    Urbanist_200ExtraLight,
    Urbanist_300Light,
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
    Lexend_100Thin,
    Lexend_200ExtraLight,
    Lexend_300Light,
    Lexend_400Regular,
    Lexend_500Medium,
    Lexend_600SemiBold,
    Lexend_700Bold,
    Lexend_800ExtraBold,
    Lexend_900Black,
  });
  const onLayoutView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);
  if (error) {
    throw error;
  }
  if (!fontsLoaded) {
    return null;
  }
  setCustomText({
    style: {
      fontFamily: "Urbanist_400Regular",
      color: `${theme.FOREGROUND}`,
    },
  });
  setCustomTextInput({
    style: {
      fontFamily: "Urbanist_400Regular",
    },
  });
  return (
    <GluestackUIProvider
      globalStyles={{
        fontFamily: "Urbanist_400Regular",
      }}
      colorMode="light"
      config={config}
    >
      <NavigationContainer
        onReady={onLayoutView}
        theme={{
          dark: false,
          colors: {
            background: theme.BACKGROUND,
            text: theme.FOREGROUND,
            primary: theme.PRIMARY_COLOR,
            border: theme.ACCENT,
            card: theme.ACCENT,
            notification: theme.BACKGROUND,
          },
        }}
      >
        <RootNavigator />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

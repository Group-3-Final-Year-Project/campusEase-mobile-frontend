import "react-native-gesture-handler";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useMemo } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Urbanist_300Light,
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
  Urbanist_800ExtraBold,
} from "@expo-google-fonts/urbanist";
import {
  setCustomTextInput,
  setCustomText,
  setCustomScrollView,
} from "react-native-global-props";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";
import { useNavigationBar } from "~hooks";
import { DarkTheme, DefaultTheme, Font, LightTheme } from "~src/shared/theme";
import { useDidMountEffect } from "~services";
import { SafeComponent } from "~components";
import RootNavigator from "~src/navigators/RootNavigator";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import store from "~store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CustomAlert from "~src/hocs/CustomAlert";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import CustomToast from "~src/hocs/CustomToast";

enableScreens();
SplashScreen.preventAutoHideAsync();

function App() {
  useNavigationBar();
  const queryClient = new QueryClient();
  // const [fontsLoaded, error] = useFonts({
  //   [Font.EuclidBold]: require("./src/assets/fonts/Euclid Circular B Bold.ttf"),
  //   [Font.EuclidExtraBold]: require("./src/assets/fonts/Euclid Circular B Bold.ttf"),
  //   [Font.EuclidLight]: require("./src/assets/fonts/Euclid Circular B Light.ttf"),
  //   [Font.EuclidMedium]: require("./src/assets/fonts/Euclid Circular B Medium.ttf"),
  //   [Font.EuclidRegular]: require("./src/assets/fonts/Euclid Circular B Regular.ttf"),
  //   [Font.EuclidSemiBold]: require("./src/assets/fonts/Euclid Circular B SemiBold.ttf"),
  // });
  const [fontsLoaded, error] = useFonts({
    [Font.UrbanistLight]: Urbanist_300Light,
    [Font.UrbanistRegular]: Urbanist_400Regular,
    [Font.UrbanistMedium]: Urbanist_500Medium,
    [Font.UrbanistSemiBold]: Urbanist_600SemiBold,
    [Font.UrbanistBold]: Urbanist_700Bold,
    [Font.UrbanistExtraBold]: Urbanist_800ExtraBold,
  });
  const colorScheme = useColorScheme();
  const theme = useMemo(() => {
    if (!colorScheme) return DefaultTheme;
    return colorScheme === "dark" ? DarkTheme : LightTheme;
  }, [colorScheme]);

  useDidMountEffect(() => {
    if (fontsLoaded) setTimeout(SplashScreen.hideAsync, 100);
  }, [fontsLoaded]);

  setCustomText({
    style: {
      fontFamily: Font.UrbanistRegular,
      color: theme.colors.text,
    },
  });
  setCustomTextInput({
    style: {
      fontFamily: Font.UrbanistRegular,
    },
  });

  setCustomScrollView({
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
  });

  if (error) {
    throw error;
  }
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <CustomAlert>
          <CustomToast>
            <SafeComponent request={{ loading: !fontsLoaded, data: true }}>
              <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                  <StatusBar
                    style={colorScheme === "dark" ? "light" : "dark"}
                  />
                  <NavigationContainer theme={theme as any}>
                    <RootNavigator />
                  </NavigationContainer>
                </QueryClientProvider>
              </Provider>
            </SafeComponent>
          </CustomToast>
        </CustomAlert>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default gestureHandlerRootHOC(App);

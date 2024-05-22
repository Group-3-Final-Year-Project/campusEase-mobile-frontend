import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserTabNavigator from "./UserTabNavigator";
import Onboard from "~src/screens/Onboard";
import SignInOrUp from "~src/screens/SignInOrUp";
import { APP_PAGES } from "~src/shared/constants";
import { ThemeContext } from "styled-components/native";
import VerifyEmail from "~src/screens/VerifyEmail";

const RootNavigator = () => {
  const theme = useContext(ThemeContext);
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={APP_PAGES.ONBOARD}
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name={APP_PAGES.USER_TAB} component={UserTabNavigator} />
      <Stack.Group
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: theme?.colors.background,
          },
          headerTintColor: theme?.colors.text,
          headerTitle: "",
        }}
      >
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={APP_PAGES.ONBOARD}
          component={Onboard}
        />
        <Stack.Screen name={APP_PAGES.SIGNINUP} component={SignInOrUp} />
        <Stack.Screen name={APP_PAGES.VERIFY_EMAIL} component={VerifyEmail} />
        {/* <Stack.Screen name={APP_PAGES.VERIFY_PHONE} component={Welcome} />
        <Stack.Screen name={APP_PAGES.SET_LOCATION} component={Welcome} />
        <Stack.Screen
          name={APP_PAGES.SET_LOCATION_PROMPT}
          component={SetLocationPrompt}
        />
        <Stack.Screen
          name={APP_PAGES.USER_TYPE_SELECTOR}
          component={UserTypeSelector}
        /> */}
      </Stack.Group>
      {/* <Stack.Screen name={APP_PAGES.SERVICE} component={Service} /> */}
    </Stack.Navigator>
  );
};
export default RootNavigator;

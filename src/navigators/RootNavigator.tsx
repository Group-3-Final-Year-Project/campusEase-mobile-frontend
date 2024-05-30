import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserTabNavigator from "./UserTabNavigator";
import Onboard from "~src/screens/Onboard";
import SignInOrUp from "~src/screens/SignInOrUp";
import { APP_PAGES } from "~src/shared/constants";
import { ThemeContext } from "styled-components/native";
import VerifyEmail from "~src/screens/VerifyEmail";
import Landing from "~src/screens/Landing";
import Login from "~src/screens/Login";
import Service from "~src/screens/Service";
import Bookings from "~src/screens/Bookings";

const RootNavigator = () => {
  const theme = useContext(ThemeContext);
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={APP_PAGES.USER_TAB}
      screenOptions={{
        headerShown: false,
        headerShadowVisible: true,
        headerStyle: {
          elevation: 1,
          backgroundColor: theme?.colors.background,
          shadowColor: theme?.colors.secondaryBackground,
          shadowOffset: {
            height: 6,
            width: 0,
          },
          shadowRadius: 40,
        },
        headerTitleStyle: {
          fontFamily: `${theme?.typography.fontFamily.extraBold}`,
        },
        headerTintColor: theme?.colors.text,
      }}
    >
      <Stack.Screen name={APP_PAGES.LANDING} component={Landing} />
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
        <Stack.Screen name={APP_PAGES.SIGNUP} component={SignInOrUp} />
        <Stack.Screen name={APP_PAGES.SIGNIN} component={Login} />
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
      <Stack.Screen
        name={APP_PAGES.SERVICE}
        component={Service}
        options={{
          headerShown: true,
          headerTitle: "",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name={APP_PAGES.BOOKINGS}
        component={Bookings}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};
export default RootNavigator;

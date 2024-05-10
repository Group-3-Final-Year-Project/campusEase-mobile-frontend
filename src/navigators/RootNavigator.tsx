import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ServiceProviderTabNavigator from "./ServiceProviderTabNavigator";
import UserTabNavigator from "./UserTabNavigator";
import { APP_PAGES } from "../shared/constants";
import Onboard from "../screens/Auth/Onboard";
import Welcome from "../screens/Auth/Welcome";
import Signup from "../screens/Auth/Signup";
import Signin from "../screens/Auth/Signin";
import UserTypeSelector from "../screens/Auth/UserTypeSelector";
import SetLocationPrompt from "../screens/Auth/SetLocationPrompt";
import Service from "../screens/Service/Service";
const RootNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={APP_PAGES.USER_TAB}
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name={APP_PAGES.SERVICE_PROVIDER_TAB}
        component={ServiceProviderTabNavigator}
      />
      <Stack.Screen name={APP_PAGES.USER_TAB} component={UserTabNavigator} />
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={APP_PAGES.ONBOARD} component={Onboard} />
        <Stack.Screen name={APP_PAGES.WELCOME} component={Welcome} />
        <Stack.Screen name={APP_PAGES.SIGNUP} component={Signup} />
        <Stack.Screen name={APP_PAGES.SIGNIN} component={Signin} />
        <Stack.Screen name={APP_PAGES.VERIFY_EMAIL} component={Welcome} />
        <Stack.Screen name={APP_PAGES.VERIFY_PHONE} component={Welcome} />
        <Stack.Screen name={APP_PAGES.SET_LOCATION} component={Welcome} />
        <Stack.Screen
          name={APP_PAGES.SET_LOCATION_PROMPT}
          component={SetLocationPrompt}
        />
        <Stack.Screen
          name={APP_PAGES.USER_TYPE_SELECTOR}
          component={UserTypeSelector}
        />
      </Stack.Group>
      <Stack.Screen name={APP_PAGES.SERVICE} component={Service} />
    </Stack.Navigator>
  );
};
export default RootNavigator;

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ServiceProviderTabNavigator from "./ServiceProviderTabNavigator";
import UserTabNavigator from "./UserTabNavigator";
import Onboard from "~src/screens/Onboard";
import SignInOrUp from "~src/screens/SignInOrUp";
import { APP_PAGES } from "~src/shared/constants";

const RootNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={APP_PAGES.ONBOARD}
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
      <Stack.Group>
        <Stack.Screen name={APP_PAGES.ONBOARD} component={Onboard} />
        <Stack.Screen name={APP_PAGES.SIGNINUP} component={SignInOrUp} />
        {/* <Stack.Screen name={APP_PAGES.VERIFY_EMAIL} component={Welcome} />
        <Stack.Screen name={APP_PAGES.VERIFY_PHONE} component={Welcome} />
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

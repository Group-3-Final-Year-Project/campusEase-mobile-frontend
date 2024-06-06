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
import BookingSummary from "~src/screens/BookingSummary";
import BookingDetail from "~src/screens/BookingDetail";
import RegisterService from "~src/screens/RegisterService";
import SetLocation from "~src/screens/SetLocation";
import ManageAddresses from "~src/screens/ManageAddresses";

const RootNavigator = () => {
  const theme = useContext(ThemeContext);
  const Stack = createNativeStackNavigator();
  return (
    //will set it to landing
    <Stack.Navigator
      initialRouteName={APP_PAGES.LANDING}
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
        <Stack.Screen
          name={APP_PAGES.REGISTER_SERVICE}
          component={RegisterService}
        />
        <Stack.Screen name={APP_PAGES.SET_LOCATION} component={SetLocation} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen
          name={APP_PAGES.SERVICE}
          component={Service}
          options={{
            headerTitle: "",
            headerTransparent: true,
          }}
        />
        <Stack.Screen name={APP_PAGES.BOOKINGS} component={Bookings} />
        <Stack.Screen
          name={APP_PAGES.BOOKING_SUMMARY}
          component={BookingSummary}
        />
        <Stack.Screen
          name={APP_PAGES.BOOKING_DETAILS}
          component={BookingDetail}
        />
        <Stack.Screen
          name={APP_PAGES.MANAGE_ADDRESSES}
          component={ManageAddresses}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
export default RootNavigator;

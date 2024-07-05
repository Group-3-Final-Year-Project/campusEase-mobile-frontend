import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserTabNavigator from "./UserTabNavigator";
import Onboard from "~src/screens/Onboard";
import Signup from "~src/screens/Signup";
import { APP_PAGES } from "~src/shared/constants";
import { ThemeContext } from "styled-components/native";
import VerifyEmail from "~src/screens/VerifyEmail";
import Landing from "~src/screens/Landing";
import Login from "~src/screens/Login";
import Service from "~src/screens/Service";
import BookingSummary from "~src/screens/BookingSummary";
import BookingDetail from "~src/screens/BookingDetail";
import SetLocation from "~src/screens/SetLocation";
import ManageAddresses from "~src/screens/ManageAddresses";
import ServiceCategories from "~src/screens/ServiceCategories";
import MoreBookingInfo from "~src/screens/MoreBookingInfo";
import Bookmarks from "~src/screens/Bookmarks";
import Chat from "~src/screens/Chat";
import PrivacyPolicy from "~src/screens/PrivacyPolicy";
import SearchAndFilter from "~src/screens/SearchAndFilter";
import EnterPhone from "~src/screens/EnterPhone";
import { useAppDispatch, useAppSelector } from "~store/hooks/useTypedRedux";
import { createUser, getUser, saveUserDetails } from "~services";
import ACTION_TYPES from "~store/actionTypes";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "firebaseConfig";
import { VerifiedUser } from "~src/@types/types";
import SetUserType from "~src/screens/SetUserType";
import SetServiceDetails from "~src/screens/SetServiceDetails";
import SetServiceGallery from "~src/screens/SetServiceGallery";
import SetServicePricing from "~src/screens/SetServicePricing";
import SetServiceLocation from "~src/screens/SetServiceLocation";
import DummyScreen from "~src/screens/DummyScreen";
import ServiceCreationSuccess from "~src/screens/ServiceCreationSuccess";

const RootNavigator = () => {
  const theme = useContext(ThemeContext);
  const Stack = createNativeStackNavigator();
  const dispatch = useAppDispatch();
  const user: VerifiedUser = useAppSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const userFromDB = await getUser(user.uid);
        const userData: VerifiedUser = {
          id: user.uid,
          email: user.email ?? userFromDB.email ?? "",
          userType: userFromDB.userType,
          username: user.displayName ?? userFromDB.username ?? "",
          phoneNumber: user.phoneNumber ?? userFromDB.phoneNumber ?? "",
          locations: userFromDB.locations,
          profilePicture: user.photoURL ?? userFromDB.profilePicture,
          isEmailVerified: user.emailVerified,
          isPhoneVerified: userFromDB.isPhoneVerified,
          isActive: userFromDB.isActive,
          isLoggedIn: userFromDB.isActive,
        };
        await createUser(userData);
        const result = await saveUserDetails(userData);
        dispatch({
          type: ACTION_TYPES.UPDATE_USER_DATA,
          payload: result,
        });
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={APP_PAGES.LANDING}
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: theme?.colors.background,
        },
        headerTitleStyle: {
          fontFamily: `${theme?.typography.fontFamily.bold}`,
        },
        headerTintColor: theme?.colors.text,
      }}
    >
      {user.id ? (
        <>
          <Stack.Screen
            name={APP_PAGES.USER_TAB}
            component={UserTabNavigator}
          />
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
            <Stack.Screen name={APP_PAGES.BOOKMARKS} component={Bookmarks} />
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
            <Stack.Screen
              name={APP_PAGES.SERVICE_CATEGORIES}
              component={ServiceCategories}
            />
            <Stack.Screen
              name={APP_PAGES.OTHER_BOOKING_INFO}
              component={MoreBookingInfo}
            />
            <Stack.Screen name={APP_PAGES.CHAT} component={Chat} />
            <Stack.Screen
              name={APP_PAGES.PRIVACY_POLICY}
              component={PrivacyPolicy}
            />
            <Stack.Screen
              name={APP_PAGES.SEARCH_AND_FILTER}
              component={SearchAndFilter}
            />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen name="DummyScreen" component={DummyScreen} />
      )}
      <Stack.Screen name={APP_PAGES.LANDING} component={Landing} />
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
        <Stack.Screen name={APP_PAGES.SIGNUP} component={Signup} />
        <Stack.Screen name={APP_PAGES.SIGNIN} component={Login} />
        <Stack.Screen name={APP_PAGES.VERIFY_EMAIL} component={VerifyEmail} />
        <Stack.Screen
          name={APP_PAGES.SET_SERVICE_DETAILS}
          component={SetServiceDetails}
        />
        <Stack.Screen name={APP_PAGES.SET_LOCATION} component={SetLocation} />
        <Stack.Screen name={APP_PAGES.SET_USER_TYPE} component={SetUserType} />
        <Stack.Screen name={APP_PAGES.ENTER_PHONE} component={EnterPhone} />
        <Stack.Screen
          name={APP_PAGES.SET_SERVICE_GALLERY}
          component={SetServiceGallery}
        />
        <Stack.Screen
          name={APP_PAGES.SET_SERVICE_PRICING}
          component={SetServicePricing}
        />
        <Stack.Screen
          name={APP_PAGES.SET_SERVICE_LOCATION}
          component={SetServiceLocation}
        />
        <Stack.Screen
          name={APP_PAGES.SERVICE_CREATION_SUCCESS}
          component={ServiceCreationSuccess}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
export default RootNavigator;

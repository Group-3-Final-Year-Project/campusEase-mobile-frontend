import { StyleSheet } from "react-native";
import { theme } from "./theme";

export const APP_PAGES = {
  MAINSTACK: "MainStack",
  USER_TAB: "User Tab",
  SERVICE_PROVIDER_TAB: "Service Provider Tab",
  ONBOARD: "Onboard",
  WELCOME: "Welcome",
  SIGNUP: "Signup",
  SIGNIN: "Signin",
  HOME: "Home",
  PROFILE: "Profile",
  SETTINGS: "Settings",
  NOTIFICATIONS: "Notifications",
  NEW_PASSWORD: "New Password",
  VERIFY_EMAIL: "Verify Email",
  VERIFY_PHONE: "Verify Phone",
  SET_LOCATION_PROMPT: "Set Location Prompt",
  SET_LOCATION: "Set Location",
  EXPLORE: "Explore",
  BOOKMARKS: "Bookmarks",
  CHATS: "Chats",
  USER_TYPE_SELECTOR: "User Type Selector",
  SERVICE: "Service",
};

export const API_URLS = {};

export const COMMON_STYLES = StyleSheet.create({
  heading: {
    fontFamily: "Urbanist_700Bold",
    fontSize: 24,
    lineHeight: 36,
  },
  text: {
    fontFamily: "Urbanist_400Regular",
    fontSize: 12,
    lineHeight: 18,
  },
});

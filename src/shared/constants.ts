import { StyleSheet, Dimensions } from "react-native";

export const APP_PAGES = {
  MAINSTACK: "MainStack",
  USER_TAB: "User Tab",
  LANDING: "Landing",
  ONBOARD: "Onboard",
  WELCOME: "Welcome",
  SIGNINUP: "Signup/Signin",
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
  ANALYTICS: "Analytics",
  BOOKINGS: "Bookings",
};

export const API_URLS = {};

export const STORAGE_KEYS = {
  IS_LOGGED_IN: "is_logged_in",
  IS_FIRST_TIME_USER: "is_first_time_user",
  ACTIVE_USER: "active_user",
};

export const MISC = {};

export const { width, height } = Dimensions.get("screen");

export const CARD = {
  CARD_WIDTH: width * 0.9,
  CARD_HEIGHT: height * 0.78,
  CARD_OUT_HEIGHT: height * 1.7,
  CARD_OUT_WIDTH: width * 1.7,
};

export const ACTION_OFFSET = 100;
export const ACTION_VELOCITY = 1000;
export const ACTION_THRESHOLD = 1 / 35;

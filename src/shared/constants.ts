import { Dimensions } from "react-native";

export const APP_PAGES = {
  MAINSTACK: "MainStack",
  USER_TAB: "User Tab",
  LANDING: "Landing",
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
  ANALYTICS: "Analytics",
  BOOKINGS: "Bookings",
  BOOKING_SUMMARY: "Booking Summary",
  BOOKING_DETAILS: "Booking Details",
};

export const API_URLS = {
  SIGNIN: "/auth/signin",
  SIGNUP: "/auth/signup",
  GENERATE_EMAIL_OTP: "/auth/generate_email_otp",
  VALIDATE_EMAIL_OTP: "/auth/validate_email_otp",
  ACCOUNTS: "/accounts",
  SERVICES: "/services",
  BOOKINGS: "/bookings",
  REVIEWS: "/reviews",
};

export const STORAGE_KEYS = {
  IS_LOGGED_IN: "campusEase_is_logged_in",
  IS_ALREADY_USER: "campusEase_is_already_user",
  ACTIVE_USER: "campusEase_active_user",
  USER_TYPE: "campusEase_active_user_type",
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

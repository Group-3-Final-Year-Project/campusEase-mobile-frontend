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
  ENTER_PHONE: "Enter Phone",
  SET_LOCATION_PROMPT: "Set Location Prompt",
  SET_LOCATION: "Set Location",
  SET_USER_TYPE: "Set User Type",
  EXPLORE: "Explore",
  BOOKMARKS: "Bookmarks",
  CHATS: "Chats",
  CHAT: "Chat",
  USER_TYPE_SELECTOR: "User Type Selector",
  SERVICE: "Service",
  ANALYTICS: "Analytics",
  BOOKINGS: "Bookings",
  BOOKING_SUMMARY: "Booking Summary",
  BOOKING_DETAILS: "Booking Details",
  REGISTER_SERVICE: "Register Service",
  MANAGE_ADDRESSES: "Manage Addresses",
  OTHER_BOOKING_INFO: "Other Booking Info",
  SERVICE_CATEGORIES: "Service Categories",
  PRIVACY_POLICY: "Privacy Policy",
  SEARCH_AND_FILTER: "Search and Filter",
  SET_SERVICE_DETAILS: "Set Service Details",
  SET_SERVICE_GALLERY: "Set Service Gallery",
  SET_SERVICE_PRICING: "Set Service Pricing",
  SET_SERVICE_LOCATION: "Set Service Location",
  SERVICE_CREATION_SUCCESS: "Service Creation Success",
  USER_CREATION_SUCCESS: "User Creation Success",
};

export const API_URLS = {
  BASE_URL: "http://10.168.238.62:8081/api",
  SIGNIN: "/auth/signin",
  SIGNUP: "/auth/signup",
  GENERATE_EMAIL_OTP: "/auth/generate_email_otp",
  VALIDATE_EMAIL_OTP: "/auth/validate_email_otp",
  ACCOUNTS: "/accounts",
  SERVICES: "/services",
  BOOKINGS: "/bookings",
  REVIEWS: "/reviews",
  MANAGE_ADDRESSES: "Manage Addresses",
};

export const STORAGE_KEYS = {
  IS_LOGGED_IN: "campusEase_is_logged_in",
  IS_ALREADY_USER: "campusEase_is_already_user",
  ACTIVE_USER: "campusEase_active_user",
  USER_TYPE: "campusEase_active_user_type",
  BOOKMARKS: "campusEase_bookmarks",
  CHATROOMS: "campusEase_chatRooms",
  MESSAGES: "chatRoom_messages",
  USERS: "chatRoom_users",
  SERVICES: "campusEase_services",
  DB_USERS: "campusEase_users",
  SERVICE_CATEGORIES: "campusEase_service_categories",
  BOOKINGS: "campuseEase_bookings",
};

export const QUERY_KEYS = {
  HOME_SCREEN_DATA: "campusEase_home_screen_data",
  CATEGORY_SERVICES: "campusEase_category_services",
  BOOKINGS: "campusEase_bookings",
  BOOKMARKS: "campusEase_bookmarks_data",
  SERVICE: "campusEase_service",
  CHATS: "campusEase_chats",
  SERVICES: "campusEase_services",
  SERVICE_REQUEST: "campusEase_service_request",
};

export const SUBSCRIBABLE_EVENTS = {
  SHOW_TOAST: "show_toast",
  HIDE_TOAST: "hide_toast",
  SHOW_ALERT: "show_alert",
  HIDE_ALERT: "hide_alert",
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

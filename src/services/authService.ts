import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, UserType } from "~src/@types/types";
import { API_URLS, STORAGE_KEYS } from "~src/shared/constants";
import { apiPost } from "./apiService";
import { formatPhoneNumber } from "./uiService";

export async function setAsLoggedIn() {
  AsyncStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, "1");
}

export async function setAsLoggedOut() {
  AsyncStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, "0");
}

export const isAlreadyLoggedIn = async () => {
  const loggedIn = await AsyncStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
  if (loggedIn === "1") return true;
  return false;
};

export const setIsAlreadyUser = async () => {
  AsyncStorage.setItem(STORAGE_KEYS.IS_ALREADY_USER, "1");
};

export const isAlreadyUser = async () => {
  const alreadyUser = await AsyncStorage.getItem(STORAGE_KEYS.IS_ALREADY_USER);
  if (!alreadyUser) return false;
  else {
    if (alreadyUser === "1") return true;
    return false;
  }
};

export const setUserType = async (user_type: UserType) => {
  AsyncStorage.setItem(STORAGE_KEYS.USER_TYPE, user_type);
};

export const getUserType = async () => {
  const userType = await AsyncStorage.getItem(STORAGE_KEYS.USER_TYPE);
  return userType && JSON.parse(userType);
};

export const changePassword = async () => {};

export const readLoginDataFromAsyncStorage: () => Promise<User | null> =
  async () => {
    const loginData = await AsyncStorage.getItem(STORAGE_KEYS.ACTIVE_USER);
    console.log("login: ", loginData);
    return loginData && JSON.parse(loginData);
  };

export const setLoginDataToAsyncStorage = async (loginData: object) => {
  AsyncStorage.setItem(STORAGE_KEYS.ACTIVE_USER, JSON.stringify(loginData));
};

export const signUserUp = async (signUpData: {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  acceptedTerms?: boolean;
}) => {
  const data = {
    username: signUpData.name,
    email: signUpData.email,
    password: signUpData.password,
    phone_number: formatPhoneNumber(signUpData.phoneNumber),
  };
  try {
    const response = await apiPost(API_URLS.SIGNUP, data, true, false);
    if (response?.data) {
      await setLoginDataToAsyncStorage(response.data || null);
      return response.data;
    }
  } catch (error) {
    return error;
    // return processErrorResponse(err as any, "Error logging in user");
  }
};
export const signUserIn = async (signInData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await apiPost(API_URLS.SIGNIN, signInData, true, false);
    if (response?.data) {
      await setLoginDataToAsyncStorage(response.data || null);
      return response.data;
    }
  } catch (error) {
    return error;
    // return processErrorResponse(err as any, "Error logging in user");
  }
};

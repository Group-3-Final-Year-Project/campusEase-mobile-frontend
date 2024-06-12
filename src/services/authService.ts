import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ErrorObject,
  StringError,
  User,
  UserType,
  VerifiedUser,
} from "~src/@types/types";
import { API_URLS, STORAGE_KEYS } from "~src/shared/constants";
import { apiPost } from "./apiService";
import { formatPhoneNumber } from "./uiService";
import axios from "axios";
import { processErrorResponse } from "./errorService";

let LOGGED_IN_USER: VerifiedUser | null | undefined;

export const saveCurrentlyLoggedInUser = (userData: VerifiedUser) => {
  LOGGED_IN_USER = userData;
};

export const getCurrentlyLoggedInUser = () => {
  return LOGGED_IN_USER;
};

export const getSecureAxiosInstance = () => {
  if (!LOGGED_IN_USER) {
    throw new Error(
      `Attempting to securely connect to api when there is no token!`
    );
  }
  return axios.create({
    baseURL: API_URLS.BASE_URL,
    headers: { Authorization: `Bearer ${LOGGED_IN_USER.token}` },
  });
};

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
  return userType;
};

export const getIsServiceProvider = async () => {
  const userType = await getUserType();
  const isServiceProvider = async () => userType === UserType.SERVICE_PROVIDER;
  return await isServiceProvider();
};

export const changePassword = async () => {};

export const readLoginDataFromAsyncStorage: () => Promise<VerifiedUser | null> =
  async () => {
    const loginData = await AsyncStorage.getItem(STORAGE_KEYS.ACTIVE_USER);
    console.log("login: ", loginData);
    return loginData && JSON.parse(loginData);
  };

export const setLoginDataToAsyncStorage = async (loginData: VerifiedUser) => {
  AsyncStorage.setItem(STORAGE_KEYS.ACTIVE_USER, JSON.stringify(loginData));
};

export const signUserUp = async (signUpData: {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  acceptedTerms?: boolean;
}): Promise<VerifiedUser> => {
  const userType = await getUserType();
  const data = {
    username: signUpData.name,
    email: signUpData.email.toLowerCase(),
    password: signUpData.password,
    phoneNumber: formatPhoneNumber(signUpData.phoneNumber),
    userType,
  };
  try {
    const url = `${API_URLS.BASE_URL}${API_URLS.SIGNUP}`;
    console.log("url: ", url);
    const response = await axios.post(url, data);
    const userData: User = {
      token: response.data.data.token,
      ...response.data.data.authorized_account,
    };
    saveCurrentlyLoggedInUser(response.data.data as VerifiedUser);
    await setLoginDataToAsyncStorage(response.data.data as VerifiedUser);
    await setIsAlreadyUser();
    await setUserType(userData.userType);
    return response.data.data as VerifiedUser;
  } catch (error) {
    return processErrorResponse(error as any, "Error signing up user");
  }
};

export const signUserIn = async (signInData: {
  username: string;
  email: string;
  password: string;
}): Promise<VerifiedUser> => {
  try {
    const url = `${API_URLS.BASE_URL}${API_URLS.SIGNIN}`;
    const response = await axios.post(url, signInData);
    const userData: User = {
      token: response.data.data.token,
      ...response.data.data.authorized_account,
    };
    saveCurrentlyLoggedInUser(response.data.data as VerifiedUser);
    await setLoginDataToAsyncStorage(response.data.data as VerifiedUser);
    await setIsAlreadyUser();
    await setUserType(userData.userType);
    return response.data.data as VerifiedUser;
  } catch (error) {
    return processErrorResponse(error as any, "Error logging in user");
  }
};

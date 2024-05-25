import { User } from "~src/@types/types";
import { STORAGE_KEYS } from "~src/shared/constants";

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

export const isFirstTimeUser = async () => {
  const firstTime = await AsyncStorage.getItem(STORAGE_KEYS.IS_FIRST_TIME_USER);
  if (firstTime === "1") return true;
  return false;
};

export const changePassword = async () => {};

export const readLoginDataFromAsyncStorage: () => Promise<User | null> =
  async () => {
    const loginData = await AsyncStorage.getItem(STORAGE_KEYS.ACTIVE_USER);
    return loginData && JSON.parse(loginData);
  };

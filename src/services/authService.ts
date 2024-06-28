import AsyncStorage from "@react-native-async-storage/async-storage";
import { ErrorObject, UserType, VerifiedUser } from "~src/@types/types";
import { API_URLS, STORAGE_KEYS } from "~src/shared/constants";
import { formatPhoneNumber } from "./uiService";
import axios from "axios";
import { processErrorResponse } from "./errorService";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { firebaseAuth } from "firebaseConfig";
import type { User } from "firebase/auth";
import { createUser } from "./dataService";

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

export const saveUserDetails = async (
  signInData: User,
  username?: string
): Promise<VerifiedUser> => {
  try {
    const userData: VerifiedUser = {
      id: signInData.uid,
      email: signInData.email ?? "",
      token: null,
      userType: UserType.USER,
      username: signInData.displayName ?? username ?? "",
      phoneNumber: signInData.phoneNumber ?? "",
      locations: [],
      profilePicture: signInData.photoURL,
      isEmailVerified: signInData.emailVerified,
      isPhoneVerified: false,
      isActive: false,
      isLoggedIn: false,
      createdAt: new Date().toLocaleString(),
    };
    await createUser(userData);
    saveCurrentlyLoggedInUser(userData);
    await setLoginDataToAsyncStorage(userData);
    await setIsAlreadyUser();
    await setUserType(userData.userType);
    return userData;
  } catch (error) {
    return processErrorResponse(error as any, "Error logging in user");
  }
};

export const logoutUser = async () => {
  try {
    LOGGED_IN_USER = null;
    AsyncStorage.multiRemove([
      STORAGE_KEYS.USER_TYPE,
      STORAGE_KEYS.ACTIVE_USER,
    ]);
    await setAsLoggedOut();
  } catch (error) {
    return processErrorResponse(error as any, "Error logging out user");
  }
};

export const signinUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const result = signInWithEmailAndPassword(firebaseAuth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      return {
        user: await saveUserDetails(user),
        error: null,
      };
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return {
        user: null,
        error: {
          errorCode,
          errorMessage,
        } as ErrorObject,
      };
    });
  return result;
};

export const signupUserWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  const result = createUserWithEmailAndPassword(firebaseAuth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      await sendEmailVerification(user);
      return {
        user: await saveUserDetails(user, name),
        error: null,
      };
    })
    .catch((error) => {
      const errorMessage = error.message;
      const errorCode = error.code;
      return {
        user: null,
        error: {
          errorCode,
          errorMessage,
        } as ErrorObject,
      };
    });

  return result;
};

export const monitorAuthState = () => {
  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
    } else {
    }
  });
};

// export const signinUserWithGoogle = async () => {
//   const provider = new GoogleAuthProvider();
//   provider.addScope("profile");
//   provider.addScope("email");
//   const result = signInWithPopup(firebaseAuth, provider)
//     .then(async (result) => {
//       const user = result.user;
//       return {
//         user: await saveUserDetails(user),
//         error: null,
//       };
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       return {
//         user: null,
//         error: {
//           errorCode,
//           errorMessage,
//         } as ErrorObject,
//       };
//     });
//   return result;
// };

export const signoutUser = async () => {
  signOut(firebaseAuth)
    .then(() => {
      logoutUser();
    })
    .catch((error) => {});
};

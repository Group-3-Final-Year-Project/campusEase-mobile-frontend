import AsyncStorage from "@react-native-async-storage/async-storage";
import { ErrorObject, UserType, VerifiedUser } from "~src/@types/types";
import { STORAGE_KEYS } from "~src/shared/constants";
import { processErrorResponse } from "./errorService";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { firebaseAuth } from "firebaseConfig";
import { createUser, getUser } from "./dataService";
import { showAlert } from "./uiService";
import * as Notifications from "expo-notifications";

let LOGGED_IN_USER: VerifiedUser | null | undefined;

export const saveCurrentlyLoggedInUser = (userData: VerifiedUser) => {
  LOGGED_IN_USER = userData;
};

export const getCurrentlyLoggedInUser = () => {
  return LOGGED_IN_USER;
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
    return loginData && JSON.parse(loginData);
  };

export const setLoginDataToAsyncStorage = async (loginData: VerifiedUser) => {
  AsyncStorage.setItem(STORAGE_KEYS.ACTIVE_USER, JSON.stringify(loginData));
};

export const saveUserDetails = async (
  signInData: VerifiedUser
): Promise<VerifiedUser> => {
  try {
    saveCurrentlyLoggedInUser(signInData);
    await setAsLoggedIn();
    await setLoginDataToAsyncStorage(signInData);
    await setIsAlreadyUser();
    await setUserType(signInData.userType);
    return signInData;
  } catch (error) {
    return processErrorResponse(error as any, "Error logging in user");
  }
};

export const signinUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const result = signInWithEmailAndPassword(firebaseAuth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      const userDataFromDB = await getUser(user.uid);
      return {
        user: await saveUserDetails(userDataFromDB),
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

      const userData: VerifiedUser = {
        id: user.uid,
        email: user.email ?? "",
        userType: UserType.USER,
        username: user.displayName ?? name ?? "",
        phoneNumber: user.phoneNumber ?? "",
        locations: [],
        profilePicture: user.photoURL,
        isEmailVerified: user.emailVerified,
        isPhoneVerified: false,
        isActive: true,
        isLoggedIn: true,
        createdAt: new Date().toLocaleString(),
      };
      await createUser(userData);
      return {
        user: await saveUserDetails(userData),
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
    .then(async () => {
      LOGGED_IN_USER = null;
      AsyncStorage.multiRemove([
        STORAGE_KEYS.USER_TYPE,
        STORAGE_KEYS.ACTIVE_USER,
      ]);
      await setAsLoggedOut();
    })
    .catch((error) => {});
};

export const handleUserForgotPassword = async (email: string) => {
  await sendPasswordResetEmail(firebaseAuth, email).then((res) => {
    showAlert(
      "Password Reset Email sent",
      "An email has been sent to you email to reset your password"
    );
  });
};

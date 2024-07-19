import { BottomTabNavigationHelpers } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { CommonActions, NavigationProp } from "@react-navigation/native";
import { EffectCallback, DependencyList, useRef, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Linking from "expo-linking";
import * as Location from "expo-location";
import { Platform } from "react-native";
import { eventEmitter } from "./eventEmitter";
import { SUBSCRIBABLE_EVENTS } from "~src/shared/constants";
import { getMyServices } from "./dataService";
import * as DocumentPicker from "expo-document-picker";

export const navigateAndResetStack = (
  navigationObject: NavigationProp<any> | BottomTabNavigationHelpers,
  toPage: string
) => {
  navigationObject.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{ name: toPage }],
    })
  );
};

export const useDidMountEffect = (
  func: EffectCallback,
  deps: DependencyList
) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};

export const showAlert = (
  title: string,
  message: string,
  buttons?: { label: string; onPress: () => void }[]
) => {
  eventEmitter.emit(SUBSCRIBABLE_EVENTS.SHOW_ALERT, {
    title: title,
    message: message,
    buttons: buttons,
  });
};
export const showToast = (message: string) => {
  eventEmitter.emit(SUBSCRIBABLE_EVENTS.SHOW_TOAST, {
    message: message,
  });
};

export const pickDocuments = async () => {
  const res = await DocumentPicker.getDocumentAsync({
    multiple: true,
    type: [
      "image/*",
      "audio/*",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "vnd.ms-excel",
      "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
      "text/plain",
      "application/zip",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
  }).then((res) => {
    if (res.canceled) return [];
    return res.assets;
  });

  return res;
};

export function pickRandomAvatarColor(id?: number): string {
  const colors = [
    "#e53935",
    "#d81b60",
    "#8e24aa",
    "#5e35b1",
    "#1e88e5",
    "#43a047",
    "#fb8c00",
    "#f4511e",
    "#6d4c41",
    "#546e7a",
  ];
  return colors[(id || 0) % 10];
}

export function extractImageDataFromB64string(base64String: string): string {
  return base64String.split(",")[1];
}

export const formatPhoneNumber = (phoneNumber: string) => {
  // will do proper formatting here...
  let num = "+233";
  num += phoneNumber.startsWith("0") ? phoneNumber.slice(1) : phoneNumber;
  return num;
};

export const formatCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  return formatter.format(Number(value));
};

export async function getLocationAsync(
  onSend: (locations: { location: Location.LocationObjectCoords }[]) => void
) {
  if (await Location.requestForegroundPermissionsAsync()) {
    const location = await Location.getCurrentPositionAsync({});
    if (location) {
      onSend([{ location: location.coords }]);
    }
  }
}

export async function pickImageAsync(
  onSend?: (images: ImagePicker.ImagePickerAsset[]) => void,
  props?: ImagePicker.ImagePickerOptions
) {
  if (await ImagePicker.requestMediaLibraryPermissionsAsync()) {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      ...props,
    });

    if (!result.canceled) {
      onSend && onSend(result.assets);
      return result.assets;
    }
  }
}

export async function takePictureAsync(
  onSend: (images: ImagePicker.ImagePickerAsset[]) => void,
  props?: ImagePicker.ImagePickerOptions
) {
  if (await ImagePicker.requestCameraPermissionsAsync()) {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      ...props,
    });

    if (!result.canceled) {
      onSend(result.assets);
      return result.assets;
    }
  }
}

export const openLink = (url: string) => Linking.openURL(url);

export const getFirebaseErrorMessage = (errorCode?: string) => {
  const messages = {
    "auth/wrong-password": "Incorrect email or password.",
    "auth/user-not-found": "User not found. Please check your email address.",
    "auth/weak-password":
      "Password is too weak. Please choose a stronger password.",
    "auth/email-already-in-use":
      "The email address is already in use by another account.",
    "auth/invalid-credential": "Credentials provided are not valid!.",
    "auth/operation-not-allowed":
      "This operation is not allowed. Please contact support.",
    "auth/too-many-requests":
      "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later",
    // Add more error codes and messages here...
  };

  return (
    messages[errorCode] || "An unknown error occurred. Please try again later."
  );
};

export const normalizeFilePath = (filePath: string) => {
  if (Platform.OS === "ios" || Platform.OS === "android") {
    const filePrefix = "file://";
    if (filePath.startsWith(filePrefix)) {
      filePath = filePath.substring(filePrefix.length);
      try {
        filePath = decodeURI(filePath);
      } catch (e) {
        console.log(e);
      }
    }
  }
  return filePath;
};

export const formatLatLng = (lat: number, lng: number) => {
  return `Lat: ${lat}, Lng: ${lng}`;
};

export const checkIfServiceProviderHasService = async (providerId: string) => {
  const serviceProviderServices = await getMyServices(providerId);
  return !(
    !serviceProviderServices.length || serviceProviderServices.length === 0
  );
};

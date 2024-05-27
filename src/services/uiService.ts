import { BottomTabNavigationHelpers } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { CommonActions, NavigationProp } from "@react-navigation/native";
import { EffectCallback, DependencyList, useRef, useEffect } from "react";

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

export const openGallery = () => {};

export const showAlert = () => {};

export const showToast = () => {};

export const pickDocuments = () => {};

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
  return phoneNumber;
};

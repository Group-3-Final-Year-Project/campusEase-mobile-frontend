import { BottomTabNavigationHelpers } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { CommonActions, NavigationProp } from "@react-navigation/native";
import { EffectCallback, DependencyList, useRef, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

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

export const pickImage = async (props?: ImagePicker.ImagePickerOptions) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    selectionLimit: 1,
    ...props,
  });

  return result;
};

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
  let num = "+233";
  num += phoneNumber.startsWith("0") ? phoneNumber.slice(1) : phoneNumber;
  return num;
};

export const formatCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
  });
  return formatter.format(Number(value));
};

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { showAlert } from "./uiService";

export const getUserDeviceToken = async () => {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      showAlert(
        "Ooops...",
        "Failed to get push token for notifications!\nYou will not be able to receive notifications. You can enable notifications in settings"
      );
      return;
    }
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error("Project ID not found");
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    showAlert("Ooops...", "Please use a physical device to get notifications");
  }

  return token;
};

export const fetchNotifications = async () => {};

// export const sendBookingRequestNotifications = async (
//   userDeviceToken: string,
//   providerDeviceToken: string
// ) => {
//   const notificationForUser: Notifications.Notification = {
//     date: new Date().getTime(),
//       request: {
//           trigger: null,
//           content: {

//           }
//     },
//   };
// };

export const schedulePushNotification = async (
  requestInput: Notifications.NotificationRequestInput
) => {
  await Notifications.scheduleNotificationAsync(requestInput);
};

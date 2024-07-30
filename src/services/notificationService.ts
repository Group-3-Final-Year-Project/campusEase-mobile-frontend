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
    } catch (e) {
      token = `${e}`;
    }
  } else {
    showAlert("Ooops...", "Please use a physical device to get notifications");
  }

  return token;
};

export const fetchNotifications = async () => {};

export const sendBookingRequestNotifications = async (
  userDeviceToken: string,
  userId: string,
  providerDeviceToken: string,
  providerId: string
) => {
  const notificationForUser: Notifications.NotificationRequestInput = {
    content: {
      title: "Booking Confirmation",
      body: "Your booking for [service name] with [provider name] has been confirmed!",
      sound: "defaultCritical",
      subtitle: null,
      attachments: [],
      data: {},
    },
    trigger: {
      seconds: 0,
    },
    identifier: userId,
  };

  const notificationForServiceProvider: Notifications.NotificationRequestInput =
    {
      content: {
        title: "New Booking Request",
        body: "Someone just requested for your service!",
        sound: "defaultCritical",
        subtitle: null,
        attachments: [],
        data: {},
      },
      identifier: providerId,

      trigger: {
        seconds: 0,
      },
    };

  await schedulePushNotification(notificationForUser);
};

export const schedulePushNotification = async (
  requestInput: Notifications.NotificationRequestInput
) => {
  await Notifications.scheduleNotificationAsync(requestInput);
};

import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AndroidNotificationPriority } from "expo-notifications";
import * as Notifications from "expo-notifications";

export type CustomNavigationProp = {
  navigation: NativeStackNavigationProp<ParamListBase, any>;
  route: RouteProp<{
    params: {
      [x: string]: any;
    };
  }>;
};

export type NullableString = string | null;
export type NullableNumber = number | null;
export type NullableArray<T> = T[] | null;
export type NonEmptyArray<T> = [T, ...T[]];

export type ErrorObject = {
  errorMessage: Error | string | null;
  errorCode: string | null;
};

export type StringError = {
  error: string;
  status?: number;
};

export enum TransformCase {
  CamelCase = "camel_case",
  SnakeCase = "snake_case",
}

export enum UserType {
  USER = "user",
  SERVICE_PROVIDER = "service_provider",
}

export enum Filters {
  SERVICE_CATEGORY = "service_category",
}

export enum BookingStatus {
  PENDING = "Pending",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}

export type VerifiedUser = {
  id: string;
  userDeviceToken?: string;
  userType: UserType.SERVICE_PROVIDER | UserType.USER;
  username: string;
  email: string;
  phoneNumber: string;
  locations: LocationObj[];
  profilePicture: NullableString;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isActive: boolean;
  isLoggedIn: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type ChatData = {
  messages: any[];
  step: number;
  loadEarlier?: boolean;
  isLoadingEarlier?: boolean;
  isTyping: boolean;
};

export type ReduxState = {
  user: VerifiedUser;
  // services: Service[];
  booking: Booking;
  filters: {
    [Filters.SERVICE_CATEGORY]: ServiceCategory;
  };
  chat: ChatData;
  serviceInCreation: Service;
};

export type ApiRequestResult<TData = any, SData = any> = {
  error?: boolean | string | null;
  success?: boolean;
  data?: TData;
  metadata?: SData;
  status?: number | null;
  message?: string;
  errorData?: any;
  count?: number;
  headers?: any;
};

export type SubService = {
  id: string;
  name: string;
  description?: NullableString;
  price: number;
};

export type LocationParams = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  accuracy?: number | null;
  altitude?: number | null;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
};

export type LocationObj = {
  id: string;
  name?: string;
  address?: string;
  location: LocationParams;
};

export enum PaymentStatus {
  PAID = "Paid",
  PENDING = "Pending",
  NOT_PAID = "Not Paid",
}

export type PaymentMethodObject = {
  id: string;
  name: string;
  extraData?: object;
};

export type BookingAttachment = {
  id: string;
  type: string;
  url: string;
};

export type BookingState = {
  name: BookingStatus;
  description: string;
};

export type GalleryFile = {
  key: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  downloadURL: string;
};

export type Service = {
  id: string;
  providerId: string;
  name: string;
  description?: NullableString;
  category: ServiceCategory;
  location: LocationObj;
  coverImage: string;
  gallery?: GalleryFile[];
  email: NullableString;
  website?: NullableString;
  startingPrice: number;
  subServices?: SubService[];
  createdAt: string;
  updatedAt?: string;
  isAvailable: boolean;
  rating?: number;
  numberOfReviews?: number;
};

export type Booking = {
  id: string;
  providerId: string;
  userId: string;
  serviceId: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  location: LocationObj;
  paymentMethodObject: PaymentMethodObject;
  paymentStatus: PaymentStatus;
  subService?: SubService;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  scheduledDate: string;
  scheduledTime: string;
  notes: string;
  attachments: GalleryFile[];
  bookingStates: BookingState[];
  bookingStatus: BookingStatus;
  requestCompletedConfirmationFromUser: boolean;
  requestCompletedConfirmationFromProvider: boolean;
};

export type ServiceCategory = {
  id: string;
  name: string;
  description?: NullableString;
};

export type ServiceListService = {
  id: string;
  name: string;
  description?: NullableString;
  coverImage: string;
  rating?: number;
  startingPrice?: number;
  isAvailable: boolean;
};

export type SearchFilters = {
  startingPriceRange?: { min: number; max: number };
  ratingRange?: { min: number; max: number };
  isAvailable?: boolean;
  location?: {
    latitude?: number;
    longitude?: number;
    radius?: number;
  };
};

export type VerifiedUserPreview = {
  id: string;
  userType: UserType.SERVICE_PROVIDER | UserType.USER;
  username: string;
  email: string;
  phoneNumber: string;
  profilePicture: NullableString;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
};

export type ImageForGallery = {
  key: string;
  disabledDrag: boolean;
  disabledReSorted: boolean;
  url?: string;
  fileName?: string;
  base64URL?: string;
  fileType?: string;
  fileSize?: number;
};

export type Review = {
  id: string;
  userId: string;
  serviceId: string;
  providerId: string;
  bookingId: string;
  rating: number;
  message: string;
  reviewerName: string;
  createdAt?: string;
};

export type FirebaseNotificationData = {
  title?: string;
  message?: string;
  subtitle?: string;
  sound?: boolean | string;
  vibrate?: boolean | number[];
  priority?: AndroidNotificationPriority;
  badge?: number;
};

export type NotificationObj = {
  id: string;
  userId: string;
  notification: Notifications.Notification;
};

import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LocationObjectCoords } from "expo-location";

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
  error: Error;
  status?: number;
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
  ALL = "All",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
  MY_SERVICE = "My Service",
}

export type User = {
  id: number;
  token: NullableString;
  userType: UserType.SERVICE_PROVIDER | UserType.USER;
  username: string;
  email: string;
  phoneNumber: string;
  locations: LocationObject[];
  profilePicture: NullableString;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isActive: boolean;
  isLoggedIn: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type VerifiedUser = {
  token: string;
  authorized_account: User;
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
  id: number;
  name: string;
  description?: NullableString;
  price: number;
};

export type LocationObject = {
  name: string;
  location: LocationObjectCoords;
};

export enum PaymentStatus {
  PAID = "Paid",
  PENDING = "Pending",
  NOT_PAID = "Not Paid",
}

export type PaymentMethodObject = {
  id: number;
  name: string;
  extraData?: object;
};

export type BookingAttachment = {
  id: number;
  type: string;
  url: string;
};

export type BookingState = {
  name: BookingStatus;
  description: string;
};

export type Service = {
  id: number;
  providerId: number;
  name: string;
  description?: NullableString;
  category: ServiceCategory;
  location: LocationObject;
  coverImage: string;
  gallery?: string[];
  email: NullableString;
  website?: NullableString;
  startingPrice?: number;
  subServices?: SubService[];
  createdAt: string;
  updatedAt?: string;
  isAvailable: boolean;
  rating?: number;
  numberOfReviews?: number;
};

export type Booking = {
  id: number;
  providerId: number;
  userId: number;
  serviceId: number;
  createdAt: string;
  updatedAt: string;
  location: LocationObject;
  paymentMethodObject: PaymentMethodObject;
  paymentStatus: PaymentStatus;
  serviceType?: SubService;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  scheduledDate: string;
  scheduledTime: string;
  notes: string;
  attachments: BookingAttachment[];
  bookingStates: BookingState[];
};

export type ServiceCategory = {
  id: number;
  name: string;
  description?: NullableString;
  image?: string;
};

export type ServiceListService = {
  id: number;
  name: string;
  description?: NullableString;
  coverImage: string;
  rating?: number;
  startingPrice?: number;
  isAvailable: boolean;
};

export type ServiceProvider = {
  id: number;
  userType: UserType.SERVICE_PROVIDER | UserType.USER;
  username: string;
  email: string;
  phoneNumber: string;
  profilePicture: NullableString;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
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

export type UserForFirebase = {
  id: number;
  userType: UserType.SERVICE_PROVIDER | UserType.USER;
  username: string;
  email: string;
  phoneNumber: string;
  profilePicture: NullableString;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
};

import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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

export type User = {
  id: number;
  token: NullableString;
  userType: UserType.SERVICE_PROVIDER | UserType.USER;
  username: string;
  email: string;
  phoneNumber: NullableString;
  location: NullableString;
  profilePicture: NullableString;
  isVerified: boolean;
  isActive: boolean;
  isLoggedIn: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type VerifiedUser = {
  token: string;
  authorized_account: User;
};

export type ReduxState = {
  user: VerifiedUser;
  // services: Service[];
  // bookings: Booking[];
  // filters: {};
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
  name: string;
  description?: NullableString;
  price: number;
};

export type Service = {
  id: number;
  providerId: number;
  name: string;
  description?: NullableString;
  category: string;
  location: string;
  coverImage: string;
  gallery?: string[];
  email: NullableString;
  website?: NullableString;
  startingPrice?: number;
  subServices?: SubService[];
  createdAt: Date;
  updatedAt?: Date;
  isAvailable: boolean;
  rating?: number;
};

export type Booking = {};

export type ServiceCategory = {
  id: number;
  name: string;
  description?: NullableString;
  icon?: React.ReactElement;
  image?: string;
};

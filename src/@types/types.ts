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

export enum Filters {
  SERVICE_CATEGORY = "service_category",
}

export type User = {
  id: number;
  token: NullableString;
  userType: UserType.SERVICE_PROVIDER | UserType.USER;
  username: string;
  email: string;
  phoneNumber: string;
  location: NullableString;
  profilePicture: NullableString;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
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
  filters: {
    [Filters.SERVICE_CATEGORY]: ServiceCategory;
  };
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
  category: ServiceCategory;
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
  numberOfReviews?: number;
};

export type Booking = {};

export type ServiceCategory = {
  id: number;
  name: string;
  description?: NullableString;
  icon?: React.ReactElement;
  image?: string;
};

export type ServiceListService = {
  id: number;
  name: string;
  description?: NullableString;
  coverImage: string;
  rating?: number;
  startingPrice?: number;
};

export type ServiceProvider = {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  profilePicture: NullableString;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
};

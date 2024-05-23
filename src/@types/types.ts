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

export enum TransformCase {
  CamelCase = "camel_case",
  SnakeCase = "snake_case",
}

export enum UserType {
  USER = "User",
  SERVICE_PROVIDER = "Service Provider",
}

export type User = {
  id: number;
  userType: UserType.SERVICE_PROVIDER | UserType.USER;
  username: string;
  email: string;
  phoneNumber: NullableString;
  location: NullableString;
  profilePicture: NullableString;
  isVerified: boolean;
  isActive: boolean;
  isLoggedIn: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Service = {};

export type Booking = {};

export type ReduxState = {
  user: User;
  services: Service[];
  bookings: Booking[];
  filters: {};
};

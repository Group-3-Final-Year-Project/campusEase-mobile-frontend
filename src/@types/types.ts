import { NavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type CustomNavigationProp = {
  navigation: NativeStackNavigationProp<any>;
};

export type User = {
  id: string;
};

export type ServiceProvider = User & {};

export type Service = {};

export type Booking = {};

export type ReduxState = {};

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Booking,
  Service,
  ServiceListService,
  ServiceProvider,
  User,
  UserForFirebase,
} from "~src/@types/types";
import bookingsData from "~src/data/bookingsData";
import servicesData from "~src/data/servicesData";
import usersData from "~src/data/usersData";
import { STORAGE_KEYS } from "~src/shared/constants";

export const getServices = () => {};
export const getBookings = () => {};
export const getBookmarks = async () => {
  const bookmarks = await AsyncStorage.getItem(STORAGE_KEYS.BOOKMARKS);
  return bookmarks ? (JSON.parse(bookmarks) as ServiceListService[]) : [];
};

export const setBookmarks = async (services: ServiceListService[]) => {
  const bookmarks = await getBookmarks();
  bookmarks.push(...services);
  AsyncStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
};
export const extractUserDataForFirebase = (userData: User) => {
  const currentUserForFirebase: UserForFirebase = {
    id: userData.id,
    email: userData.email,
    username: userData.username,
    phoneNumber: userData.phoneNumber,
    isEmailVerified: userData.isEmailVerified,
    isPhoneVerified: userData.isPhoneVerified,
    profilePicture: userData.profilePicture,
    userType: userData.userType,
  };
  return currentUserForFirebase;
};

export const getServiceProviderData = (providerId: number): ServiceProvider => {
  const { authorized_account } = usersData.filter(
    ({ authorized_account }) => authorized_account.id === providerId
  )[0];
  return {
    id: authorized_account.id,
    username: authorized_account.username,
    email: authorized_account.email,
    phoneNumber: authorized_account.phoneNumber,
    profilePicture: authorized_account.profilePicture,
    isEmailVerified: authorized_account.isEmailVerified,
    isPhoneVerified: authorized_account.isPhoneVerified,
    userType: authorized_account.userType,
  };
};

export const getServiceData = (serviceId: number): Service => {
  const service = servicesData.filter((service) => service.id === serviceId)[0];
  return service;
};

export const createBooking = (booking: Booking) => {
  bookingsData.push(booking);
};

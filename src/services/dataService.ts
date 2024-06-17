import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDoc } from "firebase/firestore";
import { firestoreDatabase } from "firebaseConfig";
import { ServiceListService } from "~src/@types/types";
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

export const createChatRoom = async (firstId: number, secondId: number) => {
  const chatRoomId = `${Math.min(firstId, secondId)}-${Math.max(
    firstId,
    secondId
  )}`;
  const collectionRef = collection(
    firestoreDatabase,
    "chatRooms",
    chatRoomId,
    "messages"
  );
  return collectionRef;
};

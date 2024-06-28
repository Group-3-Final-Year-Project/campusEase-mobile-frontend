import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp } from "@react-navigation/native";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firestoreDatabase } from "firebaseConfig";
import {
  Booking,
  Service,
  ServiceCategory,
  ServiceListService,
  VerifiedUser,
  VerifiedUserPreview,
} from "~src/@types/types";
import bookingsData from "~src/data/bookingsData";
import { APP_PAGES, STORAGE_KEYS } from "~src/shared/constants";

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
export const extractUserDataForFirebase = (userData: VerifiedUser) => {
  const currentUserForFirebase: VerifiedUserPreview = {
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

export const extractServiceForServiceList = (services: Service[]) => {
  const serviceList: ServiceListService[] = services.map((service) => {
    return {
      id: service.id,
      name: service.name,
      description: service?.description,
      coverImage: service.coverImage,
      rating: service?.rating,
      startingPrice: service?.startingPrice,
      isAvailable: service.isAvailable,
    };
  });
  return serviceList;
};

export const getUser = async (userId: string): Promise<VerifiedUser> => {
  const docRef = await getDoc(
    doc(firestoreDatabase, STORAGE_KEYS.DB_USERS, userId)
  );

  return {
    id: docRef.id,
    ...docRef.data(),
  } as VerifiedUser;
};

export const getUserDataPreview = async (
  userId: string
): Promise<VerifiedUserPreview> => {
  const user = await getUser(userId);

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
    profilePicture: user.profilePicture,
    isEmailVerified: user.isEmailVerified,
    isPhoneVerified: user.isPhoneVerified,
    userType: user.userType,
  } as VerifiedUserPreview;
};

export const createBooking = (booking: Booking) => {
  bookingsData.push(booking);
};

export const createService = async (serviceData: Service) => {
  await addDoc(
    collection(firestoreDatabase, STORAGE_KEYS.SERVICES),
    serviceData
  )
    .then((result) => result)
    .catch((error) => {});
};

export const createUser = async (user: VerifiedUser) => {
  await setDoc(doc(firestoreDatabase, STORAGE_KEYS.DB_USERS, user.id), user);
};

export const getServices = async (userId: string): Promise<Service[]> => {
  const q = query(
    collection(firestoreDatabase, STORAGE_KEYS.SERVICES),
    where("providerId", "!=", userId)
  );
  const querySnapshot = await getDocs(q);
  const services = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as Service;
  });
  return services;
};

export const getService = async (serviceId: string): Promise<Service> => {
  const docRef = await getDoc(
    doc(firestoreDatabase, STORAGE_KEYS.SERVICES, serviceId)
  );
  return {
    id: docRef.id,
    ...docRef.data(),
  } as Service;
};

export const getMyServices = async (providerId: string) => {
  const q = query(
    collection(firestoreDatabase, STORAGE_KEYS.SERVICES),
    where("providerId", "==", providerId)
  );
  const querySnapshot = await getDocs(q);
  const services = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as Service;
  });
  return services;
};

export const getServiceCategories = async () => {
  const querySnapshot = await getDocs(
    collection(firestoreDatabase, STORAGE_KEYS.SERVICE_CATEGORIES)
  );
  const categories = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as ServiceCategory;
  });
  return categories;
};

export const generateChatId = (id1: string, id2: string) => {
  const sortedIds = [id1, id2].sort((a, b) => a.localeCompare(b));
  const uniqueId = sortedIds.join("");
  return uniqueId;
};

export const openChat = async (
  navigation: NavigationProp<any>,
  currentUser: VerifiedUserPreview,
  userToChatWith: VerifiedUserPreview
) => {
  const chatId = generateChatId(currentUser.id, userToChatWith.id);
  const chatRef = doc(firestoreDatabase, STORAGE_KEYS.CHATROOMS, chatId);
  const messagesRef = collection(chatRef, STORAGE_KEYS.MESSAGES);

  const chatDocSnap = await getDoc(chatRef);
  if (!chatDocSnap.exists()) {
    await setDoc(chatRef, {});

    await setDoc(
      doc(
        firestoreDatabase,
        STORAGE_KEYS.CHATROOMS,
        chatId,
        STORAGE_KEYS.USERS,
        currentUser.id.toString()
      ),
      currentUser
    );
    await setDoc(
      doc(
        firestoreDatabase,
        STORAGE_KEYS.CHATROOMS,
        chatId,
        STORAGE_KEYS.USERS,
        userToChatWith.id.toString()
      ),
      userToChatWith
    );

    await setDoc(doc(messagesRef), {});
  } else {
    console.log("Chat already exists.");
  }
  navigation.navigate(APP_PAGES.CHAT, { chatId });
};

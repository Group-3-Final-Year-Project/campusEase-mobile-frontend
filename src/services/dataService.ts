import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp } from "@react-navigation/native";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  or,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { firebaseCloudStorage, firestoreDatabase } from "firebaseConfig";
import {
  Booking,
  BookingStatus,
  Review,
  Service,
  ServiceCategory,
  ServiceListService,
  VerifiedUser,
  VerifiedUserPreview,
} from "~src/@types/types";
import { categoriesData } from "~src/data/categories";
import { APP_PAGES, STORAGE_KEYS } from "~src/shared/constants";
import axios from "axios";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export const getBookmarks = async () => {
  const bookmarks = await AsyncStorage.getItem(STORAGE_KEYS.BOOKMARKS);
  return bookmarks ? (JSON.parse(bookmarks) as ServiceListService[]) : [];
};
export const setBookmarks = async (services: ServiceListService[]) => {
  const bookmarks = await getBookmarks();
  const bookmarksMap = new Map(
    bookmarks.map((service) => [service.id, service])
  ); // Create a Map for efficient lookup by ID

  const servicesToAdd = services.filter(
    (service) => !bookmarksMap.has(service.id)
  ); // Use Map's 'has' for faster existence check

  bookmarks.push(...servicesToAdd);

  await AsyncStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
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

export const createBooking = async (booking: Booking) => {
  await setDoc(
    doc(firestoreDatabase, STORAGE_KEYS.BOOKINGS, booking.id),
    booking
  );
};

export const updateBooking = async (bookingId: string, data: any) => {
  const docRef = doc(firestoreDatabase, STORAGE_KEYS.BOOKINGS, bookingId);
  await updateDoc(docRef, data);
};

export const createService = async (serviceData: Service) => {
  await setDoc(
    doc(firestoreDatabase, STORAGE_KEYS.SERVICES, serviceData.id),
    serviceData
  );
};

export const createUser = async (user: VerifiedUser) => {
  await setDoc(doc(firestoreDatabase, STORAGE_KEYS.DB_USERS, user.id), user);
};

export const updateUser = async (userId: string, data: any) => {
  const docRef = doc(firestoreDatabase, STORAGE_KEYS.DB_USERS, userId);
  await updateDoc(docRef, data);
};

export const getServices = async (
  userId: string,
  lim: number = 15,
  offst: number = 0
): Promise<Service[]> => {
  const q = query(
    collection(firestoreDatabase, STORAGE_KEYS.SERVICES),
    where("providerId", "!=", userId),
    limit(lim)
    // startAt(offst)
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

export const getServiceCategories = (): ServiceCategory[] => {
  return Object.values(categoriesData);
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
  navigation.navigate(APP_PAGES.CHAT, {
    chatId,
    chatPerson: userToChatWith.username,
  });
};

export const getMyBookingsAsUser = async (userId: string) => {
  const q = query(
    collection(firestoreDatabase, STORAGE_KEYS.BOOKINGS),
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(q);
  const bookings = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as Booking;
  });
  return bookings;
};

export const getMyBookingsAsServiceProvider = async (userId: string) => {
  const q = query(
    collection(firestoreDatabase, STORAGE_KEYS.BOOKINGS),
    where("userId", "!=", userId)
  );
  const querySnapshot = await getDocs(q);
  const bookings = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as Booking;
  });
  return bookings;
};

export const getBookingsAsUserOrProvider = async (userId: string) => {
  const q = query(
    collection(firestoreDatabase, STORAGE_KEYS.BOOKINGS),
    or(where("userId", "==", userId), where("providerId", "==", userId))
  );
  const querySnapshot = await getDocs(q);
  const bookings = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as Booking;
  });
  return bookings;
};

export const getMyCurrentBookingList = async (userId: string) => {
  const bookings = await getBookingsAsUserOrProvider(userId);
  return bookings.filter(
    (booking) =>
      booking.bookingStatus === BookingStatus.PENDING ||
      booking.bookingStatus === BookingStatus.IN_PROGRESS
  );
};

export const getBooking = async (bookingId: string) => {
  const docRef = await getDoc(
    doc(firestoreDatabase, STORAGE_KEYS.BOOKINGS, bookingId)
  );
  return {
    id: docRef.id,
    ...docRef.data(),
  } as Booking;
};

export const getFormattedAddressFromGeocode = async (
  lat: number,
  lng: number
): Promise<string> => {
  const result = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCmfGRs96TGPEAqqItmSry_yJzQ8WjeF7o`
  );

  return result.data?.results[0]?.formatted_address ?? "";
};

export const uploadFileToFirebaseStorage = async (file: {
  fileName: string;
  base64String: string;
  fileType?: string;
  fileSize?: number;
}): Promise<string> => {
  const res = await fetch(file.base64String);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const storageRef = ref(firebaseCloudStorage, file.fileName);

    const uploadTask = uploadBytesResumable(storageRef, blob, {
      contentType: file.fileType,
      customMetadata: {
        fileSize: file.fileSize ? file.fileSize.toString() : "",
      },
    });
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
          case "success":
            break;
          case "error":
            break;
          case "canceled":
            break;
        }
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("Download URL: " + downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
};

export const downloadFileFromFirebaseStorage = async (fileName: string) => {
  const fileRef = ref(firebaseCloudStorage, fileName);
  const URL = await getDownloadURL(fileRef).then((downloadURL) => downloadURL);
  return URL;
};

export const deleteFileFromFirebaseStorage = async (fileName: string) => {
  const fileRef = ref(firebaseCloudStorage, fileName);
  await deleteObject(fileRef)
    .then(() => {})
    .catch(() => {});
};

export const getOverallReviewsDataAboutService = async (
  serviceId: string
): Promise<Review[]> => {};

export const createReview = async (review: Review) => {
  await setDoc(doc(firestoreDatabase, STORAGE_KEYS.REVIEWS, review.id), review);
};

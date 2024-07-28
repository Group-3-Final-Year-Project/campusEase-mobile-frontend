import {
  BookingStatus,
  Filters,
  PaymentStatus,
  ReduxState,
  UserType,
} from "~src/@types/types";
import { DefaultTheme } from "~src/shared/theme";

const INITIAL_STATE: ReduxState = {
  user: {
    id: "",
    userType: UserType.USER,
    username: "",
    email: "",
    phoneNumber: "",
    locations: [],
    profilePicture: null,
    isEmailVerified: false,
    isPhoneVerified: false,
    isActive: false,
    isLoggedIn: false,
    createdAt: undefined,
  },
  // services: [],
  // bookings: [],
  filters: {
    [Filters.SERVICE_CATEGORY]: {
      id: "",
      name: "",
    },
  },
  chat: {
    messages: [],
    step: 0,
    loadEarlier: true,
    isLoadingEarlier: false,
    isTyping: false,
  },
  booking: {
    id: "",
    providerId: "",
    userId: "",
    serviceId: "",
    createdAt: "",
    updatedAt: "",
    location: {
      name: "",
      location: {
        latitude: 0,
        longitude: 0,
        altitude: null,
        accuracy: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      id: ""
    },
    paymentMethodObject: {
      id: "",
      name: "",
      extraData: undefined,
    },
    paymentStatus: PaymentStatus.NOT_PAID,
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    scheduledDate: "",
    scheduledTime: "",
    notes: "",
    attachments: [],
    bookingStates: [],
    serviceName: "",
    amount: 0,
    bookingStatus: BookingStatus.PENDING,
    requestCompletedConfirmationFromUser: false,
    requestCompletedConfirmationFromProvider: false
  },
  serviceInCreation: {
    id: "",
    providerId: "",
    name: "",
    category: {
      id: "",
      name: "",
      description: undefined,
    },
    location: {
      name: "",
      address: undefined,
      location: {
        latitude: 0,
        longitude: 0,
        altitude: null,
        accuracy: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      id: ""
    },
    coverImage: "",
    email: null,
    createdAt: "",
    isAvailable: false,
    startingPrice: 0
  },
  theme: "dark"
};

export default INITIAL_STATE;

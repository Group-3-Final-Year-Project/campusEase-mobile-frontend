import {
  Filters,
  PaymentStatus,
  ReduxState,
  UserType,
} from "~src/@types/types";

const INITIAL_STATE: ReduxState = {
  user: {
    authorized_account: {
      id: 0,
      userType: UserType.USER,
      token: null,
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
    token: "",
  },
  // services: [],
  // bookings: [],
  filters: {
    [Filters.SERVICE_CATEGORY]: {
      id: 0,
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
    id: 0,
    providerId: 0,
    userId: 0,
    serviceId: 0,
    createdAt: 0,
    updatedAt: 0,
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
      },
    },
    paymentMethodObject: {
      id: 0,
      name: "",
      extraData: undefined,
    },
    paymentStatus: PaymentStatus.NOT_PAID,
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    scheduledDate: 0,
    scheduledTime: 0,
    notes: "",
    attachments: [],
    bookingStates: [],
  },
};

export default INITIAL_STATE;

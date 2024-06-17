import { Filters, ReduxState, UserType } from "~src/@types/types";

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
};

export default INITIAL_STATE;

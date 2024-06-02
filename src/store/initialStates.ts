import { ReduxState, UserType } from "~src/@types/types";

const INITIAL_STATE: ReduxState = {
  user: {
    authorized_account: {
      id: 0,
      userType: UserType.USER,
      token: null,
      username: "",
      email: "",
      phoneNumber: null,
      location: null,
      profilePicture: null,
      isVerified: false,
      isActive: false,
      isLoggedIn: false,
      createdAt: undefined,
    },
    token: "",
  },
  // services: [],
  // bookings: [],
  // filters: {},
};

export default INITIAL_STATE;

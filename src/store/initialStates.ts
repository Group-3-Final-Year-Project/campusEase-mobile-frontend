import { ReduxState, UserType } from "~src/@types/types";

const INITIAL_STATE: ReduxState = {
  user: {
    id: 0,
    userType: UserType.USER,
  },
  // services: [],
  // bookings: [],
  // filters: {},
};

export default INITIAL_STATE;

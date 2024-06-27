import ACTION_TYPES from "~store/actionTypes";
import INITIAL_STATE from "../initialStates";

const BookingReducer = (
  state = INITIAL_STATE.booking,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_BOOKING_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ACTION_TYPES.CLEAR_BOOKING_DATA: {
      return {};
    }
    default: {
      return state;
    }
  }
};

export default BookingReducer;

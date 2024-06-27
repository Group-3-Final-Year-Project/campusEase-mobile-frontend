import { ReduxState } from "~src/@types/types";
import ACTION_TYPES from "~store/actionTypes";

export const updateBookingData = (data: Partial<ReduxState["booking"]>) => {
  return {
    type: ACTION_TYPES.UPDATE_USER_DATA,
    payload: data,
  };
};

export const clearBookingData = () => {
  return {
    type: ACTION_TYPES.CLEAR_BOOKING_DATA,
    payload: {},
  };
};

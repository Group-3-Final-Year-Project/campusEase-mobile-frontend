import { ReduxState } from "~src/@types/types";
import ACTION_TYPES from "~store/actionTypes";

export const updateUserData = (data: Partial<ReduxState["user"]>) => {
  return {
    type: ACTION_TYPES.UPDATE_USER_DATA,
    payload: data,
  };
};

import ACTION_TYPES from "~store/actionTypes";
import INITIAL_STATE from "../initialStates";

const UserReducer = (
  state = INITIAL_STATE.user,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.UPDATE_USER_DATA:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default UserReducer;

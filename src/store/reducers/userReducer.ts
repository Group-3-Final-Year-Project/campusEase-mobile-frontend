import ACTION_TYPES from "~store/actionTypes";
import INITIAL_STATE from "../initialStates";

const UserReducer = (
  state = INITIAL_STATE.user,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_USER_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ACTION_TYPES.LOG_OUT_USER: {
      return {};
    }
    default: {
      return state;
    }
  }
};

export default UserReducer;

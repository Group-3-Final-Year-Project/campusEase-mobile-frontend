import ACTION_TYPES from "~store/actionTypes";
import INITIAL_STATE from "../initialStates";
import { createReducer } from "@reduxjs/toolkit";

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

// const UserReducer = createReducer(INITIAL_STATE.user, (builder) => {
//   builder
//     .addCase(ACTION_TYPES.UPDATE_USER_DATA, (state, action) => {
//       return { ...state, ...action.payload };
//     })
//     .addDefaultCase((state, action) => {
//       return state;
//     });
// });

export default UserReducer;

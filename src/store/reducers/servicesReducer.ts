import ACTION_TYPES from "~store/actionTypes";
import INITIAL_STATE from "../initialStates";
import { createReducer } from "@reduxjs/toolkit";

// const ServicesReducer = (
//   state = INITIAL_STATE.services,
//   action: { type: string; payload: any }
// ) => {
//   const { type, payload } = action;
//   switch (type) {
//     case ACTION_TYPES.UPDATE_USER_DATA:
//       return {
//         ...state,
//         ...payload,
//       };
//     default:
//       return state;
//   }
// };

// const ServicesReducer = createReducer(INITIAL_STATE.services, (builder) => {
//   builder.addCase(ACTION_TYPES.UPDATE_SERVICES, (state, action) => {
//   })
// })

// export default ServicesReducer;

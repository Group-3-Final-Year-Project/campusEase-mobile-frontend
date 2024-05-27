import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import INITIAL_STATE from "./initialStates";

const store = configureStore({
  preloadedState: INITIAL_STATE,
  reducer: rootReducer,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

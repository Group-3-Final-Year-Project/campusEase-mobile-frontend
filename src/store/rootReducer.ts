import { combineReducers } from "redux";
import UserReducer from "./reducers/userReducer";
import FilterReducer from "./reducers/filterReducer";
import ChatReducer from "./reducers/chatReducer";
import BookingReducer from "./reducers/bookingReducer";
import ServiceInCreationReducer from "./reducers/serviceInCreationReducer";
import ThemeReducer from "./reducers/themeReducer";

const appReducer = combineReducers({
  user: UserReducer,
  filters: FilterReducer,
  chat: ChatReducer,
  booking: BookingReducer,
  serviceInCreation: ServiceInCreationReducer,
  theme:ThemeReducer,
});

export const RootActions = {
  RESET: "RESET_REDUX",
};
export const resetReduxStore = () => ({ type: RootActions.RESET });

const rootReducer = (
  state: {} | Partial<{}> | undefined,
  action: { type: string; payload: any }
) => {
  if (action.type === RootActions.RESET) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;

export type RootReducer = ReturnType<typeof rootReducer>;

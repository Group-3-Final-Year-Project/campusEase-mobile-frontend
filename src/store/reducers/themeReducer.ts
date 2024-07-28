import ACTION_TYPES from "~store/actionTypes";
import INITIAL_STATE from "../initialStates";
import * as NavigationBar from 'expo-navigation-bar';
import { setNavbar, setStatusbar } from "~services";

const UserReducer = (
  state = INITIAL_STATE.theme,
  action: { type: string}
) => {
  switch (action.type) {
      case ACTION_TYPES.TOGGLE_THEME: {
          if (state === "light") {
              setNavbar("#181820")
              setStatusbar("#181820","light-content");
          }
          else {
              setNavbar("#ffffff")
            setStatusbar("#ffffff", "dark-content");

          }
      return state === "light" ? "dark"  : "light"; 
    }
    default: {
      return state;
    }
  }
};

export default UserReducer;

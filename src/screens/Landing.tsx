import React, { useEffect } from "react";
import {
  isAlreadyLoggedIn,
  isAlreadyUser,
  navigateAndResetStack,
  readLoginDataFromAsyncStorage,
  setAsLoggedOut,
} from "~services";
import { APP_PAGES } from "~src/shared/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAppDispatch } from "~store/hooks/useTypedRedux";
import { updateUserData } from "~store/actions/userActions";

const Landing = ({ navigation }: NativeStackScreenProps<any>) => {
  useEffect(() => {
    checkLoginAndNavigate();
  }, []);

  const dispatch = useAppDispatch();

  const checkLoginAndNavigate = async () => {
    const loggedIn = await isAlreadyLoggedIn();
    if (loggedIn) {
      const loginData = await readLoginDataFromAsyncStorage();
      console.log("LD: ", loginData);
      if (!loginData) {
        navigateAndResetStack(navigation, APP_PAGES.SIGNIN);
        setAsLoggedOut();
        return;
      }
      dispatch(updateUserData(loginData));
      navigation.replace(APP_PAGES.USER_TAB);
    } else {
      const alreadyUser = await isAlreadyUser();
      if (alreadyUser) navigation.replace(APP_PAGES.SIGNIN);
      else navigation.replace(APP_PAGES.ONBOARD);
    }
  };
  return null;
};

export default Landing;

import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  isAlreadyLoggedIn,
  isFirstTimeUser,
  navigateAndResetStack,
  readLoginDataFromAsyncStorage,
  setAsLoggedOut,
} from "~services";
import { APP_PAGES } from "~src/shared/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAppDispatch } from "~store/hooks/useTypedRedux";
import { updateUserData } from "~store/actions/userActions";

const Landing = ({ navigation }: NativeStackScreenProps<any>) => {
  useFocusEffect(
    useCallback(() => {
      checkLoginAndNavigate();
    }, [])
  );

  const dispatch = useAppDispatch();

  const checkLoginAndNavigate = async () => {
    const loggedIn = await isAlreadyLoggedIn();
    if (loggedIn) {
      const loginData = await readLoginDataFromAsyncStorage();
      if (!loginData) {
        navigateAndResetStack(navigation, APP_PAGES.SIGNINUP);
        setAsLoggedOut();
        return;
      }
      dispatch(updateUserData(loginData));
      navigation.replace(APP_PAGES.HOME);
    } else {
      const firstTime = await isFirstTimeUser();
      if (firstTime) navigation.replace(APP_PAGES.ONBOARD);
      else navigation.replace(APP_PAGES.SIGNINUP);
    }
  };
  return null;
};

export default Landing;

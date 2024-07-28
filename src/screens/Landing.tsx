import React, { useEffect } from "react";
import {
  checkIfServiceProviderHasService,
  directServiceProviderToServiceCreation,
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
import { UserType } from "~src/@types/types";

const Landing = ({ navigation }: NativeStackScreenProps<any>) => {
  useEffect(() => {
    checkLoginAndNavigate();
  }, []);

  const dispatch = useAppDispatch();

  const checkLoginAndNavigate = async () => {
    const loggedIn = await isAlreadyLoggedIn();
    if (loggedIn) {
      const loginData = await readLoginDataFromAsyncStorage();
      if (!loginData) {
        navigateAndResetStack(navigation, APP_PAGES.SIGNIN);
        setAsLoggedOut();
        return;
      }
      dispatch(updateUserData(loginData));
      if (loginData.userType === UserType.SERVICE_PROVIDER) {
        const serviceProviderHasService =
          await checkIfServiceProviderHasService(loginData.id);
        console.log("HasService?: ", serviceProviderHasService);
        serviceProviderHasService
          ? navigateAndResetStack(navigation, APP_PAGES.USER_TAB)
          : directServiceProviderToServiceCreation(navigation);
      } else {
        navigateAndResetStack(navigation, APP_PAGES.USER_TAB);
      }
    } else {
      const alreadyUser = await isAlreadyUser();
      if (alreadyUser) navigation.replace(APP_PAGES.SIGNIN);
      else navigation.replace(APP_PAGES.ONBOARD);
    }
  };
  return null;
};

export default Landing;

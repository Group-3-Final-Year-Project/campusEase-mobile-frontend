import { View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  getFirebaseErrorMessage,
  getUser,
  navigateAndResetStack,
  saveUserDetails,
  showAlert,
  updateUser,
} from "~services";
import { SuccessState } from "~components";
import LottieView from "lottie-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { APP_PAGES } from "~src/shared/constants";
import { Container } from "../Signup/styles";
import ACTION_TYPES from "~store/actionTypes";
import { Service, UserType, VerifiedUser } from "~src/@types/types";
import { useAppDispatch, useAppSelector } from "~store/hooks/useTypedRedux";

const ServiceCreationSuccess = ({
  navigation,
}: NativeStackScreenProps<any>) => {
  const confettiRef = useRef<LottieView>(null);
  const [isVisible, setIsVisible] = useState(true);

  const user: VerifiedUser = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handlePress = () => {
    navigateAndResetStack(navigation, APP_PAGES.USER_TAB);
  };

  const setUserTypeToServiceProvider = useCallback(async () => {
    if (user.userType === UserType.USER) {
      try {
        await updateUser(user.id, {
          userType: UserType.SERVICE_PROVIDER,
        })
          .then(async () => {
            const userDataFromDB = await getUser(user.id);
            await saveUserDetails(userDataFromDB);
            dispatch({
              type: ACTION_TYPES.UPDATE_USER_DATA,
              payload: userDataFromDB,
            });
          })
          .catch((error: any) => {
            showAlert("Oops!", getFirebaseErrorMessage(error.code));
          });
      } catch (error) {
        showAlert(
          "Oops!",
          "Something went wrong while making you a service provider"
        );
      }
    }
  }, []);

  useEffect(() => {
    setUserTypeToServiceProvider();
  }, []);

  return (
    <Container
      style={{
        padding: 15,
        paddingBottom: 30,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <SuccessState
          title="Congratulations once again"
          description="Your service has been registered successfully."
          onContinue={handlePress}
        />
        {isVisible && (
          <LottieView
            ref={confettiRef}
            source={require("~animations/confetti.json")}
            autoPlay={true}
            loop={false}
            onAnimationFinish={() => {
              confettiRef.current?.componentWillUnmount?.();
              setIsVisible(false);
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000,
              pointerEvents: "none",
            }}
            resizeMode="cover"
          />
        )}
      </View>
    </Container>
  );
};

export default ServiceCreationSuccess;

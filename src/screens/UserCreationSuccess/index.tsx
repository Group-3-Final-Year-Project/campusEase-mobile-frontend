import { View } from "react-native";
import React, { useRef, useState } from "react";
import { useAppSelector } from "~store/hooks/useTypedRedux";
import { UserType, VerifiedUser } from "~src/@types/types";
import { navigateAndResetStack } from "~services";
import { SuccessState } from "~components";
import LottieView from "lottie-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { APP_PAGES } from "~src/shared/constants";
import { Container } from "../Signup/styles";

const UserCreationSuccess = ({ navigation }: NativeStackScreenProps<any>) => {
  const user: VerifiedUser = useAppSelector((state) => state.user);
  const confettiRef = useRef<LottieView>(null);
  const [isVisible, setIsVisible] = useState(true);

  const handlePress = () => {
    if (user.userType === UserType.USER)
      navigateAndResetStack(navigation, APP_PAGES.USER_TAB);
    else if (user.userType === UserType.SERVICE_PROVIDER)
      navigateAndResetStack(navigation, APP_PAGES.SET_SERVICE_DETAILS);
    else return;
  };

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
          title="Congratulations"
          description={
            user.userType === UserType.SERVICE_PROVIDER
              ? `Your account has been created successfully!\nNow, let's set up your service as well.`
              : `Your account has been created successfully!`
          }
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

export default UserCreationSuccess;

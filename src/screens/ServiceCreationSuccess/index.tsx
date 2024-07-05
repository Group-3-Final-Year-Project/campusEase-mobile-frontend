import { View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppSelector } from "~store/hooks/useTypedRedux";
import { Service, VerifiedUser } from "~src/@types/types";
import { createService, navigateAndResetStack } from "~services";
import { Container, Description } from "../Onboard/styles";
import { Button, EmptyState, SuccessState } from "~components";
import Empty from "~assets/images/empty.svg";
import LottieView from "lottie-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { APP_PAGES } from "~src/shared/constants";
const ServiceCreationSuccess = ({
  navigation,
}: NativeStackScreenProps<any>) => {
  const confettiRef = useRef<LottieView>(null);

  const handlePress = () => {
    navigation.navigate(APP_PAGES.USER_TAB);
  };

  return (
    <Container style={{ paddingHorizontal: 15 }}>
      <View>
        <SuccessState
          title="Congratulations once again"
          description="Your service has been registered successfully."
          onContinue={handlePress}
        />
        <LottieView
          ref={confettiRef}
          source={require("~animations/confetti.json")}
          autoPlay={true}
          loop={false}
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
      </View>
    </Container>
  );
};

export default ServiceCreationSuccess;

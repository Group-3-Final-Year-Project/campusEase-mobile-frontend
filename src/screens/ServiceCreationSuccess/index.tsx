import { View } from "react-native";
import React, { useRef, useState } from "react";
import { navigateAndResetStack } from "~services";
import { SuccessState } from "~components";
import LottieView from "lottie-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { APP_PAGES } from "~src/shared/constants";
import { Container } from "../Signup/styles";

const ServiceCreationSuccess = ({
  navigation,
}: NativeStackScreenProps<any>) => {
  const confettiRef = useRef<LottieView>(null);
  const [isVisible, setIsVisible] = useState(true);

  const handlePress = () => {
    navigateAndResetStack(navigation, APP_PAGES.USER_TAB);
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

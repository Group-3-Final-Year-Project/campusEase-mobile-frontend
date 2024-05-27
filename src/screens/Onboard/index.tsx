import React, { useContext } from "react";
import {
  BottomCard,
  Container,
  Description,
  TopCard,
  HighlightedDescription,
} from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "~components";
import { KeyboardAvoidingView, Platform, Pressable } from "react-native";
import { ThemeContext } from "styled-components/native";
import { APP_PAGES } from "~src/shared/constants";

import { StatusBar } from "expo-status-bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Carousel } from "react-native-ui-lib";
import { setUserType } from "~services";
import { UserType } from "~src/@types/types";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const Onboard = ({ navigation }: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);

  const handleGoToSignup = async () => {
    navigation.navigate(APP_PAGES.SIGNINUP, { isSignup: true });
  };

  const handleUserTypeSelection = async (userType: UserType) => {
    await setUserType(userType).then(() => {
      navigation.navigate(APP_PAGES.SIGNINUP, { isSignup: true });
    });
  };

  const bottomCardTabs = [
    {
      index: 0,
      component: (
        <>
          <Button onPress={handleGoToSignup}>Get started</Button>
          <Pressable
            onPress={() =>
              navigation.navigate(APP_PAGES.SIGNINUP, { isSignup: false })
            }
          >
            <Description>
              Already have an account?{" "}
              <HighlightedDescription>Log in</HighlightedDescription>
            </Description>
          </Pressable>
        </>
      ),
    },
    {
      index: 1,
      component: (
        <>
          <Button onPress={() => handleUserTypeSelection(UserType.USER)}>
            User
          </Button>
          <Button
            onPress={() => handleUserTypeSelection(UserType.SERVICE_PROVIDER)}
          >
            Service provider
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flexGrow: 1 }}
      >
        <StatusBar style={themeContext?.dark ? "light" : "dark"} />
        <TopCard
          source={
            themeContext?.dark
              ? require("~images/background-dark.png")
              : require("~images/background-light.png")
          }
          style={{ paddingTop: 60 + insets.top }}
        >
          {/* <Logo
            style={{ marginBottom: 25 }}
            width={70}
            height={70}
            fill={themeContext?.colors.text}
          /> */}
        </TopCard>
        <BottomCard style={{ paddingBottom: bottomInset }}>
          <Carousel
            loop={false}
            autoplay={false}
            allowAccessibleLayout
            centerContent
            disableIntervalMomentum
          >
            {bottomCardTabs.map((tab) => tab.component)}
          </Carousel>
        </BottomCard>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Onboard;

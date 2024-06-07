import React, { useContext } from "react";
import {
  BottomCard,
  Container,
  HighlightedDescription,
  TopCard,
  Description,
} from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "~components";
import { KeyboardAvoidingView, Platform, View, Pressable } from "react-native";
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
    navigation.navigate(APP_PAGES.SIGNUP);
  };

  const handleUserTypeSelection = async (userType: UserType) => {
    await setUserType(userType).then(() => {
      navigation.navigate(APP_PAGES.SIGNUP);
    });
  };

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
          <HighlightedDescription>Get Started as ...</HighlightedDescription>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onPress={() => handleUserTypeSelection(UserType.USER)}
              variant="outline"
              style={{ marginRight: 20, flex: 1 }}
            >
              User
            </Button>
            <Button
              onPress={() => handleUserTypeSelection(UserType.SERVICE_PROVIDER)}
              variant="outline"
              style={{ flex: 1 }}
            >
              Service provi
            </Button>
          </View>
          <Pressable onPress={() => navigation.replace(APP_PAGES.SIGNIN)}>
            <Description
              style={{
                textAlign: "center",
                marginTop: 20,
                fontSize: 12,
              }}
            >
              Already have an account?{" "}
              <HighlightedDescription
                style={{
                  textAlign: "center",
                  fontSize: 12,
                }}
              >
                Log in
              </HighlightedDescription>
            </Description>
          </Pressable>
        </BottomCard>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Onboard;

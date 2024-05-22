import React, { useState, useContext } from "react";
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

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const Onboard = ({ navigation }: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);

  const handleGoToSignup = async () => {
    setLoading(true);
    setTimeout(() => {
      navigation.navigate(APP_PAGES.SIGNINUP, { isSignup: true });
      setLoading(false);
    }, 1000);
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
          <Button loading={loading} onPress={handleGoToSignup}>
            Get started
          </Button>
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
        </BottomCard>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Onboard;

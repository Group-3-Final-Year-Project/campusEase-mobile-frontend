import React, { useContext } from "react";
import {
  BottomCard,
  Container,
  TopCard,
  Description,
  HighlightedDescription,
} from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, OAuthBtns } from "~components";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { ThemeContext } from "styled-components/native";
import { APP_PAGES } from "~src/shared/constants";

import { StatusBar } from "expo-status-bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import HeroImage from "~assets/images/hero.svg";

const Onboard = ({ navigation }: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const themeContext = useContext(ThemeContext);

  const handleGoToSignup = async () => {
    navigation.navigate(APP_PAGES.SIGNUP);
  };

  const handleGoToSignin = async () => {
    navigation.navigate(APP_PAGES.SIGNIN);
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flexGrow: 1 }}
      >
        <StatusBar style={themeContext?.dark ? "light" : "dark"} />
        <TopCard style={{ paddingTop: insets.top }}>
          <HeroImage width={500} height={450} />
          <HighlightedDescription
            style={{
              fontSize: 40,
              lineHeight: 40,
              marginTop: -20,
            }}
          >
            CampusEase
          </HighlightedDescription>
          <Description>
            CampusEase connects you with all the services you need, from laundry
            and food to tutoring and tech support. Enjoy!
          </Description>
        </TopCard>
        <BottomCard>
          <View>
            <Button
              onPress={() => handleGoToSignup()}
              variant="default"
              style={{ marginBottom: 10, flexGrow: 1 }}
            >
              Sign up
            </Button>
            <Button
              onPress={() => handleGoToSignin()}
              variant="outline"
              style={{ flexGrow: 1 }}
            >
              Log in
            </Button>
          </View>
          <Description
            style={{
              textAlign: "center",
              marginTop: 30,
              marginBottom: 10,
              fontSize: 10,
            }}
          >
            Or login with...
          </Description>
          <OAuthBtns />
        </BottomCard>
      </KeyboardAvoidingView>
    </Container>
  );
};
export default Onboard;

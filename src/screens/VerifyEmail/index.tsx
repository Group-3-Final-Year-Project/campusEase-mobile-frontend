import React, { useState, useContext } from "react";
import {
  Container,
  Description,
  InputLabel,
  FormControl,
  ContentCard,
  Title,
} from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Input } from "~components";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { ThemeContext } from "styled-components/native";

import { StatusBar } from "expo-status-bar";
import { Iconify } from "react-native-iconify";
import { APP_PAGES } from "~src/shared/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NumberInput, NumberInputData } from "react-native-ui-lib";
import { OtpInput } from "react-native-otp-entry";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const VerifyEmail = ({ navigation, route }: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flexGrow: 1 }}
      >
        <StatusBar style={themeContext?.dark ? "light" : "dark"} />
        <ContentCard
          style={{ paddingTop: insets.top, paddingBottom: bottomInset }}
        >
          <Title>Verify Email</Title>

          <Description
            style={{ marginTop: 20, color: themeContext?.colors.secondaryText }}
          >
            We've sent you an email with a 6-digit verification code. Enter the
            code to verify your email.
          </Description>
          <View style={{ marginTop: 40, width: "100%" }}>
            <FormControl>
              <OtpInput
                numberOfDigits={6}
                focusColor={themeContext?.colors.primary}
                focusStickBlinkingDuration={500}
                onTextChange={(text) => console.log(text)}
                onFilled={(text) => console.log(`OTP is ${text}`)}
                textInputProps={{
                  accessibilityLabel: "One-Time Password",
                }}
                theme={{
                  // containerStyle: styles.container,
                  pinCodeContainerStyle: {
                    borderColor: themeContext?.colors.text,
                  },
                  pinCodeTextStyle: {
                    color: themeContext?.colors.text,
                  },
                  // focusStickStyle: styles.focusStick,
                  // focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                }}
              />
            </FormControl>

            <FormControl>
              <Button
                loading={loading}
                onPress={() => navigation.navigate(APP_PAGES.SET_LOCATION)}
              >
                Verify email
              </Button>
            </FormControl>
          </View>
        </ContentCard>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default VerifyEmail;

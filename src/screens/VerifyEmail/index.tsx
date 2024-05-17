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
import { CustomNavigationProp } from "~src/@types/types";
import { StatusBar } from "expo-status-bar";
import { Iconify } from "react-native-iconify";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const VerifyEmail = ({ navigation, route }: CustomNavigationProp) => {
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
              <InputLabel>Verification code</InputLabel>
              <Input
                textContentType="oneTimeCode"
                placeholder="134242"
                icon={
                  <Iconify
                    color={themeContext?.colors.secondaryText2}
                    icon="solar:shield-keyhole-outline"
                  />
                }
              />
            </FormControl>

            <FormControl>
              <Button loading={loading}>Verify email</Button>
            </FormControl>
          </View>
        </ContentCard>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default VerifyEmail;

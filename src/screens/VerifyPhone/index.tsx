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
import { useCustomBottomInset } from "~hooks";
import { Button, Input } from "~components";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { ThemeContext } from "styled-components/native";

import { StatusBar } from "expo-status-bar";
import { Iconify } from "react-native-iconify";
import { APP_PAGES } from "~src/shared/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const VerifyPhone = ({ navigation, route }: NativeStackScreenProps<any>) => {
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
          <Title>Verify Phone number</Title>

          <Description
            style={{ marginTop: 20, color: themeContext?.colors.secondaryText }}
          >
            We've sent you an sms with a 6-digit verification code. Enter the
            code to verify your phone number.
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
              <Button
                loading={loading}
                onPress={() => navigation.replace(APP_PAGES.USER_TAB)}
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

export default VerifyPhone;

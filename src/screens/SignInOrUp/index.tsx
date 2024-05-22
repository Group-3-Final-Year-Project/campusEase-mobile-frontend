import React, { useState, useContext } from "react";
import {
  Container,
  Description,
  InputLabel,
  FormControl,
  ContentCard,
} from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Input } from "~components";
import HeroText from "./components/HeroText";
import { KeyboardAvoidingView, Platform, Pressable, View } from "react-native";
import { ThemeContext } from "styled-components/native";

import { StatusBar } from "expo-status-bar";
import Checkbox from "react-native-ui-lib/checkbox";
import { Iconify } from "react-native-iconify";
import { APP_PAGES } from "~src/shared/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const SignInOrUp = ({ navigation, route }: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [isSignup, setIsSignup] = useState(route.params?.isSignup ?? true);

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
          <HeroText isSignup={isSignup} />

          <Description
            style={{ marginTop: 20, color: themeContext?.colors.secondaryText }}
          >
            {isSignup
              ? "Hey there! Sign up with your email to continue."
              : "Hey there! Welcome back. You've been missed."}
          </Description>
          <View style={{ marginTop: 40, width: "100%" }}>
            {isSignup && (
              <FormControl>
                <InputLabel>Your full name</InputLabel>
                <Input
                  textContentType="name"
                  placeholder="john doe"
                  icon={
                    <Iconify
                      color={themeContext?.colors.secondaryText2}
                      icon="solar:user-rounded-outline"
                    />
                  }
                />
              </FormControl>
            )}
            <FormControl>
              <InputLabel>Your email</InputLabel>
              <Input
                textContentType="emailAddress"
                placeholder="johndoe@gmail.com"
                icon={
                  <Iconify
                    color={themeContext?.colors.secondaryText2}
                    icon="solar:letter-outline"
                  />
                }
              />
            </FormControl>
            <FormControl>
              <InputLabel>Your password</InputLabel>
              <Input
                textContentType={isSignup ? "newPassword" : "password"}
                secureTextEntry={!showPassword}
                placeholder="********"
                icon={
                  <Iconify
                    color={themeContext?.colors.secondaryText2}
                    icon="solar:shield-keyhole-outline"
                  />
                }
                rightIcon={
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <Iconify
                        color={themeContext?.colors.secondaryText2}
                        icon="solar:eye-closed-outline"
                      />
                    ) : (
                      <Iconify
                        color={themeContext?.colors.secondaryText2}
                        icon="solar:eye-outline"
                      />
                    )}
                  </Pressable>
                }
              />
            </FormControl>
            {isSignup && (
              <FormControl>
                <Checkbox
                  // value={false}
                  label="I have read and agree to the terms and conditions"
                  labelStyle={{
                    color: themeContext?.colors.secondaryText,
                  }}
                  color={themeContext?.colors.secondaryText2}
                  iconColor={themeContext?.colors.primary}
                  onValueChange={() => console.log("value changed")}
                />
              </FormControl>
            )}
            <FormControl>
              <Button
                loading={loading}
                onPress={() => navigation.navigate(APP_PAGES.VERIFY_EMAIL)}
              >
                {isSignup ? "Continue" : "Sign in"}
              </Button>
            </FormControl>
          </View>
        </ContentCard>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SignInOrUp;

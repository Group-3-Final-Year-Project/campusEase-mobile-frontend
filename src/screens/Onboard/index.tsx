import React, { useContext } from "react";
import {
  BottomCard,
  Container,
  HighlightedDescription,
  TopCard,
  Description,
} from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCustomBottomInset } from "~hooks";
import { Button, IconBtn } from "~components";
import { KeyboardAvoidingView, Platform, View, Pressable } from "react-native";
import { ThemeContext } from "styled-components/native";
import { APP_PAGES } from "~src/shared/constants";

import { StatusBar } from "expo-status-bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { setUserType } from "~services";
import { UserType } from "~src/@types/types";
import { Iconify } from "react-native-iconify";
import DeliveryImage from "~assets/images/delivery.svg";
import { Svg, SvgFromUri } from "react-native-svg";

const Onboard = ({ navigation }: NativeStackScreenProps<any>) => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);

  const handleGoToSignup = async () => {
    navigation.navigate(APP_PAGES.SIGNUP);
  };

  const handleGoToSignin = async () => {
    navigation.navigate(APP_PAGES.SIGNIN);
  };

  const oauth_btns = [
    {
      name: "Google",
      icon: <Iconify size={16} icon={"logos:google-icon"} />,
      onPress: () => null,
    },
    {
      name: "Instagram",
      icon: <Iconify size={16} icon={"logos:instagram-icon"} />,
      onPress: () => null,
    },
    {
      name: "Apple",
      icon: <Iconify size={16} icon={"logos:apple"} />,
      onPress: () => null,
    },
    {
      name: "Twitter",
      icon: <Iconify size={16} icon={"logos:twitter"} />,
      onPress: () => null,
    },
  ];

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flexGrow: 1 }}
      >
        <StatusBar style={themeContext?.dark ? "light" : "dark"} />
        <TopCard style={{ paddingTop: insets.top }}>
          <SvgFromUri uri={require("~assets/images/delivery.svg")} />
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {oauth_btns.map((item) => (
              <IconBtn
                key={item.name}
                style={{
                  height: 50,
                  width: 50,
                  paddingVertical: 12,
                  paddingHorizontal: 5,
                  marginHorizontal: 5,
                }}
              >
                {item.icon}
              </IconBtn>
            ))}
          </View>
        </BottomCard>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Onboard;

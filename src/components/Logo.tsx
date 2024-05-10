import { StyleSheet } from "react-native";
import React from "react";
import { Image } from "@gluestack-ui/themed";

const Logo = () => {
  return (
    <Image
      width={116.19}
      height={64}
      source={require("../assets/LogoText.png")}
      alt="logo"
    />
  );
};

export default Logo;

import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Iconify } from "react-native-iconify";
import { ThemeContext } from "styled-components/native";

const LoadingView = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <View
      style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Iconify
        icon={"svg-spinners:6-dots-rotate"}
        color={themeContext?.colors.primary}
        size={30}
      />
    </View>
  );
};

export default LoadingView;

const styles = StyleSheet.create({});

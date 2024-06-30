import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Iconify } from "react-native-iconify";
import { ThemeContext } from "styled-components/native";
import LoaderScreen from "react-native-ui-lib/loaderScreen";

const LoadingView = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <View
      style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
    >
      {/* <Iconify
        icon={"svg-spinners:270-ring-with-bg"}
        color={themeContext?.colors.primary}
        size={30}
      /> */}
      <LoaderScreen loaderColor={themeContext?.colors.primary} />
    </View>
  );
};

export default LoadingView;

const styles = StyleSheet.create({});

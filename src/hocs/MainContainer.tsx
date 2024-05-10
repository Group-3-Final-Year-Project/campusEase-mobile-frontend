import { StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { theme } from "../shared/theme";

const MainContainer = (props: {
  children: React.JSX.Element;
  backgroundColor?: string;
}) => {
  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: props.backgroundColor || theme.BACKGROUND,
      }}
    >
      {props.children}
    </SafeAreaView>
  );
};

export default MainContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.BACKGROUND,
  },
});

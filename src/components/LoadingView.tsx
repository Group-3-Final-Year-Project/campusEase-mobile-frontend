import { StyleSheet, Text, View } from "react-native";
import React from "react";

const LoadingView = () => {
  return (
    <View
      style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>LoadingView</Text>
    </View>
  );
};

export default LoadingView;

const styles = StyleSheet.create({});

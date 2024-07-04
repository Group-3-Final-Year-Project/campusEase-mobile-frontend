import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import LoaderScreen from "react-native-ui-lib/loaderScreen";

type EmptyProps = {
  message?: string;
  image?: string;
  icon?: string;
  title?: string;
};

const EmptyState = (props: EmptyProps) => {
  return (
    <View
      style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
    >
      <LoaderScreen />
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({});

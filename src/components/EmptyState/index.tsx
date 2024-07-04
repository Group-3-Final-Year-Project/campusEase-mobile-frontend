import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import EmptyIcon from "~assets/images/empty.svg";

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
      <EmptyIcon width={150} height={150} />
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({});

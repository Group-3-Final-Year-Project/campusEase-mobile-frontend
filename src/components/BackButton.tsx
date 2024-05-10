import { StyleSheet } from "react-native";
import React from "react";
import BeautyButton from "./BeautyButton";
import { Iconify } from "react-native-iconify";
import { useNavigation } from "@react-navigation/native";

type BBProps = {
  variant: "outline" | "solid" | "link";
  color?: string;
  styles?: object;
};

const BackButton = (props: BBProps) => {
  const navigation = useNavigation();
  return (
    <BeautyButton
      variant={props.variant}
      color={props.color}
      styles={[{ width: 30, height: 30 }, props.styles]}
      isRounded
      onPress={() => navigation.goBack()}
      leftButtonIcon={<Iconify icon={"solar:arrow-left-outline"} size={18} />}
    />
  );
};

export default BackButton;

const styles = StyleSheet.create({});
